import { GestureResponderEvent, Pressable } from 'react-native';
import React from 'react';
import { EvilIcons } from '@expo/vector-icons';

const ResetButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable onPress={onPress ? onPress : () => {}}>
      <EvilIcons name="refresh" size={36} color="#fff" />
    </Pressable>
  );
};

export default ResetButton;
