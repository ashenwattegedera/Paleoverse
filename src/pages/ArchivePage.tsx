import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dinosaurs, searchDinosaurs } from '../data/registry';

export function ArchivePage() {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('all');
  const [period, setPeriod] = useState('all');
  const [group, setGroup] = useState('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  useEffect(() => { document.title = 'The Archive — PALEOVERSE'; }, []);
  const diets = useMemo(() => [...new Set(dinosaurs.map((dinosaur) => dinosaur.diet))].sort(), []);
  const periods = useMemo(() => [...new Set(dinosaurs.map((dinosaur) => dinosaur.period))].sort(), []);
  const groups = useMemo(() => [...new Set(dinosaurs.map((dinosaur) => dinosaur.group))].sort(), []);
  const results = useMemo(() => searchDinosaurs(query, diet, period, group, sort), [query, diet, period, group, sort]);

  return (
    <div className="archive-page page-wrap">
      <div className="page-topline"><span>PALEOVERSE / FIELD ARCHIVE</span><span>COLLECTION INDEX &nbsp;·&nbsp; 01</span></div>
      <header className="archive-heading"><div className="section-kicker"><span>01</span> / SPECIMEN INDEX</div><h1>The <i>archive.</i></h1><p>Each record connects anatomy, geological context and the evidence that survives.</p></header>
      <div className="archive-search-row">
        <label className="search-field"><Search size={18} /><span className="sr-only">Search specimens</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or group…" /></label>
        <label className="filter-field"><SlidersHorizontal size={15} /><span>DIET</span><select aria-label="Filter by diet" value={diet} onChange={(event) => setDiet(event.target.value)}><option value="all">ALL DIETS</option>{diets.map((value) => <option value={value.toLowerCase()} key={value}>{value.toUpperCase()}</option>)}</select></label>
        <label className="filter-field"><span>PERIOD</span><select aria-label="Filter by geological period" value={period} onChange={(event) => setPeriod(event.target.value)}><option value="all">ALL PERIODS</option>{periods.map((value) => <option value={value.toLowerCase()} key={value}>{value.toUpperCase()}</option>)}</select></label>
        <label className="filter-field"><span>GROUP</span><select aria-label="Filter by dinosaur group" value={group} onChange={(event) => setGroup(event.target.value)}><option value="all">ALL GROUPS</option>{groups.map((value) => <option value={value.toLowerCase()} key={value}>{value.toUpperCase()}</option>)}</select></label>
        <label className="filter-field"><span>SORT</span><select aria-label="Sort specimens alphabetically" value={sort} onChange={(event) => setSort(event.target.value as 'asc' | 'desc')}><option value="asc">A—Z</option><option value="desc">Z—A</option></select></label>
        <span className="results-count">{String(results.length).padStart(2, '0')} RECORD{results.length === 1 ? '' : 'S'}</span>
      </div>
      {results.length > 0 ? <div className="archive-list">
        {results.map((dinosaur) => <Link className="archive-card" to={`/specimens/${dinosaur.slug}`} key={dinosaur.id}>
          <div className="archive-card-art"><div className="archive-card-ring" /><div className="featured-dino-mark" /><span>{dinosaur.archiveNumber}</span></div>
          <div className="archive-card-content"><div className="micro-label">{dinosaur.group} &nbsp;·&nbsp; {dinosaur.period.toUpperCase()}</div><h2>{dinosaur.commonName.split(' ').slice(0, -1).join(' ')} <i>{dinosaur.commonName.split(' ').at(-1)}</i></h2><p>{dinosaur.summary}</p><div className="archive-tags"><span>{dinosaur.diet.toUpperCase()}</span><span>{dinosaur.range.toUpperCase()}</span><span>FOSSIL RECORD</span></div></div>
          <div className="archive-card-measure"><small>APPROX. LENGTH</small><b>{dinosaur.measurements.length}</b><span>EXPLORE RECORD <ArrowRight size={14} /></span></div>
        </Link>)}
      </div> : <div className="empty-state"><span>NO MATCHING SPECIMENS</span><p>Try another name, group or filter.</p><button onClick={() => { setQuery(''); setDiet('all'); setPeriod('all'); setGroup('all'); setSort('asc'); }}>CLEAR FILTERS</button></div>}
      <div className="archive-endnote"><span>END OF CURRENT COLLECTION</span><span>FUTURE SPECIMENS WILL BE ADDED AS SOURCED RECORDS</span></div>
    </div>
  );
}
