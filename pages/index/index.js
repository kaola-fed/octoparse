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
      <img class="testImg"  src="http://img1.imgtn.bdimg.com/it/u=3858199793,3438100278&fm=26&gp=0.jpg" alt="test" title="girl">
      </div>
    </div>
    <p>okkkkk</p>
    <a href="www.baidu.com">百度主页</a>
    `;
		
    let params = {
      type: 'html',
      data: article
    }
    let maxRes = maxParse(params);
    console.log('解析的结果是', maxRes);
    that.setData({
      article:maxRes
    })
    function bindATagAction(e){
      console.log('hello a');
    }
    mountAction(that,[
      {
        type:'a',
        bindtap:bindATagAction
      }
    ]);
  }

})
