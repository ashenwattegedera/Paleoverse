import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as registry from '../data/registry';
import { tyrannosaurus } from '../data/tyrannosaurus';
import { SpecimenPage } from './SpecimenPage';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderSpecimen(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/specimens/:slug" element={<SpecimenPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('specimen record', () => {
  it('renders an illustrated record with sourced measurements and no mandatory 3D viewer', () => {
    renderSpecimen('/specimens/tyrannosaurus-rex');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tyrannosaurusrex.');
    expect(screen.getByLabelText('Tyrannosaurus rex specimen plate')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('5–7')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'A grounded, weight-bearing gait' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Growth written in bone' })).toBeInTheDocument();
    expect(screen.getByText(/REFERENCES & FURTHER READING/i)).toBeInTheDocument();
    expect(document.querySelector('canvas')).toBeNull();
  });

  it('renders different data without carrying over T. rex measurements, region or labels', () => {
    vi.spyOn(registry, 'getDinosaurBySlug').mockReturnValue({
      ...tyrannosaurus,
      id: 'fixture-record',
      slug: 'fixture-record',
      archiveNumber: 'TEST—002',
      scientificName: 'Fixture animal',
      commonName: 'Fixture animal',
      group: 'Fixture group',
      period: 'Early Jurassic',
      ageRangeMa: [195, 190],
      range: 'Fixture region',
      summary: 'A synthetic record used to verify the reusable page.',
      measurements: {
        length: { displayValue: '≈ 2', unit: 'm', typicalValue: 2, sources: ['nhm-trex'] },
        note: 'Fixture estimate.',
      },
      media: undefined,
      geography: undefined,
      sections: [],
      anatomy: [],
      evidenceNotes: [],
    });
    renderSpecimen('/specimens/fixture-record');
    expect(screen.getByLabelText('Fixture animal estimated measurements')).toBeInTheDocument();
    expect(screen.getByText('Fixture region', { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByText('END OF RECORD / TEST—002')).toBeInTheDocument();
    expect(screen.getByText('≈ 2 m')).toBeInTheDocument();
    expect(screen.queryByText('5–7')).not.toBeInTheDocument();
    expect(screen.queryByText('HIP HEIGHT')).not.toBeInTheDocument();
    expect(screen.queryByText('BIPEDAL / MODELLED')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'LOCOMOTION' })).not.toBeInTheDocument();
    expect(screen.getByText('FROM THE WRITTEN RECORD')).toBeInTheDocument();
  });

  it('omits unestablished measurements and comparisons and keeps all record anchors valid', () => {
    vi.spyOn(registry, 'getDinosaurBySlug').mockReturnValue({
      ...tyrannosaurus,
      measurements: { note: 'Not established.' },
      sections: [],
      anatomy: [],
      evidenceNotes: [],
      media: undefined,
    });
    renderSpecimen('/specimens/tyrannosaurus-rex');
    expect(screen.queryByLabelText(/estimated measurements/)).not.toBeInTheDocument();
    expect(screen.queryByText('SCALE REFERENCE')).not.toBeInTheDocument();
    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
    }
  });

  it('adjusts the illustrative human reference without changing the recorded dinosaur measurements', () => {
    renderSpecimen('/specimens/tyrannosaurus-rex');
    fireEvent.change(screen.getByRole('slider', { name: /Human reference height/ }), {
      target: { value: '2' },
    });
    expect(document.querySelector('.comparison-control output')).toHaveTextContent('2.00 m');
    expect(document.querySelector('.human-row .scale-value')).toHaveTextContent('2 m');
    expect(screen.getByLabelText('Tyrannosaurus rex estimated measurements')).toHaveTextContent(
      '≈ 12',
    );
    expect(tyrannosaurus.measurements.length?.typicalValue).toBe(12);
  });

  it('gives an explicit recovery path for unknown specimen routes', () => {
    renderSpecimen('/specimens/not-a-dinosaur');
    expect(screen.getByText('404 / RECORD NOT FOUND')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to the archive/i })).toHaveAttribute(
      'href',
      '/archive',
    );
  });
});
