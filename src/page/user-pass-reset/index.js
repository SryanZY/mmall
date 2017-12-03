/* 
* @Author: SryanZY
* @Date:   2017-11-30 21:58:50
* @Last Modified by:   SryanZY
* @Last Modified time: 2017-11-30 23:03:28
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    // 数据存储
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    // 初始化函数（将隐藏的内容显示出来）
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuetion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('用户名不存在');
            }
        });
        // 输入密码提示问题答案中的按钮点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            } else{
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 第一步，加载输入用户名
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 第二步，加载输入的问题
    loadStepQuetion: function () {
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 第三步，加载密码
    loadStepPassword: function() {
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};

$(function () {
    page.init();
});