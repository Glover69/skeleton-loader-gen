import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
      return [
        {
          source: '/api/ai/:path*',
          destination: 'https://central-backend.vercel.app/api/ai/:path*', // Proxy to actual endpoint
        },
      ];
    },
};

export default nextConfig;
