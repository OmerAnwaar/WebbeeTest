import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInputFields,
  Category,
  IInputField,
  resetCategory,
  TInputFieldType,
  updateCategoryName,
  updateInputFieldsValue,
  updateSelectedTitle,
} from '../store/features/categorySlice';
import { AppDispatch, RootState } from '../store/store';
import NewInput from './NewInput';
import SelectionModal from './SelectionModal';
import TitleSelectionModal from './TitleSelectionModal';
import WbButton from './WbButton';
import { v4 as uuidv4 } from 'uuid';
interface ICategory {
  removeCategory?: any;
  data: Category;
  index: number;
}

const WbCategories = ({ removeCategory, data, index }: ICategory) => {
  const [text, setText] = useState<string>(data.name);
  const [modal, setModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<boolean>(false);
  const [inputList, setInputList] = useState<Array<IInputField>>(
    data.inputFields
  );
  const [titleField, setTitleField] = useState<number>(data.titleSelected);
  const dispatch = useDispatch<AppDispatch>();

  const onAddInput = (item: TInputFieldType) => {
    const newlyAddedValue: IInputField = {
      type: item,
      value: '',
      id: uuidv4(),
    };
    const addInput: Array<IInputField> = [...inputList, newlyAddedValue];
    setInputList(addInput);
    dispatch(addInputFields({ index, data: newlyAddedValue }));
    setModal(false);
  };

  const onRemoveInput = (i: number) => {
    const removeInput = [...inputList];
    removeInput.splice(i, 1);
    if (removeInput.length === 0) {
      setTitleField(-1);
      dispatch(updateSelectedTitle({ index, data: -1 }));
    }
    setInputList(removeInput);
    dispatch(updateSelectedTitle({ index, inputIndex: i }));
  };

  const handleChange = (onChangeValue: string, i: number, id: string) => {
    let inputData = [...inputList];
    inputData[i].value = onChangeValue;
    setInputList(inputData);
    dispatch(updateInputFieldsValue({ index, data: inputData }));
  };

  const handleSetTitleField = (i: number) => {
    setTitleField(i);
    dispatch(updateSelectedTitle({ index, data: i }));
    setTitleModal(false);
  };

  return (
    <View style={{ padding: '5%' }}>
      <Title style={{ fontSize: 16 }}>{text}</Title>
      <TextInput
        label='Category Name'
        mode='outlined'
        value={text}
        onChangeText={(text) => {
          setText(text);
          dispatch(updateCategoryName({ index, data: text }));
        }}
      />
      {inputList.map((data: IInputField, i: number) => {
        return (
          <NewInput
            key={i}
            value={data.value}
            onChange={(text: any) => handleChange(text, i, data.id)}
            fieldType={data.type}
            handleRemove={() => onRemoveInput(i)}
            placeholder={data.type}
          />
        );
      })}
      {modal && (
        <SelectionModal
          handleSelection={onAddInput}
          visible={modal}
          onHide={() => setModal(false)}
        />
      )}
      {titleModal && (
        <TitleSelectionModal
          data={inputList}
          handleSelection={handleSetTitleField}
          visible={titleModal}
          onHide={() => setTitleModal(false)}
        />
      )}
      <WbButton
        title={`Title Field' ${
          titleField === -1
            ? ':Unamed Fields'
            : inputList[titleField]?.value
            ? ':' + inputList[titleField].value
            : ':' + 'Unamed Fields'
        }`}
        onPress={() => {
          setTitleModal(true);
        }}
        style={{
          backgroundColor: '#00695f',
          borderRadius: 8,
          marginVertical: 8,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <WbButton
          title={'Add New Field'}
          onPress={() => {
            setModal(true);
          }}
          style={{
            backgroundColor: '#2979ff',
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
        <WbButton
          title={'Remove Category'}
          onPress={removeCategory}
          style={{
            backgroundColor: '#f50057',
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
      </View>
    </View>
  );
};

export default WbCategories;
