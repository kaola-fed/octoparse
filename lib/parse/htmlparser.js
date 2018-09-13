/**
 * 
 * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 * 
 */
import {
    startTag,
    endTag,
    attr,
    empty,
    block,
    inline,
    closeSelf,
    fillAttrs,
    special
} from './constant/index'
function HTMLParser(html, handler) {
	var index, chars, match, stack = [], last = html;
	stack.last = function () {
		return this[this.length - 1];
	};
	while (html) {
		chars = true;
		// console.log('stack.last是', stack.last());
		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {
			// Comment
			if (html.indexOf("<!--") == 0) {
				index = html.indexOf("-->");
				if (index >= 0) {
					if (handler.comment)
						handler.comment(html.substring(4, index));
					html = html.substring(index + 3);
					chars = false;
				}
				// end tag
			} else if (html.indexOf("</") == 0) {
				match = html.match(endTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag); ///这句话干嘛用的？
					// console.log('替换完成后的match[0]是', match[0]);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") == 0) {
				match = html.match(startTag);
				// console.log('match的是', match);
				if (match) {
					html = html.substring(match[0].length);
					// console.log('replace前的是', match[0])	
					match[0].replace(startTag, parseStartTag);
					// console.log('replace后的是', match[0])
					chars = false;
				}
			}

			if (chars) {
				index = html.indexOf("<");
				var text = ''
				while (index === 0) {
                                  text += "<";
                                  html = html.substring(1);
                                  index = html.indexOf("<");
				}
				text += index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (handler.chars)
					handler.chars(text);
			}

		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars)
					handler.chars(text);

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html == last)
			throw "Parse Error: " + html;
		last = html;
	}

	// Clean up any remaining tags
	parseEndTag();

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();

		if (block[tagName]) {
			while (stack.last() && inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (closeSelf[tagName] && stack.last() == tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		if (!unary)
			stack.push(tagName);

		if (handler.start) {
			var attrs = [];
			// console.log('rest是', rest);
			rest.replace(attr, function (match, name) {
				// console.log('match是', match);
				// console.log('name是', name);
				// console.log('arguments是',arguments.length)
				var value = arguments[2] ? arguments[2] :
					arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
							fillAttrs[name] ? name : "";
				// console.log('value是', value);
				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}
		}
	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		if (!tagName)
			var pos = 0;

		// Find the closest opened tag of the same type
		else {
			tagName = tagName.toLowerCase();
			for (var pos = stack.length - 1; pos >= 0; pos--)
				if (stack[pos] == tagName)
					break;
		}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--)
				if (handler.end)
					handler.end(stack[i]);

			// Remove the open elements from the stack
			stack.length = pos;
		}
	}
};

export {
	HTMLParser
}