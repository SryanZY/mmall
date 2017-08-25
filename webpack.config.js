/* 
* @Author: SryanZY
* @Date:   2017-08-25 22:09:51
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-08-25 23:04:43
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
    entry: {
        'common': ['./src/page/common/index'], // 全局变量
        'index': ['./src/page/index/index'],
        'login': ['./src/page/login/index']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    // 模块化加载外部文件
    externals: {
        'jquery': window.jquery
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 保存的文件名(此处用common存储全局变量和方法)
            filename: 'js/base.js' // 输出的文件名
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
};

module.exports = config;