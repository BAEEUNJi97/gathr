import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      // 모임 목록 조회를 API로 프록시
      {
        source: '/gatherings',
        destination: '/api/gatherings',
      },
      // 모임 상세 조회 (ID 포함) 프록시
      {
        source: '/gatherings/:id',
        destination: '/api/gatherings/:id',
      },
    ];
  },
};

export default nextConfig;
