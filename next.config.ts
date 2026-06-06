import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'react-icons',
      '@radix-ui/themes',
    ],
  },
};

export default nextConfig;
