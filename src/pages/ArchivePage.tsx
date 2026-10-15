import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dinosaurs, searchDinosaurs } from '../data/registry';
import { useArchiveFilters } from '../hooks/useArchiveFilters';
import { RecordArtwork } from '../components/RecordArtwork';
import { Reveal } from '../components/Reveal';

export function ArchivePage() {
  const searchInput = useRef<HTMLInputElement>(null);
  const { filters, updateFilters, clearFilters } = useArchiveFilters();
  const { query, diet, period, group, sort } = filters;
  useEffect(() => {
    document.title = 'The Collection — PALEOVERSE';
  }, []);
  const categories = [
    { key: 'diet', label: 'Diet', accessibleName: 'Filter by diet' },
    { key: 'period', label: 'Period', accessibleName: 'Filter by geological period' },
    { key: 'group', label: 'Group', accessibleName: 'Filter by dinosaur group' },
  ] as const;
  const results = searchDinosaurs(query, diet, period, group, sort);
  const filtered =
    query !== '' || diet !== 'all' || period !== 'all' || group !== 'all' || sort !== 'asc';

  return (
    <div className="archive-index page-wrap">
      <div className="frontispiece-topline">
        <span>PALEOVERSE / THE COLLECTION</span>
        <span>A CATALOG OF ANCIENT LIFE</span>
      </div>
      <header className="catalog-heading">
        <div>
          <p className="editorial-kicker">THE FIELD ARCHIVE</p>
          <h1>
            Lives from
            <br />
            <i>another world.</i>
          </h1>
          <p>
            Start with a name. Follow a curiosity. Every record brings together an animal, its
            world, and the evidence that survives.
          </p>
        </div>
        <div className="catalog-count">
          <span>{String(dinosaurs.length).padStart(2, '0')}</span>
          <small>
            SOURCED RECORD{dinosaurs.length === 1 ? '' : 'S'}
            <br />
            IN THE COLLECTION
          </small>
        </div>
      </header>
      <form
        className="catalog-tools"
        role="search"
        aria-label="Find specimens"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="catalog-search">
          <Search size={20} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Search specimens</span>
          <input
            ref={searchInput}
            value={query}
            onChange={(event) => updateFilters({ query: event.target.value }, true)}
            placeholder="A name, a group, a curiosity…"
          />
        </label>
        <div className="catalog-filters">
          {categories.map(({ key, label, accessibleName }) => (
            <label key={key}>
              <span>{label}</span>
              <select
                aria-label={accessibleName}
                value={filters[key]}
                onChange={(event) => updateFilters({ [key]: event.target.value })}
              >
                <option value="all">
                  All {label === 'Diet' ? 'diets' : label === 'Period' ? 'periods' : 'groups'}
                </option>
                {[...new Set(dinosaurs.map((record) => record[key]))].sort().map((value) => (
                  <option key={value} value={value.toLowerCase()}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label>
            <span>Order</span>
            <select
              aria-label="Sort specimens alphabetically"
              value={sort}
              onChange={(event) =>
                updateFilters({ sort: event.target.value === 'desc' ? 'desc' : 'asc' })
              }
            >
              <option value="asc">Name A–Z</option>
              <option value="desc">Name Z–A</option>
            </select>
          </label>
        </div>
      </form>
      <div className="catalog-results-heading">
        <p role="status" aria-live="polite" aria-atomic="true">
          {results.length} record{results.length === 1 ? '' : 's'}{' '}
          {filtered ? 'matching your selection' : 'ready to explore'}
        </p>
        {filtered && (
          <button
            className="clear-selection"
            onClick={() => {
              clearFilters();
              searchInput.current?.focus();
            }}
          >
            CLEAR FILTERS <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
      <div key={JSON.stringify(filters)} className="catalog-results result-enter">
        {results.length ? (
          <div className={`catalog-grid ${results.length === 1 ? 'has-one-record' : ''}`}>
            {results.map((record) => (
              <article className="catalog-record" key={record.id}>
                <Link
                  className="catalog-record-art"
                  to={`/specimens/${record.slug}`}
                  aria-label={`Open the ${record.commonName} field record`}
                >
                  <div className="catalog-plate-label">
                    <span>{record.archiveNumber}</span>
                    <span>
                      {record.media?.illustration
                        ? 'ILLUSTRATED FIELD RECORD'
                        : 'WRITTEN FIELD RECORD'}
                    </span>
                  </div>
                  <RecordArtwork key={record.id} profile={record} />
                  <span className="catalog-art-note">
                    {record.media?.illustration
                      ? 'RECONSTRUCTED APPEARANCE'
                      : 'RESEARCH WITHOUT AN ILLUSTRATION'}
                  </span>
                </Link>
                <div className="catalog-record-copy">
                  <p className="editorial-kicker">
                    {record.group} / {record.period}
                  </p>
                  <h2>
                    <Link to={`/specimens/${record.slug}`}>{record.scientificName}</Link>
                  </h2>
                  <p>{record.summary}</p>
                  <dl>
                    <div>
                      <dt>KNOWN FROM</dt>
                      <dd>{record.range}</dd>
                    </div>
                    <div>
                      <dt>APPROX. LENGTH</dt>
                      <dd>
                        {record.measurements.length
                          ? `${record.measurements.length.displayValue} ${record.measurements.length.unit}`
                          : 'Not established'}
                      </dd>
                    </div>
                    <div>
                      <dt>DIET</dt>
                      <dd>{record.diet}</dd>
                    </div>
                  </dl>
                  <Link className="editorial-text-link" to={`/specimens/${record.slug}`}>
                    EXPLORE RECORD <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <span>NO MATCHING SPECIMENS</span>
            <h2>
              A different trail,
              <br />
              <i>perhaps?</i>
            </h2>
            <p>Try another name, group or filter. The collection is still growing.</p>
          </div>
        )}
      </div>
      <Reveal>
        <aside className="catalog-reading-note">
          <span className="reading-note-mark" aria-hidden="true">
            N.B.
          </span>
          <div>
            <h2>A note on reading the archive.</h2>
            <p>
              Illustrations help us imagine a life. Fossils and research tell us what we can
              support. Each record separates evidence, inference, and debate—and links back to its
              sources.
            </p>
          </div>
          <Link to="/#deep-time" className="editorial-text-link">
            EXPLORE DEEP TIME <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </Reveal>
    </div>
  );
}
