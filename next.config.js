/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HTTP_URL: "https://xuantuyen1207.website",
    HTTPS_URL: "https://xuantuyen1207.website",
    NEXTAUTH_SECRET: "lsdkmlskdmflksdkskmsdnkj",
    CLIENT_ID_PAYPAL : "AcO_eHmPFOsuvsyYqxAUVL0r61pmJ4ckMvi3ioi_GEwp4nj5OQucQr3Yl6zKbu4EvZFqXDBuiBsci9aF"
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
