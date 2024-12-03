/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tv.khabriya.in', 'dashboard.khabriya.in'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;