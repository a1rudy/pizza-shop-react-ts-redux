import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return (sum += item.price * item.count);
      }, 0);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state, action) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: string) => (state: RootState) => state.cartSlice.items.find((item) => item.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
