"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transEmojiStr = transEmojiStr;
exports.emojisInit = emojisInit;
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};

function transEmojiStr(str) {
  // var eReg = new RegExp("["+__reg+' '+"]");
  //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')
  var emojiObjs = []; //如果正则表达式为空

  if (__emojisReg.length == 0 || !__emojis) {
    var emojiObj = {};
    emojiObj.node = "text";
    emojiObj.text = str;
    array = [emojiObj];
    return array;
  } //这个地方需要调整


  str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
  var eReg = new RegExp("[:]");
  var array = str.split(eReg);

  for (var i = 0; i < array.length; i++) {
    var ele = array[i];
    var emojiObj = {};

    if (__emojis[ele]) {
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
      emojiObj.text = __emojis[ele];
      emojiObj.baseSrc = __emojisBaseSrc;
    } else {
      emojiObj.node = "text";
      emojiObj.text = ele;
    }

    emojiObjs.push(emojiObj);
  }

  return emojiObjs;
}

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/octoParse/emojis/";
  var emojis = arguments.length > 2 ? arguments[2] : undefined;
  __emojisReg = reg;
  __emojisBaseSrc = baseSrc;
  __emojis = emojis;
}