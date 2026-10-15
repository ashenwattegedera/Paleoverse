import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { dinosaurs } from '../data/registry';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const menuOpen = openMenuKey === location.key;
  const menuButton = useRef<HTMLButtonElement>(null);
  const featured = dinosaurs[0];
  const recordCount = String(dinosaurs.length).padStart(2, '0');
  useEffect(() => {
    if (!menuOpen) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenMenuKey(null);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', closeWithEscape);
    return () => document.removeEventListener('keydown', closeWithEscape);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="journal-header">
        <Link className="wordmark" to="/" aria-label="Paleoverse home">
          <span className="wordmark-mark" aria-hidden="true">
            P
          </span>
          <span>
            PALEO<span className="wordmark-light">VERSE</span>
          </span>
        </Link>
        <span className="journal-header-note">A FIELD GUIDE TO DEEP TIME</span>
        <button
          ref={menuButton}
          className="journal-menu-toggle"
          aria-controls="journal-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenMenuKey(menuOpen ? null : location.key)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav
          id="journal-navigation"
          className={`journal-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          <NavLink to="/archive" onClick={() => setOpenMenuKey(null)}>
            THE COLLECTION
          </NavLink>
          <Link to="/#deep-time" onClick={() => setOpenMenuKey(null)}>
            DEEP TIME
          </Link>
          {featured && (
            <Link to={`/specimens/${featured.slug}#sources`} onClick={() => setOpenMenuKey(null)}>
              FIELD NOTES <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="journal-footer">
        <div>
          <Link className="wordmark" to="/">
            <span className="wordmark-mark" aria-hidden="true">
              P
            </span>
            <span>PALEOVERSE</span>
          </Link>
          <p>Ancient lives. An unfinished story.</p>
        </div>
        <Link to="/archive">
          EXPLORE THE COLLECTION <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <span>
          {recordCount} SOURCED RECORD{dinosaurs.length === 1 ? '' : 'S'}
          <br />
          EARTH, BEFORE US.
        </span>
      </footer>
    </div>
  );
}
