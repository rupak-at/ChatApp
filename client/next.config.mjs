/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "randomuser.me",
          },
          {
            hostname: "encrypted-tbn0.gstatic.com",
          },
          {
            hostname: "res.cloudinary.com",
          },
        ],
    },
};

export default nextConfig;
