import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { ArchivePage } from './ArchivePage';

afterEach(cleanup);

describe('archive page', () => {
  it('renders the current specimen from the data registry', () => {
    render(
      <MemoryRouter>
        <ArchivePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
    expect(screen.getByText('PVR—001')).toBeInTheDocument();
  });

  it('searches and filters records and provides a clear empty state', () => {
    render(
      <MemoryRouter>
        <ArchivePage />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByRole('textbox', { name: 'Search specimens' }), {
      target: { value: 'triceratops' },
    });
    expect(screen.getByText('NO MATCHING SPECIMENS')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'CLEAR FILTERS' }));
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by diet' }), {
      target: { value: 'carnivore' },
    });
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by dinosaur group' }), {
      target: { value: 'theropoda' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: 'Sort specimens alphabetically' }), {
      target: { value: 'desc' },
    });
    expect(screen.getByRole('heading', { name: /tyrannosaurus rex/i })).toBeInTheDocument();
  });
});

describe('archive links', () => {
  it('restores search and filter controls from a shared URL', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/archive?q=rex&diet=carnivore&period=late+cretaceous&group=theropoda&sort=desc',
        ]}
      >
        <ArchivePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('textbox', { name: 'Search specimens' })).toHaveValue('rex');
    expect(screen.getByRole('combobox', { name: 'Filter by diet' })).toHaveValue('carnivore');
    expect(screen.getByRole('combobox', { name: 'Filter by geological period' })).toHaveValue(
      'late cretaceous',
    );
    expect(screen.getByRole('combobox', { name: 'Filter by dinosaur group' })).toHaveValue(
      'theropoda',
    );
    expect(screen.getByRole('combobox', { name: 'Sort specimens alphabetically' })).toHaveValue(
      'desc',
    );
    expect(screen.getByRole('status')).toHaveTextContent('1 record matching your selection');
  });
  it('keeps search focus and announces an empty collection after updating the query', () => {
    render(
      <MemoryRouter initialEntries={['/archive']}>
        <ArchivePage />
      </MemoryRouter>,
    );
    const input = screen.getByRole('textbox', { name: 'Search specimens' });
    input.focus();
    fireEvent.change(input, { target: { value: 'no such dinosaur' } });
    expect(input).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('0 records matching your selection');
    fireEvent.click(screen.getByRole('button', { name: 'CLEAR FILTERS' }));
    expect(screen.getByRole('textbox', { name: 'Search specimens' })).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent('1 record ready to explore');
    expect(screen.getByRole('textbox', { name: 'Search specimens' })).toHaveFocus();
  });
});
