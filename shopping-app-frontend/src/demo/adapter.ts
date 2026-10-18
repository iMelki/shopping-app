// In-browser stand-in for the categories API and the orders service.
// Installed only in demo builds (NEXT_PUBLIC_DEMO_MODE=1); every axios call is
// answered here, so the demo never opens a network connection to a backend.
import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { demoCategories } from "./fixtures";

let orderCounter = 0;

function respond(
	config: InternalAxiosRequestConfig,
	status: number,
	data: unknown
): AxiosResponse {
	return {
		data,
		status,
		statusText: status < 300 ? "OK" : "Demo route not found",
		headers: {},
		config,
	};
}

export function demoAdapter(
	config: InternalAxiosRequestConfig
): Promise<AxiosResponse> {
	const url = config.url ?? "";
	const method = (config.method ?? "get").toLowerCase();

	if (method === "get" && url === process.env.NEXT_PUBLIC_CATEGORIES_API_URL) {
		return Promise.resolve(respond(config, 200, demoCategories));
	}

	if (method === "post" && url === process.env.NEXT_PUBLIC_ORDERS_API_URL) {
		orderCounter += 1;
		const body =
			typeof config.data === "string" ? JSON.parse(config.data) : config.data;
		return Promise.resolve(
			respond(config, 201, {
				id: `DEMO-${String(orderCounter).padStart(4, "0")}`,
				itemCount: Array.isArray(body?.products) ? body.products.length : 0,
				charged: false,
			})
		);
	}

	const response = respond(config, 404, { message: "Not available in demo" });
	return Promise.reject(
		new AxiosError(
			"Not available in demo",
			AxiosError.ERR_BAD_REQUEST,
			config,
			null,
			response
		)
	);
}

export function installDemoAdapter(): void {
	axios.defaults.adapter = demoAdapter;
}
