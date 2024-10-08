import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "@/types";

export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async () => {
		const response = await axios.get<Category[]>(
			process.env.NEXT_PUBLIC_CATEGORIES_API_URL!
		);
		return response.data;
	}
);

interface CategoriesState {
	items: Category[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: CategoriesState = {
	items: [],
	status: "idle",
	error: null,
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch categories";
			});
	},
});

export default categoriesSlice.reducer;
