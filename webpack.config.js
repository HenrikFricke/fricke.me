var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: {
      index: "./app/pages/index.js"
    },
    output: {
        path: './dist/',
        publicPath: '',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.json$/,   loader: "json-loader" },
            { test: /\.cson$/,   loader: "cson" },
            { test: /\.scss$/,   loader: "style!css!sass?sourceMap" },
            { test: /\.css$/,    loader: 'style!css-loader' },
            { test: /\.jade$/,   loader: "jade-loader?self" },
            { test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.jpeg$/,   loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.woff2$/,  loader: "url-loader?prefix=font/&limit=5000" },
      			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" }
        ]
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'bower_components'
      ]
	  },
    watch: true,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          sourceMap: true
      }),
      new HtmlWebpackPlugin({
        template: 'webpack/template.html',
        inject: 'body'
      }),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      )
    ]
};
