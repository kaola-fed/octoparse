import octoParse from '../../lib/index.js';
Page({
  data: {
    name: 1
  },
  onLoad: function () {
    var that = this;
    /**
     * html解析示例
     */
    var article = `<p class="test" id="mmm"><img src="http://haitao.nosdn2.127.net/onlineigirymdz12931.jpg" style="" /></p>
    <p class="test ddd"><img src="http://haitao.nosdn2.127.net/onlineigirymdz12931.jpg" style="" /></p>  
    <p class="test"><img src="http://haitao.nosdn1.127.net/ipz5qjmw83_710_341.jpg" /></p> 
    `;
    let options = {
      p:{
        include: '',
        except: '',
        removeAttrs: ['class'],
        addAttrs: [{
          name: 'style',
          value: 'background:red;'
        }]
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
