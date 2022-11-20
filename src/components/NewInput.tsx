import * as React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface ITextInput {
  value: string;
  onChange: any;
  fieldType: string;
  handleRemove?: any;
  placeholder?: string;
}
const NewInput = ({
  value,
  onChange,
  fieldType,
  handleRemove,
  placeholder,
}: ITextInput) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextInput
        mode='outlined'
        style={{ width: '70%', marginVertical: '1%' }}
        label='Field'
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
      <Text>{fieldType}</Text>
      <MaterialIcons
        name='delete'
        size={24}
        color='black'
        onPress={handleRemove}
      />
    </View>
  );
};
export default NewInput;
