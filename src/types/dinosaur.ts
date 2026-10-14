export type EvidenceLevel = 'well-supported' | 'inference' | 'debated';

export interface ScientificReference {
  id: string;
  title: string;
  author: string;
  year?: number;
  accessedAt?: string;
  publisher: string;
  url: string;
  kind: 'museum' | 'peer-reviewed' | 'database';
}

export interface EvidenceNote {
  title: string;
  text: string;
  level: EvidenceLevel;
  sources: string[];
}

export interface DinosaurProfile {
  id: string;
  slug: string;
  archiveNumber: string;
  commonName: string;
  scientificName: string;
  group: string;
  taxonomy: string[];
  diet: string;
  period: string;
  ageRangeMa: [number, number];
  range: string;
  measurements: {
    length: string;
    hipHeight: string;
    mass: string;
    note: string;
  };
  summary: string;
  sections: {
    id: string;
    eyebrow: string;
    title: string;
    body: string[];
    sources: string[];
  }[];
  anatomy: { name: string; detail: string; evidence: EvidenceLevel }[];
  evidenceNotes: EvidenceNote[];
  references: ScientificReference[];
  model: {
    fbx: string;
    baseColor: string;
    normal: string;
    roughness: string;
    metallic: string;
    expectedRig: 'static' | 'biped' | 'quadruped';
    attribution: string;
    license: string;
  };
}
