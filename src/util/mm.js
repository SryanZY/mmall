/* 
* @Author: SryanZY
* @Date:   2017-09-20 21:49:21
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-09-20 22:04:47
*/

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
    // 登录(redirect到来时的页面，以防有特殊字符需要编码)
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;