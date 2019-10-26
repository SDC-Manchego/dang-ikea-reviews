const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/index.jsx',
  plugins: [new CompressionPlugin()],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'reviewBundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?/,
        exclude: '/node_modules',
        include: path.join(__dirname, '/client'),
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    ],
  },
};
