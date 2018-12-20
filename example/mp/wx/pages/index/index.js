// import octoParse from '../../index.js';
var octoParse = require('../../lib/index.js').default
Page({
  data: {
    name: 1
  },
  onLoad: function () {
    var that = this;
    console.log('引入的对象是', octoParse)
    /**
     * html解析示例
     */
    var article = `<img src="//pop.nosdn.127.net/e2170dcf-efd0-4906-9da9-3a9900e52b39">
    <img src="//pop.nosdn.127.net/929408c3-7a72-44d2-9b11-8d5c6ea98dbb">`;
    let options = {
      platform: 'wechat',
      plugins: [],
      visitors: {
        img(node){
          node.styleStr = 'display:block;';
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
