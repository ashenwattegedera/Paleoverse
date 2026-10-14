import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Grid, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box3, Group, Mesh, MeshStandardMaterial, SRGBColorSpace, Texture, TextureLoader, Vector3, type Material } from 'three';
import type { DinosaurProfile } from '../types/dinosaur';
import { ViewerControls, type ViewAngle } from './ViewerControls';

function disposeMaterials(object: Group) {
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  object.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const meshMaterials = Array.isArray(child.material) ? child.material : [child.material];
    meshMaterials.forEach((material) => materials.add(material));
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value instanceof Texture) textures.add(value);
    });
    material.dispose();
  });
  textures.forEach((texture) => texture.dispose());
}

function disposeScene(object: Group) {
  const geometries = new Set<Mesh['geometry']>();
  object.traverse((child) => {
    if (child instanceof Mesh) geometries.add(child.geometry);
  });
  disposeMaterials(object);
  geometries.forEach((geometry) => geometry.dispose());
}

function SpecimenModel({ profile, onReady, onError }: { profile: DinosaurProfile; onReady: () => void; onError: () => void }) {
  const [model, setModel] = useState<Group | null>(null);
  useEffect(() => {
    let alive = true;
    let loadedModel: Group | null = null;
    let loadedTextures: Texture[] = [];
    const loader = new FBXLoader();
    loader.load(profile.model.fbx, async (object) => {
      if (!alive) {
        disposeScene(object);
        return;
      }
      loadedModel = object;
      try {
        const textureLoader = new TextureLoader();
        const textureResults = await Promise.allSettled([
          textureLoader.loadAsync(profile.model.baseColor),
          textureLoader.loadAsync(profile.model.normal),
          textureLoader.loadAsync(profile.model.roughness),
          textureLoader.loadAsync(profile.model.metallic),
        ]);
        loadedTextures = textureResults.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
        if (loadedTextures.length !== 4) {
          loadedTextures.forEach((texture) => texture.dispose());
          loadedTextures = [];
          throw new Error('Specimen texture set is incomplete.');
        }
        const [color, normal, roughness, metallic] = loadedTextures as [Texture, Texture, Texture, Texture];
        if (!alive) {
          loadedTextures.forEach((texture) => texture.dispose());
          return;
        }
        color.colorSpace = SRGBColorSpace;
        [color, normal, roughness, metallic].forEach((texture) => { texture.anisotropy = 8; });
        disposeMaterials(object);
        object.traverse((child) => {
          if (!(child instanceof Mesh)) return;
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new MeshStandardMaterial({
            map: color, normalMap: normal, roughnessMap: roughness, metalnessMap: metallic,
            metalness: 0.12, roughness: 0.78,
          });
          if (!child.geometry.attributes.normal) child.geometry.computeVertexNormals();
        });
        const bounds = new Box3().setFromObject(object);
        const size = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        const scale = 4.25 / Math.max(size.y, size.x * 0.42, size.z, 0.001);
        object.scale.setScalar(scale);
        object.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
        loadedModel = object;
        setModel(object);
        onReady();
      } catch {
        if (alive) onError();
      }
    }, undefined, () => { if (alive) onError(); });
    return () => {
      alive = false;
      if (loadedModel) disposeScene(loadedModel);
      else loadedTextures.forEach((texture) => texture.dispose());
    };
  }, [profile, onError, onReady]);

  if (!model) return null;
  return <primitive object={model} dispose={null} />;
}

