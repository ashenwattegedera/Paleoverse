import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Paleoverse home">
          <span className="wordmark-mark" aria-hidden="true">P</span>
          <span>PALEO<span className="wordmark-light">VERSE</span></span>
        </Link>
        <div className="header-index"><span className="status-dot" /> FIELD ARCHIVE <span className="header-divider">/</span> VOL. 01</div>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/archive" onClick={() => setMenuOpen(false)}>THE ARCHIVE</NavLink>
          <NavLink to="/specimens/tyrannosaurus-rex" onClick={() => setMenuOpen(false)}>SPECIMEN 001</NavLink>
          <Link className="nav-external" to="/specimens/tyrannosaurus-rex#sources" onClick={() => setMenuOpen(false)}>FIELD NOTES <ArrowUpRight size={13} /></Link>
        </nav>
        <div className="header-coordinate">45° 33′ N&nbsp;&nbsp; 103° 27′ W</div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <Link className="wordmark footer-mark" to="/"><span className="wordmark-mark">P</span><span>PALEO<span className="wordmark-light">VERSE</span></span></Link>
        <p>AN OPEN FIELD ARCHIVE FOR DEEP TIME.</p>
        <span className="footer-right">EARTH, BEFORE US&nbsp; · &nbsp;001 / 001</span>
      </footer>
    </div>
  );
}
