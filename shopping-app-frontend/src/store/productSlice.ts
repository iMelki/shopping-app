// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// interface Product {
// 	id: string;
// 	name: string;
// 	category: string;
// }

// interface ProductState {
// 	productList: Product[];
// }

// const initialState: ProductState = {
// 	productList: [],
// };

// const productSlice = createSlice({
// 	name: "products",
// 	initialState,
// 	reducers: {
// 		addProduct(
// 			state,
// 			action: PayloadAction<{ name: string; category: string }>
// 		) {
// 			state.productList.push({
// 				id: uuidv4(),
// 				name: action.payload.name,
// 				category: action.payload.category,
// 			});
// 		},
// 	},
// });

// export const { addProduct } = productSlice.actions;
// export default productSlice.reducer;
