import { describe, expect, it } from 'vitest';
import {
  dinosaurs,
  getDinosaurBySlug,
  searchDinosaurs,
  sortDinosaurs,
  validateDinosaurRegistry,
} from './registry';

describe('dinosaur registry', () => {
  it('resolves the specimen detail route from the registry', () => {
    expect(getDinosaurBySlug('tyrannosaurus-rex')?.commonName).toBe('Tyrannosaurus rex');
    expect(getDinosaurBySlug('not-a-specimen')).toBeUndefined();
  });

  it('finds the record by common name, scientific name, and group', () => {
    expect(searchDinosaurs('Tyrannosaurus')).toHaveLength(1);
    expect(searchDinosaurs('rex')[0]?.id).toBe('pvr-001');
    expect(searchDinosaurs('theropoda')[0]?.id).toBe('pvr-001');
    expect(searchDinosaurs('triceratops')).toHaveLength(0);
  });

  it('applies diet and period filters without mutating the registry', () => {
    expect(searchDinosaurs('', 'carnivore', 'late cretaceous')).toHaveLength(1);
    expect(searchDinosaurs('', 'all', 'all', 'theropoda')).toHaveLength(1);
    expect(searchDinosaurs('', 'herbivore')).toHaveLength(0);
    expect(dinosaurs).toHaveLength(1);
  });

  it('validates source relationships and oldest-to-youngest age bounds', () => {
    expect(validateDinosaurRegistry()).toEqual([]);
    expect(validateDinosaurRegistry([dinosaurs[0]!, dinosaurs[0]!])).toContain(
      'Duplicate dinosaur id: pvr-001',
    );
  });

  it('keeps geological dates ordered from older to younger', () => {
    const [oldest, youngest] = dinosaurs[0]!.ageRangeMa;
    expect(oldest).toBeGreaterThan(youngest);
    expect(oldest - youngest).toBe(2);
  });

  it('sorts archive names in both alphabetical directions without mutating input', () => {
    const rex = dinosaurs[0]!;
    const triceratops = {
      ...rex,
      id: 'test-002',
      slug: 'test-triceratops',
      commonName: 'Triceratops',
    };
    const input = [triceratops, rex];
    expect(sortDinosaurs(input).map((record) => record.commonName)).toEqual([
      'Triceratops',
      'Tyrannosaurus rex',
    ]);
    expect(sortDinosaurs(input, 'desc').map((record) => record.commonName)).toEqual([
      'Tyrannosaurus rex',
      'Triceratops',
    ]);
    expect(input[0]).toBe(triceratops);
  });
});

describe('publication validation', () => {
  it('accepts a sourced record without any media or optional measurements', () => {
    expect(
      validateDinosaurRegistry([
        { ...dinosaurs[0]!, media: undefined, measurements: { note: 'Not established.' } },
      ]),
    ).toEqual([]);
  });

  it('rejects non-finite/reversed ages, malformed slugs and duplicate archive codes', () => {
    const rex = dinosaurs[0]!;
    expect(validateDinosaurRegistry([{ ...rex, ageRangeMa: [NaN, -1] }])).toContain(
      `${rex.id} ages must be finite non-negative values`,
    );
    expect(validateDinosaurRegistry([{ ...rex, ageRangeMa: [66, 68] }])).toContain(
      `${rex.id} age range must be oldest to youngest`,
    );
    expect(validateDinosaurRegistry([{ ...rex, slug: 'Bad Slug' }])).toContain(
      `${rex.id} has an invalid URL slug`,
    );
    expect(validateDinosaurRegistry([rex, { ...rex, id: 'other', slug: 'other' }])).toContain(
      `Duplicate archive number: ${rex.archiveNumber}`,
    );
  });

  it('rejects missing citations across measurements, anatomy and geography', () => {
    const rex = dinosaurs[0]!;
    const errors = validateDinosaurRegistry([
      {
        ...rex,
        measurements: {
          length: { displayValue: '12', unit: 'm', typicalValue: 0, sources: ['missing'] },
          note: '',
        },
        anatomy: [{ name: 'Example', detail: 'Example', evidence: 'inference', sources: [] }],
        geography: { description: 'Example', locations: [], sources: ['missing'] },
      },
    ]);
    expect(errors).toContain(`${rex.id} length measurement refers to missing source missing`);
    expect(errors).toContain(`${rex.id} length typical value must be finite and positive`);
    expect(errors).toContain(`${rex.id} anatomy note needs at least one source`);
    expect(errors).toContain(`${rex.id} geography refers to missing source missing`);
  });

  it('rejects ambiguous source/section IDs and incomplete illustration provenance', () => {
    const rex = dinosaurs[0]!;
    const errors = validateDinosaurRegistry([
      {
        ...rex,
        references: [...rex.references, rex.references[0]!],
        sections: [{ ...rex.sections[0]!, id: 'sources' }],
        media: {
          illustration: {
            ...rex.media!.illustration!,
            alt: '',
            creator: '',
            width: 0,
            src: 'https://example.com/image.webp',
          },
        },
      },
    ]);
    expect(errors).toContain(`${rex.id} has duplicate reference nhm-trex`);
    expect(errors).toContain(`${rex.id} has duplicate or reserved section id sources`);
    expect(errors).toContain(`${rex.id} illustration needs descriptive and provenance metadata`);
    expect(errors).toContain(`${rex.id} illustration must use a local /illustrations/ image path`);
    expect(errors).toContain(`${rex.id} illustration needs positive integer dimensions`);
  });
});
