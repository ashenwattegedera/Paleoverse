import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SpecimenPage } from './SpecimenPage';

vi.mock('../components/SpecimenViewer', () => ({
  SpecimenViewer: ({ profile }: { profile: { commonName: string } }) => <div aria-label={`${profile.commonName} 3D specimen viewer`} />,
}));

afterEach(cleanup);

function renderSpecimen(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><Routes><Route path="/specimens/:slug" element={<SpecimenPage />} /></Routes></MemoryRouter>);
}

describe('specimen record', () => {
  it('renders sourced T. rex measurements, locomotion caveat and evidence sections', async () => {
    renderSpecimen('/specimens/tyrannosaurus-rex');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tyrannosaurusrex.');
    await waitFor(() => expect(screen.getByLabelText('Tyrannosaurus rex 3D specimen viewer')).toBeInTheDocument());
    expect(screen.getByText('5–7')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A grounded, weight-bearing gait' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Growth written in bone' })).toBeInTheDocument();
    expect(screen.getByText(/REFERENCES & FURTHER READING/i)).toBeInTheDocument();
  });

  it('gives an explicit recovery path for unknown specimen routes', () => {
    renderSpecimen('/specimens/not-a-dinosaur');
    expect(screen.getByText('404 / RECORD NOT FOUND')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to the archive/i })).toHaveAttribute('href', '/archive');
  });
});
