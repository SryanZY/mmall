/* 
* @Author: SryanZY
* @Date:   2017-08-25 22:26:02
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-10-26 22:23:08
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

$(function () {
    navSide.init({
        name: 'user-center'
    });
});
