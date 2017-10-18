/* 
* @Author: SryanZY
* @Date:   2017-08-25 22:09:51
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-10-18 21:55:57
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置,开发环境或者线上(dev or online)
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 配置html-webpack-plugin
var getHtmlConfig  = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html', // 目标文件的名字，和output同级
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name] // 需要打包的模块
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'], // 全局变量
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']

    },
    output: {
        path: './dist',
        pulicpath: '/dist', // 访问时的路径
        filename: 'js/[name].js'
    },
    // 模块化加载外部文件
    externals: {
        'jquery': 'window.jquery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 保存的文件名(此处用common存储全局变量和方法)
            filename: 'js/base.js' // 输出的文件名
        }),
        new ExtractTextPlugin('css/[name].css'),
        // 对html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录'))
    ]
};

if (WEBPACK_ENV === 'dev') { // 开发环境下追加到common中
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;