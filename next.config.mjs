/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  turbopack: {
    resolveAlias: {
      canvas: './components/Resume/empty-module.ts'
    }
  },
  webpack: (config, { isServer, webpack }) => {
    // For client builds, completely ignore canvas
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^canvas$/,
        })
      );
      
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        'fs-extra': false,
        sharp: false,
        'utf-8-validate': false,
        bufferutil: false,
      };
    }
    
    // Always provide an alias for canvas
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: path.resolve('./components/Resume/empty-module.ts'),
    };

    // Configure module rules to handle PDF.js worker files
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]',
      },
    });
    
    return config;
  },
  images: {
    domains: ['github.com']
  }
};

export default nextConfig;
