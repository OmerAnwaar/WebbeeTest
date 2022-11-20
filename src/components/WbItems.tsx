import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { IItem } from '../store/features/itemsSlice';
import { Checkbox, TextInput, Title } from 'react-native-paper';
import { IInputField } from '../store/features/categorySlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import WbButton from './WbButton';
interface IWbItems {
  data: IItem;
  title: string;
  inputs: Array<IInputField>;
  onRemoveItem(id: String): void;
  onUpdateItem(data: string, field: string): void;
}

const WbItems = ({
  data,
  title,
  inputs,
  onRemoveItem,
  onUpdateItem,
}: IWbItems) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 8, marginTop: 8 }}>
      <Title>{title}</Title>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {inputs.map((item: IInputField, i: number) => {
        return (
          <React.Fragment key={i}>
            {(item.type === 'Text' || item.type === 'Number') && (
              <TextInput
                value={data[item.value]}
                keyboardType={item.type === 'Number' ? 'number-pad' : 'default'}
                placeholder={item.value}
                mode={'outlined'}
              />
            )}
            {item.type === 'Date' && (
              <Pressable
                onPress={showDatePicker}
                style={{
                  backgroundColor: '#ede7f6',
                  height: 55,
                  padding: 10,
                  borderBottomColor: '#7D67AA',
                  borderBottomWidth: 1,
                }}
              >
                <Title>{moment(data[item.value]).format('L')}</Title>
              </Pressable>
            )}
            {item.type === 'Checkbox' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 55,
                }}
              >
                <Checkbox.Android
                  status={data[item.value] ? 'checked' : 'unchecked'}
                  onPress={() => {}}
                />
                <View>
                  <Text>{item.value}</Text>
                </View>
              </View>
            )}
          </React.Fragment>
        );
      })}
      <WbButton
        title='Remove Item'
        onPress={() => onRemoveItem(data.id)}
        style={{
          backgroundColor: '#f50057',
          borderRadius: 8,
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default WbItems;

const styles = StyleSheet.create({});
