var octoParse = require('../../lib/index.js');
Page({
  data: {
    name: 1
  },
  onLoad: function () {
    var that = this;
    /**
     * html解析示例
     */
    var article = `<div class="wx_title">OCTOPATH TRAVELER</div>
    <span>文本1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>文本2</span>
    <img src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540183348581&di=507d478e517ac2ef9472f89446239f7a&imgtype=0&src=http%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F07%2F18%2Faec8e5f0492247d78f49cdc3155c463e.jpeg" alt="octoparse">`;
    // var article = '<div><div><div><a href="index">kaola</a></div></div></div>'
    let options = {
      platform: 'wechat',
      plugins: [],
      visitors: {
        img(node){
          node.styleStr = '';
        }
      }
    }
    let maxRes = octoParse.htmlParse(article, options);
    that.setData({
      article:maxRes
    })
    octoParse.mountAction(that,[
      {
        tag:'img',
        filter: '#img1',
        events:{
          tap: showImg
        }
      },
      {
        tag:'div',
        filter: '.block',
        events:{
          tap: bindATagAction
        }
      },
      {
        tag:'a',
        filter: '.testA',
        events:{
          tap: bindATagAction
        }
      },
      {
        tag:'a',
        filter: '#testId',
        events:{
          tap: bindATagAction2
        }
      }
    ]);
    function showImg(e){
    }
    function bindATagAction(e){
    }
    function bindATagAction2(e){
    }
  }

})
