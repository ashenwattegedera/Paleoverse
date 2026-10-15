import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { dinosaurs } from '../data/registry';

const periodStops = [
  { name: 'Triassic', age: 228, oldest: 252, youngest: 201 },
  { name: 'Jurassic', age: 173, oldest: 201, youngest: 145 },
  { name: 'Cretaceous', age: 100, oldest: 145, youngest: 66 },
];

export function DeepTimeExplorer() {
  const oldest = Math.max(252, ...dinosaurs.map((record) => record.ageRangeMa[0]));
  const youngest = Math.min(66, ...dinosaurs.map((record) => record.ageRangeMa[1]));
  const [age, setAge] = useState(dinosaurs[0]?.ageRangeMa[0] ?? 68);
  const active = dinosaurs.filter(
    (record) => age <= record.ageRangeMa[0] && age >= record.ageRangeMa[1],
  );
  const period =
    age > 201 && age <= 252
      ? 'Triassic'
      : age > 145 && age <= 201
        ? 'Jurassic'
        : age >= 66 && age <= 145
          ? 'Cretaceous'
          : 'Outside the Mesozoic display';
  const position = ((oldest - age) / (oldest - youngest)) * 100;

  return (
    <div className="time-explorer">
      <div className="explorer-topline">
        <span>GEOLOGICAL NOTEBOOK</span>
        <span>Ma / MILLION YEARS AGO</span>
      </div>
      <div className="explorer-readout">
        <output htmlFor="geological-age">
          {age}
          <span> Ma</span>
        </output>
        <span>
          {period}
          <small>APPROXIMATE DATES</small>
        </span>
      </div>
      <div className="explorer-bands" aria-hidden="true">
        {periodStops.map((stop) => (
          <span
            key={stop.name}
            style={{
              left: `${((oldest - stop.oldest) / (oldest - youngest)) * 100}%`,
              width: `${((stop.oldest - stop.youngest) / (oldest - youngest)) * 100}%`,
            }}
          />
        ))}
        <i style={{ left: `${position}%` }} />
      </div>
      <label htmlFor="geological-age" className="explorer-label">
        Move through geological time <span>← OLDER / YOUNGER →</span>
      </label>
      <input
        id="geological-age"
        type="range"
        min={0}
        max={oldest - youngest}
        value={oldest - age}
        aria-valuetext={`${age} million years ago, ${period}`}
        onChange={(event) => setAge(oldest - Number(event.target.value))}
      />
      <div className="explorer-axis">
        <span>{oldest} Ma</span>
        <span>{youngest} Ma</span>
      </div>
      <div className="explorer-stops" aria-label="Jump to a geological period">
        {periodStops.map((stop) => (
          <button
            key={stop.name}
            aria-pressed={period === stop.name}
            onClick={() => setAge(stop.age)}
          >
            {stop.name}
          </button>
        ))}
      </div>
      <div className="explorer-records" aria-live="polite" aria-atomic="true">
        <span>IN OUR COLLECTION AT {age} Ma</span>
        {active.length ? (
          active.map((record) => (
            <Link key={record.id} to={`/specimens/${record.slug}`}>
              {record.commonName}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ))
        ) : (
          <p>No published records at this point yet. There is more of the archive to write.</p>
        )}
      </div>
      <p className="explorer-footnote">
        This explores the records currently in our collection, rather than every animal that lived
        at each point in time.
      </p>
    </div>
  );
}
