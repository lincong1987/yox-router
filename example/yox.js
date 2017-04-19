(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Yox = factory());
}(this, (function () { 'use strict';

/**
 * 为了压缩，定义的常量
 *
 * @type {boolean}
 */
var TRUE = true;
var FALSE = false;
var NULL = null;
var UNDEFINED = undefined;
var THIS = 'this';

/**
 * 浏览器环境下的 window 对象
 *
 * @type {?Window}
 */
var win = typeof window !== 'undefined' ? window : NULL;

/**
 * 浏览器环境下的 document 对象
 *
 * @type {?Document}
 */
var doc = typeof document !== 'undefined' ? document : NULL;

/**
 * 空函数
 *
 * @return {Function}
 */
function noop() {
  /** yox */
}

function is(arg, type) {
  return type === 'numeric' ? numeric(arg) : Object.prototype.toString.call(arg).toLowerCase() === '[object ' + type + ']';
}

function func(arg) {
  return is(arg, 'function');
}

function array(arg) {
  return is(arg, 'array');
}

function object(arg) {
  // 低版本 IE 会把 null 和 undefined 当作 object
  return arg && is(arg, 'object');
}

function string(arg) {
  return is(arg, 'string');
}

function number(arg) {
  return is(arg, 'number');
}

function boolean(arg) {
  return is(arg, 'boolean');
}

function primitive(arg) {
  return string(arg) || number(arg) || boolean(arg) || arg == NULL;
}

function numeric(arg) {
  return !isNaN(parseFloat(arg)) && isFinite(arg);
}

var is$1 = Object.freeze({
	is: is,
	func: func,
	array: array,
	object: object,
	string: string,
	number: number,
	boolean: boolean,
	primitive: primitive,
	numeric: numeric
});

var execute = function (fn, context, args) {
  if (func(fn)) {
    if (array(args)) {
      return fn.apply(context, args);
    } else {
      return fn.call(context, args);
    }
  }
};

var toNumber = function (str) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (numeric(str)) {
    return +str;
  }
  return defaultValue;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Event = function () {
  function Event(event) {
    classCallCheck(this, Event);

    if (event.type) {
      this.type = event.type;
      this.originalEvent = event;
    } else {
      this.type = event;
    }
  }

  createClass(Event, [{
    key: 'prevent',
    value: function prevent() {
      if (!this.isPrevented) {
        var originalEvent = this.originalEvent;

        if (originalEvent) {
          if (func(originalEvent.prevent)) {
            originalEvent.prevent();
          } else if (func(originalEvent.preventDefault)) {
            originalEvent.preventDefault();
          }
        }
        this.isPrevented = TRUE;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.isStoped) {
        var originalEvent = this.originalEvent;

        if (originalEvent) {
          if (func(originalEvent.stop)) {
            originalEvent.stop();
          } else if (func(originalEvent.stopPropagation)) {
            originalEvent.stopPropagation();
          }
        }
        this.isStoped = TRUE;
      }
    }
  }]);
  return Event;
}();

Event.is = function (target) {
  return target instanceof Event;
};

/**
 * 为了压缩，定义的常用字符
 */

function charAt(str) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return str.charAt(index);
}

function codeAt(str) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return str.charCodeAt(index);
}

var CHAR_BLANK = '';

var CHAR_DOT = '.';
var CODE_DOT = codeAt(CHAR_DOT);

var CHAR_HASH = '#';
var CODE_HASH = codeAt(CHAR_HASH);

var CHAR_DASH = '-';
var CODE_DASH = codeAt(CHAR_DASH);

var CHAR_EQUAL = '=';
var CODE_EQUAL = codeAt(CHAR_EQUAL);

var CHAR_SLASH = '/';
var CODE_SLASH = codeAt(CHAR_SLASH);

var CHAR_COMMA = ',';
var CODE_COMMA = codeAt(CHAR_COMMA);

var CHAR_COLON = ':';
var CODE_COLON = codeAt(CHAR_COLON);

var CHAR_SEMCOL = ';';
var CODE_SEMCOL = codeAt(CHAR_SEMCOL);

var CHAR_SQUOTE = "'";
var CODE_SQUOTE = codeAt(CHAR_SQUOTE);

var CHAR_DQUOTE = '"';
var CODE_DQUOTE = codeAt(CHAR_DQUOTE);

var CHAR_OPAREN = '(';
var CODE_OPAREN = codeAt(CHAR_OPAREN);

var CHAR_CPAREN = ')';
var CODE_CPAREN = codeAt(CHAR_CPAREN);

var CHAR_OBRACK = '[';
var CODE_OBRACK = codeAt(CHAR_OBRACK);

var CHAR_CBRACK = ']';
var CODE_CBRACK = codeAt(CHAR_CBRACK);

var CHAR_OBRACE = '{';
var CODE_OBRACE = codeAt(CHAR_OBRACE);

var CHAR_CBRACE = '}';
var CODE_CBRACE = codeAt(CHAR_CBRACE);

var CHAR_LEFT = '<';
var CODE_LEFT = codeAt(CHAR_LEFT);

var CHAR_RIGHT = '>';
var CODE_RIGHT = codeAt(CHAR_RIGHT);

var CHAR_QUMARK = '?';
var CODE_QUMARK = codeAt(CHAR_QUMARK);

var CHAR_TAB = '\t';
var CODE_TAB = codeAt(CHAR_TAB);

var CHAR_BREAKLINE = '\n';
var CODE_BREAKLINE = codeAt(CHAR_BREAKLINE);

var CHAR_WHITESPACE = ' ';
var CODE_WHITESPACE = codeAt(CHAR_WHITESPACE);

/**
 * 遍历数组
 *
 * @param {Array} array
 * @param {Function} callback 返回 false 可停止遍历
 * @param {?boolean} reversed 是否逆序遍历
 */
function each(array$$1, callback, reversed) {
  var length = array$$1.length;

  if (length) {
    if (reversed) {
      for (var i = length - 1; i >= 0; i--) {
        if (callback(array$$1[i], i) === FALSE) {
          break;
        }
      }
    } else {
      for (var _i = 0; _i < length; _i++) {
        if (callback(array$$1[_i], _i) === FALSE) {
          break;
        }
      }
    }
  }
}

/**
 * 合并多个数组，不去重
 *
 * @return {Array}
 */
function merge() {
  var args = toArray$1(arguments);
  var result = [];
  args.unshift(result);
  execute(push, NULL, args);
  return result;
}

function add(action) {
  return function (original) {
    var args = arguments;
    for (var i = 1, len = args.length; i < len; i++) {
      if (array(args[i])) {
        each(args[i], function (item) {
          original[action](item);
        });
      } else {
        original[action](args[i]);
      }
    }
  };
}

/**
 * push 数组
 *
 * @param {Array} original
 * @param {...}
 */
var push = add('push');

/**
 * unshift 数组
 *
 * @param {Array} original
 * @param {...}
 */
var unshift = add('unshift');

/**
 * 把类数组转成数组
 *
 * @param {Array|ArrayLike} array 类数组
 * @return {Array}
 */
function toArray$1(array$$1) {
  return array(array$$1) ? array$$1 : execute(Array.prototype.slice, array$$1);
}

/**
 * 把数组转成对象
 *
 * [ { key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' } ]
 * 可转成
 * { key1: value1, key2: value2 }
 *
 * @param {Array} array 数组
 * @param {?string} key 数组项包含的字段名称，如果数组项是基本类型，可不传
 * @param {?string} value 数组项包含的字段名称或值
 * @return {Object}
 */
function toObject(array$$1, key, value) {
  var result = {},
      hasValue = arguments.length === 3;
  each(array$$1, function (item, index) {
    if (string(value)) {
      index = item[value];
    } else {
      index = hasValue ? value : item;
    }
    result[key ? item[key] : item] = index;
  });
  return result;
}

/**
 * 数组项在数组中的位置
 *
 * @param {Array} array 数组
 * @param {*} item 数组项
 * @param {?boolean} strict 是否全等判断，默认是全等
 * @return {number} 如果未找到，返回 -1
 */
function indexOf(array$$1, item, strict) {
  if (strict !== FALSE) {
    return array$$1.indexOf(item);
  } else {
    for (var i = 0, len = array$$1.length; i < len; i++) {
      if (array$$1[i] == item) {
        return i;
      }
    }
    return -1;
  }
}

/**
 * 数组是否包含 item
 *
 * @param {Array} array 数组
 * @param {*} item 可能包含的数组项
 * @param {?boolean} strict 是否全等判断，默认是全等
 * @return {boolean}
 */
function has(array$$1, item, strict) {
  return indexOf(array$$1, item, strict) >= 0;
}

/**
 * 获取数组最后一项
 *
 * @param {Array} array 数组
 * @return {*}
 */
function last(array$$1) {
  return array$$1[array$$1.length - 1];
}

/**
 * 弹出数组最后一项
 *
 * 项目里用的太多，节省点字符...
 *
 * @param {Array} array 数组
 * @return {*}
 */
function pop(array$$1) {
  return array$$1.pop();
}

/**
 * 删除数组项
 *
 * @param {Array} array 数组
 * @param {*} item 待删除项
 * @param {?boolean} strict 是否全等判断，默认是全等
 * @return {boolean} 是否删除成功
 */
function remove(array$$1, item, strict) {
  var index = indexOf(array$$1, item, strict);
  if (index >= 0) {
    array$$1.splice(index, 1);
    return TRUE;
  }
  return FALSE;
}

/**
 * 用于判断长度大于 0 的数组
 *
 * @param {*} array
 * @return {boolean}
 */
function falsy(array$$1) {
  return !array(array$$1) || array$$1.length === 0;
}

var array$1 = Object.freeze({
	each: each,
	merge: merge,
	push: push,
	unshift: unshift,
	toArray: toArray$1,
	toObject: toObject,
	indexOf: indexOf,
	has: has,
	last: last,
	pop: pop,
	remove: remove,
	falsy: falsy
});

/**
 * 转成驼峰
 *
 * @param {string} str
 * @return {string}
 */
function camelCase(str) {
  if (has$2(str, CHAR_DASH)) {
    return str.replace(/-([a-z])/gi, function ($0, $1) {
      return $1.toUpperCase();
    });
  }
  return str;
}

/**
 * 判断长度大于 0 的字符串
 *
 * @param {*} str
 * @return {boolean}
 */
function falsy$1(str) {
  return !string(str) || str === CHAR_BLANK;
}

/**
 * 删除两侧空白符
 *
 * @param {*} str
 * @return {boolean}
 */
function trim(str) {
  return falsy$1(str) ? CHAR_BLANK : str.trim();
}

function slice(str, start, end) {
  return number(end) ? str.slice(start, end) : str.slice(start);
}

function split(str, delimiter) {
  return falsy$1(str) ? [] : str.split(new RegExp('\\s*' + delimiter.replace(/[.*?]/g, '\\$&') + '\\s*'));
}

function indexOf$1(str, part) {
  return str.indexOf(part);
}

function has$2(str, part) {
  return indexOf$1(str, part) >= 0;
}

function startsWith(str, part) {
  return indexOf$1(str, part) === 0;
}

function endsWith(str, part) {
  var offset = str.length - part.length;
  return offset >= 0 && str.lastIndexOf(part) === offset;
}

var string$1 = Object.freeze({
	camelCase: camelCase,
	falsy: falsy$1,
	trim: trim,
	slice: slice,
	split: split,
	indexOf: indexOf$1,
	has: has$2,
	startsWith: startsWith,
	endsWith: endsWith
});

var SEPARATOR_KEY = '.';

var LEVEL_CURRENT = '.';


var normalizeCache = {};

function normalize(str) {
  if (!falsy$1(str) && indexOf$1(str, '[') > 0 && indexOf$1(str, ']') > 0) {
    if (!has$1(normalizeCache, str)) {
      normalizeCache[str] = str.replace(/\[\s*?([^\]]+)\s*?\]/g, function ($0, $1) {
        var code = codeAt($1);
        if (code === CODE_SQUOTE || code === CODE_DQUOTE) {
          $1 = slice($1, 1, -1);
        }
        return '' + SEPARATOR_KEY + $1;
      });
    }
    return normalizeCache[str];
  }
  return str;
}

function filter(term) {
  return term !== CHAR_BLANK && term !== THIS && term !== LEVEL_CURRENT;
}

function parse(str) {
  return split(normalize(str), SEPARATOR_KEY).filter(filter);
}

function stringify(keypaths) {
  return keypaths.filter(filter).join(SEPARATOR_KEY);
}

function join(keypath1, keypath2) {
  if (keypath1 && keypath2) {
    return keypath1 + SEPARATOR_KEY + keypath2;
  } else if (keypath1) {
    return keypath1;
  } else {
    return keypath2 || CHAR_BLANK;
  }
}

/**
 * 获取对象的 key 的数组
 *
 * @param {Object} object
 * @return {Array}
 */
function keys(object$$1) {
  return Object.keys(object$$1);
}

/**
 * 排序对象的 key
 *
 * @param {Object} object
 * @param {Object} desc 是否逆序，默认从小到大排序
 * @return {Array.<string>}
 */
function sort(object$$1, desc) {
  var sorter = void 0;
  if (desc) {
    sorter = function sorter(a, b) {
      return b.length - a.length;
    };
  } else {
    sorter = function sorter(a, b) {
      return a.length - b.length;
    };
  }
  return keys(object$$1).sort(sorter);
}

/**
 * 遍历对象
 *
 * @param {Object} object
 * @param {Function} callback 返回 false 可停止遍历
 */
function each$1(object$$1, callback) {
  each(keys(object$$1), function (key) {
    return callback(object$$1[key], key);
  });
}

/**
 * 对象是否包含某个 key
 *
 * @param {Object} object
 * @param {string} key
 * @return {boolean}
 */
function has$1(object$$1, key) {
  try {
    return object$$1.hasOwnProperty(key);
  } catch (e) {
    return key in object$$1;
  }
}

/**
 * 清空对象所有的值
 *
 * @param {Object} object
 */
function clear(object$$1) {
  each$1(object$$1, function (value, key) {
    delete object$$1[key];
  });
}

/**
 * 扩展对象
 *
 * @return {Object}
 */
function extend() {
  var args = arguments,
      result = args[0];
  for (var i = 1, len = args.length; i < len; i++) {
    if (object(args[i])) {
      each$1(args[i], function (value, key) {
        result[key] = value;
      });
    }
  }
  return result;
}

/**
 * 拷贝对象
 *
 * @param {*} object
 * @param {?boolean} deep 是否需要深拷贝
 * @return {*}
 */
function copy(object$$1, deep) {
  var result = object$$1;
  if (array(object$$1)) {
    result = [];
    each(object$$1, function (item, index) {
      result[index] = deep ? copy(item) : item;
    });
  } else if (object(object$$1)) {
    result = {};
    each$1(object$$1, function (value, key) {
      result[key] = deep ? copy(value) : value;
    });
  }
  return result;
}

function getValue(value) {
  // 如果函数改写了 toString，就调用 toString() 求值
  if (func(value) && value.toString !== Function.prototype.toString) {
    value = value.toString();
  }
  return value;
}

/**
 * 从对象中查找一个 keypath
 *
 * 返回值是对象时，表示找了值
 * 返回值是空时，表示没找到值
 *
 * @param {Object} object
 * @param {string|number} keypath
 * @return {?Object}
 */
function get$1(object$$1, keypath) {

  if (!falsy$1(keypath) && !has$1(object$$1, keypath)
  // 不能以 . 开头
  && indexOf$1(keypath, CHAR_DOT) > 0) {
    var list = parse(keypath);
    for (var i = 0, len = list.length; i < len; i++) {
      if (i < len - 1) {
        object$$1 = getValue(object$$1[list[i]]);
        if (object$$1 == NULL) {
          return;
        }
      } else {
        keypath = list[i];
      }
    }
  }

  if (has$1(object$$1, keypath)) {
    return {
      value: getValue(object$$1[keypath])
    };
  }
}

/**
 * 为对象设置一个键值对
 *
 * @param {Object} object
 * @param {string|number} keypath
 * @param {*} value
 * @param {?boolean} autofill 是否自动填充不存在的对象，默认自动填充
 */
function set$1(object$$1, keypath, value, autofill) {
  if (!falsy$1(keypath) && !has$1(object$$1, keypath) && indexOf$1(keypath, CHAR_DOT) > 0) {
    var originalObject = object$$1;
    var list = parse(keypath);
    var prop = pop(list);
    each(list, function (item, index) {
      if (object$$1[item]) {
        object$$1 = object$$1[item];
      } else if (autofill !== FALSE) {
        object$$1 = object$$1[item] = {};
      } else {
        return object$$1 = FALSE;
      }
    });
    if (object$$1 && object$$1 !== originalObject) {
      object$$1[prop] = value;
    }
  } else {
    object$$1[keypath] = value;
  }
}

var object$1 = Object.freeze({
	keys: keys,
	sort: sort,
	each: each$1,
	has: has$1,
	clear: clear,
	extend: extend,
	copy: copy,
	get: get$1,
	set: set$1
});

