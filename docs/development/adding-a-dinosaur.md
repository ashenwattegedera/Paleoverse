# Adding a dinosaur

A record powers the archive and reusable detail route. No model or illustration is required.

1. Confirm the accepted taxon, rank, group and geological interval. Distinguish genus-level and species-level claims.
2. Create `src/data/<taxon>.ts` exporting a `DinosaurProfile`. Choose unique IDs, a URL-safe slug and an archive number. App archive numbers are not museum accessions.
3. Research museum/database and peer-reviewed references. Record actual stable URLs/DOIs and source IDs. Use `accessedAt` when a page has no publication year; do not invent a year.
4. Add identity, summary, range, taxonomy, diet, period and an oldest-to-youngest `ageRangeMa`. Dates must be finite and non-negative.
5. Add the measurements that are established. Each has `displayValue`, `unit` (`m` for length/hip height, `t` for mass), and source IDs. An optional positive `typicalValue` uses the same unit. Only a numeric length in metres enables the schematic comparison. Omit unavailable values rather than use zero or invented estimates. Use `measurements.note` for context.
6. Add cited narrative sections, anatomy entries and evidence notes. These arrays may be empty; empty sections are omitted. Every claim group needs valid source IDs. Section IDs must be unique and must not use reserved anchors `geological-context`, `evidence`, `sources`, `related-records` or `related-records-heading`.
7. Optionally add `geography` with a description, location labels and sources. The top-level `range` remains the concise region label. A written description is sufficient; no map or invented fossil coordinates are required.
8. Optionally add `media.illustration`. Store an optimized image under `public/illustrations/` and use `/illustrations/<filename>` in the record. Include alt text, dimensions, creator, source, rights note, attribution and a reconstruction caveat. Generated media also needs generation provenance and a recorded prompt. Update the asset manifest. Review anatomy; do not use artistic reconstruction as evidence.
9. Leave `media` absent when artwork is unavailable. The specimen plate shows a designed written-record fallback. Broken images also fall back without hiding research notes.
10. Import and append the profile in `src/data/registry.ts`. Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. The registry test validates the catalog.
11. Inspect search/filter/sort and the detail page at desktop and narrow phone widths. Verify title, measurements, range, date display, source anchors, keyboard focus, reduced motion, and image fallback. Check production assets for unintended private/unverified files.
12. Update scientific source documentation, asset provenance where applicable and changelog. Use the repository branch/commit/PR workflow.

## Optional models

`media.model` is reserved for a future explicitly enabled 3D integration. Supplying it does not mount the dormant legacy viewer. A model must not block record publication. Keep original unverified files in the local ignored `models/` directory; do not copy them into `public/`. Any future published model requires recorded ownership/license, inspected scale/orientation, and a separately verified viewer/gait. See the legacy animation guide.

## Expansion behavior verified in phase 3

Triceratops uses the same detail route as T. rex, with a single-word genus heading and no hip-height value. No page is copied and no taxon-name condition selects a layout. Registering the record also updates cards, filter vocabulary, counts, home ledger and matching geological intervals.

Related records use shared `group` and/or `period` values. The current record is excluded, group matches rank ahead of period-only matches, alphabetical names break ties, and at most three available records are suggested. Every suggestion displays its shared attributes; these associations do not establish ecological interaction. A catalog with no matches omits the section. Keep group/period vocabulary consistent when authoring new records.
