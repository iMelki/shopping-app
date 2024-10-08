import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

interface FormState {
	firstName: string;
	lastName: string;
	address: string;
	email: string;
	products: Product[]; // Array for storing selected products
}

const initialState: FormState = {
	firstName: "",
	lastName: "",
	address: "",
	email: "",
	products: [],
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		updateForm(state, action: PayloadAction<Partial<FormState>>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
