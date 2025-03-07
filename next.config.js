/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['rc-util', '@ant-design/icons-svg', 'antd', 'rc-picker', 'rc-input'],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      'rc-picker/es/locale/common': require.resolve('rc-picker/lib/locale/common')
    };
    return config;
  },
};

module.exports = nextConfig;
