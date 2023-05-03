import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from './MovieCard';
import MovieDetailScreen from '../../screens/MovieDetailScreen/MovieDetailScreen';

const mockMovie = {
  Title: 'The Godfather',
  Year: '1972',
  Poster: 'http://example.com/poster.jpg',
  imdbID: 'tt0068646',
  Type: 'Adventure',
};

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

describe('MovieCard', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<MovieCard movie={mockMovie} />);

    expect(getByTestId('movie-card-container')).toBeDefined();
    expect(getByText('The Godfather')).toBeDefined();
    expect(getByText('1972')).toBeDefined();
    expect(getByTestId('movie-card-image')).toBeDefined();
    expect(getByTestId('movie-card-image').props.source).toEqual({
      uri: 'http://example.com/poster.jpg',
    });
  });
});
