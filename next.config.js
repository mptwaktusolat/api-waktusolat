/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // allow all origin
          { key: "Access-Control-Allow-Methods", value: "GET" },
        ]
      },
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // allow all origin
          { key: "Access-Control-Allow-Methods", value: "GET" },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        // Make http://localhost:3000/v2/solat/sgr01 resolved to http://localhost:3000/api/v2/solat/sgr01
        source: "/:path((?!locations|docs|api|health).*)",
        destination: "/api/:path"
      },
    ]
  }
}

module.exports = nextConfig
