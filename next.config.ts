import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudflare URLs for prod (R2 / Images). Dev uses /api/file proxy (MongoDB).
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev', pathname: '/**' },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.imagedelivery.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
