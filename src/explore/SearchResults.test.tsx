import React from 'react';
import SearchResults from './SearchResults';
import { render, screen, fireEvent } from '@testing-library/react';
import { getByTestId, getByText } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';

const sampleHitsProp: any = [
  {
    _index: 'graph',
    _type: 'doc',
    _id: 'college',
    _score: 1.05,
    _source: {
      title: 'Number of graduates by college'
    }
  }
];

test('Renders title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <SearchResults hits={sampleHitsProp} qry="college" />
    </MemoryRouter>
  );

  // Check that the correct page is being loaded respective to its URL
  const element = getByText('Number of graduates by college');
  expect(element).toBeInTheDocument();
});
