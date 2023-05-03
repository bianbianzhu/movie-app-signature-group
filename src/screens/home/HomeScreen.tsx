import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
//@ts-ignore
import Styles from './HomeScreen.scss';
import useFetchMovies from '../../hooks/useFetchMovies';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import FilterModal from '../../components/Modal/FilterModal';

const HomeScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<string>('');
  const { movies, error } = useFetchMovies(page, year);
  const [moviesList, setMoviesList] = useState([...movies]);
  const [isAccumulating, setIsAccumulating] = useState<boolean>(true);
  const [isModelVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (isAccumulating) {
      setMoviesList([...moviesList, ...movies]);
    } else {
      setMoviesList([...movies]);
    }
  }, [movies, isAccumulating]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SearchFilter onPress={() => setIsModalVisible(true)} />
      ),
    });
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <SearchBar />
      <FilterModal
        isModelVisible={isModelVisible}
        setIsModalVisible={setIsModalVisible}
        setInputValue={setYear}
        setIsAccumulating={setIsAccumulating}
      />
      {error ? (
        <>
          <Text style={Styles.errMsg}>{error}</Text>
          <Button
            title="Reset"
            onPress={() => {
              setYear('');
              setPage(1);
              setIsAccumulating(true);
              setIsModalVisible(false);
            }}
          />
        </>
      ) : (
        <MovieList movies={moviesList} setPage={setPage} />
      )}
    </View>
  );
};

export default HomeScreen;
