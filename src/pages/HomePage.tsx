import { ArrowDown, ArrowRight, ArrowUpRight, Orbit, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { tyrannosaurus } from '../data/tyrannosaurus';

export function HomePage() {
  useEffect(() => { document.title = 'PALEOVERSE — Earth, before us.'; }, []);
  return (
    <div className="home-page">
      <section className="home-hero page-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> AN ARCHIVE OF ANCIENT LIFE <span className="eyebrow-index">FIELD RECORD / 01</span></div>
          <h1>EARTH,<br /><span>BEFORE</span><br /><i>US.</i></h1>
          <p className="hero-lede">An atlas of deep time. Enter the world of <em>Tyrannosaurus rex</em> through evidence, motion and the traces left in stone.</p>
          <Link className="button button-amber" to="/specimens/tyrannosaurus-rex">ENTER THE SPECIMEN <ArrowRight size={16} /></Link>
          <div className="hero-caption"><span className="caption-rule" /> LATE CRETACEOUS &nbsp;·&nbsp; 68—66 MILLION YEARS AGO</div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-halo orbit-halo-a" /><div className="orbit-halo orbit-halo-b" />
          <div className="planet-disc"><span className="planet-latitude" /><span className="planet-longitude" /><span className="planet-land" /></div>
          <div className="orbital-path"><span className="orbit-marker" /></div>
          <div className="hero-crosshair crosshair-top">45° 33′ N</div><div className="hero-crosshair crosshair-bottom">LARAMIDIA / WESTERN INTERIOR</div>
          <div className="specimen-silhouette" />
          <span className="hero-callout callout-skull">TYRANNOSAURIDAE <i>— 01</i></span>
          <span className="hero-callout callout-time">~ 66 Ma <i>GEOLOGICAL PRESENT</i></span>
          <div className="hero-scan"><ScanLine size={14} /> RECONSTRUCTION / EVIDENCE-INFORMED</div>
          <div className="hero-vertical-label">MESOZOIC <b>·</b> LATE CRETACEOUS</div>
        </div>
        <div className="hero-foot"><span>SCROLL TO DESCEND <ArrowDown size={13} /></span><span>45° 33′ N / 103° 27′ W</span><span>01 — 03</span></div>
      </section>

      <section className="home-intro page-wrap">
        <div className="section-kicker"><span>01</span> / THE ARCHIVE</div>
        <div className="intro-content">
          <p className="display-copy">Not a world lost.<br /><span>A world <i>preserved.</i></span></p>
          <div className="intro-aside"><p>Every specimen is a meeting between what the rocks tell us and what remains unknown. This archive makes that boundary visible.</p><Link className="text-link" to="/archive">EXPLORE THE COLLECTION <ArrowUpRight size={14} /></Link></div>
        </div>
        <div className="strata-line"><span>66 Ma</span><i /><i /><i /><i /><i /><i /><b>NOW</b></div>
      </section>

      <section className="featured-section page-wrap">
        <div className="section-heading"><div><div className="section-kicker"><span>02</span> / FEATURED SPECIMEN</div><h2>A life, <i>reconstructed.</i></h2></div><span className="section-note">ONE OF THE FINAL TITANS<br />OF THE CRETACEOUS</span></div>
        <Link to="/specimens/tyrannosaurus-rex" className="featured-record">
          <div className="featured-art">
            <div className="featured-orbit" /><div className="featured-terrain" /><div className="featured-dino-mark" />
            <div className="featured-toplabel"><span>{tyrannosaurus.archiveNumber}</span><span>SPECIES RECORD / 01</span></div>
            <span className="art-coordinate">MONTANA FORMATION / NORTH AMERICA</span>
            <div className="featured-image-index">01<span>—</span>01</div>
          </div>
          <div className="featured-info">
            <div className="micro-label">THEROPODA &nbsp;·&nbsp; LATE CRETACEOUS</div>
            <h3>Tyrannosaurus<br /><i>rex</i></h3>
            <p>{tyrannosaurus.summary}</p>
            <div className="featured-stats"><div><small>LENGTH</small><b>≈ 12 <sup>M</sup></b></div><div><small>EST. MASS</small><b>5–7 <sup>T</sup></b></div><div><small>DIET</small><b>CARNIVORE</b></div></div>
            <span className="featured-action">OPEN FIELD RECORD <ArrowRight size={16} /></span>
          </div>
        </Link>
      </section>

      <section className="time-section">
        <div className="page-wrap time-inner">
          <div className="section-kicker"><span>03</span> / GEOLOGICAL CONTEXT</div>
          <div className="time-heading"><h2>Deep time<br /><i>has a scale.</i></h2><p>Non-avian dinosaurs inhabited Earth for more than 160 million years. <em>T. rex</em> arrived near the very end.</p></div>
          <div className="era-timeline" aria-label="Geological timeline showing Tyrannosaurus rex in the Late Cretaceous">
            <div className="era-labels"><span>MESOZOIC ERA <small>~252—66 Ma</small></span><span>THE AGE OF DINOSAURS</span><span>66 Ma <small>END-CRETACEOUS</small></span></div>
            <div className="era-bar"><span className="era-triassic">TRIASSIC</span><span className="era-jurassic">JURASSIC</span><span className="era-cretaceous">CRETACEOUS</span><span className="trex-time-marker"><i /><b>T. REX</b><small>68—66 Ma</small></span></div>
            <div className="era-dates"><span>252 Ma</span><span>201 Ma</span><span>145 Ma</span><span>66 Ma</span></div>
          </div>
          <div className="time-footnote"><Orbit size={14} /><span>GEOLOGICAL DATES ARE APPROXIMATE · SCALE REPRESENTS THE MESOZOIC ERA</span><Link to="/specimens/tyrannosaurus-rex">READ THE FIELD NOTES <ArrowRight size={13} /></Link></div>
        </div>
      </section>

      <section className="home-outro page-wrap">
        <div className="outro-mark">PVR<span>—</span>001</div><div><div className="section-kicker">THE RECORD BEGINS HERE</div><h2>Follow the<br /><i>evidence.</i></h2></div>
        <Link to="/specimens/tyrannosaurus-rex" className="round-link" aria-label="Explore Tyrannosaurus rex"><ArrowUpRight size={21} /></Link>
        <p>From fossil traces to living hypotheses, enter the complete Tyrannosaurus rex specimen record.</p>
      </section>
    </div>
  );
}
