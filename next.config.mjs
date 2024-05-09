/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|ogg|wav|flac)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/sounds',
            outputPath: 'static/sounds',
            name: '[name].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
