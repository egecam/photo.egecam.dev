import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.egecam.dev",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
