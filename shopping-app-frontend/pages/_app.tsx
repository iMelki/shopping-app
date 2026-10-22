"use client";
// Import Ant Design CSS reset to ensure consistent styles
// import "antd/dist/reset.css";
import "@/styles/globals.css";

// Import Redux Provider to provide the store to the entire application
import { Provider } from "react-redux";
// Import the configured Redux store from src/store
import { store } from "@/store";
// Import type for the application props from Next.js
import type { AppProps } from "next/app";
// Demo builds only (null otherwise): a shell that answers API calls from fixtures.
import { demo } from "@/demo/entry";

// Define the main App component that wraps every page in the Redux Provider
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			{demo ? (
				<demo.DemoShell>
					<Component {...pageProps} />
				</demo.DemoShell>
			) : (
				<Component {...pageProps} />
			)}
		</Provider>
	);
}

// Export the default component so Next.js can use it as the root
export default MyApp;
