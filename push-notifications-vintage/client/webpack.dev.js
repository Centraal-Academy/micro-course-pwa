const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const config = {
  devServer: {
    compress: true,
    hot: true,
    port: 8000,
    open: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENDPOINT_SAVE_SUBSCRIPTION': JSON.stringify('http://localhost:9000/api/notification')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, config)
