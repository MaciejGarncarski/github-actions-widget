import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  experimental: {
    devtoolSegmentExplorer: true,
    clientSegmentCache: true,
    turbopackPersistentCaching: true,
    nodeMiddleware: true,
  },
};

export default nextConfig;