function CameraPreset({ angle, resetVersion, controls }: { angle: ViewAngle; resetVersion: number; controls: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  useEffect(() => {
    const positions: Record<ViewAngle, [number, number, number]> = {
      'three-quarter': [10, 5.2, 12], side: [15, 3.5, 0.15], front: [0.1, 3.8, 15],
    };
    camera.position.set(...positions[angle]);
    camera.lookAt(0, 1.9, 0);
    controls.current?.target.set(0, 1.9, 0);
    controls.current?.update();
  }, [angle, camera, controls, resetVersion]);
  return null;
}

export function SpecimenViewer({ profile }: { profile: DinosaurProfile }) {
  const [angle, setAngle] = useState<ViewAngle>('three-quarter');
  const [gridVisible, setGridVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [modelReady, setModelReadyState] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  const controls = useRef<OrbitControlsImpl>(null);
  const setModelReady = useCallback(() => setModelReadyState(true), []);
  const setModelError = useCallback(() => setFailed(true), []);
  const resetCamera = () => { setAngle('three-quarter'); setResetVersion((version) => version + 1); };
  const changeAngle = (nextAngle: ViewAngle) => { setAngle(nextAngle); setResetVersion((version) => version + 1); };
  const toggleFullscreen = () => {
    const container = document.querySelector('.specimen-viewer');
    if (!document.fullscreenElement) void container?.requestFullscreen?.();
    else void document.exitFullscreen?.();
  };

  return (
    <section className="specimen-viewer" aria-label={`Interactive 3D model of ${profile.commonName}`}>
      <div className="viewer-topline"><span><i className="viewer-live-dot" /> SPECIMEN MODEL / {profile.model.expectedRig === 'static' ? 'STATIC MESH' : `${profile.model.expectedRig.toUpperCase()} RIG`}</span><span>ROTATE · ZOOM · INSPECT</span></div>
      <div className="viewer-scene">
        <div className="viewer-glow" />
        <div className="viewer-grid-fade" />
        {!failed ? (
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [10, 5.2, 12], fov: 34, near: 0.1, far: 100 }}
            gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
            onCreated={({ gl }) => { gl.setClearColor('#111411', 0); }}
            fallback={<div className="webgl-fallback">Interactive 3D is unavailable in this browser.<br />Specimen measurements and field notes remain available below.</div>}
          >
            <color attach="background" args={['#111411']} />
            <ambientLight intensity={1.2} />
            <hemisphereLight args={['#d7cbb0', '#111711', 1.15]} />
            <directionalLight castShadow position={[-5, 9, 6]} intensity={3.2} shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[6, 4, -6]} intensity={2.2} color="#c9874f" />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]} receiveShadow>
              <circleGeometry args={[30, 96]} />
              <meshStandardMaterial color="#171c18" roughness={0.96} />
            </mesh>
            {gridVisible && <Grid position={[0, -0.018, 0]} args={[30, 30]} cellSize={1} cellThickness={0.5} cellColor="#566057" sectionSize={5} sectionThickness={0.8} sectionColor="#a07748" fadeDistance={24} infiniteGrid={false} />}
            <ContactShadows position={[0, 0, 0]} opacity={0.48} scale={16} blur={2.7} far={6} resolution={256} color="#020302" />
            <SpecimenModel profile={profile} onReady={setModelReady} onError={setModelError} />
            <CameraPreset angle={angle} resetVersion={resetVersion} controls={controls} />
            <OrbitControls ref={controls} makeDefault target={[0, 1.9, 0]} minDistance={7} maxDistance={23} minPolarAngle={0.25} maxPolarAngle={Math.PI / 2 - 0.025} enableDamping dampingFactor={0.08} />
          </Canvas>
        ) : (
          <div className="model-failure"><span>MODEL UNAVAILABLE</span><p>The 3D asset could not be loaded. Measurements and research notes are still available.</p><button onClick={() => setFailed(false)}>TRY AGAIN</button></div>
        )}
        {!modelReady && !failed && <div className="viewer-loading"><span className="loader-mark" /><span>PREPARING SPECIMEN</span><span className="loading-number">HIGH-DETAIL MESH</span></div>}
        <div className="viewer-stamp"><span>{profile.archiveNumber} / {profile.group.toUpperCase()}</span><strong>{profile.commonName.split(' ').slice(0, -1).join(' ').toUpperCase()}<br /><em>{profile.commonName.split(' ').at(-1)?.toUpperCase()}</em></strong><small>{profile.period.toUpperCase()} · {profile.range.toUpperCase()}</small></div>
        <div className="viewer-scale"><span className="scale-rule" /><span>MODEL SCALE<br /><b>UNSPECIFIED</b></span></div>
      </div>
      <ViewerControls angle={angle} onAngleChange={changeAngle} gridVisible={gridVisible} onGridToggle={() => setGridVisible((visible) => !visible)} onReset={resetCamera} onFullscreen={toggleFullscreen} />
      <p className="viewer-disclaimer">STATIC MODEL · NO RIG OR WALK CYCLE PRESENT IN SUPPLIED ASSET</p>
    </section>
  );
}
