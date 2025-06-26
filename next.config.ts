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
    },
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000/:path*"
            : "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
