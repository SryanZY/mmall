/* 
* @Author: SryanZY
* @Date:   2017-10-26 22:29:19
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-10-26 22:38:14
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})