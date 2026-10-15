# Scientific content and source policy

## Source selection

Prefer peer-reviewed original research for biomechanical interpretations and recognized museums or scientific collections for identification, naming, fossil discovery, broad range and educational summaries. Use stable DOI links when available and institutional pages for museum records. Secondary summaries are identified as such; a museum statement is not silently recast as a consensus paper.

## Claim handling

- Connect a major content section or uncertainty note to source IDs in the dinosaur record.
- Keep publication year distinct from access date. Do not invent authors, dates, specimen IDs or discovery locations.
- Use ranges and explanatory notes when body dimensions/mass depend on individual specimen or method.
- Distinguish preserved anatomy from functional inference and active debate.
- Avoid claims about exact appearance, color, maximum speed, sociality, hunting strategy or soft tissue where fossil evidence cannot establish them.
- Use broad fossil-region summaries where exact quarry coordinates are unavailable or inappropriate.
- Treat reconstructions as interpretations; revise records as evidence changes.

## Current T. rex sources

1. Natural History Museum, London, Dino Directory: [Tyrannosaurus](https://www.nhm.ac.uk/discover/dino-directory/tyrannosaurus.html), accessed 2026-10-14. Summary consulted for age (68–66 Ma), common size estimates, taxonomy, naming/discovery context, range and preserved integument discussion.
2. Sellers, W. I., S. B. Pond, C. A. Brassey, P. L. Manning & K. T. Bates (2017), “Investigating the running abilities of _Tyrannosaurus rex_ using stress-constrained multibody dynamic analysis,” _PeerJ_ 5:e3420. [doi:10.7717/peerj.3420](https://doi.org/10.7717/peerj.3420). One published analysis argues adult T. rex was limited to walking gaits; this is a result from a model, not a definitive direct observation.
3. Hutchinson, J. R. & M. García (2002), “_Tyrannosaurus_ was not a fast runner,” _Nature_ 415, 1018–1021. [doi:10.1038/4151018a](https://doi.org/10.1038/4151018a). A biomechanical study contributing to debate over giant theropod running ability.
4. DePalma, R. A. et al. (2013), “Physical evidence of predatory behavior in _Tyrannosaurus rex_,” _PNAS_ 110(31): 12560–12564. [doi:10.1073/pnas.1216534110](https://doi.org/10.1073/pnas.1216534110). Reports a T. rex tooth embedded in a healed hadrosaur vertebra; the paper interprets this as evidence of a failed attack.
5. Woodward, H. N. et al. (2020), “Growing up _Tyrannosaurus rex_…,” _Science Advances_ 6(1): eaax6250. [doi:10.1126/sciadv.aax6250](https://doi.org/10.1126/sciadv.aax6250). Bone histology of two half-grown specimens; ages are minimum estimates and the study discusses variation and sampling limitations.
6. Woodward, H. N., N. Myhrvold & J. R. Horner (2026), “Prolonged growth and extended subadult development in the _Tyrannosaurus rex_ species complex revealed by expanded histological sampling and statistical modeling,” _PeerJ_ 14:e20469. [doi:10.7717/peerj.20469](https://doi.org/10.7717/peerj.20469). A newer model that identifies its sample as a species complex and proposes a longer growth trajectory; its result is model-dependent and should not be treated as settled for every specimen.

The web pages and papers above were opened during implementation to verify the referenced details and working target URLs. Review source records and evidence notes periodically; changed content should be recorded in the changelog. Research interpretations are not immutable.

## Triceratops source register — phase 3

This is a genus-level record, rather than a species diagnosis or accessioned specimen. Claims use these source IDs in `src/data/triceratops.ts`:

| ID                    | Reference                                                                                                                                                              | Scope used                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `nhm-triceratops`     | [Natural History Museum: Triceratops](https://www.nhm.ac.uk/discover/dino-directory/triceratops.html), accessed 2026-10-15                                             | Identification, approximate estimates, feeding, movement and broad range.      |
| `farke-2009`          | Farke, Wolff & Tanke (2009), [Evidence of Combat in Triceratops](https://doi.org/10.1371/journal.pone.0004252), PLOS ONE 4(1):e4252                                    | Population-level injury interpretation; no particular encounter reconstructed. |
| `horner-goodwin-2006` | Horner & Goodwin (2006), [Major cranial changes during Triceratops ontogeny](https://doi.org/10.1098/rspb.2006.3643), Proceedings of the Royal Society B 273:2757–2761 | Growth-stage morphology distinguished from behavioral hypothesis.              |

The museum profile and PLOS article were opened and inspected. Growth-paper metadata and abstract were reviewed from the indexed primary PMC record, [PMC1635501](https://pmc.ncbi.nlm.nih.gov/articles/PMC1635501/); direct PMC/PubMed opening returned a browser challenge/minimal response during this run, so no claim of a full-text review is made. Only abstract-supported conclusions are used from that paper. A Berkeley page timed out and a Smithsonian page returned 403; neither is included as a record source.

The illustration is separately generated artwork; none of the scientific references licenses or verifies it. Its source and review limits are recorded in `docs/assets/illustration-prompts.md`. An omitted hip-height value is intentional rather than an invitation to infer one from artwork.
