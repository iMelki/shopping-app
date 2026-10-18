import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearProducts, Product } from "@/store/productsSlice";
import { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/router";
// Demo builds only (null otherwise): checkout ends on an in-page confirmation.
import { demo } from "@/demo/entry";
import type { PlacedDemoOrder } from "@/demo/types";

interface OrderDetails {
	fullName: string;
	address: string;
	email: string;
	products: Product[];
}

const OrderPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const selectedProducts = useSelector(
		(state: RootState) => state.products.selectedProducts
	);
	const [form, setForm] = useState<OrderDetails>({
		fullName: "",
		address: "",
		email: "",
		products: selectedProducts,
	});
	const [placedOrder, setPlacedOrder] =
		useState<PlacedDemoOrder | null>(null);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(process.env.NEXT_PUBLIC_ORDERS_API_URL!, {
				fullName: form.fullName,
				address: form.address,
				email: form.email,
				products: selectedProducts,
			});
			if (demo) {
				setPlacedOrder({ id: response.data.id, products: selectedProducts });
				dispatch(clearProducts());
				return;
			}
			alert("Order placed successfully!");
			dispatch(clearProducts());
			router.push("/");
		} catch (error) {
			console.error("Error placing order:", error);
			alert("Failed to place order.");
		}
	};

	const productsList = Object.entries(
		selectedProducts.reduce<Record<string, Product[]>>((acc, product) => {
			(acc[product.category] ||= []).push(product);
			return acc;
		}, {})
	).map(([category, products]) => ({
		category,
		products,
	}));

	if (demo && placedOrder) {
		return (
			<demo.DemoOrderPlaced
				order={placedOrder}
				onDone={() => router.push("/")}
			/>
		);
	}

	return (
		<div style={{ padding: "20px" }}>
			<h1>Order Page</h1>
			<h2>Selected Products</h2>
			{productsList.length === 0 ? (
				<p>No products selected.</p>
			) : (
				productsList.map((item) => (
					<div key={item.category}>
						<h3>{item.category}</h3>
						<ul>
							{item.products.map((prod) => (
								<li key={prod.id}>{prod.name}</li>
							))}
						</ul>
					</div>
				))
			)}
			<hr />
			<h2>Order Details</h2>
			{demo && <demo.DemoCheckoutNote />}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="fullName">Full Name: </label>
					<input
						id="fullName"
						type="text"
						name="fullName"
						value={form.fullName}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="address">Address: </label>
					<textarea
						id="address"
						name="address"
						value={form.address}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<div>
					<label htmlFor="email">Email Address: </label>
					<input
						id="email"
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={productsList.length === 0}>
					Submit Order
				</button>
			</form>
		</div>
	);
};

export default OrderPage;
