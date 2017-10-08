'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var config = require('../config')[process.env.NODE_ENV];

var devtool = 'source-map';
var plugins = [];
var babelSettings = {plugins: []};
if (!config.debugApp) {
  devtool = false;
  babelSettings.plugins.push('transform-react-inline-elements');
  babelSettings.plugins.push('transform-react-constant-elements');
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var options = {
  progress: true,
  verbose: true,
  config: {
    output: {
      filename: 'react-workshop.js'
    },
    devtool: devtool,
    module: {
      rules: [{
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }]
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    }
  }
};

var taskFunction = function () {

  return gulp.src(['assets/js/app.js'])
    .pipe(webpackStream(options, webpack))
    .pipe(gulp.dest('../webapp/assets/'));
};

module.exports = taskFunction;
