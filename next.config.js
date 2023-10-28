/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HTTP_URL: "https://xuantuyen1207.website",
    HTTPS_URL: "https://xuantuyen1207.website",
    NEXTAUTH_SECRET: "lsdkmlskdmflksdkskmsdnkj",
    CLIENT_ID_PAYPAL: "AcO_eHmPFOsuvsyYqxAUVL0r61pmJ4ckMvi3ioi_GEwp4nj5OQucQr3Yl6zKbu4EvZFqXDBuiBsci9aF",
    CLIENT_ID_VIETQR: "885cd6c9-c285-4c32-b190-3fb545df5855",
    API_KEY_VIETQR: "45d3e208-7cef-4db6-975d-66a1eb28cc6a",
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
