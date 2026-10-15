import { useSearchParams } from 'react-router-dom';
import { dinosaurs } from '../data/registry';
import {
  readArchiveFilters,
  writeArchiveFilters,
  type ArchiveFilters,
} from '../lib/archiveFilters';

export function useArchiveFilters() {
  const [params, setParams] = useSearchParams();
  const filters = readArchiveFilters(params, dinosaurs);
  const updateFilters = (patch: Partial<ArchiveFilters>, replace = false) => {
    setParams((current) => writeArchiveFilters(current, patch), {
      replace,
      preventScrollReset: true,
    });
  };
  const clearFilters = () =>
    updateFilters({ query: '', diet: 'all', period: 'all', group: 'all', sort: 'asc' });
  return { filters, updateFilters, clearFilters };
}
