import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { IMovieSummary } from '../../constants/interfaces';
//@ts-ignore
import Styles from './MovieCard.scss';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MovieCard = ({ movie }: { movie: IMovieSummary }) => {
  const { Poster, Title, Year } = movie;
  const [isBrokenImage, setIsBrokenImage] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('MovieDetail', {
          imdbID: movie?.imdbID,
          headerTitle: movie?.Title,
        });
      }}
    >
      <View style={Styles.container}>
        {!isBrokenImage ? (
          <Image
            source={{ uri: Poster }}
            style={Styles.image}
            resizeMode="cover"
            onError={() => {
              // can be more elegent with the error handling
              // TODO add error handling for particaly broken images and network disconnection
              setIsBrokenImage(true);
            }}
          />
        ) : (
          <View style={Styles.brokenImage}>
            <MaterialCommunityIcons name="image-off" size={44} color="grey" />
          </View>
        )}
        <Text style={Styles.title}>{Title}</Text>
        <Text style={Styles.year}>{Year}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
