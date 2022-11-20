import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { View } from '../components/Themed';
import WbButton from '../components/WbButton';
import WbCategories from '../components/WbCategories';
import { RootState } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import {
  addCategory,
  Category,
  deleteCategory,
} from '../store/features/categorySlice';
export default function TabOneScreen({ navigation }: any) {
  const { category } = useSelector((state: RootState) => state.category);

  const dispatch = useDispatch();
  const onAddCategory = () => {
    const data: Category = {
      id: uuidv4(),
      name: 'New Category',
      inputFields: [{ type: 'Text', value: '', id: uuidv4() }],
      titleSelected: 0,
    };
    dispatch(addCategory(data));
  };

  const onRemoveCategory = (i: string) => {
    dispatch(deleteCategory(i));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {category.map((data: Category, i: number) => {
        return (
          <WbCategories
            key={i}
            index={i}
            data={data}
            removeCategory={() => onRemoveCategory(data.id)}
          />
        );
      })}
      <View style={styles.categoryButton}>
        <WbButton
          title='Add New Category'
          onPress={onAddCategory}
          style={{
            backgroundColor: '#2979ff',
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexDirection: 'column',
    paddingBottom: '10%',
  },
  categoryButton: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: '5%',
    paddingBottom: '15%',
  },
});
