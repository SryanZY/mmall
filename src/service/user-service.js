/* 
* @Author: SryanZY
* @Date:   2017-10-18 22:06:39
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-11-27 22:34:17
*/
var _mm = require('util/mm.js');
var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出状态
    logout: function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _user;