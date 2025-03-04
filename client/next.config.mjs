/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname:  "randomuser.me",
          }
        ],
    },
};

export default nextConfig;
