# Phase 3 PR metadata

Status: ready for manual review; no phase 3 PR has been opened or merged.

## PR title

feat: add Triceratops and related specimen discovery

## PR description

The archive contained only one taxon, so its reusable record and discovery features had not been exercised with a contrasting dinosaur. This change adds a separately sourced genus-level Triceratops record through the existing registry and specimen template, without introducing a model dependency or copying a page.

- Add PVR—002 with its own museum/research references, estimates, field notes, evidence labels and generated illustration provenance. Omit the unestablished hip-height value.
- Support single-word scientific names in the shared record heading.
- Surface both published records automatically in collection cards, search/filter/sort, counts, home ledger and geological exploration.
- Add related-record links explained by shared group/period attributes; exclude the current record and unrelated/absent entries, rank deterministically and cap suggestions at three.
- Verify the real two-record collection and document scientific sourcing, artwork review limits and the phase checkpoint.

Validation: TypeScript, ESLint, 39 Vitest tests and production build pass. Local Chrome checks cover all four routes at desktop and 390/320 px widths, both sort directions, herbivore/group filters, incompatible selections, URL reload, source anchors, timeline results, related-link navigation, missing artwork and reduced motion. No overflow, page errors or model requests were observed.

Content is a genus-level synthesis, not a species diagnosis or individual specimen measurement. The generated illustration remains interpretive; source-access and anatomical-review limits are recorded in the documentation. Full browser/accessibility/mobile-device audits remain phase 4 work.

Builds on [phase 2 PR #2](https://github.com/ashenwattegedera/Paleoverse/pull/2). See `docs/development/phase-3-review.md`, `docs/content/scientific-sources.md` and `docs/assets/illustration-prompts.md#triceratops` for review steps and provenance.

## Branch and merge strategy

- Head: `codex/phase-3-triceratops`.
- Base: `main`, phase 2 merge `b6a7ce0`.
- Wait for the user's manual review, then open the PR. Prefer a merge commit to preserve the logical commits.

## Logical commit messages

- `45fbc5b` — `feat: add a sourced Triceratops catalog record`
- `0266a28` — `feat: connect specimen records through shared catalog attributes`
- `docs: record phase 3 expansion review and PR metadata`

Single summary message, if needed elsewhere:

```text
feat: add Triceratops and related specimen discovery

Publish a sourced genus-level record through the shared illustrated template.
Exercise two-record discovery and explain related links with shared catalog
attributes while preserving scientific and artwork provenance.
```
