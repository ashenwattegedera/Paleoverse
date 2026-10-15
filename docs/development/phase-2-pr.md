# Phase 2 PR metadata

Status: prepared for manual review; no phase 2 PR has been opened or merged.

## PR title

feat: add editorial layouts and purposeful motion

## PR description

The home and collection pages still used the original visual system, and archive selections were lost when links were shared or pages reloaded. This change extends the illustration-first specimen design into an editorial field journal and makes navigation and discovery retain context.

- Redesign home, collection and shared navigation with illustrated plates, serif typography, collection-derived counts and source-linked field notes.
- Persist search, diet, period, group and sort in the URL, with default/invalid-value handling and filter history.
- Add a keyboard-operable geological explorer, adjustable scale comparison, restrained section/result/card motion and shared reduced-motion behavior.
- Handle completed-route heading/hash focus, native source anchors, mobile menu Escape behavior and session reading-position restoration.
- Remove superseded page/shell CSS and document the motion system and phase review workflow.

Validation: TypeScript, ESLint, 32 Vitest tests and production build pass. Local Chrome checks cover all routes at desktop and 390/320 px widths, tablet home/collection bounds, filter reload/history, reading-position restoration, native/cross-route anchors, keyboard controls, missing artwork and reduced-motion/no-observer fallbacks. No page errors or model requests were observed.

The catalog remains one sourced taxon; adding a second record is phase 3. Artwork remains an interpretive reconstruction. Browser observations are not a full assistive-technology audit or measured mobile-device performance benchmark.

Builds on [phase 1 PR #1](https://github.com/ashenwattegedera/Paleoverse/pull/1). See `docs/development/phase-2-review.md` for reproducible manual review steps and `docs/design/motion-system.md` for motion conventions.

## Branch and merge strategy

- Head: `codex/phase-2-editorial-motion`.
- Base: `main` (phase 1 merge `3c476a8`).
- Wait for manual review, then create the PR and prefer a merge commit so the logical commits remain visible. Do not squash unless the user requests it or repository settings require it.

## Logical commit messages

- `1781400` — `feat: preserve archive URL state and route navigation context`
- `f624bba` — `feat: redesign the archive as an animated field journal`
- `fix: return focus to search after clearing filters`
- `docs: record phase 2 motion conventions and review metadata`

If a single summary commit message is needed elsewhere, use:

```text
feat: add editorial layouts and purposeful motion

Extend the illustrated field-journal design to home and collection pages.
Preserve URL filters and route context, add interactive time/scale controls,
and share accessible motion conventions across the archive.
```
