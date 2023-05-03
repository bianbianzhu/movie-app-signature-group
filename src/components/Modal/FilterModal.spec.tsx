import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterModal from './FilterModal';

describe('FilterModal component', () => {
  it('renders correctly and closes when close button is pressed', () => {
    const setIsModalVisible = jest.fn();
    const setInputValue = jest.fn();
    const setIsAccumulating = jest.fn();
    const resetOtherValue = jest.fn();

    const { getByTestId, getByText } = render(
      <FilterModal
        isModelVisible={true}
        setIsModalVisible={setIsModalVisible}
        setInputValue={setInputValue}
        setIsAccumulating={setIsAccumulating}
        resetOtherValue={resetOtherValue}
      />
    );

    expect(getByTestId('modal-view')).toBeTruthy();
    expect(getByTestId('modal-input')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();

    fireEvent.press(getByTestId('close-btn'));

    expect(setIsModalVisible).toHaveBeenCalled();
  });

  it('shows error message if invalid year is entered', () => {
    const setIsModalVisible = jest.fn();
    const setInputValue = jest.fn();
    const setIsAccumulating = jest.fn();
    const resetOtherValue = jest.fn();

    const { getByTestId, getByText } = render(
      <FilterModal
        isModelVisible={true}
        setIsModalVisible={setIsModalVisible}
        setInputValue={setInputValue}
        setIsAccumulating={setIsAccumulating}
        resetOtherValue={resetOtherValue}
      />
    );

    fireEvent.changeText(getByTestId('modal-input'), '200');
    fireEvent.press(getByText('Submit'));

    expect(getByText('Please enter a valid year')).toBeTruthy();
  });

  it('calls the correct functions with the correct value when valid year is entered and submit button is pressed', () => {
    const setIsModalVisible = jest.fn();
    const setInputValue = jest.fn();
    const setIsAccumulating = jest.fn();
    const resetOtherValue = jest.fn();

    const { getByTestId, getByText } = render(
      <FilterModal
        isModelVisible={true}
        setIsModalVisible={setIsModalVisible}
        setInputValue={setInputValue}
        setIsAccumulating={setIsAccumulating}
        resetOtherValue={resetOtherValue}
      />
    );

    fireEvent.changeText(getByTestId('modal-input'), '2022');
    fireEvent.press(getByText('Submit'));

    expect(setIsModalVisible).toHaveBeenCalled();
    expect(setIsAccumulating).toHaveBeenCalledWith(false);
    expect(setInputValue).toHaveBeenCalledWith('2022');
    expect(getByTestId('modal-input').props.value).toBe('');
  });
});
