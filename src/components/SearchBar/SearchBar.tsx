import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
  const [error, setError] = useState<string>('');

  return (
    <>
      <View style={Styles.container}>
        <TextInput
          style={Styles.input}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          placeholder={PLACEHOLDER_TEXT}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            if (!inputText) {
              return setError('Please enter a valid title');
            }

            setError('');
            navigation.navigate('MovieDetail', {
              title: inputText,
            });
            setInputText('');
            Keyboard.dismiss();
          }}
        >
          <Feather name="search" size={24} color="#fff" />
        </TouchableWithoutFeedback>
      </View>
      {error && <Text style={Styles.errMsg}>{error}</Text>}
    </>
  );
};

export default SearchBar;
