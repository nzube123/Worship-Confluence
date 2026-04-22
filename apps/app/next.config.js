/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.co' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;