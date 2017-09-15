(function(global, factory) {
  "use strict";

  factory(global);
})(window, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var getProto = Object.getPrototypeof;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};

  function DOMEval(code, doc) {
    doc = doc || document;

    var script = doc.createElement("script");

    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
      type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }

  var version = "3.1.1",
    jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context)
    },
    fcamelCase = function(all, letter) {
      return letter.toUpperCase();
    };

  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    length: 0,

    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      if (num == null) {
        return slice.call(this);
      }

      return num < 0 ? this[num + this.length] : this[num];
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);

      ret.prevObject = this;

      return ret;
    },
    each: function() {
      return jQuery.each(this, callback);
    },
    map: function() {},
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {},
    last: function() {},
    eq: function(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    makeArray: function(arr, results) {
      var ret = results || [];

      if (arr != null) {
        console.debug(typeof isArrayLike);
        if (isArrayLike(Object(arr))) {
          this.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;

      return first;
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQuery.fn.init = function(selector, context, root) {
      var match, elem;

      if (!selector) {
        return this;
      }

      root = root || rootjQuery;

      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }

        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;

            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }

            return this;
          }
        } else if (!context || context.jquery) {
          return (context || root).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
      }

      return jQuery.fn.makeArray(selector, this);
    };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);

  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    if (typeof target === "boolean") {
      deep = target;

      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    };

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) { // 比如 jQuery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...

        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) { // 防止自引用
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          // // 如果是深拷贝，且被拷贝的属性值本身是个对象
          if (deep && copy && (jQuery.isPlainObject(copy) ||
              (copyIsArray = jQuery.isArray(copy)))) {

            //如果被拷贝的属性值是个数组
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];

            } else { //被拷贝的属性值是个plainObject，比如{ nick: 'casper' }
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy); // 递归

            // Don't bring in undefined values
          } else if (copy !== undefined) { // 浅拷贝，且属性值不为undefined
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  //jQuery的静态方法
  jQuery.extend({

    // Unique for each copy of jQuery on the page
    // 在全局设置唯一键
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

    // Assume jQuery is ready without the ready module
    isReady: true,

    //控制台报出错误信息
    error: function(msg) {
      throw new Error(msg);
    },

    //一个已定义的空函数
    noop: function() {},

    //判断是否是一个函数
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },

    //原生方法，判断是否是一个数组
    isArray: Array.isArray,

    //判断对象是否是window
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },

    //字符型数字或数字类型
    isNumeric: function(obj) {

      // As of jQuery 3.0, isNumeric is limited to
      // strings and numbers (primitives or objects)
      // that can be coerced to finite numbers (gh-2662)
      var type = jQuery.type(obj);
      return (type === "number" || type === "string") &&

        // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj));
    },

    //字面量对象
    isPlainObject: function(obj) {
      var proto, Ctor;

      // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj);

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      // 对于一些特殊的值的栏截，比如null
      if (!proto) {
        return true;
      }

      // Objects with prototype are plain iff they were constructed by a global Object function
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },

    //非空对象
    isEmptyObject: function(obj) {

      /* eslint-disable no-unused-vars */
      // See https://github.com/eslint/eslint/issues/6125
      var name;

      for (name in obj) {
        return false;
      }
      return true;
    },

    //判断类型
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }

      // Support: Android <=2.3 only (functionish RegExp)
      return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
    },

    // Evaluates a script in a global context
    // 全局的外部脚本
    globalEval: function(code) {
      DOMEval(code);
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE <=9 - 11, Edge 12 - 13
    // Microsoft forgot to hump their vendor prefix (#9572)
    // css前缀替换
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },

    //返回dom节点的nodeName
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },

    //循环方法
    each: function(obj, callback) {
      var length, i = 0;

      //类数组
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          //高质量代码，实质在每次判断时，就执行了回调，且返回了index和该项
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },

    // Support: Android <=4.0 only
    // 去掉字符串开头和结尾的空格
    trim: function(text) {
      return text == null ?
        "" :
        (text + "").replace(rtrim, "");
    },

    // results is for internal usage only
    // 结果仅供内部使用
    makeArray: function(arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret,
            typeof arr === "string" ?
            [arr] : arr
          );
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },

    // 确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。参数的i是指定从下标几开始
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },

    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    // 将两个数组简单组合在一起，从first最后一位开始计数
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;

      return first;
    },

    // 使用过滤函数过滤数组元素。
    // 此函数至少传递两个参数：待过滤数组和过滤函数。过滤函数必须返回 true 以保留元素或 false 以删除元素。
    grep: function(elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;

      // Go through the array, only saving the items
      // that pass the validator function
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },

    // arg is for internal usage only
    // 将一个数组中的元素转换到另一个数组中。
    // 作为参数的转换函数会为每个数组元素调用，而且会给这个转换函数传递一个表示被转换的元素作为参数。转换函数可以返回转换后的值、null（删除数组中的项目）或一个包含值的数组，并扩展至原始数组中。
    map: function(elems, callback, arg) {
      var length, value,
        i = 0,
        ret = [];

      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }

        // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      }

      // Flatten any nested arrays
      return concat.apply([], ret);
    },

    // A global GUID counter for objects
    // 全局guid技数对象
    guid: 1,

    // Bind a function to a context, optionally partially applying any
    // arguments.
    // 将函数绑定到一个上下文
    // jQuery 1.4 新增。返回一个新函数，并且这个函数始终保持了特定的作用域。
    // 当有事件处理函数要附加到元素上，但他们的作用域实际是指向另一个对象时，这个方法最有用了。此外，最妙的是，jQuery能够确保即便你绑定的函数是经过jQuery.proxy()处理过的函数，你依然可以传递原先的函数来准确无误地取消绑定。请参考下面的例子。
    // 这个函数还有另一种用法，jQuery.proxy( scope, name )。第一个参数是要设定的作用域对象。第二个参数是将要设置作用域的函数名（必须是第一个作用域对象的一个属性）。
    proxy: function(fn, context) {
      var tmp, args, proxy;

      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }

      // Quick check to determine if target is callable, in the spec
      // this throws a TypeError, but we will just return undefined.
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }

      // Simulated bind
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };

      // Set the guid of unique handler to the same of original handler, so it can be removed
      // 设置独特的处理程序相同的guid原始处理程序,所以它可以被删除
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;

      return proxy;
    },

    // time 与new Date().getTime() 相等
    now: Date.now,

    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  // Symbol方法
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }

  // Populate the class2type map
  // 这里jQuery自己把所有数据类型都归总并放入class2Type的对应键值中，与上面定义好的type相配合使用
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
    function(i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    });

  // 在类数组判断中，这里没有只使用上面的type来判定
  function isArrayLike(obj) {

    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    // 可以支持ios8.2，用‘in’防止JIT错误，关于节点列表长度在IE中
    var length = !!obj && "length" in obj && obj.length,
      type = jQuery.type(obj);

    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
  }

  if (!noGlobal) {
    window.$ = window.jQuery = jQuery;
  }

  return jQuery;
});
