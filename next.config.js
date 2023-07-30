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
  headers: [
    {
      source: "/api/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Credentials",
          value: "true",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        },
        {
          key: "Access-Control-Allow-Headers",
          value:
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
