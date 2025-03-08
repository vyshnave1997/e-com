import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['rc-util', '@ant-design/icons-svg', 'antd', 'rc-picker', 'rc-input'],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };

    // Update alias to point to the correct file path.
    config.resolve.alias = {
      ...config.resolve.alias,
      'rc-picker/es/locale/common': require.resolve('rc-picker/es/locale/common.js'),
    };
    return config;
  },
};

export default nextConfig;
