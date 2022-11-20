import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type SelectionModalProps = {
  visible: boolean;
  onHide: () => void;
  value?: string;
  handleSelection?: any;
};

const types = ['Text', 'Checkbox', 'Date', 'Number'];

export default function SelectionModal({
  visible,
  onHide,
  value,
  handleSelection,
}: SelectionModalProps) {
  return (
    <Modal visible={visible} animationType={'slide'} transparent>
      <Pressable onPress={onHide} style={styles.modalContainer}>
        <View style={styles.container}>
          {types.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => handleSelection(item)}>
              <Text style={{ color: '#2979ff' }}>{item}</Text>
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
