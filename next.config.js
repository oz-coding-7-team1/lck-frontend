/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oz-main.s3.ap-northeast-2.amazonaws.com'], // Add the S3 bucket domain here
  },
};

module.exports = nextConfig; 