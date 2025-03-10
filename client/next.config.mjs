/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "randomuser.me",
          },
          {
            hostname: "encrypted-tbn0.gstatic.com",
          }
        ],
    },
};

export default nextConfig;
