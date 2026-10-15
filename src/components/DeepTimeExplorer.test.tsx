import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { DeepTimeExplorer } from './DeepTimeExplorer';

afterEach(cleanup);

describe('deep time explorer', () => {
  it('shows the published record at its known interval and updates the collection by age', () => {
    render(
      <MemoryRouter>
        <DeepTimeExplorer />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Tyrannosaurus rex' })).toHaveAttribute(
      'href',
      '/specimens/tyrannosaurus-rex',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Jurassic' }));
    expect(screen.getByRole('button', { name: 'Jurassic' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.queryByRole('link', { name: 'Tyrannosaurus rex' })).not.toBeInTheDocument();
    expect(screen.getByText(/No published records at this point yet/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('slider'), { target: { value: 185 } });
    expect(screen.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      '67 million years ago, Cretaceous',
    );
    expect(screen.getByRole('link', { name: 'Tyrannosaurus rex' })).toBeInTheDocument();
  });
});
