/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts", // or './empty-module.js'
      },
    },
  },
  images: {
    domains: ["github.com"], // Add the domains you want to allow for images
  },
};

export default nextConfig;
