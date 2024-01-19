/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: 'dist',
    rewrites: async () => {
        return [
            {
                source: '/_next/:path*',
                destination: '/dist/:path*',
            }
        ]
    }
};

export default nextConfig;