var Emitter = function () {
  function Emitter() {
    classCallCheck(this, Emitter);

    this.listeners = {};
  }

  createClass(Emitter, [{
    key: 'on',
    value: function on(type, listener) {
      var listeners = this.listeners;


      var addListener = function addListener(listener, type) {
        if (func(listener)) {
          push(listeners[type] || (listeners[type] = []), listener);
        }
      };

      if (object(type)) {
        each$1(type, addListener);
      } else if (string(type)) {
        addListener(listener, type);
      }
    }
  }, {
    key: 'once',
    value: function once(type, listener) {

      var instance = this;
      var addOnce = function addOnce(listener, type) {
        if (func(listener)) {
          listener.$once = function () {
            instance.off(type, listener);
          };
        }
      };

      if (object(type)) {
        each$1(type, addOnce);
      } else if (string(type)) {
        addOnce(listener, type);
      }

      instance.on(type, listener);
    }
  }, {
    key: 'off',
    value: function off(type, listener) {

      if (type == NULL) {
        this.listeners = {};
      } else {
        var listeners = this.listeners;

        var list = listeners[type];
        if (list) {
          if (listener == NULL) {
            list.length = 0;
          } else {
            remove(list, listener);
          }
          if (!list.length) {
            delete listeners[type];
          }
        }
      }
    }
  }, {
    key: 'fire',
    value: function fire(type, data, context) {

      if (arguments.length === 2) {
        context = NULL;
      }

      var event = data;
      if (array(data)) {
        event = data[0];
      }

      var isEvent = Event.is(event),
          isComplete = TRUE;

      var listeners = this.listeners;

      var list = listeners[type];
      if (list) {
        each(list, function (listener) {

          var result = execute(listener, context, data);

          var $once = listener.$once;

          if (func($once)) {
            $once();
            delete listener.$once;
          }

          // 如果没有返回 false，而是调用了 event.stop 也算是返回 false
          if (isEvent) {
            if (result === FALSE) {
              event.prevent();
              event.stop();
            } else if (event.isStoped) {
              result = FALSE;
            }
          }

          if (result === FALSE) {
            return isComplete = FALSE;
          }
        });
      }

      return isComplete;
    }
  }, {
    key: 'has',
    value: function has$$1(type, listener) {
      var listeners = this.listeners;

      var list = listeners[type];

      if (listener == NULL) {
        return !falsy(list);
      } else if (list) {
        return has(list, listener);
      }
    }
  }]);
  return Emitter;
}();

/**
 * 是否有原生的日志特性，没有必要单独实现
 *
 * @type {boolean}
 */
var hasConsole = typeof console !== 'undefined';

var debug = /yox/.test(noop.toString());

// 全局可覆盖
// 比如开发环境，开了 debug 模式，但是有时候觉得看着一堆日志特烦，想强制关掉
// 比如线上环境，关了 debug 模式，为了调试，想强制打开
function isDebug() {
  if (win) {
    var DEBUG = win.DEBUG;

    if (boolean(DEBUG)) {
      return BEBUG;
    }
  }
  return debug;
}

/**
 * 打印普通日志
 *
 * @param {string} msg
 */
function log(msg) {
  if (hasConsole && isDebug()) {
    console.log('[Yox log]: ' + msg);
  }
}

/**
 * 打印警告日志
 *
 * @param {string} msg
 */
function warn(msg) {
  if (hasConsole && isDebug()) {
    console.warn('[Yox warn]: ' + msg);
  }
}

/**
 * 打印错误日志
 *
 * @param {string} msg
 */
function error$1(msg) {
  if (hasConsole) {
    console.error('[Yox error]: ' + msg);
  }
}

/**
 * 致命错误，中断程序
 *
 * @param {string} msg
 */
function fatal(msg) {
  throw new Error('[Yox fatal]: ' + msg);
}

var logger = Object.freeze({
	log: log,
	warn: warn,
	error: error$1,
	fatal: fatal
});

function byObserver(fn) {
  var observer = new MutationObserver(fn);
  var textNode = doc.createTextNode(CHAR_BLANK);
  observer.observe(textNode, {
    characterData: TRUE
  });
  textNode.data = CHAR_WHITESPACE;
}

function byImmediate(fn) {
  setImmediate(fn);
}

function byTimeout(fn) {
  setTimeout(fn);
}

var nextTick = void 0;
if (typeof MutationObserver === 'function') {
  nextTick = byObserver;
} else if (typeof setImmediate === 'function') {
  nextTick = byImmediate;
} else {
  nextTick = byTimeout;
}

var nextTick$1 = function (fn) {
  // 移动端的输入法唤起时，貌似会影响 MutationObserver 的 nextTick 触发
  // 因此当输入框是激活状态时，改用 setTimeout
  if (doc) {
    var activeElement = doc.activeElement;

    if (activeElement && 'autofocus' in activeElement) {
      byTimeout(fn);
      return;
    }
  }
  nextTick(fn);
};

var nextTasks = [];

function add$1(name, task) {
  if (!nextTasks.length) {
    nextTick$1(run);
  }
  array$1[name](nextTasks, task);
}

/**
 * 在队尾添加异步任务
 *
 * @param {Function} task
 */
function append(task) {
  add$1('push', task);
}

/**
 * 在队首添加异步任务
 *
 * @param {Function} task
 */
function prepend(task) {
  add$1('unshift', task);
}

/**
 * 立即执行已添加的任务
 */
function run() {
  var tasks = nextTasks;
  nextTasks = [];
  each(tasks, function (task) {
    // 不设置 i 默认直接执行
    // 设置 i 会进行倒计时，当 i 变成 0 时执行
    if (!task.i) {
      task();
    } else {
      task.i--;
      push(nextTasks, task);
    }
  });
  if (nextTasks.length) {
    nextTick$1(run);
  }
}

/**
 * 用前缀匹配数组中的第一个字符串
 *
 * @param {Array.<string>} list
 * @param {string} value
 * @return {Array}
 */
var matchFirst = function (list, value) {
  var result = [];
  each(list, function (prefix) {
    if (startsWith(value, prefix)) {
      push(result, prefix, slice(value, prefix.length));
      return FALSE;
    }
  });
  return result;
};

var PLUS = '+';
var MINUS = '-';
var MULTIPLY = '*';
var DIVIDE = '/';
var MODULO = '%';
var WAVE = '~';

var AND = '&&';
var OR = '||';
var NOT = '!';
var BOOLEAN = '!!';

var SE = '===';
var SNE = '!==';
var LE = '==';
var LNE = '!=';
var LT = '<';
var LTE = '<=';
var GT = '>';
var GTE = '>=';

var unaryMap = {};

unaryMap[PLUS] = unaryMap[MINUS] = unaryMap[NOT] = unaryMap[WAVE] = unaryMap[BOOLEAN] = TRUE;

var unaryList = sort(unaryMap, TRUE);

// 操作符和对应的优先级，数字越大优先级越高
var binaryMap = {};

binaryMap[OR] = 1;

binaryMap[AND] = 2;

binaryMap[LE] = binaryMap[LNE] = binaryMap[SE] = binaryMap[SNE] = 3;

binaryMap[LT] = binaryMap[LTE] = binaryMap[GT] = binaryMap[GTE] = 4;

binaryMap[PLUS] = binaryMap[MINUS] = 5;

binaryMap[MULTIPLY] = binaryMap[DIVIDE] = binaryMap[MODULO] = 6;

var binaryList = sort(binaryMap, TRUE);

/**
 * 节点基类
 */
var Node = function Node(type) {
  classCallCheck(this, Node);

  this.type = type;
};

/**
 * 数组表达式，如 [ 1, 2, 3 ]
 *
 * @type {number}
 */
var ARRAY = 1;

/**
 * 二元表达式，如 a + b
 *
 * @type {number}
 */
var BINARY = 2;

/**
 * 函数调用表达式，如 a()
 *
 * @type {number}
 */
var CALL = 3;

/**
 * 标识符
 *
 * @type {number}
 */
var IDENTIFIER = 4;

/**
 * 字面量
 *
 * @type {number}
 */
var LITERAL = 5;

/**
 * 对象属性或数组下标
 *
 * @type {number}
 */
var MEMBER = 6;

/**
 * 三元表达式，如 a ? b : c
 *
 * @type {number}
 */
var TERNARY = 7;

/**
 * 一元表达式，如 - a
 *
 * @type {number}
 */
var UNARY = 8;

/**
 * Array 节点
 *
 * @param {Array.<Node>} elements
 */

var Array$1 = function (_Node) {
  inherits(Array, _Node);

  function Array(elements) {
    classCallCheck(this, Array);

    var _this = possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this, ARRAY));

    _this.elements = elements;
    return _this;
  }

  return Array;
}(Node);

/**
 * Binary 节点
 *
 * @param {Node} left
 * @param {string} operator
 * @param {Node} right
 */

var Binary = function (_Node) {
  inherits(Binary, _Node);

  function Binary(left, operator, right) {
    classCallCheck(this, Binary);

    var _this = possibleConstructorReturn(this, (Binary.__proto__ || Object.getPrototypeOf(Binary)).call(this, BINARY));

    _this.left = left;
    _this.operator = operator;
    _this.right = right;
    return _this;
  }

  return Binary;
}(Node);

Binary[OR] = function (a, b) {
  return a || b;
};
Binary[AND] = function (a, b) {
  return a && b;
};
Binary[SE] = function (a, b) {
  return a === b;
};
Binary[SNE] = function (a, b) {
  return a !== b;
};
Binary[LE] = function (a, b) {
  return a == b;
};
Binary[LNE] = function (a, b) {
  return a != b;
};
Binary[LT] = function (a, b) {
  return a < b;
};
Binary[LTE] = function (a, b) {
  return a <= b;
};
Binary[GT] = function (a, b) {
  return a > b;
};
Binary[GTE] = function (a, b) {
  return a >= b;
};
Binary[PLUS] = function (a, b) {
  return a + b;
};
Binary[MINUS] = function (a, b) {
  return a - b;
};
Binary[MULTIPLY] = function (a, b) {
  return a * b;
};
Binary[DIVIDE] = function (a, b) {
  return a / b;
};
Binary[MODULO] = function (a, b) {
  return a % b;
};

/**
 * Call 节点
 *
 * @param {Node} callee
 * @param {Array.<Node>} args
 */

var Call = function (_Node) {
  inherits(Call, _Node);

  function Call(callee, args) {
    classCallCheck(this, Call);

    var _this = possibleConstructorReturn(this, (Call.__proto__ || Object.getPrototypeOf(Call)).call(this, CALL));

    _this.callee = callee;
    _this.args = args;
    return _this;
  }

  return Call;
}(Node);

/**
 * Ternary 节点
 *
 * @param {Node} test
 * @param {Node} consequent
 * @param {Node} alternate
 */

var Ternary = function (_Node) {
  inherits(Ternary, _Node);

  function Ternary(test, consequent, alternate) {
    classCallCheck(this, Ternary);

    var _this = possibleConstructorReturn(this, (Ternary.__proto__ || Object.getPrototypeOf(Ternary)).call(this, TERNARY));

    _this.test = test;
    _this.consequent = consequent;
    _this.alternate = alternate;
    return _this;
  }

  return Ternary;
}(Node);

/**
 * Identifier 节点
 *
 * @param {string} name
 */

var Identifier = function (_Node) {
  inherits(Identifier, _Node);

  function Identifier(name) {
    classCallCheck(this, Identifier);

    var _this = possibleConstructorReturn(this, (Identifier.__proto__ || Object.getPrototypeOf(Identifier)).call(this, IDENTIFIER));

    _this.name = name;
    return _this;
  }

  return Identifier;
}(Node);

/**
 * Literal 节点
 *
 * @param {*} value
 * @param {string} raw
 */

var Literal = function (_Node) {
  inherits(Literal, _Node);

  function Literal(value, raw) {
    classCallCheck(this, Literal);

    var _this = possibleConstructorReturn(this, (Literal.__proto__ || Object.getPrototypeOf(Literal)).call(this, LITERAL));

    _this.value = value;
    if (raw) {
      _this.raw = raw;
    }
    return _this;
  }

  return Literal;
}(Node);

/**
 * Member 节点
 *
 * @param {Identifier} object
 * @param {Node} prop
 */

var Member = function (_Node) {
  inherits(Member, _Node);

  function Member(object, prop) {
    classCallCheck(this, Member);

    var _this = possibleConstructorReturn(this, (Member.__proto__ || Object.getPrototypeOf(Member)).call(this, MEMBER));

    _this.object = object;
    _this.prop = prop;
    return _this;
  }

  return Member;
}(Node);

Member.flatten = function (node) {

  var result = [];

  var next = void 0;
  do {
    next = node.object;
    if (node.type === MEMBER) {
      unshift(result, node.prop);
    } else {
      unshift(result, node);
    }
  } while (node = next);

  return result;
};

/**
 * Unary 节点
 *
 * @param {string} operator
 * @param {Node} arg
 */

var Unary = function (_Node) {
  inherits(Unary, _Node);

  function Unary(operator, arg) {
    classCallCheck(this, Unary);

    var _this = possibleConstructorReturn(this, (Unary.__proto__ || Object.getPrototypeOf(Unary)).call(this, UNARY));

    _this.operator = operator;
    _this.arg = arg;
    return _this;
  }

  return Unary;
}(Node);

Unary[PLUS] = function (value) {
  return +value;
};
Unary[MINUS] = function (value) {
  return -value;
};
Unary[NOT] = function (value) {
  return !value;
};
Unary[WAVE] = function (value) {
  return ~value;
};
Unary[BOOLEAN] = function (value) {
  return !!value;
};

// 区分关键字和普通变量
// 举个例子：a === true
// 从解析器的角度来说，a 和 true 是一样的 token
var keywords = {};
// 兼容 IE8
keywords['true'] = TRUE;
keywords['false'] = FALSE;
keywords['null'] = NULL;
keywords['undefined'] = UNDEFINED;

// 缓存编译结果
var compileCache$1 = {};

/**
 * 是否是数字
 *
 * @param {number} charCode
 * @return {boolean}
 */
function isDigit(charCode) {
  return charCode >= 48 && charCode <= 57; // 0...9
}

/**
 * 变量开始字符必须是 字母、下划线、$
 *
 * @param {number} charCode
 * @return {boolean}
 */
function isIdentifierStart(charCode) {
  return charCode === 36 // $
  || charCode === 95 // _
  || charCode >= 97 && charCode <= 122 // a...z
  || charCode >= 65 && charCode <= 90; // A...Z
}

/**
 * 变量剩余的字符必须是 字母、下划线、$、数字
 *
 * @param {number} charCode
 * @return {boolean}
 */
function isIdentifierPart(charCode) {
  return isIdentifierStart(charCode) || isDigit(charCode);
}

/**
 * 把表达式编译成抽象语法树
 *
 * @param {string} content 表达式字符串
 * @return {Object}
 */
