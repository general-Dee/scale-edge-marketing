/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore type errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Make all pages dynamic to avoid prerendering issues
  output: 'standalone',
};

module.exports = nextConfig;