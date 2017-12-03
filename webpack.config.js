/* 
* @Author: SryanZY
* @Date:   2017-08-25 22:09:51
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-12-03 20:39:26
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
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'result' : ['./src/page/result/index.js'],
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
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
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
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果'))
    ]
};

if (WEBPACK_ENV === 'dev') { // 开发环境下追加到common中
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;