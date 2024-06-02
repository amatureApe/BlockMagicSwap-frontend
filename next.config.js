/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/market',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;