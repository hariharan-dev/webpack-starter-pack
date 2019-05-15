var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// webpack.config.js
module.exports = {
  devtool: 'source-map', // any "source-map"-like devtool is possible
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images', toType: 'dir' },
    ]),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};
