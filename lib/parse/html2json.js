"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html2json = html2json;

var _index = require("./utils/index");

var _htmlparser = require("./htmlparser");

var _decode = _interopRequireDefault(require("./utils/decode"));

var _index2 = require("./constant/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 */
function html2json(html) {
  var bindName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  //处理字符串
  html = (0, _index.removeDOCTYPE)(html);
  html = (0, _index.trimHtml)(html);
  html = (0, _decode["default"])(html); //生成node节点

  var bufArray = [];
  var results = {
    node: bindName,
    nodes: [],
    images: [],
    imageUrls: []
  };
  var index = 0;
  (0, _htmlparser.HTMLParser)(html, {
    start: function start(tag, attrs, unary) {
      var node = {
        node: 'element',
        tag: tag
      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
      } else {
        var parent = bufArray[0];

        if (parent.nodes === undefined) {
          parent.nodes = [];
        }

        node.index = parent.index + '.' + parent.nodes.length;
      }

      if (_index2.block[tag]) {
        node.tagType = "block";
      } else if (_index2.inline[tag]) {
        node.tagType = "inline";
      } else if (_index2.closeSelf[tag]) {
        node.tagType = "closeSelf";
      }

      if (attrs.length !== 0) {
        node.attr = attrs.reduce(function (pre, attr) {
          var name = attr.name;
          var value = attr.value;

          if (name == 'class') {
            // console.dir(value);
            //  value = value.join("")
            node.classStr = value;
          } // has multi attibutes
          // make it array of attribute


          if (name == 'style') {
            node.styleStr = value;
          }

          if (value.match(/ /) && name !== 'style') {
            value = value.split(' ');
          } else if (value.match(/;/) && name === 'style') {
            value = value.split(';');
          } // if attr already exists
          // merge it


          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      } //对img添加额外数据


      if (node.tag === 'img') {
        node.imgIndex = results.images.length;
        var imgUrl = node.attr.src;

        if (imgUrl[0] == '') {
          imgUrl.splice(0, 1);
        }

        imgUrl = (0, _index.urlToHttpUrl)(imgUrl, _index2.__placeImgeUrlHttps);
        node.attr.src = imgUrl;
        node.from = bindName; // node.bindtap = test;

        results.images.push(node);
        results.imageUrls.push(imgUrl);
      } // 处理font标签样式属性


      if (node.tag === 'font') {
        var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
        var styleAttrs = {
          'color': 'color',
          'face': 'font-family',
          'size': 'font-size'
        };
        if (!node.attr.style) node.attr.style = [];
        if (!node.styleStr) node.styleStr = '';

        for (var key in styleAttrs) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.attr.style.push(styleAttrs[key]);
            node.attr.style.push(value);
            node.styleStr += styleAttrs[key] + ': ' + value + ';';
          }
        }
      } //临时记录source资源


      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var parent = bufArray[0] || results;

        if (parent.nodes === undefined) {
          parent.nodes = [];
        }

        parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }

      if (!node.styleStr) {
        node.styleStr = '';
      }

      if (!node.classStr) {
        node.classStr = '';
      } ////调用插件


      if (options && Array.isArray(options.plugins)) {
        options.plugins.forEach(function (plugin) {
          if (typeof plugin === 'function') {
            plugin(node);
          }
        });
      } ////调用visitors 


      if (options && options.visitors) {
        var func = options.visitors;

        if (func[node.tag]) {
          func[node.tag](node);
        }
      }
    },
    end: function end(tag) {
      //debug(tag);
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) console.error('invalid state: mismatch end tag'); //当有缓存source资源时于于video补上src资源

      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];

        if (parent.nodes === undefined) {
          parent.nodes = [];
        }

        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      //debug(text);
      var node = {
        node: 'text',
        text: text // textArray:transEmojiStr(text)

      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];

        if (parent.nodes === undefined) {
          parent.nodes = [];
        }

        node.index = parent.index + '.' + parent.nodes.length;
        parent.nodes.push(node);
      }
    },
    comment: function comment(text) {//debug(text);
      // var node = {
      //     node: 'comment',
      //     text: text,
      // };
      // var parent = bufArray[0];
      // if (parent.nodes === undefined) {
      //     parent.nodes = [];
      // }
      // parent.nodes.push(node);
    }
  });
  return results.nodes;
}

;