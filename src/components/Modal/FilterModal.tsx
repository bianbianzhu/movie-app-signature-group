import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
//@ts-ignore
import Styles from './FilterModal.scss';
import { EvilIcons } from '@expo/vector-icons';

const PLACEHOLDER_TEXT = 'Enter a year...';
const regex = /^(19\d\d|20[01-9]\d|202[0-3])$/;

const FilterModal = ({
  isModelVisible,
  setIsModalVisible,
  setInputValue,
  setIsAccumulating,
}: {
  isModelVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<any>>;
  setIsAccumulating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModelVisible}
      onRequestClose={() => {
        setIsModalVisible((pre) => !pre);
      }}
      testID="modal-view"
    >
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Pressable
            onPress={() => {
              setIsModalVisible((pre) => !pre);
              setInputText('');
              setError('');
            }}
            style={Styles.closeBtn}
            testID="close-btn"
          >
            <EvilIcons name="close" size={36} color="black" />
          </Pressable>
          <TextInput
            style={Styles.input}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            placeholder={PLACEHOLDER_TEXT}
            keyboardType="numeric"
            placeholderTextColor={'#6f6f6f'}
            testID="modal-input"
          />
          {error && <Text style={Styles.errMsg}>{error}</Text>}
          <Pressable
            style={Styles.button}
            onPress={() => {
              if (!regex.test(inputText)) {
                return setError('Please enter a valid year');
              }

              setIsModalVisible((pre) => !pre);
              setIsAccumulating(false);
              setInputValue(inputText);
              setInputText('');
              setError('');
            }}
          >
            <Text style={Styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
