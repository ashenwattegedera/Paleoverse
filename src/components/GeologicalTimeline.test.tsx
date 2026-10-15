import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GeologicalTimeline } from './GeologicalTimeline';

afterEach(cleanup);

describe('geological context', () => {
  it('uses Mesozoic context for an interval within its display range', () => {
    render(<GeologicalTimeline name="Example" period="Late Cretaceous" ageRangeMa={[68, 66]} />);
    expect(screen.getByText('MESOZOIC CONTEXT')).toBeInTheDocument();
    expect(screen.getByLabelText('Example: 68 to 66 million years ago')).toBeInTheDocument();
  });

  it('expands to fit an interval outside the Mesozoic without mislabelling it', () => {
    render(<GeologicalTimeline name="Example" period="Other period" ageRangeMa={[300, 280]} />);
    expect(screen.queryByText('MESOZOIC CONTEXT')).not.toBeInTheDocument();
    expect(screen.getByText('305–275 MILLION YEARS AGO')).toBeInTheDocument();
    expect(screen.getByText('300–280 Ma / OTHER PERIOD')).toBeInTheDocument();
  });
});
