const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const csswring = require('csswring')

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({template: './index.jade'})
]

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new CleanWebpackPlugin(['dist'])
  )
}

module.exports = {
  entry: './index.js',
  output: {
    path: 'dist',
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[id]-[chunkhash].js' : '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.sass$/,
        loader: 'style!css?sourceMap!postcss!resolve-url!sass-loader?sourceMap&indentedSyntax&includePaths[]=node_modules'
      }
    ],
    noParse: [/bespoke-theme/]
  },
  postcss: [autoprefixer].concat(isProduction ? csswring : []),
  plugins: plugins,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    port: 8080
  }
}
