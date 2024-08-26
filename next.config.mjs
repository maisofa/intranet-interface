/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://static.wixstatic.com",
            }
        ]
    }
};

export default nextConfig;
