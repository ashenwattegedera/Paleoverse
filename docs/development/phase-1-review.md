# Phase 1: illustrated record foundation

Status: reviewed and merged in [PR #1](https://github.com/ashenwattegedera/Paleoverse/pull/1), merge commit `3c476a8`. Branch: `codex/phase-1-illustrated-records`. Baseline: `4a5f6c9` (original local `main`).

## Delivered

- Optional illustration/model contracts; no model is required to add a dinosaur.
- A T. rex specimen prototype with editorial serif headings, a warm specimen plate, fine rules, restrained entrance motion, and readable cited field notes.
- An optimized AI-generated interpretive illustration with its prompt and provenance.
- Intentional image-free and broken-image fallback plates.
- Cited, optional measurements; data-driven geography, comparison and record labels.
- Conditional section navigation and evidence/anatomy content.
- Geological context that expands for intervals outside the Mesozoic display.
- Default `public/` asset serving. Local unverified models and the dormant viewer are absent from production output.
- Publication validation, meaningful component/domain tests, formatter conventions and updated extension documentation.

The home/archive visual redesign, broader motion system, route focus/scroll improvements, filter URL state and a second dinosaur are later phases. No taxon has been added or scientific source externally re-audited in this phase.

## Run and inspect

```sh
npm install # only if dependencies are missing
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`, and visit `/specimens/tyrannosaurus-rex`.

1. Inspect the title, illustration plate, captions and field notes at desktop width.
2. Narrow the window to approximately 390 px and 320 px. Check that the title, measurements, notes and sources remain readable without horizontal scrolling.
3. Use the section navigation and numbered citations. Confirm they lead to the expected notes and references.
4. Inspect measurements, written geographic range, scale bars, uncertainty labels and artwork provenance. The scale comparison is data-driven and does not measure the drawing.
5. Visit `/archive`, search for an absent name, clear filters, and reopen the record. Existing search/filter/sort behavior should remain usable.
6. Use Tab to navigate links and controls. With the OS/browser reduced-motion preference enabled, reload and confirm that the plate does not animate into view.
7. To inspect image failure without editing code, use browser developer tools request blocking for `*/illustrations/*`, then reload. A written-record plate should appear and all research notes should remain. Unblock requests and reload to restore the image.
8. Open `/specimens/not-a-record` and confirm the archive recovery link.
9. Share feedback on the illustration style, typography, paper/charcoal contrast, reading density, and overall direction. Phase 2 will broaden motion and redesign the other pages after this foundation is approved.

Artwork-free records and alternative measurements are covered by synthetic test fixtures, not added to the public catalog.

## Verification performed

- TypeScript checking, ESLint, all 22 Vitest tests, and production build passed.
- Headless Chrome browser checks at 1440×1000, 390×844 and 320×844: no horizontal document overflow, no invalid in-page anchors, no page errors, no canvas and no legacy model/viewer requests.
- Separate phone inspection found no out-of-bounds specimen descendants and only one shared site header.
- Image-request blocking demonstrated fallback while keeping scientific content visible.
- Reduced-motion emulation resulted in `animation-name: none` for the plate image; keyboard Tab reached a link with a visible outline.
- Desktop and phone viewport screenshots were visually inspected for the plate and field notes. Full-page phone screenshots in this local Chrome setup showed capture tiling artifacts; viewport screenshots and DOM bounds were used for visual review.
- Archive search/clear/open-record flow and unknown-record recovery passed browser smoke checks.
- Production output contains the 121,000-byte illustration and application chunks; no FBX, legacy texture maps or Three.js viewer chunk. The previous approximately 991 kB viewer chunk is removed from the route dependency graph.

These checks do not constitute a full assistive-technology audit, specialist paleoart review or measured performance test on mobile hardware. The legacy 3D viewer is dormant and was not browser-tested in this phase.

## GitHub checkpoint

The user supplied `git@github.com:ashenwattegedera/Paleoverse.git`; authentication and repository access were verified. At implementation time the repository had no default branch. After manual approval:

1. Publish the original `main` history as the baseline, without including phase changes.
2. Push the phase branch, open a PR against `main`, and include this review checklist, actual check results and limitations.
3. Attach the PR to the Codex chat. Apply any feedback before merge.
4. Preserve the phase's logical commits with a merge commit where repository settings allow; verify the merged state.
5. Start phase 2 only after the phase 1 checkpoint is complete.

The phase 1 checkpoint is complete. The phase 2 branch starts from the verified merge; see `phase-2-review.md` for the next manual checkpoint.
