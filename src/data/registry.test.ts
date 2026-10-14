import { describe, expect, it } from 'vitest';
import { dinosaurs, getDinosaurBySlug, searchDinosaurs, sortDinosaurs, validateDinosaurRegistry } from './registry';

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
    expect(validateDinosaurRegistry([dinosaurs[0]!, dinosaurs[0]!])).toContain('Duplicate dinosaur id: pvr-001');
  });

  it('keeps geological dates ordered from older to younger', () => {
    const [oldest, youngest] = dinosaurs[0]!.ageRangeMa;
    expect(oldest).toBeGreaterThan(youngest);
    expect(oldest - youngest).toBe(2);
  });

  it('sorts archive names in both alphabetical directions without mutating input', () => {
    const rex = dinosaurs[0]!;
    const triceratops = { ...rex, id: 'test-002', slug: 'test-triceratops', commonName: 'Triceratops' };
    const input = [triceratops, rex];
    expect(sortDinosaurs(input).map((record) => record.commonName)).toEqual(['Triceratops', 'Tyrannosaurus rex']);
    expect(sortDinosaurs(input, 'desc').map((record) => record.commonName)).toEqual(['Tyrannosaurus rex', 'Triceratops']);
    expect(input[0]).toBe(triceratops);
  });
});
