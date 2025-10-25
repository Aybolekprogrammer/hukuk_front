/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hukuk.com.tm',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hukuk.com.tm/api/:path*',
      },
      {
        source: '/media/:path*',
        destination: 'https://hukuk.com.tm/media/:path*', 
      },
    ];
  },
};

export default nextConfig;
