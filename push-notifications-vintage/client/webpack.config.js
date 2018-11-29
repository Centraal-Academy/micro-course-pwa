const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const config = {
  plugins: [
    new webpack.DefinePlugin({
      'ENDPOINT_SAVE_SUBSCRIPTION': JSON.stringify('')
    }),
    new BundleAnalyzerPlugin()
  ]
}

module.exports = merge(common, config)
