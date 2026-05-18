import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
