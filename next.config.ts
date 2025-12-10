/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
export default nextConfig;
export const config = {
  runtime: 'edge',
};
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const preferredRegion = 'us-central1';
export const regions = ['us-central1', 'europe-west1'];
export const fetchCache = 'force-no-store';
export const revalidate = 60;
export const fetchCacheKeyPrefix = 'my-prefix';     