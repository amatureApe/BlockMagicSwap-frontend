/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

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

export default nextConfig;