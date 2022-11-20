import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import { Category, IInputField } from '../store/features/categorySlice';
import WbButton from '../components/WbButton';
import {
  addItem,
  deleteItem,
  IItem,
  updateItem,
} from '../store/features/itemsSlice';
import { v4 as uuidv4 } from 'uuid';
import WbItems from '../components/WbItems';

const TabThreeScreen = () => {
  const navigation = useNavigation();

  const { category } = useSelector((state: RootState) => state.category);
  const { items } = useSelector((state: RootState) => state.items);
  const { params }: any = useRoute();
  const selectedCategory: Category = category.find(
    (item: Category) => item.id === params.id
  );
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.name });
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  console.log(category);
  const handleAddItem = () => {
    const temp: any = {};
    selectedCategory.inputFields.forEach((el: IInputField) => {
      temp[el.value] =
        el.type == 'Checkbox' ? false : el.type === 'Date' ? new Date() : '';
    });
    const data: IItem = {
      id: uuidv4(),
      parentCategoryId: selectedCategory.id,
      ...temp,
    };
    dispatch(addItem(data));
  };
  const onRemoveItem = (id: string) => {
    dispatch(deleteItem(id));
  };
  const onUpdateItem = (id: string, field: string, data: string) => {
    const d = items.map((it: IItem) => {
      if (it.id === id) {
        it = { ...it, [field]: data };
      }
      return it;
    });
  };
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Title>{params.name}</Title>
        </View>
        <WbButton
          title='Add Item'
          onPress={handleAddItem}
          style={{
            backgroundColor: '#2979ff',
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
      </View>
      {items.map((it: IItem, i: number) => (
        <WbItems
          key={i}
          title={
            selectedCategory.inputFields[selectedCategory.titleSelected].value
          }
          inputs={selectedCategory.inputFields}
          data={it}
          onRemoveItem={onRemoveItem}
          onUpdateItem={(data, field) => onUpdateItem(it.id, field, data)}
        />
      ))}
    </View>
  );
};

export default TabThreeScreen;

const styles = StyleSheet.create({});