function compile$1(content) {

  if (has$1(compileCache$1, content)) {
    return compileCache$1[content];
  }

  var length = content.length;

  var index = 0,
      charCode = void 0;

  var getCharCode = function getCharCode() {
    return codeAt(content, index);
  };
  var throwError = function throwError() {
    fatal('Failed to compile expression: ' + CHAR_BREAKLINE + content);
  };

  var skipWhitespace = function skipWhitespace() {
    while ((charCode = getCharCode()) && (charCode === CODE_WHITESPACE || charCode === CODE_TAB)) {
      index++;
    }
  };

  var skipNumber = function skipNumber() {
    if (getCharCode() === CODE_DOT) {
      skipDecimal();
    } else {
      skipDigit();
      if (getCharCode() === CODE_DOT) {
        skipDecimal();
      }
    }
  };

  var skipDigit = function skipDigit() {
    do {
      index++;
    } while (isDigit(getCharCode()));
  };

  var skipDecimal = function skipDecimal() {
    // 跳过点号
    index++;
    // 后面必须紧跟数字
    if (isDigit(getCharCode())) {
      skipDigit();
    } else {
      throwError();
    }
  };

  var skipString = function skipString() {

    var quote = getCharCode();

    // 跳过引号
    index++;
    while (index < length) {
      index++;
      if (codeAt(content, index - 1) === quote) {
        return;
      }
    }

    throwError();
  };

  var skipIdentifier = function skipIdentifier() {
    // 第一个字符一定是经过 isIdentifierStart 判断的
    // 因此循环至少要执行一次
    do {
      index++;
    } while (isIdentifierPart(getCharCode()));
  };

  var parseIdentifier = function parseIdentifier(careKeyword) {

    var literal = content.substring(index, (skipIdentifier(), index));
    if (literal) {
      return careKeyword && has$1(keywords, literal) ? new Literal(keywords[literal])
      // this 也视为 IDENTIFIER
      : new Identifier(literal);
    }

    throwError();
  };

  var parseTuple = function parseTuple(delimiter) {

    var list = [];

    // 跳过开始字符，如 [、(
    index++;

    while (index < length) {
      charCode = getCharCode();
      if (charCode === delimiter) {
        index++;
        return list;
      } else if (charCode === CODE_COMMA) {
        index++;
      } else {
        push(list, parseExpression());
      }
    }

    throwError();
  };

  var parseOperator = function parseOperator(sortedOperatorList) {
    skipWhitespace();
    var literal = matchFirst(sortedOperatorList, slice(content, index))[0];
    if (literal) {
      index += literal.length;
      return literal;
    }
  };

  var parseVariable = function parseVariable() {

    var node = parseIdentifier(TRUE);

    while (index < length) {
      // a(x)
      charCode = getCharCode();
      if (charCode === CODE_OPAREN) {
        return new Call(node, parseTuple(CODE_CPAREN));
      } else {
        // a.x
        if (charCode === CODE_DOT) {
          index++;
          node = new Member(node, new Literal(parseIdentifier().name));
        }
        // a[x]
        else if (charCode === CODE_OBRACK) {
            node = new Member(node, parseExpression(CODE_CBRACK));
          } else {
            break;
          }
      }
    }

    return node;
  };

  var parseToken = function parseToken() {

    skipWhitespace();

    charCode = getCharCode();
    // 'xx' 或 "xx"
    if (charCode === CODE_SQUOTE || charCode === CODE_DQUOTE) {
      // 截出的字符串包含引号
      var value = content.substring(index, (skipString(), index));
      return new Literal(slice(value, 1, -1), value);
    }
    // 1.1 或 .1
    else if (isDigit(charCode) || charCode === CODE_DOT) {
        return new Literal(
        // 写的是什么进制就解析成什么进制
        parseFloat(content.substring(index, (skipNumber(), index))));
      }
      // [xx, xx]
      else if (charCode === CODE_OBRACK) {
          return new Array$1(parseTuple(CODE_CBRACK));
        }
        // (xx)
        else if (charCode === CODE_OPAREN) {
            return parseExpression(CODE_CPAREN);
          }
          // 变量
          else if (isIdentifierStart(charCode)) {
              return parseVariable();
            }
    // 一元操作
    var action = parseOperator(unaryList);
    if (action) {
      return new Unary(action, parseToken());
    }
    throwError();
  };

  var parseBinary = function parseBinary() {

    var left = parseToken();
    var action = parseOperator(binaryList);
    if (!action) {
      return left;
    }

    var stack = [left, action, binaryMap[action], parseToken()];
    var right = void 0,
        next = void 0;

    while (next = parseOperator(binaryList)) {

      // 处理左边
      if (stack.length > 3 && binaryMap[next] < stack[stack.length - 2]) {
        right = pop(stack);
        pop(stack);
        action = pop(stack);
        left = pop(stack);
        push(stack, new Binary(left, action, right));
      }

      push(stack, next, binaryMap[next], parseToken());
    }

    // 处理右边
    // 右边只有等到所有 token 解析完成才能开始
    // 比如 a + b * c / d
    // 此时右边的优先级 >= 左边的优先级，因此可以脑残的直接逆序遍历

    right = pop(stack);
    while (stack.length > 1) {
      pop(stack);
      action = pop(stack);
      left = pop(stack);
      right = new Binary(left, action, right);
    }

    return right;
  };

  var parseExpression = function parseExpression(delimiter) {

    // 主要是区分三元和二元表达式
    // 三元表达式可以认为是 3 个二元表达式组成的
    // test ? consequent : alternate

    // 跳过开始字符
    if (delimiter) {
      index++;
    }

    // 保证调用 parseExpression() 之后无需再次调用 skipWhitespace()
    var test = parseBinary();
    skipWhitespace();

    if (getCharCode() === CODE_QUMARK) {
      index++;

      var consequent = parseBinary();
      skipWhitespace();

      if (getCharCode() === CODE_COLON) {
        index++;

        var alternate = parseBinary();
        skipWhitespace();

        return new Ternary(test, consequent, alternate);
      } else {
        throwError();
      }
    }

    if (delimiter) {
      if (getCharCode() === delimiter) {
        index++;
      } else {
        throwError();
      }
    }

    return test;
  };

  return compileCache$1[content] = parseExpression();
}

var IF = '#if';
var ELSE = 'else';
var ELSE_IF = 'else if';
var EACH = '#each';
var PARTIAL = '#partial';
var IMPORT = '>';
var COMMENT = '! ';
var SPREAD = '...';

var SPECIAL_EVENT = '$event';
var SPECIAL_KEYPATH = '$keypath';

var DIRECTIVE_CUSTOM_PREFIX = 'o-';
var DIRECTIVE_EVENT_PREFIX = 'on-';

var DIRECTIVE_REF = 'ref';
var DIRECTIVE_LAZY = 'lazy';
var DIRECTIVE_MODEL = 'model';
var DIRECTIVE_EVENT = 'event';

var KEYWORD_UNIQUE = 'key';

/**
 * if 节点
 *
 * @type {number}
 */
var IF$1 = 1;

/**
 * else if 节点
 *
 * @type {number}
 */
var ELSE_IF$1 = 2;

/**
 * else 节点
 *
 * @type {number}
 */
var ELSE$1 = 3;

/**
 * each 节点
 *
 * @type {number}
 */
var EACH$1 = 4;

/**
 * partial 节点
 *
 * @type {number}
 */
var PARTIAL$1 = 5;

/**
 * import 节点
 *
 * @type {number}
 */
var IMPORT$1 = 6;

/**
 * 表达式 节点
 *
 * @type {number}
 */
var EXPRESSION = 7;

/**
 * 延展操作 节点
 *
 * @type {number}
 */
var SPREAD$1 = 8;

/**
 * 指令 节点
 *
 * @type {number}
 */
var DIRECTIVE = 9;

/**
 * 元素 节点
 *
 * @type {number}
 */
var ELEMENT = 10;

/**
 * 属性 节点
 *
 * @type {number}
 */
var ATTRIBUTE = 11;

/**
 * 文本 节点
 *
 * @type {number}
 */
var TEXT = 12;

// if 带条件的
var ifTypes = {};
// if 分支的
var elseTypes = {};
// html 层级的节点类型
var htmlTypes = {};
// 属性层级的节点类型
var attrTypes = {};
// 叶子节点类型
var leafTypes = {};
// 内置指令，无需加前缀
var builtInDirectives = {};
// 名称 -> 类型的映射
var name2Type = {};
// 类型 -> 名称的映射
var type2Name = {};

ifTypes[IF$1] = ifTypes[ELSE_IF$1] = elseTypes[ELSE_IF$1] = elseTypes[ELSE$1] = htmlTypes[ELEMENT] = htmlTypes[ATTRIBUTE] = htmlTypes[DIRECTIVE] = attrTypes[ATTRIBUTE] = attrTypes[DIRECTIVE] = leafTypes[TEXT] = leafTypes[IMPORT$1] = leafTypes[SPREAD$1] = leafTypes[EXPRESSION] = builtInDirectives[DIRECTIVE_REF] = builtInDirectives[DIRECTIVE_LAZY] = builtInDirectives[DIRECTIVE_MODEL] = builtInDirectives[KEYWORD_UNIQUE] = TRUE;

name2Type['if'] = IF$1;
name2Type['each'] = EACH$1;
name2Type['partial'] = PARTIAL$1;

each$1(name2Type, function (type, name) {
  type2Name[type] = name;
});

/**
 * 节点基类
 */

var Node$2 = function () {
  function Node(type) {
    classCallCheck(this, Node);

    this.type = type;
  }

  createClass(Node, [{
    key: 'addChild',
    value: function addChild(child) {
      push(this.children || (this.children = []), child);
    }
  }]);
  return Node;
}();

/**
 * 属性节点
 *
 * @param {string|Expression} name 属性名
 */

var Attribute = function (_Node) {
  inherits(Attribute, _Node);

  function Attribute(name) {
    classCallCheck(this, Attribute);

    var _this = possibleConstructorReturn(this, (Attribute.__proto__ || Object.getPrototypeOf(Attribute)).call(this, ATTRIBUTE));

    _this.name = name;
    return _this;
  }

  return Attribute;
}(Node$2);

/**
 * 指令节点
 *
 * on-click="submit"  name 是 event, modifier 是 click
 *
 * @param {string} name 指令名
 * @param {?string} modifier 指令修饰符
 */

var Directive = function (_Node) {
  inherits(Directive, _Node);

  function Directive(name, modifier) {
    classCallCheck(this, Directive);

    var _this = possibleConstructorReturn(this, (Directive.__proto__ || Object.getPrototypeOf(Directive)).call(this, DIRECTIVE));

    _this.name = name;
    if (modifier) {
      _this.modifier = modifier;
    }
    return _this;
  }

  return Directive;
}(Node$2);

/**
 * each 节点
 *
 * @param {Expression} expr
 * @param {?string} index 遍历索引值，对于数组来说是 0,1,2,...，对于对象来说是 key
 */

var Each = function (_Node) {
  inherits(Each, _Node);

  function Each(expr, index) {
    classCallCheck(this, Each);

    var _this = possibleConstructorReturn(this, (Each.__proto__ || Object.getPrototypeOf(Each)).call(this, EACH$1));

    _this.expr = expr;
    if (index) {
      _this.index = index;
    }
    return _this;
  }

  return Each;
}(Node$2);

/**
 * 元素节点
 *
 * @param {string} name
 * @param {?boolean} component 是否是组件
 */

var Element = function (_Node) {
  inherits(Element, _Node);

  function Element(name, component) {
    classCallCheck(this, Element);

    var _this = possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, ELEMENT));

    _this.name = name;
    if (component) {
      _this.component = component;
    }
    return _this;
  }

  createClass(Element, [{
    key: 'addAttr',
    value: function addAttr(child) {
      push(this.attrs || (this.attrs = []), child);
    }
  }]);
  return Element;
}(Node$2);

/**
 * else 节点
 */

var Else = function (_Node) {
  inherits(Else, _Node);

  function Else() {
    classCallCheck(this, Else);
    return possibleConstructorReturn(this, (Else.__proto__ || Object.getPrototypeOf(Else)).call(this, ELSE$1));
  }

  return Else;
}(Node$2);

/**
 * else if 节点
 *
 * @param {Expression} expr 判断条件
 */

var ElseIf = function (_Node) {
  inherits(ElseIf, _Node);

  function ElseIf(expr, then) {
    classCallCheck(this, ElseIf);

    var _this = possibleConstructorReturn(this, (ElseIf.__proto__ || Object.getPrototypeOf(ElseIf)).call(this, ELSE_IF$1));

    _this.expr = expr;
    return _this;
  }

  return ElseIf;
}(Node$2);

/**
 * 表达式节点
 *
 * @param {string} expr
 * @param {boolean} safe
 */

var Expression = function (_Node) {
  inherits(Expression, _Node);

  function Expression(expr, safe) {
    classCallCheck(this, Expression);

    var _this = possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).call(this, EXPRESSION));

    _this.expr = expr;
    _this.safe = safe;
    return _this;
  }

  return Expression;
}(Node$2);

/**
 * if 节点
 *
 * @param {Expression} expr 判断条件
 */

var If = function (_Node) {
  inherits(If, _Node);

  function If(expr, then) {
    classCallCheck(this, If);

    var _this = possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).call(this, IF$1));

    _this.expr = expr;
    return _this;
  }

  return If;
}(Node$2);

/**
 * import 节点
 *
 * @param {string} name
 */

var Import = function (_Node) {
  inherits(Import, _Node);

  function Import(name) {
    classCallCheck(this, Import);

    var _this = possibleConstructorReturn(this, (Import.__proto__ || Object.getPrototypeOf(Import)).call(this, IMPORT$1));

    _this.name = name;
    return _this;
  }

  return Import;
}(Node$2);

/**
 * Partial 节点
 *
 * @param {string} name
 */

var Partial = function (_Node) {
  inherits(Partial, _Node);

  function Partial(name) {
    classCallCheck(this, Partial);

    var _this = possibleConstructorReturn(this, (Partial.__proto__ || Object.getPrototypeOf(Partial)).call(this, PARTIAL$1));

    _this.name = name;
    return _this;
  }

  return Partial;
}(Node$2);

/**
 * 延展操作 节点
 *
 * @param {Expression} expr
 */

var Spread = function (_Node) {
  inherits(Spread, _Node);

  function Spread(expr) {
    classCallCheck(this, Spread);

    var _this = possibleConstructorReturn(this, (Spread.__proto__ || Object.getPrototypeOf(Spread)).call(this, SPREAD$1));

    _this.expr = expr;
    return _this;
  }

  return Spread;
}(Node$2);

/**
 * 文本节点
 *
 * @param {*} content
 */

var Text = function (_Node) {
  inherits(Text, _Node);

  function Text(content) {
    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, TEXT));

    _this.content = content;
    return _this;
  }

  return Text;
}(Node$2);

