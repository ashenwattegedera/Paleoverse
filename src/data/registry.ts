import { tyrannosaurus } from './tyrannosaurus';
import type { DinosaurProfile } from '../types/dinosaur';

export const dinosaurs: DinosaurProfile[] = [tyrannosaurus];

export function getDinosaurBySlug(slug: string): DinosaurProfile | undefined {
  return dinosaurs.find((dinosaur) => dinosaur.slug === slug);
}

export function searchDinosaurs(query: string, diet = 'all', period = 'all', group = 'all'): DinosaurProfile[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return dinosaurs.filter((dinosaur) => {
    const searchable = `${dinosaur.commonName} ${dinosaur.scientificName} ${dinosaur.group}`.toLocaleLowerCase();
    return searchable.includes(normalizedQuery)
      && (diet === 'all' || dinosaur.diet.toLocaleLowerCase() === diet.toLocaleLowerCase())
      && (period === 'all' || dinosaur.period.toLocaleLowerCase() === period.toLocaleLowerCase())
      && (group === 'all' || dinosaur.group.toLocaleLowerCase() === group.toLocaleLowerCase());
  });
}

export function validateDinosaurRegistry(records: DinosaurProfile[] = dinosaurs): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const record of records) {
    if (ids.has(record.id)) errors.push(`Duplicate dinosaur id: ${record.id}`);
    if (slugs.has(record.slug)) errors.push(`Duplicate dinosaur slug: ${record.slug}`);
    ids.add(record.id);
    slugs.add(record.slug);
    if (!record.commonName || !record.scientificName) errors.push(`${record.id} is missing a name`);
    if (record.ageRangeMa[0] < record.ageRangeMa[1]) errors.push(`${record.id} age range must be oldest to youngest`);
    for (const referenceId of record.sections.flatMap((section) => section.sources)) {
      if (!record.references.some((reference) => reference.id === referenceId)) errors.push(`${record.id} refers to missing source ${referenceId}`);
    }
    for (const note of record.evidenceNotes) {
      for (const sourceId of note.sources) {
        if (!record.references.some((reference) => reference.id === sourceId)) errors.push(`${record.id} evidence note refers to missing source ${sourceId}`);
      }
    }
  }
  return errors;
}
