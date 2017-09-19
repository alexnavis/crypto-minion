console.log `ENV: ${process.env.NODE_ENV}`

var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'build/')
var APP_DIR = path.resolve(__dirname, 'src/')

var config = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: APP_DIR + "/app.jsx",
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader']
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "crypto-minion.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
}

module.exports = config
