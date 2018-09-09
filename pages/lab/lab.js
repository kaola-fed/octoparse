// pages/lab/lab.js
var maxParse = require('../../maxParse/maxParse.js');
Page({
  data:{},
  onLoad:function(options){
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  insertNodeTap: function(e){
    var that = this;
    var insertData = '<div style="color:red;text-align:center;padding:20px;">我是一个被插入的元素</div>';
    maxParse.maxParse('insertData', 'html', insertData, that);
  },
  maxParseTagATap: function(e){
    var href = e.currentTarget.dataset.src;
    console.log(href);
    //我们可以在这里进行一些路由处理
    if(href.indexOf(index) > 0){
      // wx.redirectTo({
      //   url: '../index/index'
      // })

    }

  }
})