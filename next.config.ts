import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mqsikcvonyfulmbpyvts.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/team-logos/**',
      },
      {
        protocol: 'https',
        hostname: 'mqsikcvonyfulmbpyvts.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/players-images/**',
      },
    ],
  },
};

export default nextConfig;