var delimiterPattern = /(\{?\{\{)\s*([^\}]+?)\s*(\}\}\}?)/;
var openingTagPattern = /<(\/)?([a-z][-a-z0-9]*)/i;
var closingTagPattern = /^\s*(\/)?>/;
var attributePattern = /^\s*([-:\w]+)(?:=(['"]))?/;
var componentNamePattern = /[-A-Z]/;
var selfClosingTagNamePattern = /source|param|input|img|br|hr/;

// 缓存编译结果
var compileCache = {};

/**
 * 截取前缀之后的字符串
 *
 * @param {string} str
 * @param {string} prefix
 * @return {string}
 */
function slicePrefix(str, prefix) {
  return trim(slice(str, prefix.length));
}

/**
 * 是否是纯粹的换行
 *
 * @param {string} content
 * @return {boolean}
 */
function isBreakline(content) {
  return has$2(content, CHAR_BREAKLINE) && !trim(content);
}

/**
 * trim 文本开始和结束位置的换行符
 *
 * @param {string} content
 * @return {string}
 */
function trimBreakline(content) {
  return content.replace(/^[ \t]*\n|\n[ \t]*$/g, CHAR_BLANK);
}

/**
 * 把模板编译为抽象语法树
 *
 * @param {string} content
 * @return {Array}
 */
function compile(content) {

  var nodeList = compileCache[content];
  if (nodeList) {
    return nodeList;
  }
  nodeList = [];

  var nodeStack = [],
      ifStack = [],
      htmlStack = [],
      currentQuote = void 0;

  var throwError = function throwError(msg) {
    fatal('Error compiling template:' + CHAR_BREAKLINE + content + CHAR_BREAKLINE + '- ' + msg);
  };

  var popStack = function popStack(type, name) {

    var target = void 0;

    each(nodeStack, function (node, i) {
      if (node.type === type) {
        target = nodeStack.splice(i, 1)[0];
        return FALSE;
      }
    }, TRUE);

    if (target) {
      if (target.type === ELEMENT && name && target.name !== name) {
        throwError('end tag expected </' + target.name + '> to be </' + name + '>.');
      }
    } else {
      throwError('{{/' + type2Name[type] + '}} is not a pair.');
    }
  };

  var addChild = function addChild(node) {
    var type = node.type,
        content = node.content;


    if (type === TEXT) {
      if (isBreakline(content) || !(content = trimBreakline(content))) {
        return;
      }
      node.content = content;
    }

    if (elseTypes[type]) {
      popStack(pop(ifStack).type);
    }

    var currentNode = last(nodeStack);
    if (currentNode) {
      if (htmlStack.length === 1 && currentNode.addAttr) {
        currentNode.addAttr(node);
      } else {
        currentNode.addChild(node);
      }
    } else {
      push(nodeList, node);
    }

    if (ifTypes[type] || elseTypes[type]) {
      push(ifStack, node);
    } else if (htmlTypes[type]) {
      push(htmlStack, node);
    }

    if (!leafTypes[type]) {
      push(nodeStack, node);
    }
  };

  var htmlParsers = [function (content) {
    if (!htmlStack.length) {
      var _match = content.match(openingTagPattern);
      // 必须以 <tag 开头才能继续
      if (_match && !_match.index) {
        var tagName = _match[2];
        if (_match[1] === CHAR_SLASH) {
          popStack(ELEMENT, tagName);
        } else {
          addChild(new Element(tagName, componentNamePattern.test(tagName)));
        }
        return _match[0];
      }
    }
  }, function (content) {
    var match = content.match(closingTagPattern);
    if (match) {
      if (htmlStack.length === 1) {
        if (match[1] === CHAR_SLASH || selfClosingTagNamePattern.test(htmlStack[0].name)) {
          popStack(ELEMENT);
        }
        pop(htmlStack);
      }
      return match[0];
    }
  }, function (content) {
    if (htmlStack.length === 1) {
      var _match2 = content.match(attributePattern);
      if (_match2) {
        var name = _match2[1];
        if (builtInDirectives[name]) {
          addChild(new Directive(camelCase(name)));
        } else if (startsWith(name, DIRECTIVE_EVENT_PREFIX)) {
          name = slice(name, DIRECTIVE_EVENT_PREFIX.length);
          addChild(new Directive(DIRECTIVE_EVENT, camelCase(name)));
        } else if (startsWith(name, DIRECTIVE_CUSTOM_PREFIX)) {
          name = slice(name, DIRECTIVE_CUSTOM_PREFIX.length);
          addChild(new Directive(camelCase(name)));
        } else {
          addChild(new Attribute(htmlStack[0].component ? camelCase(name) : name));
        }
        currentQuote = _match2[2];
        if (!currentQuote) {
          popStack(pop(htmlStack).type);
        }
        return _match2[0];
      }
    }
  }, function (content) {
    if (htmlStack.length === 2) {
      var index = 0,
          currentChar = void 0,
          closed = void 0;
      while (currentChar = charAt(content, index)) {
        if (currentChar === currentQuote) {
          closed = TRUE;
          break;
        }
        index++;
      }
      var text = CHAR_BLANK;
      if (index) {
        text = slice(content, 0, index);
        addChild(new Text(text));
      }
      if (closed) {
        text += currentQuote;
        popStack(pop(htmlStack).type);
      }
      return text;
    } else {
      var _match3 = content.match(openingTagPattern);
      if (_match3 && _match3.index) {
        content = slice(content, 0, _match3.index);
      }
      // 属性级别的空字符串是没有意义的
      // 比如 <div      class="xx">
      if (htmlStack.length !== 1 || trim(content)) {
        addChild(new Text(content));
      }
      return content;
    }
  }];

  var delimiterParsers = [function (source, all) {
    if (startsWith(source, EACH)) {
      var terms = split(slicePrefix(source, EACH), CHAR_COLON);
      if (terms[0]) {
        return new Each(compile$1(trim(terms[0])), trim(terms[1]));
      }
      throwError('invalid each: ' + all);
    }
  }, function (source, all) {
    if (startsWith(source, IMPORT)) {
      source = slicePrefix(source, IMPORT);
      return source ? new Import(source) : throwError('invalid import: ' + all);
    }
  }, function (source, all) {
    if (startsWith(source, PARTIAL)) {
      source = slicePrefix(source, PARTIAL);
      return source ? new Partial(source) : throwError('invalid partial: ' + all);
    }
  }, function (source, all) {
    if (startsWith(source, IF)) {
      source = slicePrefix(source, IF);
      return source ? new If(compile$1(source)) : throwError('invalid if: ' + all);
    }
  }, function (source, all) {
    if (startsWith(source, ELSE_IF)) {
      source = slicePrefix(source, ELSE_IF);
      return source ? new ElseIf(compile$1(source)) : throwError('invalid else if: ' + all);
    }
  }, function (source) {
    if (startsWith(source, ELSE)) {
      return new Else();
    }
  }, function (source, all) {
    if (startsWith(source, SPREAD)) {
      source = slicePrefix(source, SPREAD);
      return source ? new Spread(compile$1(source)) : throwError('invalid spread: ' + all);
    }
  }, function (source, all) {
    if (!startsWith(source, COMMENT)) {
      source = trim(source);
      return source ? new Expression(compile$1(source), !endsWith(all, '}}}')) : throwError('invalid expression: ' + all);
    }
  }];

  var parseHtml = function parseHtml(content) {
    if (content) {
      (function () {
        var tpl = content;
        while (tpl) {
          each(htmlParsers, function (parse, match) {
            match = parse(tpl);
            if (match) {
              tpl = slice(tpl, match.length);
              return FALSE;
            }
          });
        }
        str = slice(str, content.length);
      })();
    }
  };

  var parseDelimiter = function parseDelimiter(content, all) {
    if (content) {
      if (charAt(content) === CHAR_SLASH) {
        var name = slice(content, 1),
            type = name2Type[name];
        if (ifTypes[type]) {
          type = pop(ifStack).type;
        }
        popStack(type);
      } else {
        each(delimiterParsers, function (parse, node) {
          node = parse(content, all);
          if (node) {
            addChild(node);
            return FALSE;
          }
        });
      }
    }
    str = slice(str, all.length);
  };

  var str = content,
      match = void 0;
  while (str) {
    match = str.match(delimiterPattern);
    if (match) {
      parseHtml(slice(str, 0, match.index));
      // 避免手误写成 {{{ name }}
      if (match[1].length === match[3].length) {
        parseDelimiter(match[2], match[0]);
      } else {
        throwError('invalid expression: ' + match[0]);
      }
    } else {
      parseHtml(str);
    }
  }

  return compileCache[content] = nodeList;
}

/**
 * 序列化表达式
 *
 * @param {Node} node
 * @return {string}
 */
function stringify$1(node) {

  var recursion = function recursion(node) {
    return stringify$1(node);
  };

  switch (node.type) {
    case ARRAY:
      return '[' + node.elements.map(recursion).join(CHAR_COMMA) + ']';

    case BINARY:
      return stringify$1(node.left) + ' ' + node.operator + ' ' + stringify$1(node.right);

    case CALL:
      return stringify$1(node.callee) + '(' + node.args.map(recursion).join(CHAR_COMMA) + ')';

    case TERNARY:
      return stringify$1(node.test) + ' ? ' + stringify$1(node.consequent) + ' : ' + stringify$1(node.alternate);

    case IDENTIFIER:
      return node.name;

    case LITERAL:
      return has$1(node, 'raw') ? node.raw : node.value;

    case MEMBER:
      return Member.flatten(node).map(function (node, index) {
        if (node.type === LITERAL) {
          var _node = node,
              value = _node.value;

          return numeric(value) ? '' + CHAR_OBRACK + value + CHAR_CBRACK : '' + CHAR_DOT + value;
        } else {
          node = stringify$1(node);
          return index > 0 ? '' + CHAR_OBRACK + node + CHAR_CBRACK : node;
        }
      }).join(CHAR_BLANK);

    case UNARY:
      return '' + node.operator + stringify$1(node.arg);

    default:
      return CHAR_BLANK;
  }
}

var Observer = function () {

  /**
   * @param {Object} options
   * @property {Object} options.data
   * @property {?Object} options.computed
   * @property {?Object} options.watchers
   * @property {?*} options.context 执行 watcher 函数的 this 指向
   */
  function Observer(options) {
    classCallCheck(this, Observer);
    var data = options.data,
        context = options.context,
        computed = options.computed,
        watchers = options.watchers;


    var instance = this;

    instance.data = data;
    instance.cache = {};
    instance.emitter = new Emitter();
    instance.context = context || instance;

    // 谁依赖了谁
    instance.computedDeps = {};
    // 谁被谁依赖
    instance.computedDepsReversed = {};

    // 计算属性也是数据
    if (object(computed)) {

      // 把计算属性拆为 getter 和 setter
      instance.computedGetters = {};
      instance.computedSetters = {};

      // 辅助获取计算属性的依赖
      instance.computedStack = [];

      // 计算属性的缓存
      instance.computedCache = {};

      var computedCache = instance.computedCache,
          computedStack = instance.computedStack,
          computedGetters = instance.computedGetters,
          computedSetters = instance.computedSetters;


      each$1(computed, function (item, keypath) {

        var get$$1 = void 0,
            set$$1 = void 0,
            deps = void 0,
            cache = TRUE;

        if (func(item)) {
          get$$1 = item;
        } else if (object(item)) {
          if (boolean(item.cache)) {
            cache = item.cache;
          }
          if (array(item.deps)) {
            deps = item.deps;
          }
          if (func(item.get)) {
            get$$1 = item.get;
          }
          if (func(item.set)) {
            set$$1 = item.set;
          }
        }

        if (get$$1) {

          instance.watch(keypath, function () {
            if (has$1(computedCache, keypath)) {
              delete computedCache[keypath];
            }
          });

          var getter = function getter() {
            if (cache && has$1(computedCache, keypath)) {
              return computedCache[keypath];
            }

            if (!deps) {
              computedStack.push([]);
            }

            var result = execute(get$$1, instance.context);
            if (cache) {
              computedCache[keypath] = result;
            }

            instance.setComputedDeps(keypath, deps || pop(computedStack));

            return result;
          };

          getter.toString = computedGetters[keypath] = getter;
        }

        if (set$$1) {
          computedSetters[keypath] = set$$1;
        }
      });
    }

    if (object(watchers)) {
      instance.watch(watchers);
    }
  }

  /**
   * 获取数据
   *
   * 当传了 context，会尝试向上寻找
   *
   * @param {string} keypath
   * @param {string} context
   * @return {?*}
   */


  createClass(Observer, [{
    key: 'get',
    value: function get$$1(keypath, context) {

      var instance = this;

      var data = instance.data,
          computedStack = instance.computedStack,
          computedGetters = instance.computedGetters;


      var getValue = function getValue(keypath) {

        if (computedStack) {
          var list = last(computedStack);
          if (list) {
            push(list, keypath);
          }
        }

        if (computedGetters) {
          var _matchBestGetter = matchBestGetter(computedGetters, keypath),
              value = _matchBestGetter.value,
              rest = _matchBestGetter.rest;

          if (value) {
            value = value();
            return rest && !primitive(value) ? get$1(value, rest) : { value: value };
          }
        }

        return get$1(data, keypath);
      };

      var suffixes = parse(keypath),
          temp = void 0,
          result = void 0;

      if (string(context)) {
        var prefixes = parse(context);
        if (suffixes.length > 1 && suffixes[0] === THIS) {
          keypath = stringify(merge(prefixes, suffixes.slice(1)));
          result = getValue(keypath);
        } else {
          keypath = NULL;
          while (TRUE) {
            temp = stringify(merge(prefixes, suffixes));
            result = getValue(temp);
            if (result) {
              keypath = temp;
              break;
            } else {
              if (keypath == NULL) {
                keypath = temp;
              }
              if (!prefixes.length) {
                break;
              } else {
                pop(prefixes);
              }
            }
          }
        }
        if (!result) {
          result = {};
        }
        result.keypath = keypath;
        return result;
      } else {
        result = getValue(stringify(suffixes));
        if (result) {
          return result.value;
        }
      }
    }

    /**
     * 更新数据
     *
     * @param {Object} model
     */

  }, {
    key: 'set',
    value: function set$$1(model) {

      var instance = this,
          differences = {};

      var data = instance.data,
          cache = instance.cache,
          emitter = instance.emitter,
          context = instance.context,
          computedDeps = instance.computedDeps,
          computedDepsReversed = instance.computedDepsReversed,
          computedGetters = instance.computedGetters,
          computedSetters = instance.computedSetters,
          watchKeypaths = instance.watchKeypaths,
          reversedKeypaths = instance.reversedKeypaths;


      var addDifference = function addDifference(key, data, extra) {
        if (!differences[key]) {
          if (extra) {
            push(data, extra);
          }
          differences[key] = data;
        }
      };

      each$1(model, function (newValue, keypath) {

        // 格式化成内部处理的格式
        keypath = normalize(keypath);

        //
        // 如果 set 了 user
        // 但是 watch 了 user.name
        //
        // 如果 set 了 user.name
        // 但是 watch 了 *.name
        //
        if (watchKeypaths) {
          each(watchKeypaths, function (key) {
            if (has$2(key, '*')) {
              var match = matchKeypath(keypath, key);
              if (match) {
                addDifference(keypath, [instance.get(keypath), keypath], match);
              }
            } else if (startsWith(key, keypath)) {
              addDifference(key, [instance.get(key), key]);
            }
          });
        }

        // 如果有计算属性，则优先处理它
        if (computedSetters) {
          var setter = computedSetters[keypath];
          if (setter) {
            setter.call(context, newValue);
            return;
          } else {
            var _matchBestGetter2 = matchBestGetter(computedGetters, keypath),
                value = _matchBestGetter2.value,
                rest = _matchBestGetter2.rest;

            if (value && rest) {
              value = value();
              if (!primitive(value)) {
                set$1(value, rest, newValue);
              }
              return;
            }
          }
        }

        // 普通数据
        set$1(data, keypath, newValue);
      });

      var changed = {};
      var fireChange = function fireChange(keypath, args) {
        if (!changed[keypath]) {
          changed[keypath] = TRUE;
          emitter.fire(keypath, args, context);

          if (reversedKeypaths) {
            each(reversedKeypaths, function (key) {
              var list = void 0,
                  match = void 0;
              if (key === keypath) {
                list = computedDepsReversed[key];
              } else if (has$2(key, '*')) {
                match = matchKeypath(keypath, key);
                if (match) {
                  list = computedDepsReversed[key];
                }
              }
              if (list) {
                each(list, function (key) {
                  fireChange(key, [instance.get(key), UNDEFINED, key]);
                });
              }
            });
          }
        }
      };

      each$1(differences, function (difference, keypath) {
        var newValue = instance.get(keypath);
        if (newValue !== difference[0]) {
          difference.unshift(newValue);
          fireChange(keypath, difference);
        }
      });
    }
  }, {
    key: 'setComputedDeps',
    value: function setComputedDeps(keypath, deps) {

      var instance = this;

      var computedDeps = instance.computedDeps,
          computedDepsReversed = instance.computedDepsReversed;


      if (deps !== computedDeps[keypath]) {

        computedDeps[keypath] = deps;
        updateWatchKeypaths(instance);

        // 全量更新
        computedDepsReversed = instance.computedDepsReversed = {};

        var addDep = function addDep(dep, keypath) {
          var list = computedDepsReversed[dep] || (computedDepsReversed[dep] = []);
          push(list, keypath);
        };

        each$1(computedDeps, function (deps, key) {
          each(deps, function (dep) {
            addDep(dep, key);
          });
        });

        instance.reversedKeypaths = keys(computedDepsReversed);
      }
    }

    /**
     * 销毁
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.emitter.off();
      clear(this);
    }
  }]);
  return Observer;
}();

extend(Observer.prototype, {

  /**
   * 监听数据变化
   *
   * @param {string|Object} keypath
   * @param {?Function} watcher
   * @param {?boolean} sync
   */
  watch: createWatch('on'),

  /**
   * 监听一次数据变化
   *
   * @param {string|Object} keypath
   * @param {?Function} watcher
   * @param {?boolean} sync
   */
  watchOnce: createWatch('once'),

  /**
   * 取消监听数据变化
   *
   * @param {string|Object} keypath
   * @param {?Function} watcher
   */
  unwatch: function unwatch(keypath, watcher) {
    this.emitter.off(keypath, watcher);
    updateWatchKeypaths(this);
  }

});

function updateWatchKeypaths(instance) {
  var emitter = instance.emitter,
      computedDeps = instance.computedDeps;


  var watchKeypaths = {};

  var addKeypath = function addKeypath(keypath) {
    if (!watchKeypaths[keypath]) {
      watchKeypaths[keypath] = TRUE;
    }
  };

  // 1. 直接通过 watch 注册的
  each$1(emitter.listeners, function (list, key) {
    addKeypath(key);
  });

  // 2. 计算属性的依赖属于间接 watch
  each$1(computedDeps, function (deps) {
    each(deps, addKeypath);
  });

  instance.watchKeypaths = keys(watchKeypaths);
}

/**
 * watch 和 watchOnce 逻辑相同
 * 提出一个工厂方法
 */
function createWatch(action) {

  return function (keypath, watcher, sync) {

    var watchers = keypath;
    if (string(keypath)) {
      watchers = {};
      watchers[keypath] = {
        sync: sync,
        watcher: watcher
      };
    }

    var instance = this;

    var emitter = instance.emitter,
        context = instance.context;


    each$1(watchers, function (value, keypath) {

      var watcher = value,
          sync = void 0;
      if (object(value)) {
        watcher = value.watcher;
        sync = value.sync;
      }

      emitter[action](keypath, watcher);
      updateWatchKeypaths(instance);

      if (sync) {
        execute(watcher, context, [instance.get(keypath), UNDEFINED, keypath]);
      }
    });
  };
}

var patternCache = {};

/**
 * 模糊匹配 Keypath
 *
 * @param {string} keypath
 * @param {string} pattern
 */
function matchKeypath(keypath, pattern) {
  var cache = patternCache[pattern];
  if (!cache) {
    cache = pattern.replace(/\./g, '\\.').replace(/\*\*/g, '([\.\\w]+?)').replace(/\*/g, '(\\w+)');
    cache = patternCache[pattern] = new RegExp('^' + cache + '$');
  }
  var match = keypath.match(cache);
  if (match) {
    return toArray$1(match).slice(1);
  }
}

/**
 * 从 getter 对象的所有 key 中，选择和 keypath 最匹配的那一个
 *
 * @param {Object} getter
 * @param {string} keypath
 * @return {Object}
 */
function matchBestGetter(getter, keypath) {

  var result = matchFirst(sort(getter, TRUE), keypath);

  var matched = result[0],
      rest = result[1],
      value = void 0;
  if (matched) {
    value = getter[matched];
  }

  if (rest && startsWith(rest, SEPARATOR_KEY)) {
    rest = slice(rest, 1);
  }

  return {
    value: value,
    rest: rest
  };
}

/**
 * html 标签
 *
 * @type {RegExp}
 */
var tag = /<[^>]+>/;

/**
 * 选择器
 *
 * @type {RegExp}
 */
var selector = /^[#.][-\w+]+$/;

/**
 * 进入 `new Yox(options)` 之后立即触发，钩子函数会传入 `options`
 *
 * @type {string}
 */
var BEFORE_CREATE = 'beforeCreate';

/**
 * 绑定事件和数据监听之后触发
 *
 * @type {string}
 */
var AFTER_CREATE = 'afterCreate';

/**
 * 模板编译，加入 DOM 树之前触发
 *
 * @type {string}
 */
var BEFORE_MOUNT = 'beforeMount';

/**
 * 加入 DOM 树之后触发
 *
 * 这时可通过 `$el` 获取组件根元素
 *
 * @type {string}
 */
var AFTER_MOUNT = 'afterMount';

/**
 * 视图更新之前触发
 *
 * @type {string}
 */
var BEFORE_UPDATE = 'beforeUpdate';

/**
 * 视图更新之后触发
 *
 * @type {string}
 */
var AFTER_UPDATE = 'afterUpdate';

/**
 * 销毁之前触发
 *
 * @type {string}
 */
var BEFORE_DESTROY = 'beforeDestroy';

/**
 * 销毁之后触发
 *
 * @type {string}
 */
var AFTER_DESTROY = 'afterDestroy';

var booleanAttrLiteral = 'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,draggable,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noshade,noresize,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,spellcheck,translate,truespeed,typemustmatch,visible';
var booleanAttrMap = toObject(split(booleanAttrLiteral, CHAR_COMMA));
booleanAttrLiteral = NULL;

var attr2Prop = {};
attr2Prop['for'] = 'htmlFor';
attr2Prop['value'] = 'value';
attr2Prop['class'] = 'className';
attr2Prop['style'] = 'style.cssText';
attr2Prop['nohref'] = 'noHref';
attr2Prop['noshade'] = 'noShade';
attr2Prop['noresize'] = 'noResize';
attr2Prop['readonly'] = 'readOnly';
attr2Prop['defaultchecked'] = 'defaultChecked';
attr2Prop['defaultmuted'] = 'defaultMuted';
attr2Prop['defaultselected'] = 'defaultSelected';

function createElement(tagName, parentNode) {
  var SVGElement = win.SVGElement;

  return tagName === 'svg' || parentNode && SVGElement && parentNode instanceof SVGElement ? doc.createElementNS('http://www.w3.org/2000/svg', tagName) : doc.createElement(tagName);
}

function createText(text) {
  return doc.createTextNode(text || CHAR_BLANK);
}

function createComment(text) {
  return doc.createComment(text || CHAR_BLANK);
}

function createEvent(event) {
  return event;
}

function isElement(node) {
  return node.nodeType === 1;
}

function setProp(node, name, value) {
  set$1(node, name, value, FALSE);
}

function removeProp(node, name) {
  setProp(node, name, NULL);
}

function setAttr(node, name, value) {
  if (booleanAttrMap[name]) {
    value = value === UNDEFINED || value ? TRUE : FALSE;
  }
  if (attr2Prop[name]) {
    setProp(node, attr2Prop[name], value);
  } else if (booleanAttrMap[name]) {
    setProp(node, name, value);
  } else {
    node.setAttribute(name, value);
  }
}

function removeAttr(node, name) {
  if (attr2Prop[name]) {
    removeProp(node, attr2Prop[name]);
  } else if (booleanAttrMap[name]) {
    removeProp(node, name);
  } else {
    node.removeAttribute(name);
  }
}

function before(parentNode, newNode, referenceNode) {
  if (referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  } else {
    append$1(parentNode, newNode);
  }
}

function append$1(parentNode, child) {
  parentNode.appendChild(child);
}

function replace(parentNode, newNode, oldNode) {
  parentNode.replaceChild(newNode, oldNode);
}

function remove$1(parentNode, child) {
  parentNode.removeChild(child);
}

function parent(node) {
  return node.parentNode;
}

function next(node) {
  return node.nextSibling;
}

function tag$1(node) {
  var tagName = node.tagName;

  return falsy$1(tagName) ? CHAR_BLANK : tagName.toLowerCase();
}

function children(node) {
  return node.childNodes;
}

function text(node, content) {
  return arguments.length === 1 ? node.nodeValue : node.nodeValue = content;
}

function html(node, content) {
  return arguments.length === 1 ? node.innerHTML : node.innerHTML = content;
}

function find(selector, context) {
  return (context || doc).querySelector(selector);
}

function on(element, type, listener) {
  element.addEventListener(type, listener, FALSE);
}

function off(element, type, listener) {
  element.removeEventListener(type, listener, FALSE);
}

var domApi = Object.freeze({
	createElement: createElement,
	createText: createText,
	createComment: createComment,
	createEvent: createEvent,
	isElement: isElement,
	setProp: setProp,
	removeProp: removeProp,
	setAttr: setAttr,
	removeAttr: removeAttr,
	before: before,
	append: append$1,
	replace: replace,
	remove: remove$1,
	parent: parent,
	next: next,
	tag: tag$1,
	children: children,
	text: text,
	html: html,
	find: find,
	on: on,
	off: off
});

var TAP = 'tap';

var CLICK = 'click';

var INPUT = 'input';

var CHANGE = 'change';

var COMPOSITION_START = 'compositionstart';

var COMPOSITION_END = 'compositionend';

var api = copy(domApi);

// import * as oldApi from './oldApi'

// if (!env.doc.addEventListener) {
//   object.extend(api, oldApi)
// }

var _on = api.on;
var _off = api.off;

/**
 * 特殊事件，外部可扩展
 *
 * @type {Object}
 */

api.specialEvents = {
  input: {
    on: function on$$1(el, listener) {
      var locked = FALSE;
      api.on(el, COMPOSITION_START, listener[COMPOSITION_START] = function () {
        locked = TRUE;
      });
      api.on(el, COMPOSITION_END, listener[COMPOSITION_END] = function (e) {
        locked = FALSE;
        listener(e, INPUT);
      });
      _on(el, INPUT, listener[INPUT] = function (e) {
        if (!locked) {
          listener(e);
        }
      });
    },
    off: function off$$1(el, listener) {
      api.off(el, COMPOSITION_START, listener[COMPOSITION_START]);
      api.off(el, COMPOSITION_END, listener[COMPOSITION_END]);
      _off(el, INPUT, listener[INPUT]);
      listener[COMPOSITION_START] = listener[COMPOSITION_END] = listener[INPUT] = NULL;
    }
  }
};

/**
 * 绑定事件
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {Function} listener
 * @param {?*} context
 */
api.on = function (element, type, listener, context) {
  var $emitter = element.$emitter || (element.$emitter = new Emitter());
  if (!$emitter.has(type)) {
    var nativeListener = function nativeListener(e, type) {
      if (!Event.is(e)) {
        e = new Event(api.createEvent(e, element));
      }
      if (type) {
        e.type = type;
      }
      $emitter.fire(e.type, e, context);
    };
    $emitter[type] = nativeListener;
    var special = api.specialEvents[type];
    if (special) {
      special.on(element, nativeListener);
    } else {
      _on(element, type, nativeListener);
    }
  }
  $emitter.on(type, listener);
};

/**
 * 解绑事件
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {Function} listener
 */
api.off = function (element, type, listener) {
  var $emitter = element.$emitter;

  var types = keys($emitter.listeners);
  // emitter 会根据 type 和 listener 参数进行适当的删除
  $emitter.off(type, listener);
  // 根据 emitter 的删除结果来操作这里的事件 listener
  each(types, function (type) {
    if ($emitter[type] && !$emitter.has(type)) {
      var nativeListener = $emitter[type];
      var special = api.specialEvents[type];
      if (special) {
        special.off(element, nativeListener);
      } else {
        _off(element, type, nativeListener);
      }
      delete $emitter[type];
    }
  });
};

var toString = function (str) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHAR_BLANK;

  try {
    return str.toString();
  } catch (e) {
    return defaultValue;
  }
};

function Vnode(sel, text, data, children, key, component) {
  return {
    sel: sel,
    text: text,
    data: data,
    children: children,
    key: key,
    component: component
  };
}

Vnode.is = function (target) {
  return has$1(target, 'sel');
};

var SEL_COMMENT = '!';

var HOOK_INIT = 'init';
var HOOK_CREATE = 'create';
var HOOK_INSERT = 'insert';

var HOOK_REMOVE = 'remove';
var HOOK_DESTROY = 'destroy';

var HOOK_PRE = 'pre';
var HOOK_POST = 'post';

var HOOK_PREPATCH = 'prepatch';
var HOOK_UPDATE = 'update';
var HOOK_POSTPATCH = 'postpatch';

var moduleHooks = [HOOK_CREATE, HOOK_UPDATE, HOOK_REMOVE, HOOK_DESTROY, HOOK_PRE, HOOK_POST];

var emptyNode = Vnode(CHAR_BLANK, UNDEFINED, {}, []);

function isPatchable(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToIndex(vnodes, startIndex, endIndex) {
  var result = {};
  for (var i = startIndex, key; i <= endIndex; i++) {
    key = vnodes[i].key;
    if (key != NULL) {
      result[key] = i;
    }
  }
  return result;
}

function createTextVnode(text$$1) {
  return Vnode(UNDEFINED, toString(text$$1));
}

function createElementVnode(sel, data, children$$1, key, component) {
  return Vnode(sel, UNDEFINED, data, children$$1, key, component);
}

function createCommentVnode(text$$1) {
  return Vnode(SEL_COMMENT, text$$1);
}

function init(modules) {
  var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : domApi;


  var moduleEmitter = new Emitter();

  each(moduleHooks, function (hook) {
    each(modules, function (item) {
      moduleEmitter.on(hook, item[hook]);
    });
  });

  var stringifySel = function stringifySel(el) {
    var list = [api.tag(el)];
    var id = el.id,
        className = el.className;

    if (id) {
      push(list, '' + CHAR_HASH + id);
    }
    if (className) {
      push(list, '' + CHAR_DOT + split(className, CHAR_WHITESPACE).join(CHAR_DOT));
    }
    return list.join(CHAR_BLANK);
  };

  var parseSel = function parseSel(sel) {

    var tagName = void 0,
        id = void 0,
        className = void 0;

    var hashIndex = indexOf$1(sel, CHAR_HASH);
    if (hashIndex > 0) {
      tagName = slice(sel, 0, hashIndex);
      sel = slice(sel, hashIndex + 1);
    }

    var dotIndex = indexOf$1(sel, CHAR_DOT);
    if (dotIndex > 0) {
      var temp = slice(sel, 0, dotIndex);
      if (tagName) {
        id = temp;
      } else {
        tagName = temp;
      }
      className = split(slice(sel, dotIndex + 1), CHAR_DOT).join(CHAR_WHITESPACE);
    } else {
      if (tagName) {
        id = sel;
      } else {
        tagName = sel;
      }
    }

    return { tagName: tagName, id: id, className: className };
  };

  var createElement$$1 = function createElement$$1(parentNode, vnode, insertedQueue) {
    var sel = vnode.sel,
        data = vnode.data,
        children$$1 = vnode.children,
        text$$1 = vnode.text;


    var hooks = data && data.hooks || {};
    execute(hooks[HOOK_INIT], NULL, vnode);

    if (falsy$1(sel)) {
      return vnode.el = api.createText(text$$1);
    }

    if (sel === SEL_COMMENT) {
      return vnode.el = api.createComment(text$$1);
    }

    var _parseSel = parseSel(sel),
        tagName = _parseSel.tagName,
        id = _parseSel.id,
        className = _parseSel.className;

    var el = api.createElement(tagName, parentNode);
    if (id) {
      el.id = id;
    }
    if (className) {
      el.className = className;
    }

    vnode.el = el;

    if (array(children$$1)) {
      addVnodes(el, children$$1, 0, children$$1.length - 1, insertedQueue);
    } else if (string(text$$1)) {
      api.append(el, api.createText(text$$1));
    }

    if (data) {
      data = [emptyNode, vnode];
      moduleEmitter.fire(HOOK_CREATE, data, api);

      execute(hooks[HOOK_CREATE], NULL, data);

      if (hooks[HOOK_INSERT]) {
        insertedQueue.push(vnode);
      }
    }
    // 钩子函数可能会替换元素
    return vnode.el;
  };

  var addVnodes = function addVnodes(parentNode, vnodes, startIndex, endIndex, insertedQueue, before$$1) {
    for (var i = startIndex; i <= endIndex; i++) {
      addVnode(parentNode, vnodes[i], insertedQueue, before$$1);
    }
  };

  var addVnode = function addVnode(parentNode, vnode, insertedQueue, before$$1) {
    var el = createElement$$1(parentNode, vnode, insertedQueue);
    if (el) {
      api.before(parentNode, el, before$$1);
    }
  };

  var removeVnodes = function removeVnodes(parentNode, vnodes, startIndex, endIndex) {
    for (var i = startIndex, vnode; i <= endIndex; i++) {
      vnode = vnodes[i];
      if (vnode) {
        removeVnode(parentNode, vnode);
      }
    }
  };

  var removeVnode = function removeVnode(parentNode, vnode) {
    var sel = vnode.sel,
        el = vnode.el,
        data = vnode.data;

    if (sel) {
      destroyVnode(vnode);
      api.remove(parentNode, el);

      if (data) {
        moduleEmitter.fire(HOOK_REMOVE, vnode, api);
        if (data.hooks) {
          execute(data.hooks[HOOK_REMOVE], NULL, vnode);
        }
      }
    } else if (el) {
      api.remove(parentNode, el);
    }
  };

  var destroyVnode = function destroyVnode(vnode) {
    var data = vnode.data,
        children$$1 = vnode.children;

    if (data) {

      // 先销毁 children
      if (children$$1) {
        each(children$$1, function (child) {
          destroyVnode(child);
        });
      }

      moduleEmitter.fire(HOOK_DESTROY, vnode, api);

      if (data.hooks) {
        execute(data.hooks[HOOK_DESTROY], NULL, vnode);
      }
    }
  };

  var replaceVnode = function replaceVnode(parentNode, oldVnode, vnode) {
    api.before(parentNode, vnode.el, oldVnode.el);
    removeVnode(parentNode, oldVnode);
  };

  var updateChildren = function updateChildren(parentNode, oldChildren, newChildren, insertedQueue) {

    var oldStartIndex = 0;
    var oldEndIndex = oldChildren.length - 1;
    var oldStartVnode = oldChildren[oldStartIndex];
    var oldEndVnode = oldChildren[oldEndIndex];

    var newStartIndex = 0;
    var newEndIndex = newChildren.length - 1;
    var newStartVnode = newChildren[newStartIndex];
    var newEndVnode = newChildren[newEndIndex];

    var oldKeyToIndex = void 0,
        oldIndex = void 0,
        activeVnode = void 0;

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

      // 下面有设为 NULL 的逻辑
      if (!oldStartVnode) {
        oldStartVnode = oldChildren[++oldStartIndex]; // Vnode has been moved left
      } else if (!oldEndVnode) {
        oldEndVnode = oldChildren[--oldEndIndex];
      }

      // 优先从头到尾比较，位置相同且值得 patch
      else if (isPatchable(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedQueue);
          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        }

        // 再从尾到头比较，位置相同且值得 patch
        else if (isPatchable(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedQueue);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
          }

          // 比较完两侧的节点，剩下就是 位置发生改变的节点 和 全新的节点

          // 当 oldStartVnode 和 newEndVnode 值得 patch
          // 说明元素被移到右边了
          else if (isPatchable(oldStartVnode, newEndVnode)) {
              patchVnode(oldStartVnode, newEndVnode, insertedQueue);
              api.before(parentNode, oldStartVnode.el, api.next(oldEndVnode.el));
              oldStartVnode = oldChildren[++oldStartIndex];
              newEndVnode = newChildren[--newEndIndex];
            }

            // 当 oldEndVnode 和 newStartVnode 值得 patch
            // 说明元素被移到左边了
            else if (isPatchable(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedQueue);
                api.before(parentNode, oldEndVnode.el, oldStartVnode.el);
                oldEndVnode = oldChildren[--oldEndIndex];
                newStartVnode = newChildren[++newStartIndex];
              }

              // 尝试同级元素的 key
              else {

                  if (!oldKeyToIndex) {
                    oldKeyToIndex = createKeyToIndex(oldChildren, oldStartIndex, oldEndIndex);
                  }

                  oldIndex = oldKeyToIndex[newStartVnode.key];

                  // 移动元素
                  if (number(oldIndex)) {
                    activeVnode = oldChildren[oldIndex];
                    patchVnode(activeVnode, newStartVnode, insertedQueue);
                    oldChildren[oldIndex] = NULL;
                  }
                  // 新元素
                  else {
                      activeVnode = createElement$$1(parentNode, newStartVnode, insertedQueue);
                      if (activeVnode) {
                        activeVnode = newStartVnode;
                      }
                    }

                  if (activeVnode) {
                    api.before(parentNode, activeVnode.el, oldStartVnode.el);
                  }

                  newStartVnode = newChildren[++newStartIndex];
                }
    }

    if (oldStartIndex > oldEndIndex) {
      activeVnode = newChildren[newEndIndex + 1];
      addVnodes(parentNode, newChildren, newStartIndex, newEndIndex, insertedQueue, activeVnode ? activeVnode.el : NULL);
    } else if (newStartIndex > newEndIndex) {
      removeVnodes(parentNode, oldChildren, oldStartIndex, oldEndIndex);
    }
  };

  var patchVnode = function patchVnode(oldVnode, vnode, insertedQueue) {

    if (oldVnode === vnode) {
      return;
    }

    var data = vnode.data;

    var hooks = data && data.hooks || {};

    var args = [oldVnode, vnode];
    execute(hooks[HOOK_PREPATCH], NULL, args);

    var el = oldVnode.el;

    vnode.el = el;

    if (!isPatchable(oldVnode, vnode)) {
      var parentNode = api.parent(el);
      if (createElement$$1(parentNode, vnode, insertedQueue)) {
        parentNode && replaceVnode(parentNode, oldVnode, vnode);
      }
      return;
    }

    if (data) {
      moduleEmitter.fire(HOOK_UPDATE, args, api);
      execute(hooks[HOOK_UPDATE], NULL, args);
    }

    var newText = vnode.text;
    var newChildren = vnode.children;

    var oldText = oldVnode.text;
    var oldChildren = oldVnode.children;

    if (string(newText)) {
      if (newText !== oldText) {
        api.text(el, newText);
      }
    } else {
      // 两个都有需要 diff
      if (newChildren && oldChildren) {
        if (newChildren !== oldChildren) {
          updateChildren(el, oldChildren, newChildren, insertedQueue);
        }
      }
      // 有新的没旧的 - 新增节点
      else if (newChildren) {
          if (string(oldText)) {
            api.text(el, CHAR_BLANK);
          }
          addVnodes(el, newChildren, 0, newChildren.length - 1, insertedQueue);
        }
        // 有旧的没新的 - 删除节点
        else if (oldChildren) {
            removeVnodes(el, oldChildren, 0, oldChildren.length - 1);
          }
          // 有旧的 text 没有新的 text
          else if (string(oldText)) {
              api.text(el, CHAR_BLANK);
            }
    }

    execute(hooks[HOOK_POSTPATCH], NULL, args);
  };

  return function (oldVnode, vnode) {

    moduleEmitter.fire(HOOK_PRE, NULL, api);

    if (api.isElement(oldVnode)) {
      var el = oldVnode;
      oldVnode = Vnode(stringifySel(el), UNDEFINED, {}, []);
      oldVnode.el = el;
    }

    var insertedQueue = [];
    if (isPatchable(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedQueue);
    } else {
      var parentNode = api.parent(oldVnode.el);
      if (createElement$$1(parentNode, vnode, insertedQueue)) {
        parentNode && replaceVnode(parentNode, oldVnode, vnode);
      }
    }

    each(insertedQueue, function (vnode) {
      execute(vnode.data.hooks[HOOK_INSERT], NULL, vnode);
    });

    moduleEmitter.fire(HOOK_POST, NULL, api);

    return vnode;
  };
}

function updateAttrs(oldVnode, vnode) {

  var oldAttrs = oldVnode.data.attrs;
  var newAttrs = vnode.data.attrs;

  if (vnode.component || !oldAttrs && !newAttrs) {
    return;
  }

  oldAttrs = oldAttrs || {};
  newAttrs = newAttrs || {};

  var el = vnode.el;

  var api = this;

  var getValue = function getValue(attrs, name) {
    if (has$1(attrs, name)) {
      var value = attrs[name];
      return value !== UNDEFINED ? value : name;
    }
  };

  each$1(newAttrs, function (value, name) {
    if (getValue(newAttrs, name) !== getValue(oldAttrs, name)) {
      api.setAttr(el, name, value);
    }
  });

  each$1(oldAttrs, function (value, name) {
    if (!has$1(newAttrs, name)) {
      api.removeAttr(el, name);
    }
  });
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

function updateProps(oldVnode, vnode) {

  var oldProps = oldVnode.data.props;
  var newProps = vnode.data.props;

  if (vnode.component || !oldProps && !newProps) {
    return;
  }

  oldProps = oldProps || {};
  newProps = newProps || {};

  var el = vnode.el;

  var api = this;

  each$1(newProps, function (value, name) {
    if (value !== oldProps[name]) {
      api.setProp(el, name, value);
    }
  });

  each$1(oldProps, function (value, name) {
    if (!has$1(newProps, name)) {
      api.removeProp(el, name);
    }
  });
}

var props = {
  create: updateProps,
  update: updateProps
};

function bindDirective(vnode, key) {
  var el = vnode.el;
  var _vnode$data = vnode.data,
      instance = _vnode$data.instance,
      attrs = _vnode$data.attrs,
      directives = _vnode$data.directives,
      destroies = _vnode$data.destroies;


  var node = directives[key];

  var args = {
    el: el,
    node: node,
    instance: instance,
    directives: directives,
    attributes: attrs || {}
  };

  var $component = el.$component;

  if (object($component)) {
    if (has$1($component, 'queue') && !has$1($component, 'set')) {
      $component = $component.queue;
    }
    args.component = $component;
  }

  var destroy = execute(instance.directive(node.name), NULL, args);

  if (func(destroy)) {
    if (!destroies) {
      destroies = vnode.data.destroies = {};
    }
    destroies[key] = destroy;
  }
}

function unbindDirective(vnode, key) {
  var destroies = vnode.data.destroies;

  if (destroies && destroies[key]) {
    destroies[key]();
    delete destroies[key];
  }
}

function updateDirectives(oldVnode, vnode) {

  var oldDirectives = oldVnode.data.directives;
  var newDirectives = vnode.data.directives;

  if (!oldDirectives && !newDirectives) {
    return;
  }

  oldDirectives = oldDirectives || {};
  newDirectives = newDirectives || {};

  each$1(newDirectives, function (directive, key) {
    if (has$1(oldDirectives, key)) {
      var oldDirective = oldDirectives[key];
      if (oldDirective.value !== directive.value) {
        unbindDirective(oldVnode, key);
        bindDirective(vnode, key);
      }
    } else {
      bindDirective(vnode, key);
    }
  });

  each$1(oldDirectives, function (directive, key) {
    if (!has$1(newDirectives, key)) {
      unbindDirective(oldVnode, key);
    }
  });

  vnode.data.destroies = extend({}, oldVnode.data.destroies, vnode.data.destroies);
}

function destroyDirectives(vnode) {
  var destroies = vnode.data.destroies;

  if (destroies) {
    each$1(destroies, function (destroy) {
      destroy();
    });
  }
}

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: destroyDirectives
};

function createComponent(oldVnode, vnode) {
  var el = vnode.el,
      component = vnode.component;

  if (!component) {
    return;
  }

  var _vnode$data = vnode.data,
      instance = _vnode$data.instance,
      attrs = _vnode$data.attrs;

  el.$component = {
    queue: [],
    attrs: attrs
  };

  instance.component(vnode.sel, function (options) {
    var _el = el,
        $component = _el.$component;

    if ($component && array($component.queue)) {

      component = instance.create(options, {
        el: el,
        props: $component.attrs,
        replace: TRUE
      });

      el = vnode.el = component.$el;
      el.$component = component;

      each($component.queue, function (callback) {
        callback(component);
      });
    }
  });
}

function updateComponent(oldVnode, vnode) {
  var $component = vnode.el.$component;

  if (object($component)) {
    var attrs = vnode.data.attrs;

    if ($component.set) {
      $component.set(attrs, TRUE);
    } else {
      $component.attrs = attrs;
    }
  }
}

function destroyComponent(oldVnode, vnode) {
  var el = oldVnode.el;
  var $component = el.$component;

  if (object($component)) {
    if ($component.destroy) {
      $component.destroy(TRUE);
    }
    el.$component = NULL;
  }
}

var component = {
  create: createComponent,
  update: updateComponent,
  destroy: destroyComponent
};

/**
 * 表达式求值
 *
 * @param {Node} node
 * @param {Context} context
 * @return {*}
 */
function execute$1(node, context) {

  var deps = {},
      value = void 0,
      keypath = void 0,
      result = void 0;

  switch (node.type) {
    case ARRAY:
      value = [];
      each(node.elements, function (node) {
        result = execute$1(node, context);
        push(value, result.value);
        extend(deps, result.deps);
      });
      break;

    case BINARY:
      var left = node.left,
          right = node.right;

      left = execute$1(left, context);
      right = execute$1(right, context);
      value = Binary[node.operator](left.value, right.value);
      extend(deps, left.deps, right.deps);
      break;

    case CALL:
      result = execute$1(node.callee, context);
      deps = result.deps;
      value = execute(result.value, NULL, node.args.map(function (node) {
        var result = execute$1(node, context);
        extend(deps, result.deps);
        return result.value;
      }));
      break;

    case TERNARY:
      var test = node.test,
          consequent = node.consequent,
          alternate = node.alternate;

      test = execute$1(test, context);
      if (test.value) {
        consequent = execute$1(consequent, context);
        value = consequent.value;
        extend(deps, test.deps, consequent.deps);
      } else {
        alternate = execute$1(alternate, context);
        value = alternate.value;
        extend(deps, test.deps, alternate.deps);
      }
      break;

    case IDENTIFIER:
      keypath = node.name;
      result = context.get(keypath);
      value = result.value;
      deps[result.keypath] = value;
      break;

    case LITERAL:
      value = node.value;
      break;

    case MEMBER:
      var keys$$1 = [];
      each(Member.flatten(node), function (node, index) {
        var type = node.type;

        if (type !== LITERAL) {
          if (index > 0) {
            var _result = execute$1(node, context);
            push(keys$$1, _result.value);
            extend(deps, _result.deps);
          } else if (type === IDENTIFIER) {
            push(keys$$1, node.name);
          }
        } else {
          push(keys$$1, node.value);
        }
      });
      keypath = stringify(keys$$1);
      result = context.get(keypath);
      value = result.value;
      deps[result.keypath] = value;
      break;

    case UNARY:
      result = execute$1(node.arg, context);
      value = Unary[node.operator](result.value);
      deps = result.deps;
      break;
  }

  return { value: value, deps: deps, keypath: keypath };
}

var Context = function () {

  /**
   * @param {Object} data
   * @param {string} keypath
   * @param {?Context} parent
   */
  function Context(data, keypath, parent) {
    classCallCheck(this, Context);

    this.data = copy(data);
    this.keypath = keypath;
    this.parent = parent;
    this.cache = {};
  }

  createClass(Context, [{
    key: 'push',
    value: function push$$1(data, keypath) {
      return new Context(data, keypath, this);
    }
  }, {
    key: 'pop',
    value: function pop$$1() {
      return this.parent;
    }
  }, {
    key: 'set',
    value: function set$$1(key, value) {
      var instance = this;

      var _formatKeypath = formatKeypath(key),
          keypath = _formatKeypath.keypath;

      if (instance && keypath) {
        if (has$1(instance.cache, keypath)) {
          delete instance.cache[keypath];
        }
        set$1(instance.data, keypath, value);
      }
    }
  }, {
    key: 'get',
    value: function get$$1(key) {

      var instance = this;

      var _formatKeypath2 = formatKeypath(key),
          keypath = _formatKeypath2.keypath,
          lookup = _formatKeypath2.lookup;

      var originalKeypath = keypath,
          deps = {};

      var _instance = instance,
          data = _instance.data,
          cache = _instance.cache;

      var joinKeypath = function joinKeypath(context, keypath) {
        return join(context.keypath, keypath);
      };

      if (!has$1(cache, keypath)) {

        if (keypath) {
          var result = void 0;

          if (lookup) {
            while (instance) {
              result = get$1(instance.data, keypath);
              if (result) {
                break;
              } else {
                instance = instance.parent;
              }
            }
          } else {
            result = get$1(data, keypath);
          }

          if (result) {
            cache[keypath] = {
              keypath: joinKeypath(instance, keypath),
              value: result.value
            };
          }
        } else {
          cache[keypath] = {
            keypath: instance.keypath,
            value: data
          };
        }
      }
      cache = cache[keypath];
      if (cache) {
        return cache;
      }

      warn('Failed to lookup "' + key + '".');

      // 找不到就用当前的 keypath 吧
      return {
        keypath: joinKeypath(this, keypath)
      };
    }
  }]);
  return Context;
}();

function formatKeypath(keypath) {
  var keys$$1 = parse(keypath);
  if (keys$$1[0] === THIS) {
    keys$$1.shift();
    return {
      keypath: stringify(keys$$1)
    };
  } else {
    return {
      keypath: stringify(keys$$1),
      lookup: TRUE
    };
  }
}

/**
 * 标记节点数组，用于区分普通数组
 *
 * @param {*} nodes
 * @return {*}
 */
function makeNodes(nodes) {
  if (array(nodes)) {
    nodes[CHAR_DASH] = TRUE;
  }
  return nodes;
}

/**
 * 是否是节点数组
 *
 * @param {*} nodes
 * @return {boolean}
 */
function isNodes(nodes) {
  return array(nodes) && nodes[CHAR_DASH];
}

/**
 * 合并多个节点
 *
 * 用于处理属性值和指令值
 *
 * @param {?Array} outputNodes
 * @param {?Array} sourceNodes
 * @return {*}
 */
function mergeNodes(outputNodes, sourceNodes) {
  if (array(outputNodes)) {
    switch (outputNodes.length) {
      // name=""
      case 0:
        return CHAR_BLANK;
      // name="{{value}}"
      case 1:
        return outputNodes[0];
      // name="{{value1}}{{value2}}"
      default:
        return outputNodes.join(CHAR_BLANK);
    }
  } else if (!falsy(sourceNodes)) {
    return CHAR_BLANK;
  }
}

/**
 * 渲染抽象语法树
 *
 * @param {Object} ast 编译出来的抽象语法树
 * @param {Function} createComment 创建注释节点
 * @param {Function} createElement 创建元素节点
 * @param {Function} importTemplate 导入子模板，如果是纯模板，可不传
 * @param {Object} data 渲染模板的数据，如果渲染纯模板，可不传
 * @return {Object} { nodes: x, deps: { } }
 */
function render(ast, createComment, createElement, importTemplate, data) {

  var keypath = void 0,
      keypathList = [],
      updateKeypath = function updateKeypath() {
    keypath = stringify(keypathList);
  },
      getKeypath = function getKeypath() {
    return keypath;
  };

  updateKeypath();

  getKeypath.toString = getKeypath;
  data[SPECIAL_KEYPATH] = getKeypath;

  var context = new Context(data, keypath),
      nodeStack = [],
      nodes = [],
      deps = {};

  var pushStack = function pushStack(node) {
    if (array(node.context)) {
      execute(context.set, context, node.context);
    }
    if (node.keypath !== UNDEFINED) {
      push(keypathList, node.keypath);
      updateKeypath();
    }
    if (node.value !== UNDEFINED) {
      context = context.push(node.value, keypath);
    }
    if (htmlTypes[node.type]) {
      push(htmlStack, node.type);
    }
    push(nodeStack, {
      node: node,
      index: -1,
      deps: {},
      parent: current
    });
    current = last(nodeStack);
  };

  var popStack = function popStack() {
    var _current = current,
        node = _current.node;

    if (htmlTypes[node.type]) {
      pop(htmlStack);
    }
    if (node.value !== UNDEFINED) {
      context = context.pop();
    }
    if (node.keypath !== UNDEFINED) {
      pop(keypathList);
      updateKeypath();
    }
    if (sibling) {
      sibling = NULL;
    }
    if (!current.binding) {
      extend(current.parent ? current.parent.deps : deps, current.deps);
    }
    current = current.parent;
    pop(nodeStack);
  };

  var pushNode = function pushNode(node) {
    if (array(node)) {
      if (node.length) {
        pushStack({
          children: node
        });
      }
    } else {
      pushStack(node);
    }
  };

  var addValue = function addValue(value) {
    var parent = current.parent,
        collection = void 0;
    if (parent) {
      collection = parent.children || (parent.children = makeNodes([]));
    } else {
      collection = nodes;
    }
    if (isNodes(value)) {
      push(collection, value);
    } else {
      collection.push(value);
    }
  };

  var executeExpr = function executeExpr(expr) {
    var result = execute$1(expr, context);
    expr.keypath = result.keypath;
    extend(current.deps, result.deps);
    return result.value;
  };

  var filterElse = function filterElse(node) {
    if (elseTypes[node.type]) {
      return FALSE;
    } else {
      filter = NULL;
      return TRUE;
    }
  };

  var enter = {},
      leave = {};

  enter[PARTIAL$1] = function (node) {
    partials[node.name] = node.children;
    popStack();
    return FALSE;
  };

  enter[IMPORT$1] = function (node) {
    var name = node.name;

    var partial = partials[name] || importTemplate(name);
    if (partial) {
      popStack();
      pushNode(partial);
      return FALSE;
    }
    fatal('Partial "' + name + '" is not found.');
  };

  // 条件判断失败就没必要往下走了
  // 但如果失败的点原本是一个 DOM 元素
  // 就需要用注释节点来占位，否则 virtual dom 无法正常工作
  enter[IF$1] = enter[ELSE_IF$1] = function (node) {
    if (!executeExpr(node.expr)) {
      if (sibling && !elseTypes[sibling.type] && !attrTypes[last(htmlStack)]) {
        addValue(makeNodes(createComment()));
      }
      popStack();
      return FALSE;
    }
  };

  enter[EACH$1] = function (node) {

    popStack();

    var expr = node.expr,
        index = node.index,
        children = node.children;


    var value = executeExpr(expr),
        each$$1 = void 0;

    if (array(value)) {
      each$$1 = each;
    } else if (object(value)) {
      each$$1 = each$1;
    }

    if (each$$1) {

      var list = [];
      // push 之后 keypath 会更新
      // 这样 each 的 children 才能取到正确的 keypath
      pushStack({
        value: value,
        children: list,
        keypath: expr.keypath
      });

      each$$1(value, function (value, i, item) {

        item = {
          value: value,
          children: children,
          keypath: i
        };

        if (index) {
          item.context = [index, i];
        }

        push(list, item);
      });
    }

    return FALSE;
  };

  var createAttribute = function createAttribute(name, value, bindTo) {
    var attribute = {
      name: name,
      value: value,
      keypath: keypath,
      type: ATTRIBUTE
    };
    if (string(bindTo)) {
      attribute.bindTo = bindTo;
    }
    return attribute;
  };

  leave[TEXT] = function (node) {
    return node.content;
  };

  leave[EXPRESSION] = function (node) {
    return executeExpr(node.expr);
  };

  leave[ATTRIBUTE] = function (node) {
    var name = node.name,
        children = node.children;

    var value = mergeNodes(current.children, children),
        bindTo = void 0;
    if (children && children.length === 1) {
      var _children$ = children[0],
          type = _children$.type,
          expr = _children$.expr,
          safe = _children$.safe;

      if (safe && type === EXPRESSION && string(expr.keypath)) {
        bindTo = expr.keypath;
        current.binding = TRUE;
      }
    }
    return createAttribute(name, value, bindTo);
  };

  leave[DIRECTIVE] = function (node) {
    var name = node.name,
        modifier = node.modifier,
        children = node.children;

    var value = mergeNodes(current.children, children);

    if (name === KEYWORD_UNIQUE) {
      if (value != NULL) {
        if (!currentCache) {
          prevCache = ast.cache;
          currentCache = ast.cache = {};
        }
        cache = prevCache && prevCache[value];
        if (cache) {
          currentCache[value] = cache;
          // 回退到元素层级
          while (current.node.type !== ELEMENT) {
            popStack();
          }
          extend(current.deps, cache.deps);
          return cache.result;
        } else {
          // 缓存挂在元素上
          var parent = void 0;
          while (parent = current.parent) {
            if (parent.node.type === ELEMENT) {
              parent.cache = {
                key: value
              };
              break;
            }
          }
        }
      }
      return;
    }

    return {
      keypath: keypath,
      name: name,
      value: value,
      modifier: modifier,
      type: DIRECTIVE
    };
  };

  leave[IF$1] = leave[ELSE_IF$1] = leave[ELSE$1] = function (node) {
    filter = filterElse;
    return current.children;
  };

  leave[SPREAD$1] = function (node) {
    var expr = node.expr,
        value = executeExpr(expr);
    if (object(value)) {
      var _keypath = expr.keypath,
          hasKeypath = string(_keypath),
          list = makeNodes([]);
      each$1(value, function (value, name) {
        push(list, createAttribute(name, value, hasKeypath ? join(_keypath, name) : UNDEFINED));
      });
      current.binding = hasKeypath;
      return list;
    }
    fatal('Spread "' + stringify$1(expr) + '" must be an object.');
  };

  leave[ELEMENT] = function (node) {

    var attributes = [],
        directives = [],
        children = [];

    if (current.children) {
      each(current.children, function (node) {
        if (node.type === ATTRIBUTE) {
          push(attributes, node);
        } else if (node.type === DIRECTIVE) {
          push(directives, node);
        } else {
          push(children, node);
        }
      });
    }

    return createElement({
      name: node.name,
      key: current.cache ? current.cache.key : UNDEFINED,
      component: node.component,
      keypath: keypath,
      attributes: attributes,
      directives: directives,
      children: children
    }, node);
  };

  leave[UNDEFINED] = function (node, current) {
    return current.children;
  };

  var traverseList = function traverseList(current, list, item) {
    while (item = list[++current.index]) {
      if (!filter || filter(item)) {
        sibling = list[current.index + 1];
        pushStack(item);
        return FALSE;
      }
    }
  };

  // 当前处理的栈节点
  var current = void 0,

  // 相邻节点
  sibling = void 0,

  // 过滤某些节点的函数
  filter = void 0,

  // 节点的值
  value = void 0,

  // 缓存
  cache = void 0,
      prevCache = void 0,
      currentCache = void 0,

  // 正在渲染的 html 层级
  htmlStack = [],

  // 用时定义的模板片段
  partials = {};

  pushNode(ast);

  while (nodeStack.length) {
    var _current2 = current,
        node = _current2.node;
    var type = node.type,
        attrs = node.attrs,
        children = node.children;


    if (!current.enter) {
      current.enter = TRUE;

      if (execute(enter[type], NULL, [node, current]) === FALSE) {
        continue;
      }
    }

    if (attrs && !current.attrs) {
      if (traverseList(current, attrs) === FALSE) {
        continue;
      }
      current.index = -1;
      current.attrs = TRUE;
    }

    if (children && traverseList(current, children) === FALSE) {
      continue;
    }

    value = execute(leave[type], NULL, [node, current]);

    if (value !== UNDEFINED) {
      addValue(value);
      cache = current.cache;
      if (cache) {
        cache.result = value;
        cache.deps = current.deps;
        currentCache[cache.key] = cache;
      }
    }

    popStack();
  }

  return { nodes: nodes, deps: deps };
}

var patch = init([component, attrs, props, directives], api);

function create(ast, context, instance) {

  var createElementVnode$$1 = function createElementVnode$$1(output, source) {

    var hooks = {},
        data = { instance: instance, hooks: hooks },
        sourceChildren = source.children,
        outputChildren = output.children;

    if (sourceChildren && sourceChildren.length === 1) {
      var child = sourceChildren[0];
      if (child.type === EXPRESSION && child.safe === FALSE) {
        data.props = {
          innerHTML: outputChildren[0]
        };
        outputChildren.length = 0;
      }
    }

    var addDirective = function addDirective(directive) {
      var directives$$1 = data.directives || (data.directives = {});
      directives$$1[join(directive.name, directive.modifier)] = directive;
    };

    each(output.attributes, function (node) {
      var name = node.name,
          value = node.value,
          keypath = node.keypath,
          bindTo = node.bindTo;


      var attrs$$1 = data.attrs || (data.attrs = {});
      attrs$$1[name] = value;

      if (string(bindTo)) {
        addDirective({
          keypath: keypath,
          name: DIRECTIVE_MODEL,
          modifier: name,
          value: bindTo,
          oneway: TRUE
        });
      }
    });

    each(output.directives, addDirective);

    return createElementVnode(output.name, data, outputChildren.map(function (child) {
      return Vnode.is(child) ? child : createTextVnode(child);
    }), output.key, output.component);
  };

  var importTemplate = function importTemplate(name) {
    var partial = instance.partial(name);
    return string(partial) ? compile(partial) : partial;
  };

  return render(ast, createCommentVnode, createElementVnode$$1, importTemplate, context);
}

/**
 * <Component ref="component" />
 * <input ref="input">
 */

var ref = function (_ref) {
  var el = _ref.el,
      node = _ref.node,
      instance = _ref.instance,
      component = _ref.component;
  var value = node.value;

  if (falsy$1(value)) {
    return;
  }

  var $refs = instance.$refs;

  if (object($refs)) {
    if (has$1($refs, value)) {
      error$1('Passing a ref "' + value + '" is existed.');
    }
  } else {
    $refs = instance.$refs = {};
  }

  var set$$1 = function set$$1(target) {
    $refs[value] = target;
  };

  if (component) {
    if (array(component)) {
      push(component, set$$1);
    } else {
      set$$1(component);
    }
  } else {
    set$$1(el);
  }

  return function () {
    if (has$1($refs, value)) {
      delete $refs[value];
    } else if (array(component)) {
      remove(component, set$$1);
    }
  };
};

/**
 * 节流调用
 *
 * @param {Function} fn 需要节制调用的函数
 * @param {number} delay 调用的时间间隔
 * @param {?boolean} immediate 是否立即触发
 * @return {Function}
 */
var debounce = function (fn, delay, immediate) {

  var timer = void 0;

  return function () {

    if (!timer) {

      var args = toArray$1(arguments);
      if (immediate) {
        execute(fn, NULL, args);
      }

      timer = setTimeout(function () {
        timer = NULL;
        if (!immediate) {
          execute(fn, NULL, args);
        }
      }, delay);
    }
  };
};

// 避免连续多次点击，主要用于提交表单场景
// 移动端的 tap 事件可自行在业务层打补丁实现
var immediateTypes = [CLICK, TAP];

var bindEvent = function (_ref) {
  var el = _ref.el,
      node = _ref.node,
      instance = _ref.instance,
      component = _ref.component,
      directives = _ref.directives,
      type = _ref.type,
      listener = _ref.listener;


  if (!type) {
    type = node.modifier;
  }
  if (!listener) {
    listener = instance.compileValue(node.keypath, node.value);
  }

  if (type && listener) {
    var lazy = directives.lazy;

    if (lazy) {
      var value = lazy.value;

      if (numeric(value) && value >= 0) {
        listener = debounce(listener, value, has(immediateTypes, type));
      } else if (type === INPUT) {
        type = CHANGE;
      }
    }

    if (component) {
      var bind = function bind(component) {
        component.on(type, listener);
      };
      if (array(component)) {
        push(component, bind);
      } else {
        bind(component);
      }
      return function () {
        component.off(type, listener);
        if (array(component)) {
          remove(component, bind);
        }
      };
    } else {
      api.on(el, type, listener);
      return function () {
        api.off(el, type, listener);
      };
    }
  }
};

var inputControl = {
  set: function set$$1(_ref) {
    var el = _ref.el,
        keypath = _ref.keypath,
        instance = _ref.instance;

    var value = toString(instance.get(keypath));
    if (value !== el.value) {
      el.value = value;
    }
  },
  sync: function sync(_ref2) {
    var el = _ref2.el,
        keypath = _ref2.keypath,
        instance = _ref2.instance;

    instance.set(keypath, el.value);
  },

  attr: 'value'
};

var selectControl = {
  set: function set$$1(_ref3) {
    var el = _ref3.el,
        keypath = _ref3.keypath,
        instance = _ref3.instance;

    var value = toString(instance.get(keypath));
    var options = el.options,
        selectedIndex = el.selectedIndex;

    if (value !== options[selectedIndex].value) {
      each(options, function (option, index) {
        if (option.value === value) {
          el.selectedIndex = index;
          return FALSE;
        }
      });
    }
  },
  sync: function sync(_ref4) {
    var el = _ref4.el,
        keypath = _ref4.keypath,
        instance = _ref4.instance;
    var value = el.options[el.selectedIndex].value;

    instance.set(keypath, value);
  }
};

var radioControl = {
  set: function set$$1(_ref5) {
    var el = _ref5.el,
        keypath = _ref5.keypath,
        instance = _ref5.instance;

    el.checked = el.value === toString(instance.get(keypath));
  },
  sync: function sync(_ref6) {
    var el = _ref6.el,
        keypath = _ref6.keypath,
        instance = _ref6.instance;

    if (el.checked) {
      instance.set(keypath, el.value);
    }
  },

  attr: 'checked'
};

var checkboxControl = {
  set: function set$$1(_ref7) {
    var el = _ref7.el,
        keypath = _ref7.keypath,
        instance = _ref7.instance;

    var value = instance.get(keypath);
    el.checked = array(value) ? has(value, el.value, FALSE) : boolean(value) ? value : !!value;
  },
  sync: function sync(_ref8) {
    var el = _ref8.el,
        keypath = _ref8.keypath,
        instance = _ref8.instance;

    var value = instance.get(keypath);
    if (array(value)) {
      if (el.checked) {
        push(value, el.value);
      } else {
        remove(value, el.value, FALSE);
      }
      instance.set(keypath, copy(value));
    } else {
      instance.set(keypath, el.checked);
    }
  },

  attr: 'checked'
};

var specialControls = {
  radio: radioControl,
  checkbox: checkboxControl,
  select: selectControl
};

function twoway(keypath, _ref9) {
  var el = _ref9.el,
      node = _ref9.node,
      instance = _ref9.instance,
      directives = _ref9.directives,
      attributes = _ref9.attributes;


  var type = CHANGE,
      tagName = api.tag(el),
      controlType = el.type;
  var control = specialControls[controlType] || specialControls[tagName];
  if (!control) {
    control = inputControl;
    if ('oninput' in el || tagName === 'textarea' || controlType === 'text' || controlType === 'password') {
      type = INPUT;
    }
  }

  var data = {
    el: el,
    keypath: keypath,
    instance: instance
  };

  var set$$1 = function set$$1() {
    control.set(data);
  };

  instance.watch(keypath, set$$1, control.attr && !has$1(attributes, control.attr));

  var destroy = bindEvent({
    el: el,
    node: node,
    instance: instance,
    directives: directives,
    type: type,
    listener: function listener() {
      control.sync(data);
    }
  });

  return function () {
    instance.unwatch(keypath, set$$1);
    destroy && destroy();
  };
}

function oneway(keypath, _ref10) {
  var el = _ref10.el,
      node = _ref10.node,
      instance = _ref10.instance,
      component = _ref10.component;


  var set$$1 = function set$$1(value) {
    var name = node.modifier;
    if (component) {
      var _set = function _set(component) {
        component.set(name, value);
      };
      if (array(component)) {
        push(component, _set);
      } else {
        _set(component);
      }
    } else {
      api.setAttr(el, name, value !== UNDEFINED ? value : CHAR_BLANK);
    }
  };

  instance.watch(keypath, set$$1);

  return function () {
    instance.unwatch(keypath, set$$1);
  };
}

// 双向 model="xx"
// 单向 name="{{value}}"

var model = function (options) {
  var node = options.node,
      instance = options.instance;

  var _instance$get = instance.get(node.value, node.keypath),
      keypath = _instance$get.keypath;

  return node.oneway ? oneway(keypath, options) : twoway(keypath, options);
};

var TEMPLATE_WATCHER_KEY = '$template$';

var Yox = function () {
  function Yox(options) {
    classCallCheck(this, Yox);


    var instance = this;

    // 如果不绑着，其他方法调不到钩子
    instance.$options = options;

    execute(options[BEFORE_CREATE], instance, options);

    var el = options.el,
        data = options.data,
        props = options.props,
        parent = options.parent,
        replace = options.replace,
        computed = options.computed,
        template = options.template,
        components = options.components,
        directives = options.directives,
        partials = options.partials,
        filters = options.filters,
        events = options.events,
        watchers = options.watchers,
        methods = options.methods,
        propTypes = options.propTypes,
        extensions = options.extensions;


    extend(instance, extensions);

    var source = props;

    // 检查 props
    if (object(source)) {
      if (object(propTypes)) {
        source = Yox.validate(source, propTypes);
      }
      // 如果传了 props，则 data 应该是个 function
      if (data && !func(data)) {
        warn('"data" option should be a function.');
      }
    } else {
      source = {};
    }

    // 先放 props
    // 当 data 是函数时，可以通过 this.get() 获取到外部数据
    instance.$observer = new Observer({
      context: instance,
      data: source,
      computed: computed
    });

    // 后放 data
    var extend$$1 = func(data) ? execute(data, instance) : data;
    if (object(extend$$1)) {
      each$1(extend$$1, function (value, key) {
        if (has$1(source, key)) {
          warn('"' + key + '" is already defined as a prop. Use prop default value instead.');
        } else {
          source[key] = value;
        }
      });
    }

    // 等数据准备好之后，再触发 watchers
    watchers && instance.$observer.watch(watchers);

    // 监听各种事件
    instance.$eventEmitter = new Emitter();
    events && instance.on(events);

    execute(options[AFTER_CREATE], instance);

    // 检查 template
    if (string(template)) {
      if (selector.test(template)) {
        template = api.html(api.find(template));
      }
      if (!tag.test(template)) {
        error$1('"template" option must have a root element.');
      }
    } else {
      template = NULL;
    }

    // 检查 el
    if (string(el)) {
      if (selector.test(el)) {
        el = api.find(el);
      }
    }
    if (el) {
      if (api.isElement(el)) {
        if (!replace) {
          api.html(el, '<div></div>');
          el = api.children(el)[0];
        }
      } else {
        error$1('"el" option must be a html element.');
      }
    }

    if (parent) {
      instance.$parent = parent;
    }

    if (methods) {
      each$1(methods, function (fn, name) {
        if (has$1(prototype, name)) {
          error$1('"' + name + '" method is conflicted with built-in methods.');
        }
        instance[name] = fn;
      });
    }

    components && instance.component(components);
    directives && instance.directive(directives);
    partials && instance.partial(partials);
    filters && instance.filter(filters);

    if (template) {
      instance.watch(TEMPLATE_WATCHER_KEY, function () {
        instance.$dirty = TRUE;
      });
      execute(options[BEFORE_MOUNT], instance);
      instance.$template = Yox.compile(template);
      instance.updateView(el || api.createElement('div'));
    }
  }

  /**
   * 取值
   *
   * @param {string} keypath
   * @param {?string} context
   * @return {?*}
   */


  createClass(Yox, [{
    key: 'get',
    value: function get$$1(keypath, context) {
      return this.$observer.get(keypath, context);
    }

    /**
     * 设值
     *
     * @param {string|Object} keypath
     * @param {?*} value
     */

  }, {
    key: 'set',
    value: function set$$1(keypath, value) {

      var model$$1 = void 0,
          sync = void 0;
      if (string(keypath)) {
        model$$1 = {};
        model$$1[keypath] = value;
      } else if (object(keypath)) {
        model$$1 = keypath;
        sync = value === TRUE;
      } else {
        return;
      }

      this.updateModel(model$$1, sync);
    }

    /**
     * 监听事件
     *
     * @param {string|Object} type
     * @param {?Function} listener
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      this.$eventEmitter.on(type, listener);
    }

    /**
     * 监听一次事件
     *
     * @param {string|Object} type
     * @param {?Function} listener
     */

  }, {
    key: 'once',
    value: function once(type, listener) {
      this.$eventEmitter.once(type, listener);
    }

    /**
     * 取消监听事件
     *
     * @param {string|Object} type
     * @param {?Function} listener
     */

  }, {
    key: 'off',
    value: function off(type, listener) {
      this.$eventEmitter.off(type, listener);
    }

    /**
     * 触发事件
     *
     * @param {string} type
     * @param {?*} data
     * @return {boolean} 是否正常结束
     */

  }, {
    key: 'fire',
    value: function fire(type, data) {

      // 外部为了使用方便，fire(type) 或 fire(type, data) 就行了
      // 内部为了保持格式统一
      // 需要转成 Event，这样还能知道 target 是哪个组件
      var event = type;
      if (string(type)) {
        event = new Event(type);
      }

      var instance = this;
      if (!event.target) {
        event.target = instance;
      }

      var args = [event];
      if (object(data)) {
        push(args, data);
      }

      var $parent = instance.$parent,
          $eventEmitter = instance.$eventEmitter;

      var isComplete = $eventEmitter.fire(event.type, args, instance);
      if (isComplete && $parent) {
        isComplete = $parent.fire(event, data);
      }

      return isComplete;
    }

    /**
     * 监听数据变化
     *
     * @param {string|Object} keypath
     * @param {?Function} watcher
     * @param {?boolean} sync
     */

  }, {
    key: 'watch',
    value: function watch(keypath, watcher, sync) {
      this.$observer.watch(keypath, watcher, sync);
    }

    /**
     * 监听一次数据变化
     *
     * @param {string|Object} keypath
     * @param {?Function} watcher
     * @param {?boolean} sync
     */

  }, {
    key: 'watchOnce',
    value: function watchOnce(keypath, watcher, sync) {
      this.$observer.watchOnce(keypath, watcher, sync);
    }

    /**
     * 取消监听数据变化
     *
     * @param {string|Object} keypath
     * @param {?Function} watcher
     */

  }, {
    key: 'unwatch',
    value: function unwatch(keypath, watcher) {
      this.$observer.unwatch(keypath, watcher);
    }

    /**
     * 只更新数据，不更新视图
     *
     * @param {Object} model
     */

  }, {
    key: 'updateModel',
    value: function updateModel(model$$1) {

      var instance = this,
          $observer = instance.$observer,
          args = arguments;

      $observer.set(model$$1);

      var update = function update() {

        if (instance.$dirtyIgnore) {
          delete instance.$dirtyIgnore;
          return;
        }

        if (instance.$dirty) {
          delete instance.$dirty;
          instance.updateView();
        }
      };

      if (args.length === 1) {
        instance.$dirtyIgnore = TRUE;
      } else if (args.length === 2 && args[1]) {
        update();
        return;
      }

      if (!instance.$pending) {
        instance.$pending = TRUE;
        append(function () {
          if (instance.$pending) {
            delete instance.$pending;
            update();
          }
        });
      }
    }

    /**
     * 更新视图
     */

  }, {
    key: 'updateView',
    value: function updateView() {

      var instance = this;

      var $observer = instance.$observer,
          $options = instance.$options,
          $filters = instance.$filters,
          $node = instance.$node;


      var isUpdate = $node;

      // 对于静态组件，可在 beforeUpdate 钩子函数返回 false
      if (isUpdate && execute($options[BEFORE_UPDATE], instance) === FALSE) {
        return;
      }

      var context = {};
      var filter = registry.filter;


      extend(context,
      // 全局过滤器
      filter && filter.data,
      // 本地过滤器
      $filters && $filters.data);

      each$1(context, function (value, key) {
        if (func(value)) {
          context[key] = value.bind(instance);
        }
      });

      // data 中的函数不需要强制绑定 this
      // 不是不想管，是没法管，因为每层级都可能出现函数，但不可能每层都绑定
      // 而且让 data 中的函数完全动态化说不定还是一个好设计呢
      extend(context, $observer.data, $observer.computedGetters);

      // 新的虚拟节点和依赖关系

      var _vdom$create = create(instance.$template, context, instance),
          nodes = _vdom$create.nodes,
          deps = _vdom$create.deps;

      if (isUpdate) {
        prepend(function () {
          instance.$node = patch($node, nodes[0]);
        });
      } else {
        $node = patch(arguments[0], nodes[0]);
        instance.$el = $node.el;
        instance.$node = $node;
      }

      prepend(function () {
        $observer.setComputedDeps(TEMPLATE_WATCHER_KEY, keys(deps));
        execute($options[isUpdate ? AFTER_UPDATE : AFTER_MOUNT], instance);
      });
    }

    /**
     * 创建子组件
     *
     * @param {Object} options 组件配置
     * @param {?Object} extra 添加进组件配置，但不修改配置的数据，比如 el、props 等
     * @return {Yox} 子组件实例
     */

  }, {
    key: 'create',
    value: function create$$1(options, extra) {
      options = extend({}, options, extra);
      options.parent = this;
      var child = new Yox(options);
      push(this.$children || (this.$children = []), child);
      return child;
    }

    /**
     * 编译 on-click="value" 里面的表达式
     *
     * @param {string} keypath
     * @param {string} value
     * @return {Function}
     */

  }, {
    key: 'compileValue',
    value: function compileValue(keypath, value) {

      if (falsy$1(value)) {
        return;
      }

      var instance = this;
      if (indexOf$1(value, CHAR_OPAREN) > 0) {
        var ast = compile$1(value);
        if (ast.type === CALL) {
          return function (event) {
            var isEvent = Event.is(event);
            var args = copy(ast.args);
            if (!args.length) {
              if (isEvent) {
                push(args, event);
              }
            } else {
              args = args.map(function (node) {
                var name = node.name,
                    type = node.type;

                if (type === LITERAL) {
                  return node.value;
                }
                if (type === IDENTIFIER) {
                  if (name === SPECIAL_EVENT) {
                    if (isEvent) {
                      return event;
                    }
                  } else if (name === SPECIAL_KEYPATH) {
                    return keypath;
                  } else if (name === THIS) {
                    return instance.get(keypath);
                  }
                } else if (type === MEMBER) {
                  name = stringify$1(node);
                }

                var result = instance.get(name, keypath);
                if (has$1(result, 'value')) {
                  return result.value;
                }
              });
            }
            var name = stringify$1(ast.callee);
            var fn = instance[name];
            if (!fn) {
              var result = instance.get(name, keypath);
              if (has$1(result, 'value')) {
                fn = result.value;
              }
            }
            if (execute(fn, instance, args) === FALSE && isEvent) {
              event.prevent();
              event.stop();
            }
          };
        }
      } else {
        return function (event, data) {
          if (event.type !== value) {
            event = new Event(event);
            event.type = value;
          }
          instance.fire(event, data);
        };
      }
    }

    /**
     * 销毁组件
     */

  }, {
    key: 'destroy',
    value: function destroy() {

      var instance = this;

      var $options = instance.$options,
          $node = instance.$node,
          $parent = instance.$parent,
          $observer = instance.$observer,
          $eventEmitter = instance.$eventEmitter;


      execute($options[BEFORE_DESTROY], instance);

      if ($parent && $parent.$children) {
        remove($parent.$children, instance);
      }

      if ($node) {
        if (arguments[0] !== TRUE) {
          patch($node, { text: CHAR_BLANK });
        }
      }

      $eventEmitter.off();
      $observer.destroy();

      clear(instance);

      execute($options[AFTER_DESTROY], instance);
    }

    /**
     * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
     *
     * @param {Function} fn
     */

  }, {
    key: 'nextTick',
    value: function nextTick(fn) {
      Yox.nextTick(fn);
    }

    /**
     * 取反 keypath 对应的数据
     *
     * 不管 keypath 对应的数据是什么类型，操作后都是布尔型
     *
     * @param {boolean} keypath
     * @return {boolean} 取反后的布尔值
     */

  }, {
    key: 'toggle',
    value: function toggle(keypath) {
      var value = !this.get(keypath);
      this.set(keypath, value);
      return value;
    }

    /**
     * 递增 keypath 对应的数据
     *
     * 注意，最好是整型的加法，如果涉及浮点型，不保证计算正确
     *
     * @param {string} keypath 值必须能转型成数字，如果不能，则默认从 0 开始递增
     * @param {?number} step 步进值，默认是 1
     * @param {?number} min 可以递增到的最小值，默认不限制
     * @return {number} 返回递增后的值
     */

  }, {
    key: 'increase',
    value: function increase(keypath, step, max) {
      var value = toNumber(this.get(keypath), 0) + (numeric(step) ? step : 1);
      if (!numeric(max) || value <= max) {
        this.set(keypath, value);
      }
      return value;
    }

    /**
     * 递减 keypath 对应的数据
     *
     * 注意，最好是整型的减法，如果涉及浮点型，不保证计算正确
     *
     * @param {string} keypath 值必须能转型成数字，如果不能，则默认从 0 开始递减
     * @param {?number} step 步进值，默认是 1
     * @param {?number} min 可以递减到的最小值，默认不限制
     * @return {number} 返回递减后的值
     */

  }, {
    key: 'decrease',
    value: function decrease(keypath, step, min) {
      var value = toNumber(this.get(keypath), 0) - (numeric(step) ? step : 1);
      if (!numeric(min) || value >= min) {
        this.set(keypath, value);
      }
      return value;
    }

    /**
     * 拷贝任意数据，支持深拷贝
     *
     * @param {*} data
     * @param {?boolean} deep 是否深拷贝
     * @return {*}
     */

  }, {
    key: 'copy',
    value: function copy$$1(data, deep) {
      return copy(data, deep);
    }
  }]);
  return Yox;
}();

Yox.version = '0.38.4';

/**
 * 工具，便于扩展、插件使用
 */
Yox.is = is$1;
Yox.dom = api;
Yox.array = array$1;
Yox.object = object$1;
Yox.string = string$1;
Yox.logger = logger;
Yox.Event = Event;
Yox.Emitter = Emitter;

var prototype = Yox.prototype;

// 全局注册

var registry = {};

var Store = function () {
  function Store() {
    classCallCheck(this, Store);

    this.data = {};
  }

  /**
   * 异步取值
   *
   * @param {string} key
   * @param {Function} callback
   */


  createClass(Store, [{
    key: 'getAsync',
    value: function getAsync(key, callback) {
      var data = this.data;

      var value = data[key];
      if (func(value)) {
        var $pending = value.$pending;

        if (!$pending) {
          $pending = value.$pending = [callback];
          value(function (replacement) {
            delete value.$pending;
            data[key] = replacement;
            each($pending, function (callback) {
              callback(replacement);
            });
          });
        } else {
          push($pending, callback);
        }
      } else {
        callback(value);
      }
    }

    /**
     * 同步取值
     *
     * @param {string} key
     * @return {*}
     */

  }, {
    key: 'get',
    value: function get$$1(key) {
      return this.data[key];
    }
  }, {
    key: 'set',
    value: function set$$1(key, value) {
      var data = this.data;

      if (object(key)) {
        each$1(key, function (value, key) {
          data[key] = value;
        });
      } else if (string(key)) {
        data[key] = value;
      }
    }
  }]);
  return Store;
}();

// 支持异步注册


var supportRegisterAsync = ['component'];

// 解析注册参数
function parseRegisterArguments(type, args) {
  var id = args[0];
  var value = args[1];
  var callback = void 0;
  if (has(supportRegisterAsync, type) && func(value)) {
    callback = value;
    value = UNDEFINED;
  }
  return {
    callback: callback,
    args: value === UNDEFINED ? [id] : [id, value]
  };
}

/**
 * 全局/本地注册
 *
 * @param {Object|string} id
 * @param {?Object} value
 */
each(merge(supportRegisterAsync, ['directive', 'partial', 'filter']), function (type) {
  prototype[type] = function () {
    var prop = '$' + type + 's';
    var store = this[prop] || (this[prop] = new Store());

    var _parseRegisterArgumen = parseRegisterArguments(type, arguments),
        args = _parseRegisterArgumen.args,
        callback = _parseRegisterArgumen.callback;

    return magic({
      args: args,
      get: function get$$1(id) {
        if (callback) {
          store.getAsync(id, function (value) {
            if (value) {
              callback(value);
            } else {
              Yox[type](id, callback);
            }
          });
        } else {
          return store.get(id) || Yox[type](id);
        }
      },
      set: function set$$1(id, value) {
        store.set(id, value);
      }
    });
  };
  Yox[type] = function () {
    var store = registry[type] || (registry[type] = new Store());

    var _parseRegisterArgumen2 = parseRegisterArguments(type, arguments),
        args = _parseRegisterArgumen2.args,
        callback = _parseRegisterArgumen2.callback;

    return magic({
      args: args,
      get: function get$$1(id) {
        if (callback) {
          store.getAsync(id, callback);
        } else {
          return store.get(id);
        }
      },
      set: function set$$1(id, value) {
        store.set(id, value);
      }
    });
  };
});

/**
 * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
 *
 * @param {Function} fn
 */
Yox.nextTick = function (fn) {
  fn.i = 1;
  append(fn);
};

/**
 * 编译模板，暴露出来是为了打包阶段的模板预编译
 *
 * @param {string} template
 * @return {Object}
 */
Yox.compile = function (template) {
  return compile(template)[0];
};

/**
 * 验证 props
 *
 * @param {Object} props 传递的数据
 * @param {Object} propTypes 数据格式
 * @return {Object} 验证通过的数据
 */
Yox.validate = function (props, propTypes) {
  var result = {};
  each$1(propTypes, function (rule, key) {
    var type = rule.type,
        value = rule.value,
        required = rule.required;


    required = required === TRUE || func(required) && required(props);

    if (has$1(props, key)) {
      // 如果不写 type 或 type 不是 字符串 或 数组
      // 就当做此规则无效，和没写一样
      if (type) {
        var target = props[key],
            matched = void 0;
        // 比较类型
        if (!falsy$1(type)) {
          matched = is(target, type);
        } else if (!falsy(type)) {
          each(type, function (t) {
            if (is(target, t)) {
              matched = TRUE;
              return FALSE;
            }
          });
        } else if (func(type)) {
          // 有时候做判断需要参考其他数据
          // 比如当 a 有值时，b 可以为空之类的
          matched = type(target, props);
        }
        if (matched === TRUE) {
          result[key] = target;
        } else {
          warn('"' + key + '" prop\'s type is not matched.');
        }
      }
    } else if (required) {
      warn('"' + key + '" prop is not found.');
    } else if (has$1(rule, 'value')) {
      result[key] = func(value) ? value(props) : value;
    }
  });
  return result;
};

/**
 * 安装插件
 *
 * 插件必须暴露 install 方法
 *
 * @param {Object} plugin
 */
Yox.use = function (plugin) {
  plugin.install(Yox);
};

function magic(options) {
  var args = options.args,
      get$$1 = options.get,
      set$$1 = options.set;

  args = toArray$1(args);

  var key = args[0],
      value = args[1];
  if (object(key)) {
    execute(set$$1, NULL, key);
  } else if (string(key)) {
    var _args = args,
        length = _args.length;

    if (length === 2) {
      execute(set$$1, NULL, args);
    } else if (length === 1) {
      return execute(get$$1, NULL, key);
    }
  }
}

// 全局注册内置指令
Yox.directive({ ref: ref, event: bindEvent, model: model });

return Yox;

})));
