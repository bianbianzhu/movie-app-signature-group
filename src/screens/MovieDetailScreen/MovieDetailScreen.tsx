import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSearchMovie from '../../hooks/useSearchMovie';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//@ts-ignore
import Styles from './MovieDetailScreen.scss';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MovieDetailScreen = ({ route }) => {
  const { imdbID, title }: { imdbID: string; title: string } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { movie, isLoading, error } = useSearchMovie(title, imdbID);
  const [isBrokenImage, setIsBrokenImage] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({ title: movie?.Title });
  }, [movie?.Title]);

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      {error ? (
        <Text style={Styles.errMsg}>{error}</Text>
      ) : isLoading ? (
        <ActivityIndicator
          size="large"
          color="grey"
          style={Styles.activityIndicator}
        />
      ) : (
        <>
          {!isBrokenImage ? (
            <Image
              source={{ uri: movie?.Poster }}
              style={Styles.image}
              resizeMode="cover"
              onError={() => {
                setIsBrokenImage(true);
              }}
            />
          ) : (
            <View style={Styles.brokenImage}>
              <MaterialCommunityIcons name="image-off" size={44} color="grey" />
            </View>
          )}
          <View style={Styles.descriptionContainer}>
            <Text style={Styles.subTitle}>Year: {movie?.Year}</Text>
            <Text style={Styles.subTitle}>Director: {movie?.Director}</Text>
          </View>
          <Text style={Styles.plot}>{movie?.Plot}</Text>
        </>
      )}
    </ScrollView>
  );
};

export default MovieDetailScreen;
