import type { ScientificReference } from '../types/dinosaur';

export function SourceLinks({
  sources,
  references,
}: {
  sources: string[];
  references: ScientificReference[];
}) {
  if (!sources.length) return null;
  return (
    <div className="inline-citations">
      SOURCE{sources.length === 1 ? '' : 'S'} &nbsp;
      {sources.map((source) => {
        const index = references.findIndex((reference) => reference.id === source);
        return index < 0 ? null : (
          <a
            key={source}
            href={`#source-${source}`}
            aria-label={`Source ${index + 1}: ${references[index]?.title}`}
          >
            [{String(index + 1).padStart(2, '0')}]
          </a>
        );
      })}
    </div>
  );
}
