import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './cart/slices';
import filterSlice from './filter/slices';
import pizzaSlice from './pizza/slices';

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
