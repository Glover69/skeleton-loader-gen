import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
      return [
        {
          source: '/api/ai/:path*',
          destination: 'http://localhost:2005/api/ai/:path*', // Proxy to actual endpoint
        },
      ];
    },
};

export default nextConfig;
