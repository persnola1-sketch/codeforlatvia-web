/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  },
}

module.exports = nextConfig
