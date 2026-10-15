# Illustration-first archive expansion plan

Status: rollout authorized, 2026-10-15. Phase 1 is implemented and awaiting manual review. Later phases have not started. See `../development/phase-1-review.md` for the checkpoint.

## Objective

Make PALEOVERSE easy to expand without requiring a 3D model for each dinosaur. Develop an authored natural-history publication aesthetic, using animation to explain scale, time, relationships, and discovery. Preserve scientific sourcing, uncertainty labels, and accessible written records.

## Proposed visual direction: a living field journal

Keep the recognizable charcoal, amber, and geological identity. Evolve it through warm paper panels, expressive display typography, specimen illustrations, ink-like linework, small editorial annotations, and deliberate variations in composition. Use a disciplined spacing grid underneath these variations.

Avoid repeating the same centered heading and three-card layout. Alternate full-width artwork, reading columns, comparison strips, maps, and marginal notes. Handcrafted should come from composition, original artwork, and considered details rather than arbitrary rotation, distressed text, or decorative clutter.

Start with one representative specimen composition and an archive composition at desktop and mobile widths. Confirm the style through actual rendered pages before spreading it through every route.

## Media and illustration system

- Written records must be publishable independently of artwork.
- Give each profile a media record with an optional primary illustration and an optional model. Remove required FBX and texture fields from the profile contract.
- Illustration metadata should include file path, alt text, creator/provider, source, rights/license information where applicable, attribution, generation/editing provenance if applicable, and a reconstruction note. Do not imply exclusive ownership or settled scientific accuracy for generated media.
- Keep model-specific fields in a separate discriminated model contract if 3D is retained. A page with only an illustration must not import the Three.js viewer. Choose supported media explicitly rather than silently replacing artwork with 3D.
- Missing imagery uses an intentional typographic record panel with taxonomy and geological context. Never substitute unrelated dinosaur artwork.
- Use a consistent art brief: side-profile reconstruction, complete head/tail/feet, neutral pose, consistent lighting and palette, and no lettering baked into the image. Keep decorative artwork separate from diagrams that assert anatomy or physical scale.
- Review the taxon's distinguishing anatomy, proportions, pose, and uncertainty before using artwork. Clearly label reconstructed coloration and soft tissues. Do not use an unscaled illustration as measurement evidence.
- Store optimized, rights-cleared illustrations in `public/illustrations/`; update Vite's current `publicDir: 'models'` arrangement deliberately. Preserve optional legacy model paths through an explicit migration decision rather than copying unverified assets into public output.
- Retire the current unverified T. rex model from the default public experience. Retain local source files and provenance documentation; do not delete source assets as part of the redesign.

## Page experiences

### Home

An illustrated opening composition introduces the archive, followed by a browsable collection preview, a geological timeline, and a featured evidence story. Populate featured content from record data. Use real collection counts and links rather than fixed `001 / 001` labels. Avoid autoplay carousels.

### Archive

Retain working search, diet/period/group filters, sorting, and explicit empty states. Make illustrations the main visual anchor, with compact scientific metadata and strong reading order. Persist filters in URL search parameters so links and browser navigation restore the selected collection view. Future region filters require consistent record vocabulary first.

### Specimen

Replace the mandatory viewer with an illustrated specimen plate. Build the page from reusable sections: identity, measurements, cited field notes, geological context, anatomy, range, comparison, evidence, references, and provenance. Allow sections to be absent when content is unavailable; an empty map or invented anatomy diagram is not a fallback.

Generalize existing T. rex-specific measurements, geographic text, date labels, scale comparison, provenance statements, accessible labels, and end-of-record identifiers. Keep application IDs distinct from museum accessions. Use taxon-specific source-backed visuals where available; a broad regional text description is sufficient otherwise.

### Related records

Suggest other available records using transparent shared attributes such as period and group. Exclude the current record, handle a one-record catalog gracefully, and avoid suggestions to unfinished records.

## Motion language

Use a shared set of duration, easing, distance, and stagger tokens. Candidate timings: 120–180 ms for controls, 250–400 ms for small transitions, and 500–750 ms for major entrances. These are starting points to tune in the browser.

| Moment | Proposed motion | Purpose |
| --- | --- | --- |
| Initial page view | Brief title/metadata stagger and illustration reveal | Establish reading hierarchy |
| Entering a section | Small once-only fade/translation | Pace the narrative |
| Geological timeline | User-controlled marker with changing date/context | Explain relative time |
| Archive filtering | Short result transition with persistent focus and announced count | Clarify what changed |
| Card interaction | Subtle artwork movement and underline/arrow response | Indicate a link |
| Anatomy note selection | Highlight a verified region and display its cited note | Connect a label to anatomy |
| Scale comparison | User-triggered transition between reference subjects | Explain proportions |
| Route navigation | Short content transition without delaying links | Maintain continuity |

