import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouteFrame } from './RouteFrame';

function FilterInput() {
  const [, setParams] = useSearchParams();
  return <input aria-label="Filter" onChange={(event) => setParams({ q: event.target.value })} />;
}
function TestRoutes() {
  return (
    <RouteFrame>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Home</h1>
              <Link to="/archive">Archive</Link>
            </>
          }
        />
        <Route
          path="/archive"
          element={
            <>
              <h1>Archive index</h1>
              <FilterInput />
              <Link to="/record#sources">Sources</Link>
            </>
          }
        />
        <Route
          path="/record"
          element={
            <>
              <h1>Record</h1>
              <section id="sources">Research sources</section>
            </>
          }
        />
      </Routes>
    </RouteFrame>
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('route focus', () => {
  it('focuses the new page heading while filter changes leave the input focused', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter>
        <TestRoutes />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('link', { name: 'Archive' }));
    expect(screen.getByRole('heading', { name: 'Archive index' })).toHaveFocus();
    const input = screen.getByRole('textbox', { name: 'Filter' });
    input.focus();
    fireEvent.change(input, { target: { value: 'rex' } });
    expect(input).toHaveFocus();
  });

  it('focuses a cross-route hash target after its content renders', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    try {
      render(
        <MemoryRouter initialEntries={['/archive']}>
          <TestRoutes />
        </MemoryRouter>,
      );
      fireEvent.click(screen.getByRole('link', { name: 'Sources' }));
      expect(screen.getByText('Research sources')).toHaveFocus();
      expect(scrollIntoView).toHaveBeenCalled();
    } finally {
      HTMLElement.prototype.scrollIntoView = original;
    }
  });
});
