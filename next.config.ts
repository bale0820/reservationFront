import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://54.180.149.63:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
