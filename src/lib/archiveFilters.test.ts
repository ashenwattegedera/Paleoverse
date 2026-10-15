import { describe, expect, it } from 'vitest';
import { tyrannosaurus } from '../data/tyrannosaurus';
import { readArchiveFilters, writeArchiveFilters } from './archiveFilters';

describe('archive URL state', () => {
  it('restores every supported filter and preserves spaces in a search being typed', () => {
    const filters = readArchiveFilters(
      new URLSearchParams(
        'q=Tyrannosaurus+&diet=Carnivore&period=late+cretaceous&group=theropoda&sort=desc',
      ),
      [tyrannosaurus],
    );
    expect(filters).toEqual({
      query: 'Tyrannosaurus ',
      diet: 'carnivore',
      period: 'late cretaceous',
      group: 'theropoda',
      sort: 'desc',
    });
  });
  it('falls back for invalid categories and sorts without losing the search', () => {
    expect(
      readArchiveFilters(
        new URLSearchParams('q=rex&diet=unknown&period=unknown&group=unknown&sort=bad'),
        [tyrannosaurus],
      ),
    ).toEqual({ query: 'rex', diet: 'all', period: 'all', group: 'all', sort: 'asc' });
  });
  it('writes updates without mutating the input or erasing unrelated parameters', () => {
    const input = new URLSearchParams('q=old&sort=desc&ref=field-notes');
    expect(
      writeArchiveFilters(input, { query: 'rex ', sort: 'asc', diet: 'carnivore' }).toString(),
    ).toBe('q=rex+&ref=field-notes&diet=carnivore');
    expect(input.get('q')).toBe('old');
  });
});
