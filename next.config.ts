import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  types: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
    // Отключаем оптимизацию для внешних изображений (ускоряет загрузку)
    unoptimized: true,
  },
};

export default nextConfig;
