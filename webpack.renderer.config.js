const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const copyPlugin = require('copy-webpack-plugin');


plugins.push(new copyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, 'src/icons'),
      to: path.resolve(__dirname, '.webpack/renderer/icons')
    },
    {
      from: path.resolve(__dirname, 'src/icons'),
      to: path.resolve(__dirname, '.webpack/renderer/main_window/icons')
    }]
  })
);


rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
  test: /\.(jpg|png|svg|ttf)$/,
  loader: 'file-loader',
  options: {
    name: "[path][name].[ext]",
    publicPath: "..", // move up from 'main_window'
    context: "src", // set relative working folder to src
  }
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      'fs': false,
      'path': false
    }
  },
};
