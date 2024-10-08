import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearProducts } from "@/store/productsSlice";
import { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/router";

interface OrderDetails {
	fullName: string;
	address: string;
	email: string;
	products: Record<string, string[]>;
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

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await axios.post(process.env.NEXT_PUBLIC_ORDERS_API_URL!, {
				fullName: form.fullName,
				address: form.address,
				email: form.email,
				products: selectedProducts,
			});
			alert("Order placed successfully!");
			dispatch(clearProducts());
			router.push("/");
		} catch (error) {
			console.error("Error placing order:", error);
			alert("Failed to place order.");
		}
	};

	const productsList = Object.entries(selectedProducts).map(
		([category, products]) => ({
			category,
			products,
		})
	);

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
							{item.products.map((prod, idx) => (
								<li key={idx}>{prod}</li>
							))}
						</ul>
					</div>
				))
			)}
			<hr />
			<h2>Order Details</h2>
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
