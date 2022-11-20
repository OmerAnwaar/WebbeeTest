import { createSlice } from '@reduxjs/toolkit';

export type TInputFieldType = 'Text' | 'Date' | 'Number' | 'Checkbox';

export interface IInputField {
  type: TInputFieldType;
  value: string;
  id: string;
}

export interface Category {
  name: string;
  titleSelected: number;
  inputFields: Array<IInputField>;
  id: string;
}

export type CategoryState = { category: Array<Category> };

const initialState: CategoryState = {
  category: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, { payload }) => {
      state.category.push(payload);
    },
    deleteCategory: (state, { payload }) => {
      state.category = state.category.filter((item) => item.id !== payload);
    },
    updateInputFieldsValue: (state, { payload }) => {
      state.category[payload.index].inputFields = payload.data;
    },
    addInputFields: (state, { payload }) => {
      state.category[payload.index].inputFields.push(payload.data);
    },
    deleteInputFields: (state, { payload }) => {
      state.category[payload.index].inputFields = state.category[
        payload.index
      ].inputFields.splice(payload.inputIndex, 1);
    },
    updateSelectedTitle: (state, { payload }) => {
      state.category[payload.index].titleSelected = payload.data;
    },
    updateCategoryName: (state, { payload }) => {
      state.category[payload.index].name = payload.data;
    },
    resetCategory: (state) => {
      state.category = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCategory,
  deleteCategory,
  resetCategory,
  updateInputFieldsValue,
  addInputFields,
  deleteInputFields,
  updateSelectedTitle,
  updateCategoryName,
} = categorySlice.actions;

export default categorySlice.reducer;
