var path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'reviewBundle.js'
  },
  module : {
    rules : [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test : /\.jsx?/,
        exclude: '/node_modules',
        include : path.join(__dirname, '/client'),
        loader : 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
};