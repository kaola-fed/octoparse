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
    var article = `<p style="text-align:center;">
    <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_0_750_500" />
    </p> 
    <p style="text-align:center;">
      <img src="http://haitao.nos.netease.com/67a89d6b5e854d509c6cb1c67c3da9d51539951921875jnfzm3ma10166.jpg">
      <br />
      </img>
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_1000_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_1500_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_2000_750_500" />
        </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_2500_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_3000_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/c93842b58bdf47ae99a6bb641f6865501530773886042jj878xui12201.jpg?imageView&amp;quality=98&amp;crop=0_0_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/5d92f55711d04e5a98661492ed75017d1534767304692jl28treb11466.jpg?imageView&amp;crop=0_0_750_306" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/c0e15f6bbcaa474396e785bea0e6dfb11534767310456jl28tvug12339.jpg" />
      </p> 
      <p style="text-align:center;"><img src="http://haitao.nos.netease.com/5d92f55711d04e5a98661492ed75017d1534767304692jl28treb11466.jpg?imageView&amp;crop=0_306_750_367" />
      </p> 
      <p style="text-align:center;"><img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_4000_750_500" /></p> ↵
      <p style="text-align:center;"><img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_4500_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_5000_750_500" />
      </p> 
      <p style="text-align:center;">
        <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_5500_750_500" />
      </p> 
      <p style="text-align:center;">
          <img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_6000_750_500" /></p> ↵
        <p style="text-align:center;"><img src="http://haitao.nos.netease.com/f448c4490afc4b0484248b1e6035991d1529980559392jiv2x73410299.jpg?imageView&amp;quality=98&amp;crop=0_6500_750_149" />
      </p>`;
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
