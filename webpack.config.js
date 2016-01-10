var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var csonExtractor = new ExtractTextPlugin("cson", "[name].cson");
var cssExtractor = new ExtractTextPlugin("css", "[name].css");

var config  = {
    context: __dirname,
    entry: {
      index: "./website/pages/index.js"
    },
    output: {
        path: './dist/',
        publicPath: '',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.cson$/,   loader: csonExtractor.extract("raw") },
            { test: /\.scss$/,   loader: cssExtractor.extract("style", "css!sass") },
            { test: /\.css$/,    loader: cssExtractor.extract("style", "css") },
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
        sasslib: path.join(__dirname, 'website/libs/sasslib/basics.scss'),
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
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      csonExtractor,
      cssExtractor
    ]
};

module.exports = config;
