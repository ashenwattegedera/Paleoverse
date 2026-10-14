import type { DinosaurProfile } from '../types/dinosaur';

export const tyrannosaurus: DinosaurProfile = {
  id: 'pvr-001',
  slug: 'tyrannosaurus-rex',
  archiveNumber: 'PVR—001',
  commonName: 'Tyrannosaurus rex',
  scientificName: 'Tyrannosaurus rex',
  group: 'Theropoda',
  taxonomy: ['Dinosauria', 'Saurischia', 'Theropoda', 'Tyrannosauroidea', 'Tyrannosauridae'],
  diet: 'Carnivore',
  period: 'Late Cretaceous',
  ageRangeMa: [68, 66],
  range: 'Western North America',
  measurements: {
    length: '≈ 12 m',
    hipHeight: '3.5–4 m',
    mass: '5–7 tonnes',
    note: 'Typical adult estimates; exceptionally large individuals exceeded this range.',
  },
  summary: 'A massive, deep-skulled tyrannosaur from the final two million years of the Cretaceous. Its formidable anatomy is known from a rich fossil record; its colors, soft tissues and exact behavior remain reconstruction.',
  sections: [
    {
      id: 'deep-time', eyebrow: '01 / DEEP TIME', title: 'A predator at the end of an era',
      body: [
        'Tyrannosaurus lived in western North America roughly 68–66 million years ago, among the last non-avian dinosaurs. Its fossils occur in Late Cretaceous deposits across the United States and Canada.',
        'The world it inhabited was warmer than today, with coastal plains, rivers and seasonally changing environments. Flowering plants were widespread, while Triceratops and duck-billed dinosaurs were among the large herbivores in the same ecosystems.',
      ], sources: ['nhm-trex'],
    },
    {
      id: 'anatomy', eyebrow: '02 / FORM & FUNCTION', title: 'Built around a powerful skull',
      body: [
        'The skull could exceed 1.5 metres in length. Robust teeth, some approaching 20 centimetres including the root, were adapted to puncture and crush; fossilized bite traces on bones record forceful feeding, including damage inflicted on other dinosaurs.',
        'Its short forelimbs were proportionally small but not vestigial: each hand carried two functional fingers. Their exact role in life is not settled. A long, muscular tail counterbalanced the large head and trunk over the hind limbs.',
      ], sources: ['nhm-trex'],
    },
    {
      id: 'locomotion', eyebrow: '03 / LOCOMOTION', title: 'A grounded, weight-bearing gait',
      body: [
        'T. rex was an obligate biped. Biomechanical models show that its great mass placed substantial limits on high-speed running; published estimates depend on model assumptions, and the question remains under study. This exhibit does not assign a precise prehistoric speed.',
        'The slow, alternating stance shown in a future rigged reconstruction will be an evidence-informed animation, not a recording of directly observed behavior. The current supplied mesh has no articulated skeleton or animation clip, so this viewer presents it as a static specimen.',
      ], sources: ['sellers-2017', 'hutchinson-2002'],
    },
    {
      id: 'feeding', eyebrow: '04 / FEEDING & SENSES', title: 'A predator, and an opportunistic feeder',
      body: [
        'A tooth crown attributed to T. rex was found embedded in a hadrosaur vertebra surrounded by healed bone. The animal survived the injury, a rare but direct line of evidence for a failed predatory attack. At the same time, many fossil bite traces cannot tell whether an animal was killed or scavenged after death.',
        'The Natural History Museum describes a well-developed olfactory region in the brain and interprets smell as important in locating food. Smell is one part of a sensory system; fossil endocasts do not let us observe how an individual used its senses moment to moment.',
      ], sources: ['predation-2013', 'nhm-trex'],
    },
    {
      id: 'growth', eyebrow: '05 / LIFE HISTORY', title: 'Growth written in bone',
      body: [
        'Thin sections of fossil limb bones preserve cyclical growth marks. One 2020 study identified two half-grown individuals as at least 13 and 15 years old, while also emphasizing variation and limitations in reading age from remodeled bone.',
        'A 2026 analysis of a broader “Tyrannosaurus rex species complex” sample proposed a later size asymptote than earlier growth models. These are model-dependent life-history estimates, not a universal age-at-maturity rule for every animal.',
      ], sources: ['woodward-2020', 'woodward-2026'],
    },
    {
      id: 'discovery', eyebrow: '06 / FIELD RECORD', title: 'A name shaped by discoveries',
      body: [
        'The genus was named by Henry Fairfield Osborn in 1905. Barnum Brown discovered important early skeletons in Wyoming in 1900 and 1902. Tyrannosaurus remains are now known from fossil-bearing Late Cretaceous formations in both the United States and Canada.',
        'The Natural History Museum notes that the earlier name Manospondylus gigas was once applied to material later recognized as belonging to Tyrannosaurus; Tyrannosaurus rex became the established name.',
      ], sources: ['nhm-trex'],
    },
  ],
  anatomy: [
    { name: 'Skull & jaws', detail: 'Deep, reinforced skull; teeth adapted for puncturing and crushing.', evidence: 'well-supported' },
    { name: 'Hind limbs', detail: 'Powerful bipedal limbs support a large body; gait parameters are inferred.', evidence: 'inference' },
    { name: 'Tail', detail: 'Long counterbalance extending behind the hips; its dynamic behavior is reconstructed.', evidence: 'inference' },
    { name: 'Forelimbs', detail: 'Short arms with two fingers. Their function remains uncertain.', evidence: 'debated' },
  ],
  evidenceNotes: [
    { title: 'Locomotor performance', text: 'Biomechanical studies disagree on maximum speed. One stress-constrained analysis argues adult T. rex was limited to walking gaits; no exact speed is presented here as settled fact.', level: 'debated', sources: ['sellers-2017', 'hutchinson-2002'] },
    { title: 'Skin and integument', text: 'Fossil skin impressions in Tyrannosaurus and close relatives preserve scales. Feather coverage on T. rex is not directly established; coloration cannot be read from the fossil record.', level: 'well-supported', sources: ['nhm-trex'] },
    { title: 'Size estimates', text: 'Body size varies across individuals and methods. The range shown summarizes typical adult estimates, rather than describing every specimen.', level: 'inference', sources: ['nhm-trex'] },
  ],
  references: [
    { id: 'nhm-trex', title: 'Tyrannosaurus', author: 'Natural History Museum, London', accessedAt: '2026-10-14', publisher: 'Dino Directory', url: 'https://www.nhm.ac.uk/discover/dino-directory/tyrannosaurus.html', kind: 'museum' },
    { id: 'sellers-2017', title: 'Investigating the running abilities of Tyrannosaurus rex using stress-constrained multibody dynamic analysis', author: 'Sellers, Pond, Brassey, Manning & Bates', year: 2017, publisher: 'PeerJ 5:e3420', url: 'https://doi.org/10.7717/peerj.3420', kind: 'peer-reviewed' },
    { id: 'hutchinson-2002', title: 'Tyrannosaurus was not a fast runner', author: 'Hutchinson & García', year: 2002, publisher: 'Nature 415, 1018–1021', url: 'https://doi.org/10.1038/4151018a', kind: 'peer-reviewed' },
    { id: 'predation-2013', title: 'Physical evidence of predatory behavior in Tyrannosaurus rex', author: 'DePalma, Burnham, Martin, Rothschild & Larson', year: 2013, publisher: 'Proceedings of the National Academy of Sciences', url: 'https://doi.org/10.1073/pnas.1216534110', kind: 'peer-reviewed' },
    { id: 'woodward-2020', title: 'Growing up Tyrannosaurus rex: Osteohistology refutes the pygmy “Nanotyrannus” and supports ontogenetic niche partitioning in juvenile Tyrannosaurus', author: 'Woodward et al.', year: 2020, publisher: 'Science Advances 6(1): eaax6250', url: 'https://doi.org/10.1126/sciadv.aax6250', kind: 'peer-reviewed' },
    { id: 'woodward-2026', title: 'Prolonged growth and extended subadult development in the Tyrannosaurus rex species complex revealed by expanded histological sampling and statistical modeling', author: 'Woodward, Myhrvold & Horner', year: 2026, publisher: 'PeerJ 14:e20469', url: 'https://doi.org/10.7717/peerj.20469', kind: 'peer-reviewed' },
  ],
  model: {
    fbx: '/trex_highpoly/SM_trex_highpoly.fbx',
    baseColor: '/trex_highpoly/trex_basecolor.png',
    normal: '/trex_highpoly/trex_normal.png',
    roughness: '/trex_highpoly/trex_roughness.png',
    metallic: '/trex_highpoly/trex_metallic.png',
    expectedRig: 'static',
    attribution: 'Creator and original source were not provided with the supplied model files.',
    license: 'Unverified — use rights must be established before redistribution.',
  },
};
