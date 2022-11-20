import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IInputField } from '../store/features/categorySlice';

export type SelectionModalProps = {
  visible: boolean;
  onHide: () => void;
  value?: string;
  handleSelection?: any;
  data: Array<IInputField>;
};

const types = ['Text', 'Checkbox', 'Date', 'Number'];

export default function TitleSelectionModal({
  visible,
  onHide,
  value,
  handleSelection,
  data,
}: SelectionModalProps) {
  return (
    <Modal visible={visible} transparent animationType={'slide'}>
      <Pressable onPress={onHide} style={styles.modalContainer}>
        <View style={styles.container}>
          {data.map((item: any, i) => (
            <TouchableOpacity key={i} onPress={() => handleSelection(i)}>
              <Text style={{ color: '#2979ff' }}>
                {item.value ? item.value : 'Unamed Fields ' + (i + 1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 200,
    width: 200,
    padding: '4%',
    alignItems: 'flex-start',
    backgroundColor: '#eeeeee',
    justifyContent: 'space-evenly',
    borderRadius: 4,
  },
});
