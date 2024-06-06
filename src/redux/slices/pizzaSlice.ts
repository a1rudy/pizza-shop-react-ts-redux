import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<TPizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<TPizza[]>(
      `https://6633a521f7d50bbd9b4a2e13.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
};

export type TSearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TPizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
