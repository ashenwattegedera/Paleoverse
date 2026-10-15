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

export interface Measurement {
  displayValue: string;
  unit: 'm' | 't';
  /** Representative value in the declared unit, used only for schematic comparisons. */
  typicalValue?: number;
  sources: string[];
}

export interface SpecimenIllustration {
  src: string;
  alt: string;
  width: number;
  height: number;
  creator: string;
  source: string;
  rights: string;
  attribution: string;
  reconstructionNote: string;
  generation?: { tool: string; date: string; prompt: string };
}

export interface ModelAsset {
  format: 'fbx';
  fbx: string;
  baseColor: string;
  normal: string;
  roughness: string;
  metallic: string;
  expectedRig: 'static' | 'biped' | 'quadruped';
  attribution: string;
  license: string;
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
  geography?: { description: string; locations: string[]; sources: string[] };
  measurements: {
    length?: Measurement;
    hipHeight?: Measurement;
    mass?: Measurement;
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
  anatomy: { name: string; detail: string; evidence: EvidenceLevel; sources: string[] }[];
  evidenceNotes: EvidenceNote[];
  references: ScientificReference[];
  media?: { illustration?: SpecimenIllustration; model?: ModelAsset };
}
