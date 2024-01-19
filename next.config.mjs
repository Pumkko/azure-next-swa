/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: 'dist',
    redirects: async () => {
        return [
            {
                source: '/_next/*',
                destination: '/dist/*'
            }
        ]
    }
};

export default nextConfig;
