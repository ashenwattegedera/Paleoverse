# Phase 2: editorial layouts and purposeful motion

Status: implemented and committed locally; awaiting the user's manual review before PR creation and merge.

- Branch: `codex/phase-2-editorial-motion`.
- Base: `3c476a8`, the merge of [phase 1 PR #1](https://github.com/ashenwattegedera/Paleoverse/pull/1).
- PR title/body and commit messages: [phase 2 PR metadata](phase-2-pr.md).
- Motion behavior and token documentation: [motion system](../design/motion-system.md).

## What changed

The home and collection pages now use the specimen prototype's natural-history publication direction: serif headings, warm paper plates, fine rules, a collection ledger, a source-linked field dispatch and an interactive geological notebook. Features, counts, metadata and links derive from the registry. Existing artwork is reused with its reconstruction context; no additional species or scientific claims were introduced.

Search and diet/period/group/sort filters are URL-backed. Typing replaces the current history entry; categorical changes and clearing filters create entries for back/forward use. Unknown category/sort values fall back to supported defaults, and unrelated URL parameters are preserved.

The shared shell adds a sticky navigation bar, a skip link, responsive menu behavior, Escape-to-close, and collection-derived counts. Completed routes handle heading/hash focus and session scroll restoration. The specimen page adds section entrances and an adjustable illustrative human reference height.

Motion is implemented with CSS and IntersectionObserver; no library was added. Replaced home/archive/shell CSS was removed, and the remaining base stylesheet was formatted for reviewability. Shared CSS tokens power controls, page entry, results, timeline and comparison feedback. Missing images and missing IntersectionObserver do not prevent reading the archive.

## Run and inspect

```sh
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

1. Visit `/`. Inspect the hero typography, illustration plate, collection ledger and paper field-note section. Scroll through the page and judge the pacing of entrances.
2. Use the deep-time slider and period buttons. The selected age and matching published records should update. At 68–66 Ma, the current T. rex record is available; a point with no entry should describe an incomplete collection, not claim that no animals lived then.
3. Visit `/archive`. Search, filter and change ordering. Confirm the URL changes; copy/reload the link and verify the same selection is restored. Clear filters and use Back/Forward to inspect history behavior.
4. On the collection page, scroll down, open a record, then go Back. Check that your reading position returns.
5. Use the header's Field Notes link or the home field dispatch link to open a source/section on the specimen page. The target should sit below the sticky header. Follow a numbered citation as well.
6. On the specimen page, adjust the human reference height. The schematic comparison changes; dinosaur measurements remain the same sourced estimates.
7. Repeat at approximately 390 px and 320 px widths. Open the mobile menu, navigate, and close it with Escape when using a keyboard.
8. Enable reduced motion and reload. All information and interactions should remain, without decorative entrances or transitions.
9. Optionally block `*/illustrations/*` in browser developer tools. The home, collection and specimen record should show their written fallbacks.

Please review the overall direction, motion intensity, reading density, page hierarchy and mobile comfort. Anatomical hotspots remain deferred until reviewed artwork supports them. The separately sourced second record belongs to phase 3.

## Verification performed

- TypeScript checking, ESLint, all 32 Vitest tests, and production build passed.
- Chrome browser checks covered all three routes at 1440×1000, 390×844 and 320×844. No horizontal document overflow or out-of-bounds main-content descendants were found.
- Home/collection also passed bounds checks at 768×1024.
- Home, collection, specimen, field dispatch, collection card and timeline viewport screenshots were visually inspected at representative desktop/phone widths.
- Shared URL filters survived reload. Search retained focus; clearing filters returns focus to search; category/sort Back/Forward restored the expected values. Browser tests waited for completed URL/control updates before their next action.
- Returning from a specimen restored the collection scroll position from 600 px to 600 px in the observed test.
- A cross-route source link focused the sources section at approximately 94 px below the viewport top, clear of the desktop header. Native collection anchors and numbered source citations also passed.
- Timeline shortcut/range keyboard interaction, adjustable comparison, Escape menu handling and menu closure on navigation passed browser checks.
- Reduced-motion emulation disabled route animation. A missing IntersectionObserver left content visible. Blocking illustration requests showed home/archive fallbacks; the phase 1 specimen fallback remains covered by its component tests.
- No page errors, legacy model requests or active 3D canvas were observed. Production output still excludes the old model/viewer assets.

These are local Chrome checks, not a full screen-reader audit, multi-browser compatibility certification or mobile-device performance benchmark. Scroll positions are session-only. The catalog still contains one sourced taxon, and its illustration remains interpretive artwork.

## Delivery checkpoint

Do not create or merge the phase 2 PR until the user has run and reviewed this phase. Apply feedback in focused commits and rerun affected checks. After approval, push this branch, create the PR using the prepared metadata, attach it to the chat, merge with preserved logical commits where repository settings allow, then begin phase 3.
