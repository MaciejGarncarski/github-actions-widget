import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    qualities: [10, 50, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  experimental: {
    ppr: true,
    cacheComponents: true,
    devtoolSegmentExplorer: true,
    clientSegmentCache: true,
    turbopackPersistentCaching: true,
  },
};

export default nextConfig;
