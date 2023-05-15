/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
  },
};

module.exports = nextConfig;
