const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',

  entry: fs.readdirSync(path.join(__dirname, 'examples')).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, 'examples', dir);
    const entry = path.join(fullDir, 'app.js');
    const outputEntries = entries;
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      outputEntries[dir] = ['webpack-hot-middleware/client', entry];
    }

    return outputEntries;
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/',
  },

  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'shared',
          filename: 'shared.js',
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

};
