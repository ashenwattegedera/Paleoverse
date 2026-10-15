import type { DinosaurProfile } from '../types/dinosaur';

/** Genus-level synthesis; approximate estimates are not measurements of one specimen. */
export const triceratops: DinosaurProfile = {
  id: 'pvr-002',
  slug: 'triceratops',
  archiveNumber: 'PVR—002',
  commonName: 'Triceratops',
  scientificName: 'Triceratops',
  group: 'Ceratopsia',
  taxonomy: ['Dinosauria', 'Ornithischia', 'Ceratopsia', 'Ceratopsidae', 'Chasmosaurinae'],
  diet: 'Herbivore',
  period: 'Late Cretaceous',
  ageRangeMa: [68, 66],
  range: 'North America',
  geography: {
    description:
      'Fossils are listed from the United States. Individual fossil localities are not plotted.',
    locations: ['United States'],
    sources: ['nhm-triceratops'],
  },
  measurements: {
    length: { displayValue: '≈ 9', unit: 'm', typicalValue: 9, sources: ['nhm-triceratops'] },
    mass: { displayValue: '≈ 10', unit: 't', sources: ['nhm-triceratops'] },
    note: 'Approximate museum summary estimates; individuals varied. No hip-height value is supplied.',
  },
  summary:
    'A three-horned herbivore from the latest Cretaceous. This genus-level record explores growth and interpretations of horn use.',
  sections: [
    {
      id: 'deep-time',
      eyebrow: '01 / DEEP TIME',
      title: 'Another life at the end of the Cretaceous',
      body: [
        'Recorded roughly 68–66 million years ago. This is a genus-level profile, not a museum specimen.',
      ],
      sources: ['nhm-triceratops'],
    },
    {
      id: 'feeding',
      eyebrow: '02 / FEEDING',
      title: 'A beak, and a battery of teeth',
      body: [
        'A beak cropped vegetation; teeth farther back formed shearing surfaces. Feeding anatomy supports a plant-eating diet without revealing every food an individual consumed.',
      ],
      sources: ['nhm-triceratops'],
    },
    {
      id: 'locomotion',
      eyebrow: '03 / LOCOMOTION',
      title: 'Supported on four limbs',
      body: [
        'Triceratops moved on four legs. The illustration is a reconstructed pose, not evidence for an exact gait or speed.',
      ],
      sources: ['nhm-triceratops'],
    },
    {
      id: 'horns-and-frill',
      eyebrow: '04 / FORM & FUNCTION',
      title: 'What a damaged frill can tell us',
      body: [
        'A 2009 study compared skull injuries in Triceratops and Centrosaurus. Differences in the distribution of lesions were consistent with horn-to-horn combat in Triceratops and a protective role for its frill.',
        'That is a population-level interpretation. The authors did not identify the precise cause of every injury, and display and combat need not have been mutually exclusive functions.',
      ],
      sources: ['farke-2009'],
    },
    {
      id: 'growth',
      eyebrow: '05 / GROWTH',
      title: 'A skull that changed with age',
      body: [
        'Horner and Goodwin studied a growth series of ten skulls. Horn orientation and the frill margin changed across the proposed growth stages; an adult silhouette cannot stand in for every age.',
        'Their suggestion that these changes conveyed maturity is a behavioral hypothesis. The preserved differences in bone and their proposed social meaning are separate kinds of claim.',
      ],
      sources: ['horner-goodwin-2006'],
    },
  ],
  anatomy: [
    {
      name: 'Brow horns',
      detail: 'Two prominent brow horns; orientation changed during growth.',
      evidence: 'well-supported',
      sources: ['horner-goodwin-2006'],
    },
    {
      name: 'Frill',
      detail: 'Skull ornament with possible protective and display functions.',
      evidence: 'inference',
      sources: ['farke-2009'],
    },
    {
      name: 'Beak & teeth',
      detail: 'A cropping beak and shearing teeth for plant material.',
      evidence: 'well-supported',
      sources: ['nhm-triceratops'],
    },
    {
      name: 'Limbs',
      detail: 'Four-limbed support, rather than bipedal locomotion.',
      evidence: 'well-supported',
      sources: ['nhm-triceratops'],
    },
  ],
  evidenceNotes: [
    {
      title: 'Horn use',
      text: 'Patterns of skull injury support combat as one interpretation. They do not reconstruct a particular encounter or establish one function for every horn and frill.',
      level: 'inference',
      sources: ['farke-2009'],
    },
    {
      title: 'Growth and recognition',
      text: 'Changing skull form is preserved; signaling maturity is a hypothesis about how those forms were used.',
      level: 'inference',
      sources: ['horner-goodwin-2006'],
    },
    {
      title: 'Skin and appearance',
      text: 'Skin impressions preserve scales. The plate’s coloration remains artistic interpretation.',
      level: 'well-supported',
      sources: ['nhm-triceratops'],
    },
  ],
  references: [
    {
      id: 'nhm-triceratops',
      title: 'Triceratops',
      author: 'Natural History Museum, London',
      accessedAt: '2026-10-15',
      publisher: 'Dino Directory',
      url: 'https://www.nhm.ac.uk/discover/dino-directory/triceratops.html',
      kind: 'museum',
    },
    {
      id: 'farke-2009',
      title: 'Evidence of Combat in Triceratops',
      author: 'Farke, Wolff & Tanke',
      year: 2009,
      publisher: 'PLOS ONE 4(1): e4252',
      url: 'https://doi.org/10.1371/journal.pone.0004252',
      kind: 'peer-reviewed',
    },
    {
      id: 'horner-goodwin-2006',
      title: 'Major cranial changes during Triceratops ontogeny',
      author: 'Horner & Goodwin',
      year: 2006,
      publisher: 'Proceedings of the Royal Society B 273: 2757–2761',
      url: 'https://doi.org/10.1098/rspb.2006.3643',
      kind: 'peer-reviewed',
    },
  ],
  media: {
    illustration: {
      src: '/illustrations/triceratops.webp',
      alt: 'Interpretive side view of an adult Triceratops with two long brow horns, a shorter nose horn, a rounded frill and four weight-bearing limbs.',
      width: 1536,
      height: 1024,
      creator: 'OpenAI image generation, art direction by PALEOVERSE',
      source: 'Generated for PALEOVERSE on 2026-10-15.',
      rights:
        'AI-generated project artwork; no exclusive ownership or scientific verification is asserted. Excluded from the source-code MIT license.',
      attribution: 'PALEOVERSE / AI-assisted reconstruction',
      reconstructionNote:
        'An artistic genus-level reconstruction. Coloration, soft tissues and pose are interpretive; this plate is not a verified anatomical diagram or a measured scale reference.',
      generation: {
        tool: 'OpenAI built-in image_gen',
        date: '2026-10-15',
        prompt: 'docs/assets/illustration-prompts.md#triceratops',
      },
    },
  },
};
