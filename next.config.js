/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HTTP_URL: "https://xuantuyen1207.website",
    HTTPS_URL: "https://xuantuyen1207.website",
    NEXTAUTH_SECRET: "lsdkmlskdmflksdkskmsdnkj",
    CLIENT_ID_PAYPAL: "AcO_eHmPFOsuvsyYqxAUVL0r61pmJ4ckMvi3ioi_GEwp4nj5OQucQr3Yl6zKbu4EvZFqXDBuiBsci9aF",
    CLIENT_ID_VIETQR: "1dafcddd-57ba-419e-bd86-ca51e70df0ce",
    API_KEY_VIETQR: "e55a6d07-d553-427a-8e68-15c7933feb1e",
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
