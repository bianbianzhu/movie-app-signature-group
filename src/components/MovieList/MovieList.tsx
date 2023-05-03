import { View, FlatList, Button } from 'react-native';
import React, { useRef } from 'react';
import { IMovieSummary } from '../../constants/interfaces';
import MovieCard from '../MovieCard/MovieCard';
//@ts-ignore
import Styles from './MovieList.scss';
import LoadMoreButton from '../Buttons/LoadMoreButton/LoadMoreButton';
import ScrollToTopButton from '../Buttons/ScrollToTopButton/ScrollToTopButton';

const NUM_OF_COLUMNS = 2;

const MovieList = ({
  movies,
  setPage,
}: {
  movies: ReadonlyArray<IMovieSummary>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const movieListRef = useRef<FlatList<IMovieSummary>>(null);
  const keyExtractor = (item: IMovieSummary) => item?.imdbID;
  const renderItem = ({ item }: { item: IMovieSummary }) => (
    <MovieCard movie={item} />
  );

  const scrollToTop = () => {
    movieListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={Styles.container}>
      <FlatList
        ref={movieListRef}
        keyExtractor={keyExtractor}
        data={movies}
        renderItem={renderItem}
        numColumns={NUM_OF_COLUMNS}
        ListFooterComponent={
          <LoadMoreButton
            onPress={() => {
              setPage((prevPage) => prevPage + 1);
            }}
          />
        }
      />
      <ScrollToTopButton
        onPress={() => {
          scrollToTop();
        }}
      />
    </View>
  );
};

export default React.memo(MovieList);
