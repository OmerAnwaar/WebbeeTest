import { createSlice } from '@reduxjs/toolkit';

export interface IItem {
  parentCategoryId: string;
  id: string;
  [key: string]: string;
}

export type CategoryState = { items: Array<IItem> };

const initialState: CategoryState = {
  items: [],
};

export const categorySlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      state.items.push(payload);
    },
    deleteItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    updateItem: (state, { payload }) => {
      state.items = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, deleteItem, updateItem } = categorySlice.actions;

export default categorySlice.reducer;
