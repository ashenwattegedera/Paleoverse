import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { SiteShell } from './SiteShell';

afterEach(cleanup);

describe('shared navigation', () => {
  it('closes the menu on Escape and restores the menu button focus', () => {
    render(
      <MemoryRouter>
        <SiteShell>
          <h1>Example</h1>
        </SiteShell>
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
