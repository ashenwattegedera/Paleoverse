# Phase 3: a second sourced dinosaur

Status: implemented and committed locally; awaiting the user's manual review before PR creation and merge.

- Branch: `codex/phase-3-triceratops`.
- Base: `b6a7ce0`, the merge of [phase 2 PR #2](https://github.com/ashenwattegedera/Paleoverse/pull/2).
- PR title/body and commit messages: [phase 3 PR metadata](phase-3-pr.md).

## Delivered

- A separately researched genus-level Triceratops profile, PVR—002, with its own references, estimates, anatomy, field notes, evidence labels and illustration provenance.
- A generated 1536×1024 WebP illustration, 166,886 bytes, in the same editorial family as the existing artwork. The reconstruction remains interpretive and has not received specialist anatomical review.
- The existing detail template renders this record without a copied page, model files or taxon-name layout conditions. Single-word scientific names no longer introduce an empty heading line.
- Hip height is omitted because no estimate was selected from the cited sources. Existing optional-measurement logic displays the two available estimates.
- Home counts/ledger, collection cards, filters/sort and the geological explorer pick up the registered record automatically.
- Related-record discovery uses explicit shared group/period attributes, with group weighted ahead of period, alphabetical ties and a maximum of three results. The current record and unrelated records are excluded. A one-record/no-match catalog yields no related section.
- Source, artwork and extension documentation updated alongside tests of the real two-record collection.

## Run and inspect

```sh
npm run dev
```

Use the URL printed by Vite, normally `http://localhost:5173`.

1. Open `/archive`. Both Triceratops and Tyrannosaurus rex should appear. Check the two-card desktop layout and stacked phone cards.
2. Select Herbivore or Ceratopsia: Triceratops should remain. Select Carnivore or Theropoda: the T. rex record should remain. Combine incompatible filters to check the empty state, then clear them.
3. Switch A–Z/Z–A and search for either name. Reload a filtered URL and confirm it restores the same selection.
4. Open `/specimens/triceratops`. Inspect the genus heading, illustration, optional measurements, quadrupedal note, growth/horn-use interpretation labels, citations and media provenance. No T. rex measurements or hip-height value should carry over.
5. Scroll to “Follow another thread.” Open T. rex and follow the related link back. The stated relationship is a shared catalog period, not a claim of a documented encounter.
6. On `/`, confirm the ledger/count now reflect two records. At the selected interval represented by both records, the geological explorer should list both; other points can have no published entries.
7. Check widths around 390 px and 320 px. Test keyboard links, a source citation, reduced motion and the comparison control.
8. Optionally block `*/illustrations/triceratops.webp` in browser developer tools, then reload. The complete written record should remain alongside its fallback plate.

Review the content scope, artwork/style consistency, two-card collection, measurement presentation and related-record navigation before the phase PR is opened. Sources and review limits are in `../content/scientific-sources.md` and `../assets/illustration-prompts.md#triceratops`.

## Verification performed

- TypeScript checking, ESLint, all 39 Vitest tests and the production build passed.
- Registry checks validate both real records and their source/media relationships. Tests cover herbivore/group separation, actual alphabetical order, incompatible filters/clear, matching timeline entries, genus heading, optional measurements, source anchors and related-record exclusions/ranking.
- Chrome checked home, collection and both specimen routes at 1440×1000, 390×844 and 320×844. No horizontal document overflow or out-of-bounds main descendants were found.
- Browser checks passed for two-record sorting, compatible/incompatible filters, shared-URL reload, clear-to-search focus, search-to-detail navigation, and related links in both directions.
- Both records appeared in the geological explorer at their registered interval. Period navigation and range-keyboard interaction updated results correctly.
- Triceratops source anchors resolved, its heading had no empty line, and its record used its own two estimates.
- Blocking its illustration request produced the fallback without losing field notes. Reduced motion disabled the plate entrance.
- No page errors or legacy model requests were observed. Build output contains the two optimized illustrations and no model/viewer assets.
- Desktop/phone viewport screenshots of the new record and the collection were inspected, with additional gallery, measurement-strip and related-record captures.

Limits: these are local Chrome checks rather than a multi-browser, assistive-technology or physical mobile-device performance audit. Triceratops is a genus-level synthesis, its estimates are a cited museum summary, and artwork is not verified anatomical evidence. Growth-paper use is limited to its reviewed indexed abstract/metadata; the source register records access limitations. Phase 4 remains the final quality/delivery pass.

## Checkpoint

After manual approval, push this branch and open its PR against `main` using the prepared metadata. Attach the PR to the chat, preserve its logical commits on merge where settings allow, verify the merged state, and only then begin phase 4. No phase 3 PR or merge has been performed before this review.