No scroll hijacking, forced horizontal scrolling, loading theatrics, cursor trails, or required animation before content becomes available. Avoid endless ambient motion. Use transform/opacity for decorative movement; preserve stable layout and image dimensions. Use native scrolling and progressive enhancement.

Reduced motion removes large translation, parallax, and stagger while preserving content and state changes. Touch and keyboard interactions must provide equivalent information to hover. Anatomy interaction is deferred until reviewed artwork provides reliable annotation locations.

Start with CSS transitions/keyframes and a small IntersectionObserver hook for entrances. Adopt a motion library only if a concrete prototype demonstrates a need for coordinated layout or presence animation. Do not add multiple animation systems for the same behavior.

## Data and component boundaries

Extend the current typed registry, rather than introduce a backend at this catalog size. Use consistent domain fields for numeric measurements with units, display text, context, and sources; keep scientific estimates separate from illustration dimensions. Introduce only fields needed by selected pages and verified content.

Candidate components: `SpecimenPlate`, `RecordHeader`, `MeasurementStrip`, `GeologicalTimeline`, `EvidenceBadge`, `SourceLinks`, and `RelatedRecords`. Keep page composition distinct from data lookup. Extract a component when it has a clear responsibility or actual reuse; avoid a generic page builder.

Strengthen validation around duplicate IDs/slugs/archive codes, reference IDs, finite and ordered ages, required identity fields, measurements, and media metadata. Test both valid records and deliberate invalid fixtures. Do not require every future taxon to fit the current Mesozoic display without an explicit supported date range.

## Rollout and acceptance criteria

### 1. Foundation and one specimen prototype

Generalize the profile/media contract and remove required 3D. Adapt T. rex to the new schema, extract hard-coded detail content, introduce an illustration/fallback plate, and validate the media-serving migration. Establish visual/motion tokens and implement one specimen layout at desktop and mobile widths.

Accept when the existing T. rex record renders without any model files or 3D network requests, an image-free fixture renders coherently, citations remain intact, and the prototype works with keyboard and reduced motion. Existing archive behavior must continue to pass.

### 2. Editorial design and purposeful motion

Apply the chosen visual direction to the home page, archive, and shared shell. Add entrance, interaction, filtering, and timeline motion using the shared tokens. Handle route focus, native hash links, page titles, back/forward navigation, and scroll restoration explicitly.

Accept when primary content is usable before animation, mobile has no horizontal overflow, links and controls work by keyboard, and reduced-motion mode preserves all information. Check actual browser screenshots at representative desktop and narrow phone sizes.

### 3. Prove expansion with a second dinosaur

Create a separately sourced Triceratops record as the candidate expansion test, subject to content/artwork readiness. Record citations and media provenance. Use the existing page template; do not add taxon-name conditionals to layout code. Verify that different diet, group, proportions, measurements, and geography are reflected correctly.

Accept when adding the second dinosaur requires a data module, registry entry, assets/metadata if available, and source documentation—not a copied page. Search, sorting, filters, counts, and related records must work for both.

### 4. Quality and delivery

Run type checking, lint, meaningful unit/component tests, and the production build. Add a small browser smoke suite for archive-to-detail navigation, filter URL state, an unknown record, missing imagery, and reduced motion if browser-test infrastructure is introduced. Visually review desktop/mobile pages and keyboard flow. Inspect the production network for unexpected model downloads and unnecessary image payloads.

Update the README, architecture overview, add-a-dinosaur workflow, asset manifest, and changelog. Resolve the stale instruction to mirror files under `public/models` when documenting the selected asset layout.

Accept when checks pass, observed limitations are documented, and a production build can serve the complete written archive without private or unverified model files.

## Engineering and Git workflow

Follow `AGENTS.md` and `CONTRIBUTING.md`. Use focused `codex/` implementation branches, coherent reviewable changes, and Conventional Commit messages when commits are authorized. Preserve unrelated changes. Keep source data, UI, assets, and documentation changes understandable together. Do not commit or push automatically.

Prefer one deliverable per phase. Record verified checks and browser evidence in the delivery notes. Do not present automated checks as proof of anatomical accuracy, visual quality, or performance on hardware that was not tested.

## Deferred work

Accounts, CMS/backend, paid model acquisition, articulated animation, detailed fossil-site maps, universal anatomy hotspots, and advanced collection comparisons are outside the initial migration. Revisit them when real catalog and editorial needs justify the added maintenance.
