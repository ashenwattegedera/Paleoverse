# Legacy viewer and future animation pipeline

Status since phase 1 (2026-10-15): the active application renders illustrated records. The viewer code below is dormant; no route imports it, no model is required, and the local `models/` directory is no longer served or copied to production. This guide preserves the historical loader design and future rigging requirements; it does not describe the shipped page.

## Current asset status

The supplied `SM_trex_highpoly.fbx` and four PBR texture maps load in the interactive R3F specimen viewer. A binary-file inspection did not find FBX animation stacks/curves, limb nodes, skeleton or deformer metadata. No creator, source, license, scale or rig notes accompanied the files. The current specimen is **static**; no walk-cycle controls are shown. Rotating the orbit camera changes the view, not the animal's locomotion.

## Runtime pipeline

1. The selected `DinosaurProfile` provides local FBX and texture paths.
2. Three.js `FBXLoader` loads one scene; `TextureLoader` reads base color, normal, roughness and metallic maps.
3. Meshes receive a shadow-enabled `MeshStandardMaterial`. Bounds are measured and scaled to a visual framing height (not a claim of physical model scale), centered on the ground, then viewed under environment and key/fill lighting.
4. OrbitControls provides bounded orbit/zoom. Camera presets are three-quarter, side, front and reset. The grid and fullscreen controls are real interactions.
5. The component disposes mesh geometries, materials and textures on unmount. The asset loading error has a visible retry state; a non-WebGL fallback retains all written content.

## Contract for a future rigged dinosaur

Do not add procedural animation until a licensed model's rig is inspected. For the initial T. rex biped upgrade, deliver a GLB/glTF or FBX with a documented armature, named hip/pelvis, left/right thigh, shank, ankle/foot and toe joints, plus trunk/neck/head/tail joints. Use a stable ground-contact coordinate, consistent forward axis, and a documented model-to-metres scale. Check rest pose, transforms, bone hierarchy, mesh skin weights, clip duration, and texture color space in a DCC viewer before adding it.

Preferred GLB delivery for web:

- one skinned character mesh, no hidden duplicate meshes or unnecessary cameras/lights;
- PBR maps with documented color space and license/attribution;
- named `Idle` and `Walk_InPlace` clips, with an explicitly looping gait and root-motion behavior;
- locomotion root translation either absent or documented so world-space travel can be neutralized without freezing pelvis articulation;
- authored contact timing and an evidence-informed, grounded adult gait (no unsupported sprint claim).

For a future Triceratops, provide a separate coordinated quadruped gait, with shoulder, pelvis, trunk, neck, head/frill and tail response; do not retarget the T. rex gait.

## Shared animation architecture target

Keep `ModelAssetLoader`, rig/skeleton inspection, `AnimationClipController`, locomotion config, root-motion policy, foot-contact correction, secondary motion, state transitions, ground alignment, camera framing and rendering separate. Each taxon supplies a typed configuration (locomotion type, clip mapping, cycle duration, contact phases, playback bounds and optional joint names). The state machine should distinguish loading, idle, walking, paused and unavailable/error. Clip blending should transition into/out of walking smoothly; speed controls must set `AnimationAction.timeScale` (or equivalent real gait playback), not just change a label.

### Foot-contact correction

Validate planted-foot drift in a side-view animation review. If authored animation slides, derive stance windows from verified contact phases and apply a rig-aware correction/root adjustment while preserving swing motion and pelvis pose. Avoid freezing a root bone wholesale. A unit test can validate phase wrap and config bounds, but cannot validate lifelike contact; visual review remains required.

### Coordinates and camera

Three.js uses Y-up. Normalize mesh framing from measured bounds, center X/Z and place the lowest point at Y=0; preserve source scale metadata separately. Fit a camera from bounds/aspect ratio so full tail/head/feet remain visible. Limit orbit polar angle and distance, provide reset and maintain a written alternative to 3D-only information.

## Model failure / performance notes

Avoid mounting multiple detailed scenes at once. Keep DPR/shadows constrained on mobile, reduce map resolution only from sourced derivatives, and inspect frame rate, draw calls, triangles, texture memory and scene initialization on actual target hardware before making performance claims. WebGL context failure must not suppress the page's text. Dispose scene objects and loader-created resources on route changes.
