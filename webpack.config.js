const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'UnicornOS 3.11',
      meta: {
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://your-unicornos-url.com/' },
        'og:title': { property: 'og:title', content: 'UnicornOS 3.11' },
        'og:description': { property: 'og:description', content: 'A retro-style operating system interface with modern web capabilities' },
        'og:image': { property: 'og:image', content: 'https://your-unicornos-url.com/unicornos-3.11-og-image.jpg' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:url': { name: 'twitter:url', content: 'https://your-unicornos-url.com/' },
        'twitter:title': { name: 'twitter:title', content: 'UnicornOS 3.11' },
        'twitter:description': { name: 'twitter:description', content: 'A retro-style operating system interface with modern web capabilities' },
        'twitter:image': { name: 'twitter:image', content: 'https://your-unicornos-url.com/unicornos-3.11-og-image.jpg' },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3002,
  },
};