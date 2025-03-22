/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WORKOS_API_KEY: process.env.WORKOS_API_KEY,
    NEXT_PUBLIC_WORKOS_CLIENT_ID: process.env.NEXT_PUBLIC_WORKOS_CLIENT_ID,
    NEXT_PUBLIC_WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
  }
};

export default nextConfig;
