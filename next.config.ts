import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "standalone",
    images: {
        remotePatterns: [
            new URL('https://img.youtube.com/**'),
            new URL('https://images.pexels.com/photos/**'),
            new URL('https://www.youtube.com/**'),
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
