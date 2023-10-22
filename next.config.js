/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HTTP_URL: "https://xuantuyen1207.website",
    HTTPS_URL: "https://xuantuyen1207.website",
    NEXTAUTH_SECRET: "lsdkmlskdmflksdkskmsdnkj",
    URL: "http://localhost:3000/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xuantuyen1207.website",
      },
    ],
  },
};

module.exports = nextConfig;
