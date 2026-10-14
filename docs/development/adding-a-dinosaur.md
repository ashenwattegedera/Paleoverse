# Adding a dinosaur

Records power the archive, detail page, citations, timeline and measurements. Add a single typed `DinosaurProfile` record and register it; do not copy a page component.

1. **Confirm what the taxon is.** Identify accepted name, taxonomic rank, group, geological age and whether it is a dinosaur (pterosaurs and marine reptiles are not dinosaurs). Separate genus-level from species-level claims.
2. **Create a data module.** Add `src/data/<taxon>.ts` with a `DinosaurProfile` export. Use a unique internal ID, URL-safe slug and application archive code; do not present PALEOVERSE IDs as museum specimen accessions.
3. **Research before writing.** Add actual museum, database and peer-reviewed references with stable URLs/DOIs. Use the fields in `ScientificReference`. If publication year is absent, leave `year` out and record `accessedAt`; do not infer a publication date.
4. **Write measured uncertainty.** Add measurement ranges, units, population/context notes, geological age ordered oldest → youngest in Ma, and confidence/source IDs. Avoid false precision and invented fossil coordinates.
5. **Complete reusable sections.** Add evidence-cited overview sections, anatomy features, evidence notes and taxonomy. Check every `sources` ID against the record references.
6. **Add media.** Put optimized model/textures under `models/<taxon>/`; mirror required public files under `public/models/<taxon>/`. Add creator, original source, license and attribution proof to `docs/assets/manifest.md` first. Do not distribute an asset with unknown rights.
7. **Validate model and scale.** Inspect geometry bounds, up/forward axes, UVs, material maps and physical scale. Record whether the mesh is static, biped-rigged or quadruped-rigged. Preserve scale provenance and use framing normalization separately from measurement data.
8. **Configure animation honestly.** Static source means static viewer. For a rigged model, document skeleton mapping, clip names, root motion and contact phases in the animation docs, then validate joint weights and visually inspect ground contact. Quadrupeds need their own coordinated gait.
9. **Register it.** Import the data module into `src/data/registry.ts` and append it to `dinosaurs`. Catalog and route records resolve from this registry.
10. **Run checks.** Run `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`. `validateDinosaurRegistry` catches duplicate IDs/slugs, reversed geological intervals and broken source relationships.
11. **Inspect the pages.** Use the archive query/filter, open `/specimens/<slug>`, verify visible scientific citations, measurement caveats, empty/failure UI, keyboard focus and phone-width layout.
12. **Inspect the 3D scene.** Verify all local assets load, no console errors, expected bounds and orientation, orbit/reset controls, disposal when navigating away, and real animation behavior if rigged. Do not claim a visual gait review was performed unless it was.

Before public deployment, add a rights-cleared model and check its asset URLs/build output. A detail page should remain useful without optional 3D files.
