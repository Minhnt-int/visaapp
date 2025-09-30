/** @type {import('next').NextConfig} */

// The backend URL is read from an environment variable.
const backendUrl = process.env.IDX_PREVIEW_BACKEND_URL;

const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Only proxy requests to the backend if the backend URL is set.
  async rewrites() {
    if (!backendUrl) {
      return [];
    }
    return [
      {
        // Proxies all requests starting with /api/ to the backend server.
        source: '/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
};

module.exports = nextConfig;
