// productSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  stock: number;
  returnPolicy: string;
  id: number;
  title: string;
  price: number;
  thumbnail : string;
  description: string;
  images : string[];
  brand : string;
  discountPercentage : number;
  rating: number
  warrantyInformation : string;
  category : string
  // Add other relevant product fields here
}

interface ProductState {
  product: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  product: [],
  loading: false,
  error: '',
};

export const fetchProduct = createAsyncThunk<Product[]>(
  'productslice/fetchProduct',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    localStorage.setItem('products', JSON.stringify(response.data.products));
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: 'productslice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.product = [];
        state.error = 'API fetching Failed !';
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
