import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TPizza } from "./types";

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
