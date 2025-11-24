/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Use SWC for minification (faster than Terser)
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compiler optimizations
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  // Experimental features for performance
  experimental: {
    // Enable package optimization for production to reduce unused JavaScript
    ...(process.env.NODE_ENV === 'production' && {
      optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'framer-motion', 'react-intersection-observer'],
    }),
    scrollRestoration: true, // Better scroll restoration
    optimizeCss: true, // Optimize CSS for better performance
  },
  
  // Compression
  compress: true,
  
  // Add this to handle SVG imports properly and optimize bundles
  webpack(config, { isServer }) {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    
    // Optimize bundle splitting for production - simplified to avoid breaking module resolution
    if (!isServer && process.env.NODE_ENV === 'production' && config.optimization && config.optimization.splitChunks) {
      const existingCacheGroups = config.optimization.splitChunks.cacheGroups || {};
      
      // Only add custom cache groups if they don't exist - preserve Next.js defaults
      if (!existingCacheGroups.three) {
        config.optimization.splitChunks.cacheGroups = {
          ...existingCacheGroups,
          // Separate Three.js bundle (desktop only, mobile doesn't load it)
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
            priority: 30,
          },
        };
      }
      
      // Enable tree-shaking (but don't disable side effects globally - too aggressive)
      config.optimization.usedExports = true;
    }
    
    return config;
  },
  
  // Headers for performance and caching
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache images with immutable flag - highest priority for cache savings
        source: '/projects/:path*.(png|jpg|jpeg|gif|webp|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache skill images
        source: '/skills/:path*.(png|jpg|jpeg|gif|webp|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache all other static assets (images, fonts, videos) for 1 year
        source: '/:path*.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|webm|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache Next.js static files (_next/static) for 1 year with immutable
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache Next.js chunks (JavaScript bundles) for 1 year
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache videos for 1 year (desktop only, mobile doesn't load them)
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Cache API routes for 5 minutes
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
      {
        // HTML pages - shorter cache, revalidate in background
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;