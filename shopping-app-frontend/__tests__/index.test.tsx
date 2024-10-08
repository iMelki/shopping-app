import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "../pages/index";
import { Provider } from "react-redux";
import { store } from "@/store";

describe("ShoppingCart", () => {
	it("renders Shopping Cart page", () => {
		render(
			<Provider store={store}>
				<ShoppingCart />
			</Provider>
		);
		expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
	});

	it("allows adding a product", () => {
		render(
			<Provider store={store}>
				<ShoppingCart />
			</Provider>
		);

		// Mock categories
		store.dispatch({
			type: "categories/fetchCategories/fulfilled",
			payload: [
				{ id: 1, name: "Dairy" },
				{ id: 2, name: "Meat" },
				{ id: 3, name: "Fruits & Vegetables" },
			],
		});

		const categorySelect = screen.getByLabelText("Product Category:");
		fireEvent.change(categorySelect, { target: { value: "Dairy" } });

		const productInput = screen.getByLabelText("Product Name:");
		fireEvent.change(productInput, { target: { value: "Milk" } });

		const addButton = screen.getByText("Add Product");
		fireEvent.click(addButton);

		expect(screen.getByText("Milk")).toBeInTheDocument();
	});
});
