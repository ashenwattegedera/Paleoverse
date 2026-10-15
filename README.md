# PALEOVERSE

An illustrated prehistoric field archive. The current catalog contains one sourced record: _Tyrannosaurus rex_ (PVR—001). Scientific content can be published without a 3D model or illustration.

## Current experience

- Editorial home with an illustrated plate, collection ledger and source-linked field dispatch.
- Interactive geological notebook with keyboard-operated age selection and matching published records.
- Registry-backed collection with shareable URL search, diet/period/group filters and alphabetical sorting.
- Illustration-first specimen prototype: warm paper plate, editorial typography, cited field notes, anatomy, geological context, range and schematic scale comparison.
- Optional artwork with explicit provenance, reconstruction notes and a designed missing/broken-image fallback.
- Data-driven measurements and geography; unavailable measurements and empty detail sections are omitted.
- Shared CSS motion tokens, section/result entrances, card feedback and reduced-motion support.
- Sticky responsive navigation, skip link, heading/hash focus and session reading-position restoration.
- Adjustable illustrative human scale reference; recorded dinosaur estimates remain unchanged.

Phase 1 is merged. Phase 2 extends the field-journal design and motion across the application and is awaiting manual review; a separately sourced second dinosaur follows in phase 3. See [the rollout plan](docs/design/archive-expansion-plan.md).

## Stack and setup

React 19, strict TypeScript, Vite, React Router, Lucide icons, custom CSS, Vitest and React Testing Library. No backend, account system or remote content API is required. Legacy Three.js viewer code/dependencies remain available for an explicitly selected future integration but are not imported by the application or included in its production chunks.

Use Node.js 20.19+ or 22.12+ and npm 10+:

```sh
npm install
npm run dev
```

Open the URL printed by Vite to explore the home, `/archive`, and `/specimens/tyrannosaurus-rex`. No model files or WebGL support are required. Production hosting must rewrite client routes to `index.html`.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Tests cover registry validation, URL filter state, archive interactions, route focus, timeline/scale controls, navigation, specimen content, image failures and legacy viewer controls. See [phase 2 review notes](docs/development/phase-2-review.md) for browser observations and the manual review checklist. This is not a claim of a full accessibility or scientific illustration audit.

## Project structure

```text
src/
  components/     plates/artwork, timeline, reveal, route frame, citations, shell
  data/           typed content, citations, registry and validation
  hooks/          URL-backed collection state
  lib/            pure filter serialization
  pages/          home, archive, reusable specimen route
  styles/         base styles, editorial/motion tokens and specimen styles
  types/          domain and optional media contracts
public/
  illustrations/  optimized published artwork
models/           legacy local assets; not served or copied into builds
docs/             architecture, content, assets, design and development guides
```

Vite uses its standard `public/` directory. `models/` is retained locally and excluded from public output. The previous unverified FBX and textures are not a publishing requirement.

## Content and media

Measurements and scientific notes connect to source IDs in the record. Estimates and debated reconstructions are explicit. Artwork dimensions are separate from scientific measurements; the scale comparison uses numeric record data, not illustration pixels.

The T. rex plate is AI-generated interpretive artwork, not a fossil photograph, verified anatomical diagram or direct evidence for coloration. Its generation prompt and review limits are recorded in [illustration provenance](docs/assets/illustration-prompts.md). Records with no illustration remain complete written records.

## Documentation

- [Architecture](docs/architecture/overview.md)
- [Motion system](docs/design/motion-system.md)
- [Phase 2 PR metadata](docs/development/phase-2-pr.md)
- [Adding a dinosaur](docs/development/adding-a-dinosaur.md)
- [Asset manifest](docs/assets/manifest.md)
- [Scientific source policy](docs/content/scientific-sources.md)
- [Legacy viewer and future rigging](docs/animation/viewer-and-rigging.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

Project source code is MIT licensed. Raster artwork and model media are excluded from that code license; consult the asset manifest and per-record provenance. Original model files have unverified creator/source/rights and are not distributed by the application.
