# PALEOVERSE

An interactive prehistoric field archive. The current release is focused on one sourced specimen record: *Tyrannosaurus rex* (PVR—001). PALEOVERSE blends geological time, editorial storytelling and an interactive 3D specimen display while making scientific uncertainty and asset provenance visible.

## Current experience

- Editorial landing page with deep-time context and a Mesozoic timeline.
- Data-backed archive index with name/group search, registry-generated diet/period/group filters and alphabetical sorting.
- Reusable, citation-linked T. rex profile with anatomy notes, fossil-range illustration, proportional scale comparison and evidence-confidence labels.
- Three.js viewer loading the supplied FBX mesh and four PBR texture maps. Drag to orbit, scroll to zoom, reset and use side/front views, switch the reference grid, and view fullscreen.
- Responsive layouts, keyboard-visible focus, descriptive labels, reduced-motion support, and graceful missing-WebGL/model messages.
- Strict TypeScript, registry validation, unit/component tests and production build.

## Scientific and model status

The page represents T. rex as a Late Cretaceous North American theropod, uses approximate adult measurement ranges, and avoids claiming a definitive maximum speed. Claims link to the Natural History Museum and relevant biomechanical literature. Current interpretations are evidence informed and can change.

The supplied model files are expected under `models/trex_highpoly/` and Vite serves that directory directly; binaries are not duplicated. They are locally available in the development workspace but excluded from Git until their origin and rights are verified. On a fresh checkout, provide licensed copies at those paths to enable the 3D scene; without them, the archive and written profile remain usable and the viewer reports its load failure. The delivered FBX is a static mesh: inspection found no animation/deformation tracks, and no rig metadata was provided. It therefore **does not walk**; the viewer truthfully offers specimen inspection, not a simulated gait. See [asset manifest](docs/assets/manifest.md).

## Stack

- React 19 + TypeScript (strict) + Vite
- Three.js, React Three Fiber, Drei and FBXLoader
- React Router, Lucide icons
- Vitest, jsdom and React Testing Library
- CSS design tokens and custom responsive styles

## Requirements and setup

- Node.js 20.19+ or 22.12+ (Vite 8 runtime requirement)
- npm 10+
- Modern browser with WebGL 2 recommended for 3D; the text record remains available without it

```sh
npm install
npm run dev
```

Vite prints the local development URL. The 3D scene downloads the FBX and texture maps (about 33 MB total from the supplied model directory), so allow a brief first-load period.

## Commands

```sh
npm run typecheck  # strict TypeScript
npm run lint       # ESLint
npm test           # Vitest
npm run build      # typecheck + production bundle
npm run preview    # serve production output locally
```

## Structure

```text
src/
  components/        shared shell and Three.js specimen viewer
  data/              typed T. rex content, citations, registry and validation
  pages/              home, archive and reusable specimen route
  styles/             design tokens, layouts, motion and breakpoints
  types/               domain contracts
docs/
  architecture/     application boundaries and data flow
  animation/        rig contract and current asset limitations
  assets/           provenance and rights manifest
  development/      add-a-dinosaur workflow
models/              supplied source files, served directly by Vite
```

The one-record catalog and route read from the same typed registry. Add a new record and its cited content rather than hard-coding another card/page; instructions are in [`docs/development/adding-a-dinosaur.md`](docs/development/adding-a-dinosaur.md).

## Documentation

- [Architecture](docs/architecture/overview.md)
- [Animation and viewer pipeline](docs/animation/viewer-and-rigging.md)
- [Adding a dinosaur](docs/development/adding-a-dinosaur.md)
- [Asset manifest](docs/assets/manifest.md)
- [Scientific source policy](docs/content/scientific-sources.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

Project source code is MIT licensed. The locally supplied 3D model and textures are explicitly excluded pending verification of their origin and license. See [LICENSE](LICENSE) and the asset manifest before reuse or publication.

## Next steps

- Replace the unverified static asset with a rights-cleared, rigged GLB and review a slow grounded T. rex walk cycle visually.
- Add the independently sourced Triceratops record and its quadrupedal model/gait configuration.
- Add browser-driven desktop/mobile and WebGL fallback coverage, then profile performance on mobile hardware.
- Expand the atlas with sourced anatomy inspection and fossil collections data.

## Known limitations

- The supplied FBX has no usable rig or walk clip, and asset rights/creator/scale are unverified. It is excluded from commits; provide rights-cleared local assets to load it.
- The lazily loaded viewer chunk is approximately 991 kB minified (267 kB gzip), which triggers Vite's 500 kB chunk advisory. It is isolated to the specimen experience, but further dependency splitting/optimization is still worthwhile.
- Automated checks cover registry logic, archive interactions, profile content and viewer controls. Playwright/browser rendering, visual gait review, accessibility audit and measured mobile-GPU performance have not been performed.
- Google Fonts are loaded from the Google Fonts stylesheet; system fallbacks are defined for offline use.
