import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import type { DinosaurProfile } from '../types/dinosaur';

export function SpecimenPlate({ profile }: { profile: DinosaurProfile }) {
  const illustration = profile.media?.illustration;
  // Remember the failing URL rather than hiding future artwork when the record changes.
  const [failedSource, setFailedSource] = useState<string>();
  const hasIllustration = illustration && failedSource !== illustration.src;

  return (
    <figure className="specimen-plate" aria-label={`${profile.commonName} specimen plate`}>
      <div className="plate-heading">
        <span>PALEOVERSE / NATURAL HISTORY STUDIES</span>
        <span>PLATE {profile.archiveNumber}</span>
      </div>
      <div className="plate-body">
        <div className="plate-margin">
          <span>{profile.group}</span>
          <span>{profile.period}</span>
        </div>
        {hasIllustration ? (
          <img
            className="plate-illustration"
            src={illustration.src}
            alt={illustration.alt}
            width={illustration.width}
            height={illustration.height}
            fetchPriority="high"
            onError={() => setFailedSource(illustration.src)}
          />
        ) : (
          <div className="plate-placeholder">
            <span className="plate-placeholder-index" aria-hidden="true">
              {profile.archiveNumber.replace('PVR—', '')}
            </span>
            <span>FROM THE WRITTEN RECORD</span>
            <p>{profile.scientificName}</p>
            <small>
              {illustration
                ? 'Illustration unavailable. The complete field record follows below.'
                : 'An illustrated plate has not yet been added. Explore the evidence below.'}
            </small>
          </div>
        )}
        <div className="plate-signature">
          <span>{profile.scientificName}</span>
          <ArrowDownRight size={24} strokeWidth={1} aria-hidden="true" />
        </div>
      </div>
      <figcaption className="plate-caption">
        <span>
          {hasIllustration
            ? illustration.attribution
            : 'A RECORD DOES NOT REQUIRE A RECONSTRUCTION'}
        </span>
        <p>
          {hasIllustration
            ? illustration.reconstructionNote
            : `${profile.range} · ${profile.ageRangeMa[0]}–${profile.ageRangeMa[1]} million years ago. Artwork is optional; the research record stands on its own.`}
        </p>
      </figcaption>
    </figure>
  );
}
