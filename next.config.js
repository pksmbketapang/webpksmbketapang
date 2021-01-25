const withPlugins = require('next-compose-plugins')
const optimiseImages = require('next-optimized-images')

const nextConfig = {
  target: 'serverless',
  images: {
    domains: ['source.unsplash.com', 'res.cloudinary.com']
  }
}

module.exports = withPlugins([
  [optimiseImages , {
    defaultImageLoader: 'responsive-loader',
    responsive: {
      adapter: require('responsive-loader/sharp')
    },
    optimizeImagesInDev: true
  }],
], nextConfig)
        