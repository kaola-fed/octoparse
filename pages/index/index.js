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
    var article = `<p style="backGRound:red;border:10px solid gray;" class="test" id="mmm"><img src="http://haitao.nosdn2.127.net/onlineigirymdz12931.jpg" style="" /></p>
    <p class="test ddd"><img src="http://haitao.nosdn2.127.net/onlineigirymdz12931.jpg" style="" /></p>  
    <p class="test"><img src="http://haitao.nosdn1.127.net/ipz5qjmw83_710_341.jpg" /></p> 
    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
        你的浏览器不支持 <code>video</code> 标签.
    </video>
    `;
    let options = {
      platform: 'wechat',
      plugins: [removeBackground],
      visitors: {
        p(node){
          console.log('hello', node);
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
