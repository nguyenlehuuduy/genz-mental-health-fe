/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mygenzmentalheath.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
        locale: false,
      },
    ];
  },
};

export default nextConfig;
