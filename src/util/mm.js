/* 
* @Author: SryanZY
* @Date:   2017-09-20 21:49:21
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-11-27 21:56:12
*/
//var Hogan = require('hogan');
var conf = {
    serverHost: ''
};
var _mm = {
    // 数据请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type|| 'json',
            data: param.data || '',
            success: function (res) {
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (res.status === 10) { // 没有登录状态，强制登录
                    _this.doLogin();
                } else if (res.status === 1) { // 请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    // 获取服务器地址(即接口路径)
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    // 获取URL参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染HTML(根据hogan模板)
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 表单验证
    validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if (type === 'required') return !!value;
        // 手机号验证
        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 登录(redirect到来时的页面，以防有特殊字符需要编码)
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // 返回主页
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;