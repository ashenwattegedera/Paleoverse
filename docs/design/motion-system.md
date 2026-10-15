# Editorial motion system

Phase 2 uses native CSS and IntersectionObserver. No animation dependency has been added. Motion communicates entry, a changed selection, or an available action; it does not gate reading or navigation.

## Shared tokens

Defined in `src/styles/editorial.css` and consumed by the specimen styles as well:

| Token              | Value                          | Purpose                                                   |
| ------------------ | ------------------------------ | --------------------------------------------------------- |
| `--motion-fast`    | 160 ms                         | Control and link feedback                                 |
| `--motion-state`   | 280 ms                         | Results, route arrival, timeline marker and scale updates |
| `--motion-enter`   | 650 ms                         | Illustration/card response and section entrances          |
| `--ease-editorial` | `cubic-bezier(.22, 1, .36, 1)` | Settle entrances without a spring or bounce               |

Hero copy uses a brief stagger capped at 140 ms. These entrances begin at partial opacity, so content remains present and usable throughout. Route transitions do not wait for an exit animation.

## Behaviors and boundaries

- `Reveal` observes a visible section once, adds its entrance class and disconnects. Missing IntersectionObserver leaves the normal visible layout intact. Focus inside a section prevents it from starting an entrance around the active control.
- Home hero copy enters in a small sequence; field-note/collection/timeline sections reveal as they enter the viewport.
- Card art and link arrows respond to hover/focus without carrying unique information in hover state.
- Archive results get a short arrival transition. Search/select controls remain mounted, preserving input focus. The result count has a polite live announcement.
- The geological explorer updates its displayed age, accessible slider value, period and matching catalog records. Period buttons jump to representative points. Colored period bands use approximate display boundaries; empty results mean the collection has no published entry at that point.
- The specimen comparison adjusts an illustrative human reference height. Recorded dinosaur estimates are not mutated. Bar widths are the one intentional small layout animation inside a fixed comparison area.
- Native scrolling is retained. There are no scroll locks, continuous ambient loops, cursor trails or artificial loading delays.

## Reduced motion and accessibility

The shared reduced-motion media query removes all decorative animation/transitions and smooth scrolling. Changes in state and all scientific text remain available. Timeline and comparison controls are native range inputs; period shortcuts are buttons with selected state. Links and menu controls have visible keyboard focus.

`RouteFrame` sits inside Suspense so it handles completed route content. It focuses the new heading or hash target, preserves input focus on query-only changes, and restores session reading positions on back/forward. Native hash targets use document scroll padding once, avoiding a duplicated sticky-header offset. Restoration is bounded to 80 history keys and is not persisted across a full reload.

Full assistive-technology testing and mobile hardware profiling are part of the later quality phase. Current viewport observations and manual review steps are recorded in `../development/phase-2-review.md`.
