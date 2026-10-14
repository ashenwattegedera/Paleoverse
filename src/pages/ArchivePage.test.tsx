import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { ArchivePage } from './ArchivePage';

afterEach(cleanup);

describe('archive page', () => {
  it('renders the current specimen from the data registry', () => {
    render(<MemoryRouter><ArchivePage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
    expect(screen.getByText('PVR—001')).toBeInTheDocument();
  });

  it('searches and filters records and provides a clear empty state', () => {
    render(<MemoryRouter><ArchivePage /></MemoryRouter>);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search specimens' }), { target: { value: 'triceratops' } });
    expect(screen.getByText('NO MATCHING SPECIMENS')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'CLEAR FILTERS' }));
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by diet' }), { target: { value: 'herbivore' } });
    expect(screen.getByText('NO MATCHING SPECIMENS')).toBeInTheDocument();
  });
});
