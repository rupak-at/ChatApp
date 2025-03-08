/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname:  "randomuser.me", 
          },
          {
            hostname:  "www.project-phoenix-investigating-bird-responses-to-smoke.org",
          },
          {
            hostname:  "www.freepik.com",
          },
          {
            hostname:  "www.pngkit.com",
          },
          {
            hostname:  "encrypted-tbn0.gstatic.com",
          },
       
        ],
    },
};

export default nextConfig;
