import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { tyrannosaurus } from '../data/tyrannosaurus';
import { RelatedRecords } from './RelatedRecords';

afterEach(cleanup);

describe('related records', () => {
  it('links to another available record with a transparent reason', () => {
    render(
      <MemoryRouter>
        <RelatedRecords profile={tyrannosaurus} />
      </MemoryRouter>,
    );
    const region = screen.getByRole('region', { name: 'Follow another thread.' });
    expect(within(region).getByRole('link')).toHaveAttribute('href', '/specimens/triceratops');
    expect(region).toHaveTextContent('Same period: Late Cretaceous');
    expect(region).toHaveTextContent('do not establish a direct encounter');
  });
  it('omits the section when no catalog relationship exists', () => {
    render(
      <MemoryRouter>
        <RelatedRecords
          profile={{
            ...tyrannosaurus,
            id: 'unrelated',
            slug: 'unrelated',
            group: 'Other',
            period: 'Other',
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
