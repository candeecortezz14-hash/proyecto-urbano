/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: { serverActions: { bodySizeLimit: '8mb' } },
};
export default nextConfig;
