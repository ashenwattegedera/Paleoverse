import { lazy, Suspense, useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bone, Footprints, Info, MapPin, Ruler } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getDinosaurBySlug } from '../data/registry';
const SpecimenViewer = lazy(() => import('../components/SpecimenViewer').then((module) => ({ default: module.SpecimenViewer })));

export function SpecimenPage() {
  const { slug } = useParams();
  const dinosaur = getDinosaurBySlug(slug ?? '');
  const scientificNameParts = dinosaur?.scientificName.split(' ') ?? [];
  const geologicalSpanMa = 252 - 66;
  const ageRange: [number, number] = dinosaur?.ageRangeMa ?? [68, 66];
  const timelineLeft = `${Math.max(0, Math.min(100, ((252 - ageRange[0]) / geologicalSpanMa) * 100))}%`;
  const timelineWidth = `${Math.max(0.5, Math.min(100, ((ageRange[0] - ageRange[1]) / geologicalSpanMa) * 100))}%`;
  useEffect(() => { document.title = dinosaur ? `${dinosaur.commonName} — PALEOVERSE` : 'Record not found — PALEOVERSE'; }, [dinosaur]);

  if (!dinosaur) return <div className="not-found page-wrap"><span>404 / RECORD NOT FOUND</span><h1>This layer<br /><i>is uncharted.</i></h1><p>There is no specimen record at this address.</p><Link className="button button-amber" to="/archive">RETURN TO THE ARCHIVE <ArrowRight size={15} /></Link></div>;

  return (
    <article className="specimen-page page-wrap">
      <div className="page-topline"><span><Link to="/archive">FIELD ARCHIVE</Link> &nbsp;/&nbsp; SPECIMEN RECORD</span><span>{dinosaur.archiveNumber} &nbsp;·&nbsp; RECONSTRUCTION FILE</span></div>
      <div className="specimen-title-row">
        <div><div className="section-kicker"><span>SPECIMEN {dinosaur.archiveNumber.replace('PVR—', '')}</span> / {dinosaur.group.toUpperCase()}</div><h1>{scientificNameParts.slice(0, -1).join(' ')}<br /><i>{scientificNameParts.at(-1)}.</i></h1><p className="specimen-pronunciation">{dinosaur.scientificName} &nbsp;·&nbsp; {dinosaur.period.toUpperCase()}</p></div>
        <div className="specimen-ident"><span>FIELD IDENTIFICATION</span><b>{dinosaur.archiveNumber}</b><small>APP RECORD · NOT A MUSEUM ACCESSION</small><i>68—66 Ma / LATE CRETACEOUS</i></div>
      </div>
      <div className="specimen-lead"><p>{dinosaur.summary}</p><a href="#anatomy" className="text-link">DESCEND INTO THE RECORD <ArrowDown size={14} /></a></div>

      <Suspense fallback={<div className="specimen-viewer viewer-suspended"><span className="loader-mark" />LOADING 3D SPECIMEN VIEWER</div>}><SpecimenViewer profile={dinosaur} /></Suspense>

      <section className="measurement-strip" aria-label="Tyrannosaurus rex estimated measurements">
        <div className="measurement-intro"><span><Ruler size={16} /> FIELD MEASUREMENTS</span><small>ADULT ESTIMATES · INDIVIDUALS VARY</small></div>
        <div className="measurement"><small>BODY LENGTH</small><strong>≈ 12 <i>m</i></strong><span>SNOUT TO TAIL</span></div>
        <div className="measurement"><small>HIP HEIGHT</small><strong>3.5–4 <i>m</i></strong><span>ESTIMATED RANGE</span></div>
        <div className="measurement"><small>BODY MASS</small><strong>5–7 <i>t</i></strong><span>APPROXIMATE</span></div>
        <div className="measurement-note"><Info size={14} /><span>Measurements are estimates synthesized from adult specimens. Exceptional individuals were larger.</span></div>
      </section>

      <nav className="record-nav" aria-label="On this record"><span>IN THIS RECORD</span><a href="#deep-time">DEEP TIME</a><a href="#anatomy">ANATOMY</a><a href="#locomotion">LOCOMOTION</a><a href="#discovery">FOSSIL RECORD</a><a href="#evidence">EVIDENCE & DEBATE</a></nav>

      <section className="deep-time-section">
        <div className="section-kicker"><span>01</span> / GEOLOGICAL CONTEXT</div>
        <div className="deep-time-grid"><div><h2>Near the edge<br />of <i>deep time.</i></h2><p className="section-deck">A final chapter in the Mesozoic story—measured in millions of years.</p></div>
          <div className="timeline-panel"><div className="timeline-panel-head"><span>MESOZOIC ERA</span><small>~252—66 MILLION YEARS AGO</small></div><div className="period-blocks"><div className={dinosaur.period.toLowerCase().includes('triassic') ? 'period-active' : ''}><span>TRIASSIC</span><b>252—201 Ma</b></div><div className={dinosaur.period.toLowerCase().includes('jurassic') ? 'period-active' : ''}><span>JURASSIC</span><b>201—145 Ma</b></div><div className={dinosaur.period.toLowerCase().includes('cretaceous') ? 'period-active' : ''}><span>CRETACEOUS</span><b>145—66 Ma</b></div></div><div className="timeline-track"><div className="timeline-progress" style={{ left: timelineLeft, width: timelineWidth }} /><span className="trex-marker" style={{ left: `calc(${timelineLeft} + ${timelineWidth})`, right: 'auto' }}><i /><b>{dinosaur.commonName.split(' ').at(0)?.toUpperCase() ?? dinosaur.commonName.toUpperCase()}</b><small>{ageRange[0]}—{ageRange[1]} Ma</small></span></div><div className="timeline-axis"><span>252 Ma</span><span>201 Ma</span><span>145 Ma</span><span>66 Ma</span></div><div className="timeline-current"><span>SPECIMEN POSITION</span><b>{dinosaur.period.toUpperCase()}</b><span>Approximate geological range; timeline proportions are illustrative.</span></div></div>
        </div>
      </section>

      <section className="content-sections">
        {dinosaur.sections.map((section, index) => <section className={`content-section ${index % 2 ? 'content-section-offset' : ''}`} id={section.id} key={section.id}>
          <div className="content-index"><span>{section.eyebrow}</span><b>0{index + 1}</b></div>
          <div className="content-body"><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="inline-citations">SOURCE{section.sources.length > 1 ? 'S' : ''} &nbsp;{section.sources.map((source) => <a key={source} href={`#source-${source}`}>[{String(dinosaur.references.findIndex((reference) => reference.id === source) + 1).padStart(2, '0')}]</a>)}</div></div>
          <div className={`content-art content-art-${section.id}`} aria-hidden="true"><div className="art-rings" /><div className="anatomy-diagram"><Bone size={50} strokeWidth={0.7} /></div><span>{section.id === 'deep-time' ? '68—66 Ma' : section.id === 'locomotion' ? 'BIPEDAL / MODELLED' : 'EVIDENCE LAYER'}</span></div>
        </section>)}
      </section>

      <section className="anatomy-section">
        <div className="section-kicker"><span>05</span> / ANATOMY INDEX</div><div className="anatomy-heading"><h2>Structure<br />leaves <i>traces.</i></h2><p>Known from fossil anatomy, with function interpreted through comparative and biomechanical research.</p></div>
        <div className="anatomy-list">{dinosaur.anatomy.map((part, index) => <div className="anatomy-row" key={part.name}><span className="anatomy-number">0{index + 1}</span><h3>{part.name}</h3><p>{part.detail}</p><span className={`evidence-badge evidence-${part.evidence}`}>{part.evidence === 'well-supported' ? 'SUPPORTED' : part.evidence === 'inference' ? 'INFERRED' : 'DEBATED'}</span></div>)}</div>
      </section>

      <section className="range-section"><div className="section-kicker"><span>06</span> / GEOGRAPHIC RANGE</div><div className="range-grid"><div><h2>Western<br /><i>interior.</i></h2><p>Fossils of <em>Tyrannosaurus</em> are known from Late Cretaceous deposits across what is now western North America.</p><div className="range-location"><MapPin size={15} /><span>CANADA · UNITED STATES</span></div></div><div className="range-map" role="img" aria-label="Illustrative broad fossil-bearing region across western North America; no precise fossil localities are plotted"><div className="map-contours" /><div className="map-landmass" /><span className="map-region map-canada">CANADA</span><span className="map-region map-usa">UNITED STATES</span><div className="map-broad-region" /><div className="map-legend"><i /> BROAD FOSSIL-BEARING REGION<br /><small>NOT A PRECISE SITE MAP</small></div><div className="map-coordinate">NORTH AMERICA / LATE CRETACEOUS</div></div></div></section>

      <section className="size-section"><div className="section-kicker"><span>07</span> / SCALE REFERENCE</div><div className="size-heading"><h2>Measured against<br /><i>ourselves.</i></h2><p>Approximate body length on a shared linear scale. Illustration is schematic; the supplied 3D model has no verified real-world scale.</p></div><div className="scale-comparison"><div className="scale-row"><span className="scale-name"><b>TYRANNOSAURUS REX</b><small>≈ 12 METRES LONG</small></span><div className="scale-track"><span className="scale-dino" style={{ width: '100%' }} /></div><span className="scale-value">12 m</span></div><div className="scale-row human-row"><span className="scale-name"><b>HUMAN REFERENCE</b><small>1.75 METRES TALL</small></span><div className="scale-track"><span className="scale-human" style={{ width: `${(1.75 / 12) * 100}%` }} /></div><span className="scale-value">1.75 m</span></div><div className="scale-ruler"><span>0</span><span>3 m</span><span>6 m</span><span>9 m</span><span>12 m</span></div></div><div className="scale-note"><Footprints size={14} /> SAME LINEAR SCALE FOR BOTH MEASUREMENTS · T. REX LENGTH COMPARED WITH HUMAN HEIGHT</div></section>

      <section className="evidence-section" id="evidence"><div className="section-kicker"><span>08</span> / WHAT WE KNOW — AND WHAT WE DON'T</div><div className="evidence-header"><h2>The limits<br />of the <i>record.</i></h2><p>Fossils preserve parts of a life. They do not preserve every answer.</p></div><div className="evidence-grid">{dinosaur.evidenceNotes.map((note) => <article className="evidence-card" key={note.title}><span className={`evidence-badge evidence-${note.level}`}>{note.level.replace('-', ' ').toUpperCase()}</span><h3>{note.title}</h3><p>{note.text}</p><div>{note.sources.map((source) => <a href={`#source-${source}`} key={source}>READ SOURCE ↗</a>)}</div></article>)}</div></section>

      <section className="sources-section" id="sources"><div className="section-kicker"><span>09</span> / REFERENCES & FURTHER READING</div><div className="sources-header"><h2>The trail<br /><i>of evidence.</i></h2><p>Sources linked to the claims and context in this record. Museum summaries are treated as secondary references; locomotion research is identified as ongoing scientific work.</p></div><div className="source-list">{dinosaur.references.map((reference, index) => <article className="source-row" id={`source-${reference.id}`} key={reference.id}><span className="source-index">[{String(index + 1).padStart(2, '0')}]</span><div><h3>{reference.title}</h3><p>{reference.author} · {reference.publisher}{reference.year ? ` · ${reference.year}` : ''}{reference.accessedAt ? ` · accessed ${reference.accessedAt}` : ''}</p><span className="source-kind">{reference.kind.toUpperCase()}</span></div><a href={reference.url} target="_blank" rel="noreferrer" aria-label={`Open source: ${reference.title}`}><ArrowUpRight size={17} /></a></article>)}</div><p className="access-note">ACCESS LINKS CHECKED OCTOBER 2026 · Scientific interpretations may change as new evidence and methods emerge.</p></section>

      <section className="model-provenance"><div className="section-kicker"><span>10</span> / DIGITAL SPECIMEN</div><div className="provenance-content"><div><h2>On this <i>model.</i></h2><p>The provided high-poly FBX and its base-color, normal, roughness and metallic texture maps are used directly in the 3D viewer. The files arrived without creator, source, license, verified scale, skeleton or animation metadata.</p></div><div className="provenance-status"><span>RECONSTRUCTION STATUS</span><b>EVIDENCE-INFORMED DISPLAY</b><span>RIG / WALK CYCLE</span><b>NOT PRESENT IN SUPPLIED FILE</b><span>ASSET RIGHTS</span><b>UNVERIFIED — PROVENANCE REQUIRED</b></div></div></section>

      <div className="specimen-next"><span>END OF RECORD / PVR—001</span><Link to="/archive">RETURN TO THE ARCHIVE <ArrowRight size={14} /></Link></div>
    </article>
  );
}
