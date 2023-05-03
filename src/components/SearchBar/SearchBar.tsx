import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
//@ts-ignore
import Styles from './SearchBar.scss';
import { Feather } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PLACEHOLDER_TEXT = 'Search by title';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        placeholder={PLACEHOLDER_TEXT}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MovieDetail', {
            title: inputText,
          });
        }}
      >
        <Feather name="search" size={24} color="#fff" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SearchBar;
