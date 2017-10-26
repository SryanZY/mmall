/* 
* @Author: SryanZY
* @Date:   2017-10-25 20:57:41
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-10-26 21:46:51
*/
require('./index.css');
var _mm = require('util/mm.js');
var header = {
    init: function () {
        this.bindEvent();
        this.onLoad();
    },
    // 根据URL参数对输入框回填
    onLoad: function () {
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent: function () {
        var _this = this;
        // 点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入会车后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword,正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        // 如果keyword为空，直接返回首页
        } else { 
            _mm.goHome();
        }
    }
};
header.init();
