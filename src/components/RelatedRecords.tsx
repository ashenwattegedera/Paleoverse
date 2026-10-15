import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRelatedDinosaurs } from '../data/registry';
import type { DinosaurProfile } from '../types/dinosaur';

export function RelatedRecords({ profile }: { profile: DinosaurProfile }) {
  const related = getRelatedDinosaurs(profile);
  if (!related.length) return null;
  return (
    <section
      className="related-records"
      id="related-records"
      aria-labelledby="related-records-heading"
    >
      <div className="section-kicker">CONTINUE THROUGH THE COLLECTION</div>
      <h2 id="related-records-heading">
        Follow another <i>thread.</i>
      </h2>
      <p>
        Shared catalog attributes connect these records; they do not establish a direct encounter.
      </p>
      <ul>
        {related.map(({ dinosaur, sharedAttributes }) => (
          <li key={dinosaur.id}>
            <Link to={`/specimens/${dinosaur.slug}`}>
              <span className="related-record-number">{dinosaur.archiveNumber}</span>
              <div>
                <h3>{dinosaur.scientificName}</h3>
                <span>
                  {sharedAttributes.map((key) => `Same ${key}: ${dinosaur[key]}`).join(' · ')}
                </span>
              </div>
              <ArrowUpRight size={22} strokeWidth={1} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
