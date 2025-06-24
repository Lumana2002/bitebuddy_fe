/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'localhost:8080'], // Add your image domains here
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

};

export default nextConfig;