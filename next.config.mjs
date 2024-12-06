/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* 프로젝트 성격에 맞게 수정 필요 */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
