/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    WEB_URL: process.env.WEB_URL,
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    INSTAGRAM_URL: process.env.INSTAGRAM_URL,
  },
};

module.exports = nextConfig;
