import { fileURLToPath } from "node:url";

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "1";
const demoDisabled = fileURLToPath(new URL("./src/demo/disabled.ts", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = isDemo
  ? {
      // Backend-free demo: static export into out-demo/, API calls answered
      // in the browser by src/demo/adapter.ts. Only placeholder paths are
      // inlined, never values from the environment.
      output: "export",
      distDir: "out-demo",
      trailingSlash: true,
      images: { unoptimized: true },
      env: {
        NEXT_PUBLIC_DEMO_MODE: "1",
        NEXT_PUBLIC_CATEGORIES_API_URL: "/demo-api/categories",
        NEXT_PUBLIC_ORDERS_API_URL: "/demo-api/orders",
      },
    }
  : {
      env: {
        NEXT_PUBLIC_CATEGORIES_API_URL: process.env.NEXT_PUBLIC_CATEGORIES_API_URL,
        NEXT_PUBLIC_ORDERS_API_URL: process.env.NEXT_PUBLIC_ORDERS_API_URL,
      },
      // Normal builds swap the demo entry for a null stub, so no demo code ships.
      webpack(config, { webpack }) {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(/^@\/demo\/entry$/, demoDisabled)
        );
        return config;
      },
    };

export default nextConfig;
