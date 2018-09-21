import octoParse from '../../lib/index.js';
import removeBackground from '../../lib/plugins/removeBackground';
Page({
  data: {
    name: 1
  },
  onLoad: function () {
    var that = this;
    /**
     * html解析示例
     */
    var article = `<div>test</div>
                    <p>666</p>`;
    let options = {
      platform: 'wechat',
      plugins: [removeBackground],
      visitors: {
        img(node){
          node.styleStr = '';
        }
      }
    }
    let maxRes = octoParse.htmlParse(article, options);
    console.log('解析结果是', maxRes);
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
      console.log('gg')
    }
    function bindATagAction(e){
      console.log('hello yanxiaobo');
    }
    function bindATagAction2(e){
      console.log('are u ok?');
    }
  }

})
