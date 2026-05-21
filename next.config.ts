import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mqsikcvonyfulmbpyvts.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/team-logos/**',
      },
    ],
  },
};

export default nextConfig;
