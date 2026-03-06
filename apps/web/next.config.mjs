/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@langue/ai",
    "@langue/content",
    "@langue/jobs",
    "@langue/learning",
    "@langue/schemas",
    "@langue/ui"
  ]
};

export default nextConfig;
