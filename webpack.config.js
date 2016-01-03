var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    context: __dirname,
    entry: {
      index: "./website/pages/index.js"
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
            { test: /\.scss$/,   loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
            { test: /\.css$/,    loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.jade$/,   loader: "jade-loader?self" },
            { test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.jpeg$/,   loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: "file"},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'bower_components'
      ],
      alias: {
        basicstyle: path.join(__dirname, 'website/style/basics.scss'),
        fontawesome: path.join(__dirname, 'bower_components/font-awesome/scss/font-awesome.scss')
      }
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
      ),
      new ExtractTextPlugin("style.bundle.css")
    ]
};
