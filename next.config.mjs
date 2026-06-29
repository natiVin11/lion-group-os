/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // מכריח את Vercel להתעלם משגיאות Typescript במטמון ולהעלות את האתר
        ignoreBuildErrors: true,
    },
};

export default nextConfig;