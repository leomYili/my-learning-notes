(function(global,factory){
  "use strict";

  factory(global);
})(window,function(window,noGlobal){
  "use strict";

  var jQuery = function(selector,context){
    return new jQuery.init(selector,context);
  };

  jQuery.init=function(){
    return jQuery;
  };

  jQuery.fn = jQuery.prototype = {
    jquery: 'v3.1',
    constructor:jQuery,
    length:0
  };

  // 扩展插件接口,得益于this，extend是直接扩展在jQuery本身上的，而fn.extend是扩展在jQuery.prototype原型对象上。
  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {}, //常见用法jQuery.extend(obj1,obj2),
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") { //如果第一个参数为true，即jQuery.extend(true,obj1,obj2);的情况
      deep = target;//

      // Skip the boolean and the target
      target = arguments[i] || {};// target改为obj2
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    // 处理情况下当目标是一个字符串或者一些(可能在深复制)
    if (typeof target !== "object" && !jQuery.isFunction(target)) { // 处理奇怪的情况，比如 jQuery.extend( 'hello' , {nick: 'casper})~~
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    // 处理这种情况 jQuery.extend(obj)，或 jQuery.fn.extend( obj )
    // 如果没有指定要继承能力的对象，则扩展到自身
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
          if (target === copy) {// 防止自引用
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
            target[name] = jQuery.extend(deep, clone, copy);// 递归

            // Don't bring in undefined values
          } else if (copy !== undefined) { // 浅拷贝，且属性值不为undefined
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  //静态方法
  jQuery.extend({
    isReady:true
  });

  //动态方法。也就是当jQuery实例化时才能使用
  jQuery.fn.extend({
    isReady:false
  })

  if (!noGlobal) {
    window.$ = window.jQuery = jQuery;
  }

  return jQuery;
});
