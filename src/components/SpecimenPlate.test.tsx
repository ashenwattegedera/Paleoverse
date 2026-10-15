import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { tyrannosaurus } from '../data/tyrannosaurus';
import { SpecimenPlate } from './SpecimenPlate';

afterEach(cleanup);

describe('specimen plate', () => {
  it('renders the illustration with accessible text and a reconstruction caveat', () => {
    render(<SpecimenPlate profile={tyrannosaurus} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/illustrations/tyrannosaurus-rex.webp');
    expect(screen.getByRole('img')).toHaveAccessibleName(/side-profile reconstruction/i);
    expect(screen.getByText(/not an anatomical diagram/i)).toBeInTheDocument();
  });

  it('provides an intentional written-record plate when media is absent', () => {
    render(<SpecimenPlate profile={{ ...tyrannosaurus, media: undefined }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('FROM THE WRITTEN RECORD')).toBeInTheDocument();
    expect(screen.getByText(/illustrated plate has not yet been added/i)).toBeInTheDocument();
  });

  it('recovers from a broken illustration and can show a replacement image', () => {
    const { rerender } = render(<SpecimenPlate profile={tyrannosaurus} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/Illustration unavailable/i)).toBeInTheDocument();
    rerender(
      <SpecimenPlate
        profile={{
          ...tyrannosaurus,
          media: {
            illustration: {
              ...tyrannosaurus.media!.illustration!,
              src: '/illustrations/replacement.webp',
            },
          },
        }}
      />,
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', '/illustrations/replacement.webp');
  });
});
