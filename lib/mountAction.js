"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 图片点击事件
function octoParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.currentTarget.dataset.src;
  var tagFrom = e.currentTarget.dataset.from;

  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl,
      // 当前显示图片的http链接
      // urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
      urls: [nowImgUrl]
    });
  }
} /// a 跳转事件


function octoParseTagATap(e) {
  var href = e.currentTarget.dataset.src;
} /// 默认事件


function defaultEvent(e) {}

function mountDefaultAction(wx) {
  wx.octoParseImgTap = octoParseImgTap;
  wx.octoParseTagATap = octoParseTagATap;
  wx.defaultEvent = defaultEvent;
} /////eventMap增加事件


function addEvent2EventMap(eventMap, opt) {
  if (opt.filter) {
    if (opt.filter.indexOf('#') === 0) {
      var id = opt.filter.slice(1);

      if (!eventMap['id'][id]) {
        eventMap['id'][id] = {}; // eventMap['id'][id] = Object.assign(eventMap['id'][id], opt.events); 
      }

      eventMap['id'][id] = Object.assign(eventMap['id'][id], opt.events);
    } else if (opt.filter.indexOf('.') === 0) {
      var className = opt.filter.slice(1);

      if (!eventMap['class'][className]) {
        eventMap['class'][className] = {}; // eventMap['class'][className] = Object.assign(eventMap['class'][className], opt.events);
      }

      eventMap['class'][className] = Object.assign(eventMap['class'][className], opt.events);
    }
  } else if (!opt.filter) {
    eventMap['base'] = Object.assign(eventMap['base'], opt.events);
  }
}

function findClassInRule(ruleClass, classStr) {
  var res = '';
  if (!classStr) return res;
  var classArray = classStr.split(' ');
  var length = classArray.length;

  for (var i = length - 1; i >= 0; i--) {
    var className = classArray[i].slice(1);

    if (ruleClass[className]) {
      res = className;
      break;
    }
  }

  return res;
} /////返回默认方法


function defaultEventName(e) {
  switch (e.type) {
    case 'tap':
      if (e.currentTarget.dataset.tag == 'img') {
        octoParseImgTap(e);
      } else if (e.currentTarget.dataset.tag == 'a') {
        octoParseTagATap(e);
      }

      break;

    default:
      defaultEvent(e);
  }
} ////生成挂载代理事件


function generateAgentFunc(optionArray) {
  var rule = {};

  if (Array.isArray(optionArray)) {
    optionArray.forEach(function (opt) {
      if (!rule[opt.tag]) {
        rule[opt.tag] = {
          base: {},
          "class": {},
          id: {}
        };
        addEvent2EventMap(rule[opt.tag], opt);
      } else {
        addEvent2EventMap(rule[opt.tag], opt);
      }
    });
  }

  return function (e) {
    var dataset = e.currentTarget.dataset;

    if (dataset && rule[dataset.tag]) {
      if (rule[dataset.tag]['id'][dataset.id]) {
        rule[dataset.tag]['id'][dataset.id][e.type](e);
      } else if (findClassInRule(rule[dataset.tag]['class'], dataset["class"])) {
        var className = findClassInRule(rule[dataset.tag]['class'], dataset["class"]);
        rule[dataset.tag]['class'][className][e.type](e);
      } else if (typeof rule[dataset.tag]['base'][e.type] == 'function') {
        rule[dataset.tag]['base'][e.type](e);
      } else {
        defaultEventName(e);
      }
    } else {
      return defaultEventName(e);
    }
  };
} /////事件挂载函数


function mountAction(wx, optionArray) {
  // mountDefaultAction(wx);  ////挂载默认事件
  // registerEvent2Page(wx, optionArray);  ////在page上注册所有的事件
  var agentFunc = generateAgentFunc(optionArray);
  wx.agentFunc = agentFunc; ////注册代理事件
} // module.exports = {
//     mountAction: mountAction
// }


var _default = mountAction;
exports["default"] = _default;