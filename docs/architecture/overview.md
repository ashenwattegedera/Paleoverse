# Application architecture

## Shape of the app

PALEOVERSE is a small, static React application. It has no server, user account, remote content API or global store. React Router selects one of three experiences and the specimen route reads a typed domain record from a single registry.

```text
Browser URL
   │
   ├── /                HomePage (editorial gateway, eras)
   ├── /archive         ArchivePage ─── searchDinosaurs() ─── registry
   └── /specimens/:slug SpecimenPage ── getDinosaurBySlug() ── DinosaurProfile
                                             │
                                             ├── cited field notes, anatomy, timeline
                                             └── SpecimenViewer ── FBXLoader + texture maps
```

Route components are lazy-loaded so the Three.js viewer is not required on the landing page or archive. The viewer loads one FBX instance and its PBR maps when the specimen route mounts. Its R3F canvas and OrbitControls own render-time state; small local React state controls grid visibility, camera presets and error/loading states. There is no Zustand store because no shared mutable state currently warrants one.

## Feature boundaries

- `src/types/dinosaur.ts`: profile, source and evidence contracts.
- `src/data/tyrannosaurus.ts`: content and local model manifest, independent of UI components.
- `src/data/registry.ts`: collection lookup, search/filter and relationship validation.
- `src/pages`: routed editorial, archive and reusable detail template.
- `src/components/SiteShell.tsx`: responsive shared navigation/footer.
- `src/components/SpecimenViewer.tsx`: FBX asset loading, normalized framing, material setup, disposal and camera interaction.
- `src/styles/global.css`: palette, typography, layout, responsive behavior and reduced motion.

The archive and specimen page derive from the same `DinosaurProfile`; visual catalogue content is not separately hard-coded. `validateDinosaurRegistry` checks duplicate keys, ordered geologic age ranges and all section/evidence source references. Add a record in the registry and run tests to catch content relationship errors.

## Rendering decisions

React 19, Vite 8 and TypeScript strict mode provide the frontend and development/build pipeline. Three.js, React Three Fiber and Drei are used because the specimen display needs genuine WebGL camera orbit, lights, mesh loading and ground contact. FBXLoader is used for the supplied FBX format; no conversion tooling was installed. The custom CSS system avoids adding a component library and keeps the sharp-edged exhibition visual identity in one tokenized stylesheet.

The viewer caps device pixel ratio at 1.5, limits texture anisotropy to 8, uses a 1024 shadow map, and creates only one model scene on the detail route. Geometry, material and texture resources are disposed on unmount. The 3D model is not assigned a real-world size: bounds are normalized for visual framing only, and the overlay says scale is unspecified.

## Content and source flow

Source IDs are embedded with profile sections and evidence notes; links point to source records in the same profile. Museum facts and published biomechanical interpretations are distinguished. Estimated measurements are ranges and annotated. Approximate era dates and illustrated fossil range avoid false site-level precision. See [scientific source policy](../content/scientific-sources.md).

## Resolved tradeoffs and current boundaries

- The supplied FBX is used directly. Inspection found no animation/skeleton tokens and no rig or clip documentation; the experience displays it as a static model. We do not synthesize articulated walking from an unverified asset.
- Original model author, URL, license and measured scale were not supplied. The project code license excludes the model files; the asset register marks them unverified.
- The index currently contains the T. rex record only. Triceratops and other taxa should be added only with separately verified content and media.
- CSS illustrations are symbolic exhibition artwork, not fossil photographs or precise paleoart.
- No performance measurement, accessibility audit or browser end-to-end run is claimed as completed.
