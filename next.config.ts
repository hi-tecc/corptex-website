import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH (e.g. "/corptex-website") when the site is served from a sub-path,
// such as GitHub Pages without a custom domain. Leave empty when served from corptex.be.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
