import { tyrannosaurus } from './tyrannosaurus';
import type { DinosaurProfile } from '../types/dinosaur';

export const dinosaurs: DinosaurProfile[] = [tyrannosaurus];

export function getDinosaurBySlug(slug: string): DinosaurProfile | undefined {
  return dinosaurs.find((dinosaur) => dinosaur.slug === slug);
}

export function sortDinosaurs(
  records: DinosaurProfile[],
  direction: 'asc' | 'desc' = 'asc',
): DinosaurProfile[] {
  const multiplier = direction === 'asc' ? 1 : -1;
  return [...records].sort(
    (left, right) => left.commonName.localeCompare(right.commonName) * multiplier,
  );
}

export function searchDinosaurs(
  query: string,
  diet = 'all',
  period = 'all',
  group = 'all',
  direction: 'asc' | 'desc' = 'asc',
): DinosaurProfile[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = dinosaurs.filter((dinosaur) => {
    const searchable =
      `${dinosaur.commonName} ${dinosaur.scientificName} ${dinosaur.group}`.toLocaleLowerCase();
    return (
      searchable.includes(normalizedQuery) &&
      (diet === 'all' || dinosaur.diet.toLocaleLowerCase() === diet.toLocaleLowerCase()) &&
      (period === 'all' || dinosaur.period.toLocaleLowerCase() === period.toLocaleLowerCase()) &&
      (group === 'all' || dinosaur.group.toLocaleLowerCase() === group.toLocaleLowerCase())
    );
  });
  return sortDinosaurs(matches, direction);
}

/** Validate authored records before publication; no network requests are made here. */
export function validateDinosaurRegistry(records: DinosaurProfile[] = dinosaurs): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const archiveNumbers = new Set<string>();
  for (const record of records) {
    if (ids.has(record.id)) errors.push(`Duplicate dinosaur id: ${record.id}`);
    if (slugs.has(record.slug)) errors.push(`Duplicate dinosaur slug: ${record.slug}`);
    if (archiveNumbers.has(record.archiveNumber))
      errors.push(`Duplicate archive number: ${record.archiveNumber}`);
    ids.add(record.id);
    slugs.add(record.slug);
    archiveNumbers.add(record.archiveNumber);
    if (
      ![
        record.id,
        record.archiveNumber,
        record.commonName,
        record.scientificName,
        record.group,
        record.diet,
        record.period,
        record.range,
        record.summary,
      ].every((value) => value.trim())
    ) {
      errors.push(`${record.id} is missing required identity or context`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug))
      errors.push(`${record.id} has an invalid URL slug`);
    if (!record.ageRangeMa.every((age) => Number.isFinite(age) && age >= 0))
      errors.push(`${record.id} ages must be finite non-negative values`);
    if (record.ageRangeMa[0] < record.ageRangeMa[1])
      errors.push(`${record.id} age range must be oldest to youngest`);

    const referenceIds = new Set<string>();
    for (const reference of record.references) {
      if (referenceIds.has(reference.id))
        errors.push(`${record.id} has duplicate reference ${reference.id}`);
      referenceIds.add(reference.id);
      if (!/^https?:\/\//.test(reference.url))
        errors.push(`${record.id} source ${reference.id} needs an HTTP(S) URL`);
    }
    const checkSources = (sources: string[], context: string) => {
      if (!sources.length) errors.push(`${record.id} ${context} needs at least one source`);
      for (const sourceId of sources) {
        if (!referenceIds.has(sourceId))
          errors.push(`${record.id} ${context} refers to missing source ${sourceId}`);
      }
    };
    const sectionIds = new Set(['geological-context', 'evidence', 'sources']);
    for (const section of record.sections) {
      if (sectionIds.has(section.id))
        errors.push(`${record.id} has duplicate or reserved section id ${section.id}`);
      sectionIds.add(section.id);
      checkSources(section.sources, 'section');
    }
    record.evidenceNotes.forEach((note) => checkSources(note.sources, 'evidence note'));
    record.anatomy.forEach((part) => checkSources(part.sources, 'anatomy note'));
    if (record.geography) checkSources(record.geography.sources, 'geography');
    for (const [key, measurement] of Object.entries(record.measurements)) {
      if (typeof measurement === 'string' || !measurement) continue;
      if (!measurement.displayValue.trim())
        errors.push(`${record.id} ${key} needs a display value`);
      if (
        measurement.typicalValue !== undefined &&
        (!Number.isFinite(measurement.typicalValue) || measurement.typicalValue <= 0)
      ) {
        errors.push(`${record.id} ${key} typical value must be finite and positive`);
      }
      if (measurement.unit !== (key === 'mass' ? 't' : 'm'))
        errors.push(`${record.id} ${key} uses the wrong unit`);
      checkSources(measurement.sources, `${key} measurement`);
    }
    const illustration = record.media?.illustration;
    if (illustration) {
      if (
        ![
          illustration.alt,
          illustration.creator,
          illustration.source,
          illustration.rights,
          illustration.attribution,
          illustration.reconstructionNote,
        ].every((value) => value.trim())
      ) {
        errors.push(`${record.id} illustration needs descriptive and provenance metadata`);
      }
      if (
        !/^\/illustrations\/[^?#]+\.(?:webp|png|jpe?g|avif)$/.test(illustration.src) ||
        illustration.src.includes('..')
      ) {
        errors.push(`${record.id} illustration must use a local /illustrations/ image path`);
      }
      if (
        ![illustration.width, illustration.height].every(
          (value) => Number.isInteger(value) && value > 0,
        )
      )
        errors.push(`${record.id} illustration needs positive integer dimensions`);
      if (
        illustration.generation &&
        ![
          illustration.generation.tool,
          illustration.generation.date,
          illustration.generation.prompt,
        ].every((value) => value.trim())
      ) {
        errors.push(`${record.id} generated illustration needs generation provenance`);
      }
    }
    const model = record.media?.model;
    if (
      model &&
      ![
        model.fbx,
        model.baseColor,
        model.normal,
        model.roughness,
        model.metallic,
        model.attribution,
        model.license,
      ].every((value) => value.trim())
    ) {
      errors.push(`${record.id} optional model needs complete asset and provenance metadata`);
    }
  }
  return errors;
}
