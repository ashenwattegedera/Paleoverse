import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dinosaurs } from '../data/registry';
import { DeepTimeExplorer } from '../components/DeepTimeExplorer';
import { RecordArtwork } from '../components/RecordArtwork';
import { Reveal } from '../components/Reveal';

export function HomePage() {
  useEffect(() => {
    document.title = 'PALEOVERSE — Earth, before us.';
  }, []);
  const featured = dinosaurs[0];
  const fieldNote =
    featured?.sections.find((section) => section.id === 'feeding') ?? featured?.sections[0];

  return (
    <div className="journal-home">
      <section className="frontispiece page-wrap">
        <div className="frontispiece-topline">
          <span>AN ARCHIVE OF ANCIENT LIFE</span>
          <span>THE NATURAL HISTORY ISSUE / VOL. 01</span>
        </div>
        <div className="frontispiece-grid">
          <div className="frontispiece-copy">
            <p className="editorial-kicker">
              <span /> A CLOSER LOOK AT A DISTANT WORLD
            </p>
            <h1>
              Earth,
              <br />
              <i>before us.</i>
            </h1>
            <p className="frontispiece-deck">
              Lives written in stone.
              <br />
              Stories still being uncovered.
            </p>
            <p className="frontispiece-intro">
              An illustrated field guide to ancient life. Look closer at the animals, the worlds
              they inhabited, and the evidence they left behind.
            </p>
            <Link className="editorial-button" to="/archive">
              OPEN THE COLLECTION <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="frontispiece-down" href="#collection">
              A FEW MILLION YEARS THIS WAY <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
          {featured ? (
            <figure className="frontispiece-plate">
              <div className="frontispiece-plate-label">
                <span>FROM THE COLLECTION</span>
                <span>{featured.archiveNumber}</span>
              </div>
              <Link
                to={`/specimens/${featured.slug}`}
                aria-label={`Open the ${featured.commonName} field record`}
              >
                <RecordArtwork key={featured.id} profile={featured} priority />
              </Link>
              <figcaption>
                <div>
                  <span>
                    {featured.group} / {featured.ageRangeMa[0]}–{featured.ageRangeMa[1]} Ma
                  </span>
                  <h2>{featured.scientificName}</h2>
                  <p>{featured.range}</p>
                </div>
                <Link
                  className="plate-open"
                  to={`/specimens/${featured.slug}`}
                  aria-label={`Read about ${featured.commonName}`}
                >
                  <ArrowUpRight size={24} strokeWidth={1} />
                </Link>
              </figcaption>
              <small className="frontispiece-art-note">
                {featured.media?.illustration
                  ? 'ILLUSTRATED RECONSTRUCTION · APPEARANCE IS INTERPRETIVE'
                  : 'WRITTEN FIELD RECORD · SOURCES IN THE COMPLETE RECORD'}
              </small>
            </figure>
          ) : (
            <div className="frontispiece-empty">
              <p>The notebook is open.</p>
              <span>New field records are on their way.</span>
            </div>
          )}
        </div>
        <div className="frontispiece-bottom">
          <span>EVIDENCE FIRST. CURIOSITY ALWAYS.</span>
          <span>
            {String(dinosaurs.length).padStart(2, '0')} RECORD{dinosaurs.length === 1 ? '' : 'S'} &
            COUNTING
          </span>
        </div>
      </section>

      <Reveal>
        <section className="collection-preview page-wrap" id="collection">
          <div className="editorial-section-heading">
            <div>
              <p className="editorial-kicker">01 / THE COLLECTION</p>
              <h2>
                A life, <i>reconstructed.</i>
              </h2>
            </div>
            <Link className="editorial-text-link" to="/archive">
              BROWSE ALL RECORDS <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ol className="collection-ledger">
            {dinosaurs.slice(0, 4).map((record, index) => (
              <li key={record.id}>
                <Link to={`/specimens/${record.slug}`}>
                  <span className="ledger-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{record.scientificName}</h3>
                    <p>{record.range}</p>
                  </div>
                  <span className="ledger-period">
                    {record.period}
                    <small>
                      {record.ageRangeMa[0]}–{record.ageRangeMa[1]} Ma
                    </small>
                  </span>
                  <ArrowUpRight size={22} strokeWidth={1} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="collection-preview-note">
            A growing collection. Each record follows the evidence, and makes room for what remains
            unknown.
          </p>
        </section>
      </Reveal>

      {featured && fieldNote && (
        <Reveal>
          <section className="field-dispatch">
            <div className="page-wrap dispatch-grid">
              <div className="dispatch-margin">
                <span>
                  NOTES
                  <br />
                  FROM
                  <br />
                  THE FIELD
                </span>
                <span className="dispatch-number">01</span>
                <small>
                  {featured.archiveNumber}
                  <br />
                  {featured.commonName}
                </small>
              </div>
              <div className="dispatch-copy">
                <p className="editorial-kicker">02 / READING THE EVIDENCE</p>
                <h2>{fieldNote.title}</h2>
                <p>{fieldNote.body[0]}</p>
                <Link
                  className="editorial-text-link"
                  to={`/specimens/${featured.slug}#${fieldNote.id}`}
                >
                  FOLLOW THE FIELD NOTE <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <span className="dispatch-footnote">
                  A RESEARCH NOTE, WITH SOURCES IN THE COMPLETE RECORD.
                </span>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="deep-time-feature page-wrap" id="deep-time">
          <div className="deep-time-copy">
            <p className="editorial-kicker">03 / THE LONG VIEW</p>
            <h2>
              Deep time
              <br />
              <i>takes perspective.</i>
            </h2>
            <p>
              A fossil is a place in time as much as a trace of life. Move through the ages to find
              where our published records belong.
            </p>
            <span className="time-margin-note">
              A small collection.
              <br />
              An extraordinary span of time.
            </span>
          </div>
          <DeepTimeExplorer />
        </section>
      </Reveal>
      <Reveal>
        <section className="journal-invitation page-wrap">
          <p className="editorial-kicker">THE NOTEBOOK IS NEVER FINISHED</p>
          <h2>
            There is always
            <br />
            <i>more to uncover.</i>
          </h2>
          <Link className="editorial-button" to="/archive">
            RETURN TO THE EVIDENCE <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
