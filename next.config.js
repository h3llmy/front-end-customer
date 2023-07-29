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
  async headers() {
    return [
      {
        // matching all API routes
        source: "https://0d17-101-128-98-60.ngrok-free.app/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
