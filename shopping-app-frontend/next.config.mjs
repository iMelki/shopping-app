/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CATEGORIES_API_URL: process.env.NEXT_PUBLIC_CATEGORIES_API_URL,
    NEXT_PUBLIC_ORDERS_API_URL: process.env.NEXT_PUBLIC_ORDERS_API_URL,
  },
};

export default nextConfig;
