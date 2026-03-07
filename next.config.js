/** @type {import('next').NextConfig} */
const nextConfig = {
  // Faster development
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Ignore TypeScript errors in development for speed
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  // Ignore ESLint errors in development for speed
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;