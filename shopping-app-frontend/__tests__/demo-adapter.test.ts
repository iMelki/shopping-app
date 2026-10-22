import axios from "axios";
import { demoAdapter } from "@/demo/adapter";
import { demoCategories } from "@/demo/fixtures";

describe("demo axios adapter", () => {
	const client = axios.create({ adapter: demoAdapter });

	beforeAll(() => {
		process.env.NEXT_PUBLIC_CATEGORIES_API_URL = "/demo-api/categories";
		process.env.NEXT_PUBLIC_ORDERS_API_URL = "/demo-api/orders";
	});

	it("answers the categories request from fixtures", async () => {
		const res = await client.get("/demo-api/categories");
		expect(res.status).toBe(200);
		expect(res.data).toEqual(demoCategories);
	});

	it("accepts an order without charging anything", async () => {
		const res = await client.post("/demo-api/orders", {
			fullName: "Sample Shopper",
			products: [{ id: "a", name: "Carrots", category: "Fruits & Vegetables" }],
		});
		expect(res.status).toBe(201);
		expect(res.data).toMatchObject({ itemCount: 1, charged: false });
		expect(res.data.id).toMatch(/^DEMO-\d{4}$/);
	});

	it("rejects any other request instead of reaching the network", async () => {
		await expect(client.get("https://example.invalid/anything")).rejects.toMatchObject({
			response: { status: 404 },
		});
	});
});
