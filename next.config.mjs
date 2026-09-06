/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  allowedDevOrigins: [
    "192.168.29.175",
    "192.168.29.175:8080",
    "localhost",
    "localhost:8080",
    "127.0.0.1",
    "127.0.0.1:8080",
  ],
};

export default nextConfig;
