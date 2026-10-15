import { useState } from 'react';
import type { DinosaurProfile } from '../types/dinosaur';

/** Compact artwork shared by the home feature and collection cards. */
export function RecordArtwork({
  profile,
  priority = false,
}: {
  profile: DinosaurProfile;
  priority?: boolean;
}) {
  const illustration = profile.media?.illustration;
  const [failedSource, setFailedSource] = useState<string>();
  return (
    <div className="record-artwork">
      {illustration && failedSource !== illustration.src ? (
        <img
          src={illustration.src}
          alt={illustration.alt}
          width={illustration.width}
          height={illustration.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailedSource(illustration.src)}
        />
      ) : (
        <div className="artwork-fallback">
          <span>FROM THE WRITTEN RECORD</span>
          <i>{profile.scientificName}</i>
          <small>Illustration pending · Research available</small>
        </div>
      )}
    </div>
  );
}
