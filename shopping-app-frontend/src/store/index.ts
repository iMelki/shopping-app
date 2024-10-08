import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import productsReducer from './productsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import formSlice from "./formSlice";
// import productSlice from "./productSlice";

import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    form: formReducer,
    products: productsReducer,
  },
});

// Export custom hooks for dispatch and selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch: () => AppDispatch = () =>
// 	useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;