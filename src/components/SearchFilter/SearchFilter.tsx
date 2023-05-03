import { Pressable, GestureResponderEvent } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const SearchFilter = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable onPress={onPress ? onPress : () => {}}>
      <Feather name="filter" size={24} color="#fff" />
    </Pressable>
  );
};

export default SearchFilter;
