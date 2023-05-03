import { Button, GestureResponderEvent, View } from 'react-native';
import React from 'react';
//@ts-ignore
import Styles from './LoadMoreButton.scss';

const LoadMoreButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={Styles.wrapper}>
      <Button title="Load More" onPress={onPress} color={'#ffff'} />
    </View>
  );
};

export default LoadMoreButton;
