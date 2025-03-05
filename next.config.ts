import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                search: '',
            },
        ] // Allow images from tmdb
    },
};

export default nextConfig;
