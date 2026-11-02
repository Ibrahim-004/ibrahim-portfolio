/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"]
  }
};
export default nextConfig;
