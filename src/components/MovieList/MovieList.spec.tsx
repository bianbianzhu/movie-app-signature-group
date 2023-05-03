import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import MovieList from './MovieList';

const movies = [
  {
    imdbID: 'tt0232500',
    Title: 'Movie 1',
    Poster: 'http://example.com/poster1.jpg',
    Year: '1999',
    Type: 'movie',
  },
  {
    imdbID: 'tt0458339',
    Title: 'Movie 2',
    Poster: 'http://example.com/poster2.jpg',
    Year: '2008',
    Type: 'movie',
  },
];

const mockedDispatch = jest.fn();

// Mocks like this need to be configured at the top level
// of the test file, they can't be setup inside your tests.
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

const setPage = jest.fn();

describe('MovieList', () => {
  it('renders movie cards', () => {
    const { getByText } = render(
      <MovieList movies={movies} setPage={setPage} />
    );
    const movie1 = getByText('Movie 1');
    const movie2 = getByText('Movie 2');
    expect(movie1).toBeTruthy();
    expect(movie2).toBeTruthy();
  });

  it('calls setPage function when Load More button is pressed', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <MovieList movies={movies} setPage={setPage} />
    );
    const loadMoreButton = getByText('Load More');
    fireEvent.press(loadMoreButton);
    expect(setPage).toHaveBeenCalled();
  });

  it('scrolls to top when Scroll to Top button is pressed', () => {
    const { getByTestId } = render(
      <MovieList movies={movies} setPage={setPage} />
    );
    const scrollToTopButton = getByTestId('scroll-to-top-button');
    fireEvent.press(scrollToTopButton);
    // Add assertion here to verify if the list has scrolled to top
  });
});
