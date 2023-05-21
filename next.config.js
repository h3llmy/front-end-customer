/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    WEB_URL: process.env.WEB_URL,
  },
};

module.exports = nextConfig;
