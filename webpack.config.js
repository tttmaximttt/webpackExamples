'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
var webpack = require('webpack');

module.exports = [{
  context:__dirname + '/frontEnd',
  entry:{
      home:'./home',
      about:'./about',
      common:'./common' //add some general for all eg lodash for all modules ['./common','./lodash']
  },
    output:{
        path:__dirname + '/public',
        filename:'[name].js',
        library:'[name]'// for global exports from entrance
    },
    watch:NODE_ENV == 'development',

    devtool:NODE_ENV == 'development' ? 'chip-inline-module-inline-source-map' : null,

    resolve:{
        modulesDirectories:['node_modules'],
        extensions:['','.js', '.es6']
    },
    resolveLoaders:{
        modulesDirectories:['node_modules'],
        moduleTemplates:['*-loader'],
        extensions:['','.js']
    },

    module: {
        loaders: [
            {
                test: /\.es6?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query:{
                    presets:['es2015']
                }
            }
        ]
    },

    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common'
        })
    ]
}];

//PLUGINS for PROD

if (NODE_ENV == 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
};