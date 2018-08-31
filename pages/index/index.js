import {maxParse, mountAction} from '../../maxParse/index.js';
Page({
  data: {
    name: 1
  },
  onLoad: function () {
    var that = this;
    /**
     * html解析示例
     */
    var article = `< !DOCTYPE HTML ><!--注释: wxParse试验文本-->
    <div>
      <div>
      <img id="img1" class=".test .testImg2"  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
      </div>
    </div>
    <p>okkkkk</p>
    <a class=".testA .testB" href="www.baidu.com">百度主页</a>
    <a href="www.baidu.com">百度主页2</a>
    <a id="testId" href="www.baidu.com">百度主页3</a>
    `;
    function bindATagAction(e){
      console.log('hello yanxiaobo');
    }
    function bindATagAction2(e){
      console.log('are u ok?');
    }
    let params = {
      type: 'html',
      data: article,
      options: [{
        tag: 'a',
        filter: '.testA',
        event: {
          tap: {
            eventName: 'bindATagAction',
            event: bindATagAction
          }
        }
      }]
    }
    let maxRes = maxParse(params);
    console.log('解析的结果是', maxRes);
    that.setData({
      article:maxRes
    })
    that.testTag = function testTag(node){
      console.log(node);
    }

    mountAction(that,[
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
  }

})
