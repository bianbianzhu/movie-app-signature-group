import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
//@ts-ignore
import Styles from './HomeScreen.scss';
import useFetchMovies from '../../hooks/useFetchMovies';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomeScreen = () => {
  const [page, setPage] = useState<number>(1);
  const { movies, error } = useFetchMovies(page);
  const [moviesList, setMoviesList] = useState([...movies]);

  useEffect(() => {
    setMoviesList([...moviesList, ...movies]);
  }, [movies]);

  return (
    <View style={Styles.container}>
      <SearchBar />

      {error ? (
        <Text style={Styles.errMsg}>{error}</Text>
      ) : (
        <MovieList movies={moviesList} setPage={setPage} />
      )}
    </View>
  );
};

export default HomeScreen;
