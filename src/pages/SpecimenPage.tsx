import { useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Footprints, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getDinosaurBySlug } from '../data/registry';
import { GeologicalTimeline } from '../components/GeologicalTimeline';
import { MeasurementStrip } from '../components/MeasurementStrip';
import { SourceLinks } from '../components/SourceLinks';
import { SpecimenPlate } from '../components/SpecimenPlate';
import '../styles/specimen.css';

export function SpecimenPage() {
  const { slug } = useParams();
  const dinosaur = getDinosaurBySlug(slug ?? '');
  useEffect(() => {
    document.title = dinosaur
      ? `${dinosaur.commonName} — PALEOVERSE`
      : 'Record not found — PALEOVERSE';
  }, [dinosaur]);

  if (!dinosaur) {
    return (
      <div className="not-found page-wrap">
        <span>404 / RECORD NOT FOUND</span>
        <h1>
          This layer
          <br />
          <i>is uncharted.</i>
        </h1>
        <p>There is no specimen record at this address.</p>
        <Link className="button button-amber" to="/archive">
          RETURN TO THE ARCHIVE <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const scientificNameParts = dinosaur.scientificName.split(' ');
  const [oldest, youngest] = dinosaur.ageRangeMa;
  const illustration = dinosaur.media?.illustration;
  const length = dinosaur.measurements.length;
  const comparisonLength = length?.unit === 'm' ? length.typicalValue : undefined;
  const referenceHeight = 1.75;
  const comparisonMaximum = Math.max(comparisonLength ?? 0, referenceHeight);
  const firstSectionId = dinosaur.sections[0]?.id ?? 'geological-context';

  return (
    <article className="specimen-page journal-record page-wrap">
      <div className="page-topline">
        <span>
          <Link to="/archive">FIELD ARCHIVE</Link> &nbsp;/&nbsp; SPECIMEN RECORD
        </span>
        <span>{dinosaur.archiveNumber} &nbsp;·&nbsp; NATURAL HISTORY STUDIES</span>
      </div>
      <header className="specimen-title-row">
        <div>
          <div className="section-kicker">
            <span>RECORD {dinosaur.archiveNumber.replace('PVR—', '')}</span> /{' '}
            {dinosaur.group.toUpperCase()}
          </div>
          <h1>
            {scientificNameParts.slice(0, -1).join(' ')}
            <br />
            <i>{scientificNameParts.at(-1)}.</i>
          </h1>
          <p className="specimen-pronunciation">
            {dinosaur.scientificName} &nbsp;·&nbsp; {dinosaur.period.toUpperCase()}
          </p>
        </div>
        <div className="specimen-ident">
          <span>FIELD IDENTIFICATION</span>
          <b>{dinosaur.archiveNumber}</b>
          <small>APP RECORD · NOT A MUSEUM ACCESSION</small>
          <i>
            {oldest}–{youngest} Ma / {dinosaur.period.toUpperCase()}
          </i>
        </div>
      </header>
      <div className="specimen-lead">
        <p>{dinosaur.summary}</p>
        <a href={`#${firstSectionId}`} className="text-link">
          FOLLOW THE EVIDENCE <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>

      <SpecimenPlate key={dinosaur.id} profile={dinosaur} />
      <MeasurementStrip profile={dinosaur} />

      <nav className="record-nav" aria-label="On this record">
        <span>READ THE RECORD</span>
        <a href="#geological-context">DEEP TIME</a>
        {dinosaur.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.eyebrow.replace(/^\d+\s*\/\s*/, '')}
          </a>
        ))}
        {dinosaur.evidenceNotes.length > 0 && <a href="#evidence">EVIDENCE & DEBATE</a>}
        <a href="#sources">SOURCES</a>
      </nav>

      <section className="deep-time-section" id="geological-context">
        <div className="section-kicker">THE TIME BEFORE US</div>
        <div className="deep-time-grid">
          <div>
            <h2>
              A place in
              <br />
              <i>deep time.</i>
            </h2>
            <p className="section-deck">
              {dinosaur.period}. A chapter measured in millions of years.
            </p>
          </div>
          <GeologicalTimeline
            name={dinosaur.commonName}
            period={dinosaur.period}
            ageRangeMa={dinosaur.ageRangeMa}
          />
        </div>
      </section>

      {dinosaur.sections.length > 0 && (
        <section className="journal-notes" aria-label="Cited field notes">
          {dinosaur.sections.map((section, index) => (
            <section className="journal-note" id={section.id} key={section.id}>
              <div className="journal-note-index">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{section.eyebrow.replace(/^\d+\s*\/\s*/, '')}</small>
              </div>
              <div className="journal-note-body">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <SourceLinks sources={section.sources} references={dinosaur.references} />
              </div>
            </section>
          ))}
        </section>
      )}

      {dinosaur.anatomy.length > 0 && (
        <section className="anatomy-section">
          <div className="section-kicker">ANATOMY INDEX</div>
          <div className="anatomy-heading">
            <h2>
              Structure
              <br />
              leaves <i>traces.</i>
            </h2>
            <p>
              Known from fossil anatomy, with function interpreted through comparative and
              biomechanical research.
            </p>
          </div>
          <div className="anatomy-list">
            {dinosaur.anatomy.map((part, index) => (
              <div className="anatomy-row" key={part.name}>
                <span className="anatomy-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{part.name}</h3>
                <div className="anatomy-detail">
                  <p>{part.detail}</p>
                  <SourceLinks sources={part.sources} references={dinosaur.references} />
                </div>
                <span className={`evidence-badge evidence-${part.evidence}`}>
                  {part.evidence === 'well-supported'
                    ? 'SUPPORTED'
                    : part.evidence === 'inference'
                      ? 'INFERRED'
                      : 'DEBATED'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="journal-range">
        <div>
          <div className="section-kicker">GEOGRAPHIC RANGE</div>
          <h2>
            A world
            <br />
            <i>underfoot.</i>
          </h2>
        </div>
        <div>
          <MapPin size={24} strokeWidth={1} aria-hidden="true" />
          <h3>{dinosaur.range}</h3>
          {dinosaur.geography && (
            <>
              <p>{dinosaur.geography.description}</p>
              <span className="range-location">{dinosaur.geography.locations.join(' · ')}</span>
              <SourceLinks sources={dinosaur.geography.sources} references={dinosaur.references} />
            </>
          )}
        </div>
      </section>

      {comparisonLength !== undefined && comparisonLength > 0 && (
        <section className="size-section">
          <div className="section-kicker">SCALE REFERENCE</div>
          <div className="size-heading">
            <h2>
              Measured against
              <br />
              <i>ourselves.</i>
            </h2>
            <p>
              Two measurements on the same linear scale. These bars compare body length with a human
              reference height; they do not measure the illustration.
            </p>
          </div>
          <div className="scale-comparison">
            <div className="scale-row">
              <span className="scale-name">
                <b>{dinosaur.commonName.toUpperCase()}</b>
                <small>APPROXIMATE BODY LENGTH</small>
              </span>
              <div className="scale-track">
                <span
                  className="scale-dino"
                  style={{ width: `${(comparisonLength / comparisonMaximum) * 100}%` }}
                />
              </div>
              <span className="scale-value">{length?.displayValue} m</span>
            </div>
            <div className="scale-row human-row">
              <span className="scale-name">
                <b>HUMAN REFERENCE</b>
                <small>ILLUSTRATIVE HEIGHT</small>
              </span>
              <div className="scale-track">
                <span
                  className="scale-human"
                  style={{ width: `${(referenceHeight / comparisonMaximum) * 100}%` }}
                />
              </div>
              <span className="scale-value">{referenceHeight} m</span>
            </div>
            <div className="scale-ruler">
              {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
                <span key={fraction}>{Number((comparisonMaximum * fraction).toFixed(2))} m</span>
              ))}
            </div>
          </div>
          <div className="scale-note">
            <Footprints size={14} aria-hidden="true" /> BODY LENGTH COMPARED WITH HUMAN HEIGHT ·
            SCHEMATIC BARS
          </div>
          <SourceLinks sources={length?.sources ?? []} references={dinosaur.references} />
        </section>
      )}

      {dinosaur.evidenceNotes.length > 0 && (
        <section className="evidence-section" id="evidence">
          <div className="section-kicker">WHAT WE KNOW — AND WHAT WE DON'T</div>
          <div className="evidence-header">
            <h2>
              The limits
              <br />
              of the <i>record.</i>
            </h2>
            <p>Fossils preserve parts of a life. They do not preserve every answer.</p>
          </div>
          <div className="evidence-grid">
            {dinosaur.evidenceNotes.map((note) => (
              <article className="evidence-card" key={note.title}>
                <span className={`evidence-badge evidence-${note.level}`}>
                  {note.level.replace('-', ' ').toUpperCase()}
                </span>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <SourceLinks sources={note.sources} references={dinosaur.references} />
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="sources-section" id="sources">
        <div className="section-kicker">REFERENCES & FURTHER READING</div>
        <div className="sources-header">
          <h2>
            The trail
            <br />
            <i>of evidence.</i>
          </h2>
          <p>
            Follow the sources behind this record. Scientific interpretations may change as new
            evidence and methods emerge.
          </p>
        </div>
        <div className="source-list">
          {dinosaur.references.map((reference, index) => (
            <article className="source-row" id={`source-${reference.id}`} key={reference.id}>
              <span className="source-index">[{String(index + 1).padStart(2, '0')}]</span>
              <div>
                <h3>{reference.title}</h3>
                <p>
                  {reference.author} · {reference.publisher}
                  {reference.year ? ` · ${reference.year}` : ''}
                  {reference.accessedAt ? ` · accessed ${reference.accessedAt}` : ''}
                </p>
                <span className="source-kind">{reference.kind.toUpperCase()}</span>
              </div>
              <a
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open source: ${reference.title}`}
              >
                <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="record-provenance" aria-label="Media provenance">
        <div className="section-kicker">ABOUT THIS PLATE</div>
        <h2>
          Evidence & <i>interpretation.</i>
        </h2>
        {illustration ? (
          <>
            <p>{illustration.reconstructionNote}</p>
            <dl>
              <div>
                <dt>CREATOR</dt>
                <dd>{illustration.creator}</dd>
              </div>
              <div>
                <dt>ORIGIN</dt>
                <dd>{illustration.source}</dd>
              </div>
              <div>
                <dt>RIGHTS NOTE</dt>
                <dd>{illustration.rights}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p>
            This written record has no published illustration. Its scientific sources remain
            available above.
          </p>
        )}
      </section>
      <div className="specimen-next">
        <span>END OF RECORD / {dinosaur.archiveNumber}</span>
        <Link to="/archive">
          RETURN TO THE ARCHIVE <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
