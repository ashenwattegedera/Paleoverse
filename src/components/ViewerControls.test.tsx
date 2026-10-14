import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ViewerControls, type ViewAngle } from './ViewerControls';

afterEach(cleanup);

function InteractiveControls() {
  const [angle, setAngle] = useState<ViewAngle>('three-quarter');
  const [gridVisible, setGridVisible] = useState(false);
  return <ViewerControls angle={angle} onAngleChange={setAngle} gridVisible={gridVisible} onGridToggle={() => setGridVisible((value) => !value)} onReset={() => setAngle('three-quarter')} onFullscreen={vi.fn()} />;
}

describe('viewer controls', () => {
  it('updates the actual selected view and reference-grid state', () => {
    render(<InteractiveControls />);
    fireEvent.click(screen.getByRole('button', { name: 'SIDE' }));
    expect(screen.getByRole('button', { name: 'SIDE' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle reference grid' }));
    expect(screen.getByRole('button', { name: 'Toggle reference grid' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Reset camera' }));
    expect(screen.getByRole('button', { name: 'SIDE' })).toHaveAttribute('aria-pressed', 'false');
  });
});
