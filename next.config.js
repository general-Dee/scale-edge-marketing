/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable font optimization to avoid Google Fonts fetching
  optimizeFonts: false,
  
  // Your other config options
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;