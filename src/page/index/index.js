/* 
* @Author: SryanZY
* @Date:   2017-08-25 22:26:02
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-09-20 23:20:20
*/

var _mm = require('util/mm.js');
_mm.request({
    url: '/product/list.do?keyword=1',
    success: function (res) {
        console.log(res);
    },
    error: function (errMsg) {
        console.log(errMsg);
    }
});