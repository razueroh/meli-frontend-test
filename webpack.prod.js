/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app-[hash].js',
    publicPath: '/',
  },
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: 'assets/vendors-[hash].js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some((chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name));
          },
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'src/server/public')],
    }),
    new ManifestPlugin(),
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$/,
      filename: '[path].gz',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/app-[hash].css',
    }),
  ],
});
