const _ = require('./util');



module.exports = {
  mode: "development",
  target: 'node',
  entry: _.resolve('./src/index'),
  output: {
    path: _.resolve('./lib'),
    library: 'webpackNumbers',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': _.resolve('./lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
  
}