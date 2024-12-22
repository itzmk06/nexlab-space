
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
    mdxRs: true,
  },
};

export default nextConfig;
