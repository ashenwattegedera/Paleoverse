import { Expand, Focus, Grid2X2, RotateCcw } from 'lucide-react';

export type ViewAngle = 'three-quarter' | 'side' | 'front';

interface ViewerControlsProps {
  angle: ViewAngle;
  onAngleChange: (angle: ViewAngle) => void;
  gridVisible: boolean;
  onGridToggle: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

export function ViewerControls({ angle, onAngleChange, gridVisible, onGridToggle, onReset, onFullscreen }: ViewerControlsProps) {
  return (
    <div className="viewer-controls">
      <div className="viewer-controls-note"><span className="control-glyph">↻</span><span>DRAG TO ORBIT<br /><small>SCROLL TO ZOOM</small></span></div>
      <div className="control-group" aria-label="Camera views">
        <button className={angle === 'three-quarter' ? 'selected' : ''} aria-pressed={angle === 'three-quarter'} onClick={onReset}><Focus size={14} /><span>RESET</span></button>
        <button className={angle === 'side' ? 'selected' : ''} aria-pressed={angle === 'side'} onClick={() => onAngleChange('side')}>SIDE</button>
        <button className={angle === 'front' ? 'selected' : ''} aria-pressed={angle === 'front'} onClick={() => onAngleChange('front')}>FRONT</button>
        <button className={gridVisible ? 'selected' : ''} aria-label="Toggle reference grid" aria-pressed={gridVisible} onClick={onGridToggle}><Grid2X2 size={14} /></button>
        <button aria-label="View fullscreen" onClick={onFullscreen}><Expand size={14} /></button>
      </div>
      <button className="viewer-reset" aria-label="Reset camera" onClick={onReset}><RotateCcw size={14} /></button>
    </div>
  );
}
