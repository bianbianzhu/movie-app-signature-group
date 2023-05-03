import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
//@ts-ignore
import Styles from './ScrollToTopButton.scss';
import { Ionicons } from '@expo/vector-icons';

const ScrollToTopButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={Styles.wrapper}>
        <Ionicons name="caret-up-outline" size={24} color="#f7931d" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScrollToTopButton;
