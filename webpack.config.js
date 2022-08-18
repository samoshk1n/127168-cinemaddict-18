const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const duration = require('dayjs/plugin/duration');
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(duration);
dayjs.extend(relativeTime);


module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }
    ]
  }
};
