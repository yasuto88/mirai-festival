/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_HOST + ":" + process.env.API_PORT,
  },
};

export default nextConfig;
