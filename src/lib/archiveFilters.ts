import type { DinosaurProfile } from '../types/dinosaur';

export interface ArchiveFilters {
  query: string;
  diet: string;
  period: string;
  group: string;
  sort: 'asc' | 'desc';
}

const filterKeys = {
  query: 'q',
  diet: 'diet',
  period: 'period',
  group: 'group',
  sort: 'sort',
} as const;

/** Unknown values cannot leave a controlled select in a state the user cannot inspect. */
export function readArchiveFilters(
  params: URLSearchParams,
  records: DinosaurProfile[],
): ArchiveFilters {
  const readCategory = (key: 'diet' | 'period' | 'group') => {
    const value = params.get(key)?.toLowerCase() ?? 'all';
    return records.some((record) => record[key].toLowerCase() === value) ? value : 'all';
  };
  return {
    query: params.get('q') ?? '',
    diet: readCategory('diet'),
    period: readCategory('period'),
    group: readCategory('group'),
    sort: params.get('sort') === 'desc' ? 'desc' : 'asc',
  };
}

/** Preserve unrelated URL parameters and omit defaults to keep shareable links concise. */
export function writeArchiveFilters(
  params: URLSearchParams,
  patch: Partial<ArchiveFilters>,
): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const key of Object.keys(patch) as (keyof ArchiveFilters)[]) {
    const value = patch[key];
    if (value === undefined) continue;
    const isDefault =
      key === 'query' ? value === '' : key === 'sort' ? value === 'asc' : value === 'all';
    if (isDefault) next.delete(filterKeys[key]);
    else next.set(filterKeys[key], value);
  }
  return next;
}
