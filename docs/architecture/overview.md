# Application architecture

PALEOVERSE is a static React application with no backend, accounts, remote content API or global state store. React Router selects three lazily loaded routes:

```text
/                 HomePage
/archive          ArchivePage -> searchDinosaurs() -> registry
/specimens/:slug  SpecimenPage -> getDinosaurBySlug() -> DinosaurProfile
                                 |-- SpecimenPlate (optional image / text fallback)
                                 |-- MeasurementStrip + SourceLinks
                                 |-- GeologicalTimeline
                                 |-- cited notes, anatomy, range, evidence, provenance
```

## Content contracts

`src/types/dinosaur.ts` defines the profile, references, measurements and optional media. A `Measurement` separates a displayed estimate, unit, optional representative numeric value, and source IDs. A missing estimate is omitted. Numeric values drive schematic comparisons; image dimensions never imply physical scale.

`media` and each of its members are optional. `SpecimenIllustration` contains a local public path, dimensions, alt text, attribution, source, rights, reconstruction note and generation provenance where applicable. A model has its own `ModelAsset` contract with an explicit format discriminator. The default page renders a plate and never mounts a viewer, even if a future record supplies model metadata.

The registry validates identity, duplicate IDs/slugs/archive codes, finite ordered ages, unique reference and section IDs, claim-source relationships, measurement values/units, and illustration metadata. Validation runs in the registry tests before publication; it is not a network source audit. Future content must keep sources accurate as well as structurally valid.

## UI boundaries

- `SpecimenPlate`: image presentation, broken-image state and artwork-free fallback.
- `MeasurementStrip`: available estimates and their source links.
- `GeologicalTimeline`: contextual date range, adapting when a record falls outside the default Mesozoic display.
- `SourceLinks`: numbered links into the current record's references.
- `SpecimenPage`: reusable narrative composition, conditional sections, written range, evidence and media provenance.
- `global.css`: reset, legacy viewer and specimen base styles. Superseded home/archive/shell rules have been removed.
- `editorial.css`: shared shell, home/collection composition, artwork, motion tokens and reduced-motion behavior.
- `specimen.css`: scoped specimen plate and reading layout, consuming shared motion tokens.
- `Reveal`: once-only IntersectionObserver entrances, with visible content as the baseline.
- `RouteFrame`: completed-route focus/hash handling and bounded session scroll restoration inside Suspense.
- `useArchiveFilters` / `lib/archiveFilters`: URL-backed controls and pure parsing/serialization. Search replaces history; category/sort changes push history. Unsupported values fall back to defaults; unrelated parameters are preserved.
- `DeepTimeExplorer`: native age slider and period buttons, filtering published catalog records by the selected age. Its empty state describes catalog coverage.
- `RecordArtwork`: compact optional image/fallback shared by home and collection.
- `RelatedRecords` / `getRelatedDinosaurs`: available catalog suggestions with shared-attribute reasons, deterministic ranking, self/no-match exclusion and a three-result cap.

The timeline presents an approximate interval, not precise fossil-site chronology. The comparison uses straight bars and explicitly compares body length with reference human height. The range is written content; no generic regional map is reused for unrelated taxa. Section navigation derives from existing sections.

## Public assets and legacy 3D

Vite uses `public/`. Only reviewed publication assets belong there. The generated T. rex and Triceratops WebPs are 1536×1024 and approximately 121 kB and 167 kB respectively. The local `models/` directory is no longer Vite's public directory, so its unverified binaries are not copied to production.

`SpecimenViewer.tsx` and `ViewerControls.tsx` remain as dormant legacy components. The viewer now accepts its model explicitly rather than requiring a model on every dinosaur profile. No active route imports it, so Three.js and the legacy FBX loader are absent from production chunks. Retaining dependencies is a deliberate reversible migration choice; future integration requires rights-cleared assets and separate viewer verification.

## Extension and rollout

Phase 2 is merged. Phase 3 adds a separately sourced Triceratops genus record, generic single-word heading support and related-record discovery. Both records use the same template, with optional measurements/media and independent source sets. Phase 3 is awaiting manual review. See `docs/design/archive-expansion-plan.md`, `docs/design/motion-system.md` and `docs/development/phase-3-review.md`. Avoid copying a page or introducing taxon-name branches when expanding content.
