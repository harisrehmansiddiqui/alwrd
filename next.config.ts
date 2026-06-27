import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid stale Turbopack cache causing worker crashes in dev.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
