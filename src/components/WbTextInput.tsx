import * as React from "react";
import { TextInput } from "react-native-paper";
import { onChange } from "react-native-reanimated";

interface ITextInput {
  value: string;
  onChange: any;
}
const WbTextInput = ({ value, onChange }: ITextInput) => {
  return <TextInput label="Email" value={value} onChangeText={onChange} />;
};
export default WbTextInput;
