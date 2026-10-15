import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

function findHashTarget(hash: string): HTMLElement | null {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/** Mounted inside Suspense so lazy route content exists before focus/scroll work runs. */
export function RouteFrame({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const root = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, [number, number]>());
  const previous = useRef<{ pathname: string; hash: string } | null>(null);

  useLayoutEffect(() => {
    const priorRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = priorRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const previousLocation = previous.current;
    previous.current = { pathname: location.pathname, hash: location.hash };
    const pathnameChanged = previousLocation?.pathname !== location.pathname;
    const hashChanged = previousLocation?.hash !== location.hash;
    // Filtering is a URL update, not a new page. Preserve the input focus and reading position.
    if (pathnameChanged || hashChanged) {
      const target = location.hash ? findHashTarget(location.hash) : null;
      const heading = root.current?.querySelector<HTMLElement>('h1');
      const focusTarget = target ?? heading;
      if (focusTarget) {
        if (!focusTarget.hasAttribute('tabindex')) focusTarget.tabIndex = -1;
        focusTarget.focus({ preventScroll: true });
      }
      const saved = navigationType === 'POP' ? positions.current.get(location.key) : undefined;
      if (saved) window.scrollTo({ left: saved[0], top: saved[1], behavior: 'instant' });
      else if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    const key = location.key;
    const savedPositions = positions.current;
    return () => {
      savedPositions.set(key, [window.scrollX, window.scrollY]);
      // Session-only restoration should not grow without bound during long browsing sessions.
      if (savedPositions.size > 80) {
        const oldestKey = savedPositions.keys().next().value;
        if (oldestKey !== undefined) savedPositions.delete(oldestKey);
      }
    };
  }, [location.key, location.pathname, location.hash, navigationType]);

  return (
    <div ref={root}>
      <div key={location.pathname} className="route-page">
        {children}
      </div>
    </div>
  );
}
