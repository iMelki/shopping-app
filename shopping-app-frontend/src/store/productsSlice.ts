import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  category: string;
  name: string;
}

interface ProductsState {
  selectedProducts: Product[];
}

const initialState: ProductsState = {
  selectedProducts: [],
};

interface AddProductPayload {
  product: Product;
}

interface RemoveProductPayload {
  productId: string;
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductPayload>) => {
      state.selectedProducts.push(action.payload.product);
    },
    removeProduct: (state, action: PayloadAction<RemoveProductPayload>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload.productId
      );
    },
    clearProducts: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
