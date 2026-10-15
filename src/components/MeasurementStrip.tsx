import type { CSSProperties } from 'react';
import { Info, Ruler } from 'lucide-react';
import type { DinosaurProfile } from '../types/dinosaur';
import { SourceLinks } from './SourceLinks';

const measurementLabels = {
  length: 'Body length',
  hipHeight: 'Hip height',
  mass: 'Body mass',
} as const;

export function MeasurementStrip({ profile }: { profile: DinosaurProfile }) {
  const entries = Object.entries(measurementLabels).flatMap(([key, label]) => {
    const measurement = profile.measurements[key as keyof typeof measurementLabels];
    return measurement ? [{ key, label, measurement }] : [];
  });
  if (!entries.length) return null;

  return (
    <section
      className="measurement-strip"
      aria-label={`${profile.commonName} estimated measurements`}
      style={{ '--measurement-count': entries.length } as CSSProperties}
    >
      <div className="measurement-intro">
        <span>
          <Ruler size={16} aria-hidden="true" /> FIELD MEASUREMENTS
        </span>
        <small>ESTIMATES · INDIVIDUALS VARY</small>
      </div>
      {entries.map(({ key, label, measurement }) => (
        <div className="measurement" key={key}>
          <small>{label.toUpperCase()}</small>
          <strong>
            {measurement.displayValue} <i>{measurement.unit}</i>
          </strong>
          <SourceLinks sources={measurement.sources} references={profile.references} />
        </div>
      ))}
      <div className="measurement-note">
        <Info size={14} aria-hidden="true" />
        <span>{profile.measurements.note}</span>
      </div>
    </section>
  );
}
