import dotenv from 'dotenv';
dotenv.config();



/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    imagesBucket: process.env.NEXT_PUBLIC_IMAGES_BUCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  'dev-aws-handbook' + process.env.NEXT_PUBLIC_IMAGES_BUCKET,
        port: '',
        pathname: '/**',  // This allows all paths under the hostname
      },
      {
        protocol: 'https',
        hostname:  'prod-aws-handbook' + process.env.NEXT_PUBLIC_IMAGES_BUCKET,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
