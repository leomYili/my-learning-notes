(function(undefined) {
    /**
     * 去掉字符串首尾的空格
     * @type {[prototype]}
     */
    if (String.prototype.trim === undefined)
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "");
        };

    /**
     * 对于数组的累加值计算
     * @param  {[type]} fun [description]
     * @return {[number]}     [返回累加值]
     */
    if (Array.prototype.reduce === undefined)
        Array.prototype.reduce = function(fun) {
            if (this === void 0 || this === null) throw new TypeError();
            var t = Object(this),
                len = t.length >>> 0,
                k = 0,
                accumulator;
            if (typeof fun != "function") throw new TypeError();
            if (len == 0 && arguments.length == 1) throw new TypeError();
            //取初始值
            if (arguments.length >= 2)
                accumulator = arguments[1]; //如果参数长度大于2个，则将第二个参数作为初始值
            else
                do {
                    if (k in t) {
                        accumulator = t[k++]; //否则将数组的第一条数据作为初绍值
                        break;
                    }
                    if (++k >= len) throw new TypeError(); //什么情况下会执行到这里来？？？
                } while (true);
            //遍历数组，将前一次的结果传入处理函数进行累计处理
            while (k < len) {
                if (k in t)
                    accumulator = fun.call(undefined, accumulator, t[k], k, t);
                k++;
            }
            return accumulator;
        };
})();
/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

/**
 * zepto在实现过程中有一个Zepto的全局对象，该变量保存了所有信息，可以看到其返回的是一个初始化的函数，而不是一个new的实例
 */
var Zepto = (function() {
    var undefined,
        key,
        $,
        classList,
        emptyArray = [],
        slice = emptyArray.slice,
        filter = emptyArray.filter,
        document = window.document,
        elementDisplay = {}, //节点display本地缓存
        classCache = {},
        //设置CSS时，不用加px单位的属性
        cssNumber = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        //HTML代码片段的正则
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        //匹配是否是同一闭合标签
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        //匹配非单独一个闭合标签的标签，类似将<div></div>写成了<div/>
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        //根节点
        rootNodeRE = /^(?:body|html)$/i,
        //匹配大写英文字母
        capitalRE = /([A-Z])/g,
        // 使用attributes属性时一些特殊属性定义，如果匹配使用nodes[key](value)而不是attr来设置dom对象属性（需要提供get和set的方法名）
        methodAttributes = [
            "val",
            "css",
            "html",
            "text",
            "data",
            "width",
            "height",
            "offset"
        ],
        // 直接插入文档信息的操作名定义（相邻节点的一些操作）
        adjacencyOperators = ["after", "prepend", "before", "append"],
        //table定义
        table = document.createElement("table"),
        tableRow = document.createElement("tr"),
        //这里的用途是当需要给tr,tbody,thead,tfoot,td,th设置innerHTMl的时候，需要用其父元素作为容器来装载HTML字符串
        containers = {
            tr: document.createElement("tbody"),
            tbody: table,
            thead: table,
            tfoot: table,
            td: tableRow,
            th: tableRow,
            "*": document.createElement("div")
        },
        //当DOM ready的时候，document会有以下三种状态的一种
        readyRE = /complete|loaded|interactive/,
        //dom选择器正则，需组合使用 ？
        simpleSelectorRE = /^[\w-]*$/,
        class2type = {},
        toString = class2type.toString,
        //定义内部全局变量zepto
        zepto = {},
        camelize,
        uniq,
        tempParent = document.createElement("div"),
        //新增属性
        propMap = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        //数组的判断
        isArray =
            Array.isArray ||
            function(object) {
                return object instanceof Array;
            };

    //判断一个元素是否匹配给定的选择器
    zepto.matches = function(element, selector) {
        //element节点的nodeType值必然为1
        if (!selector || !element || element.nodeType !== 1) return false;
        //引用浏览器提供的MatchesSelector方法
        var matchesSelector =
            element.webkitMatchesSelector ||
            element.mozMatchesSelector ||
            element.oMatchesSelector ||
            element.matchesSelector;
        if (matchesSelector) return matchesSelector.call(element, selector);
        //如果浏览器不支持MatchesSelector方法，则将节点放入一个临时div节点，
        //再通过selector来查找这个div下的节点集，再判断给定的element是否在节点集中，如果在，则返回一个非零(即非false)的数字
        // fall back to performing a selector:
        var match,
            parent = element.parentNode,
            temp = !parent;
        //当element没有父节点，那么将其插入到一个临时的div里面
        if (temp) (parent = tempParent).appendChild(element);
        //将parent作为上下文，来查找selector的匹配结果，并获取element在结果集的索引，不存在时为－1,再通过~-1转成0，存在时返回一个非零的值
        match = ~zepto.qsa(parent, selector).indexOf(element);
        //将插入的节点删掉
        temp && tempParent.removeChild(element);
        return match;
    };

    /**
     * 获取对象类型
     * @param  {obj} obj [对象]
     * @return {[obj]}     [返回对象或者null或者undefined]
     */
    function type(obj) {
        return obj == null
            ? String(obj)
            : class2type[toString.call(obj)] || "object";
    }

    /**
     * 判断是否为fun
     * @param  {[func]}  value [description]
     * @return {Boolean}       [description]
     */
    function isFunction(value) {
        return type(value) == "function";
    }

    /**
     * 判断变量是否为window
     * @param  {[obj]}  obj [变量]
     * @return {Boolean}     [是否为window]
     */
    function isWindow(obj) {
        return obj != null && obj == obj.window;
    }

    /**
     * 判断变量是否为document
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isDocument(obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    }

    /**
     * 使用上面的type函数，判断变量是否为obj
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isObject(obj) {
        return type(obj) == "object";
    }

    /**
     * 对于通过字面量定义的对象和new Object的对象返回true，new Object时传参数的返回false
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isPlainObject(obj) {
        return (
            isObject(obj) &&
            !isWindow(obj) &&
            Object.getPrototypeOf(obj) == Object.prototype
        );
    }

    /**
     * 类数组，比如nodeList，这个只是做最简单的判断，如果给一个对象定义一个值为数据的length属性，它同样会返回true
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function likeArray(obj) {
        return typeof obj.length == "number";
    }

    /**
     * 清除给定的参数中的null或undefined，注意0==null,'' == null为false
     * @param  {[type]} array [description]
     * @return {[type]}       [description]
     */
    function compact(array) {
        return filter.call(array, function(item) {
            return item != null;
        });
    }

    /**
     * 类似得到一个数组的副本
     * @param  {[type]} array [description]
     * @return {[type]}       [description]
     */
    function flatten(array) {
        return array.length > 0 ? $.fn.concat.apply([], array) : array;
    }

    /**
     * 将字符串转成驼峰式的格式
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    camelize = function(str) {
        return str.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : "";
        });
    };

    /**
     * 将字符串格式化成-拼接的形式,一般用在样式属性上，比如border-width，防止属性大写找不到css属性
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    function dasherize(str) {
        return str
            .replace(/::/g, "/") //将：：替换成/
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2") //在大小写字符之间插入_,大写在前，比如AAAbb,得到AA_Abb
            .replace(/([a-z\d])([A-Z])/g, "$1_$2") //在大小写字符之间插入_,小写或数字在前，比如bbbAaa,得到bbb_Aaa
            .replace(/_/g, "-") //将_替换成-
            .toLowerCase(); //转成小写
    }
    /**
     * 数组去重，如果该条数据在数组中的位置与循环的索引值不相同，则说明数组中有与其相同的值
     * @param  {[type]} array [description]
     * @return {[type]}       [description]
     */
    uniq = function(array) {
        return filter.call(array, function(item, idx) {
            return array.indexOf(item) == idx;
        });
    };

    /**
     * 将给定的参数生成正则
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function classRE(name) {
        return name in classCache
            ? classCache[name]
            : (classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)"));
    }

    /**
     * 给需要的样式值后面加上'px'单位，除了cssNumber里面的指定的那些，对样式值的判断
     * @param  {[type]} name  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function maybeAddPx(name, value) {
        return typeof value == "number" && !cssNumber[dasherize(name)]
            ? value + "px"
            : value;
    }

    /**
     * 获取节点的默认display属性
     * @param  {[type]} nodeName [description]
     * @return {[type]}          [description]
     */
    function defaultDisplay(nodeName) {
        var element, display;
        if (!elementDisplay[nodeName]) {
            //其上部定义的elementDisplay缓存里是否有这个节点值
            element = document.createElement(nodeName);
            document.body.appendChild(element);
            display = getComputedStyle(element, "").getPropertyValue("display");
            element.parentNode.removeChild(element);
            display == "none" && (display = "block"); //当display为none时，设置其为block；起调试作用的？默认全部显示
            elementDisplay[nodeName] = display; //缓存
        }
        return elementDisplay[nodeName];
    }

    /**
     * 获取指定元素的子节点，并对兼容性做了调整，分别从children和childNodes中获取子节点
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    function children(element) {
        return "children" in element
            ? slice.call(element.children)
            : $.map(element.childNodes, function(node) {
                  if (node.nodeType == 1) return node;
              });
    }

    // `$.zepto.fragment` takes a html string and an optional tag name
    // to generate DOM nodes nodes from the given html string.
    // The generated DOM nodes are returned as an array.
    // This function can be overriden in plugins for example to make
    // it compatible with browsers that don't support the DOM fully.
    // params:html字符串，寻找到的name，还有上下文
    zepto.fragment = function(html, name, properties) {
        var dom, nodes, container;

        // A special case optimization for a single tag
        // RegExp.$1:获取最近一次匹配的标签
        if (singleTagRE.test(html)) {
            dom = $(document.createElement(RegExp.$1));
            console.debug(dom);
        }
        if (!dom) {
            //html字符串标签闭合修复
            if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
            //给name取标签名
            if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
            //设置容器标签名，如果不是tr,tbody,thead,tfoot,td,th，则容器标签名为div
            if (!(name in containers)) name = "*";

            container = containers[name];
            container.innerHTML = "" + html;
            //在操作完container之后，对其进行遍历，把找到的元素给dom之后，再清除自己的children
            dom = $.each(slice.call(container.childNodes), function() {
                container.removeChild(this);
            });
        }
        //如果properties是对象, 则将其当作属性来给添加进来的节点进行设置
        if (isPlainObject(properties)) {
            nodes = $(dom); //将dom转成zepto对象，为了方便下面调用zepto上的方法
            $.each(properties, function(key, value) {
                //如果设置的是'val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'，则调用zepto上相对应的方法，否则就attr新的属性
                if (methodAttributes.indexOf(key) > -1) nodes[key](value);
                else nodes.attr(key, value);
            });
        }

        return dom;
    };

    // `$.zepto.Z` swaps out the prototype of the given `dom` array
    // of nodes with `$.fn` and thus supplying all the Zepto functions
    // to the array. Note that `__proto__` is not supported on Internet
    // Explorer. This method can be overriden in plugins.
    zepto.Z = function(dom, selector) {
        dom = dom || [];
        dom.__proto__ = $.fn; //通过给dom设置__proto__属性指向$.fn来达到继承$.fn上所有方法的目的
        dom.selector = selector || "";
        return dom;
    };

    // `$.zepto.isZ` should return `true` if the given object is a Zepto
    // collection. This method can be overriden in plugins.
    /**
     * 判断给定的参数是否是Zepto集
     * @param  {[type]}  object [description]
     * @return {Boolean}        [description]
     */
    zepto.isZ = function(object) {
        return object instanceof zepto.Z;
    };

    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
    // takes a CSS selector and an optional context (and handles various
    // special cases).
    // This method can be overriden in plugins.
    zepto.init = function(selector, context) {
        var dom;

        // If nothing given, return an empty Zepto collection
        if (!selector) return zepto.Z();
        else if (typeof selector == "string") {
            //没有参数，返回空数组
            // Optimize for string selectors
            // 如果selector是个string
            // 保证字符串的纯字符性
            selector = selector.trim();
            // If it's a html fragment, create nodes from it
            // Note: In both Chrome 21 and Firefox 15, DOM error 12
            // is thrown if the fragment doesn't begin with <
            // 如果字符串符合一个html标签的闭合条件
            if (selector[0] == "<" && fragmentRE.test(selector)) {
                (dom = zepto.fragment(selector, RegExp.$1, context)),
                    (selector = null); //得到这个dom的集合，并把selector手动重置
            } else if (context !== undefined)
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                //如果存在上下文context，则在上下文中查找selector，此时的selector为普通的CSS选择器
                return $(context).find(selector);
            else
                // If it's a CSS selector, use it to select nodes.
                // 通过css选择器方法qsa来查找dom
                dom = zepto.qsa(document, selector);
        } else if (isFunction(selector))
            // If a function is given, call it when the DOM is ready
            // 如果selector是个函数，则在DOM ready的时候执行它
            return $(document).ready(selector);
        else if (zepto.isZ(selector))
            // If a Zepto collection is given, just return it
            // 如果selector是一个zepto.Z实例，则直接返回它自己
            return selector;
        else {
            // normalize array if an array of nodes is given
            // 如果selector是一个数组，则将其里面的null,undefined去掉;compact函数
            if (isArray(selector)) {
                dom = compact(selector);
            } else if (isObject(selector))
                // Wrap DOM nodes.
                // 如果selector是个对象，注意DOM节点的typeof值也是object，在内部直接缓存，并解除selector的引用
                //直接放到数组中
                (dom = [selector]), (selector = null);
            else if (fragmentRE.test(selector))
                // If it's a html fragment, create nodes from it
                // 如果selector是一个HTML代码片段，就将其转成dom节点
                (dom = zepto.fragment(selector.trim(), RegExp.$1, context)),
                    (selector = null);
            else if (context !== undefined)
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                // 如果存在上下文context，则在上下文中查找selector，此时的selector为普通的CSS选择器
                return $(context).find(selector);
            else
                // And last but no least, if it's a CSS selector, use it to select nodes.
                // 如果没有给定上下文，则在document中查找selector，此时的selector为普通的CSS选择器，qsa方法
                dom = zepto.qsa(document, selector);
        }
        // create a new Zepto collection from the nodes found
        // 返回一个zepto的集合
        return zepto.Z(dom, selector);
    };

    // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
    /**
     * 每一次的$其实质是使用了zpeto.init的方法
     * @param  {[type]} selector [description]
     * @param  {[type]} context  [description]
     * @return {[type]}          [description]
     */
    $ = function(selector, context) {
        return zepto.init(selector, context);
    };
    /**
     * 扩展，deep表示是否深度扩展
     * @param  {[type]} target [description]
     * @param  {[type]} source [description]
     * @param  {[type]} deep   [description]
     * @return {[type]}        [description]
     */
    function extend(target, source, deep) {
        //如果深度扩展
        for (key in source)
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                //如果要扩展的数据是对象且target相对应的key不是对象
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {};
                //如果要扩展的数据是数组且target相对应的key不是数组
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = [];
                extend(target[key], source[key], deep);
            } else if (source[key] !== undefined) target[key] = source[key]; //否则直接用source的值浅扩展至target中（简单复制）
    }

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    // 对外的extend方法，实质上用的是上面的extend
    $.extend = function(target) {
        var deep,
            args = slice.call(arguments, 1);
        //当第一个参数为boolean类型的值时，表示是否深度扩展
        if (typeof target == "boolean") {
            deep = target;
            target = args.shift(); //target取第二个参数
        }
        //遍历后面的参数，全部扩展到target上
        args.forEach(function(arg) {
            extend(target, arg, deep);
        });
        return target;
    };

    // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overriden in plugins.
    // css选择器
    zepto.qsa = function(element, selector) {
        var found,
            maybeID = selector[0] == "#",
            maybeClass = !maybeID && selector[0] == ".",
            nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked 判断是id还是class
            //判断是否为合法dom
            isSimple = simpleSelectorRE.test(nameOnly);
        //当element为document,且selector为ID选择器时
        return isDocument(element) && isSimple && maybeID
            ? //直接返回document.getElementById,nameOnly为ID的值,当没有找节点时返回[]
              (found = element.getElementById(nameOnly)) ? [found] : []
            : //当element不为元素节点或者document时，返回[]
              element.nodeType !== 1 && element.nodeType !== 9
                ? []
                : //否则将获取到的结果转成数组并返回
                  slice.call(
                      isSimple && !maybeID
                          ? maybeClass
                              ? element.getElementsByClassName(nameOnly) // If it's simple, it could be a class 如果selector是class名,直接调用getElementsByClassName
                              : element.getElementsByTagName(selector) // Or a tag 否则调用getElementsByTagName，获取标签名的element元素
                          : element.querySelectorAll(selector) // Or it's not simple, and we need to query all 都不是再通过querySelectorAll获取元素集合
                  );
    };

    /**
     * 在结果中进行过滤,使用了$.fn扩展中的函数，返回一个zepto对象
     * @param  {[type]} nodes    [description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    function filtered(nodes, selector) {
        return selector == null ? $(nodes) : $(nodes).filter(selector);
    }

    /**
     * 判断parent是否包含node
     * @type {[type]}
     */
    $.contains = document.documentElement.contains
        ? function(parent, node) {
              return parent !== node && parent.contains(node);
          }
        : function(parent, node) {
              while (node && (node = node.parentNode))
                  if (node === parent) return true; //如果parent就是node。新加的一种条件
              return false;
          };

    /**
     * 处理arg为函数或者值的情况
     * @param  {[type]} context [description]
     * @param  {[type]} arg     [description]
     * @param  {[type]} idx     [description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
     */
    function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }

    /**
     * 设置attr值时做个判断：如果设置的值为null或undefined,则相当于删除该属性，否则设置name属性为value（?）
     * @param {[type]} node  [description]
     * @param {[type]} name  [description]
     * @param {[type]} value [description]
     */
    function setAttribute(node, name, value) {
        value == null
            ? node.removeAttribute(name)
            : node.setAttribute(name, value);
    }

    // access className property while respecting SVGAnimatedString
    /**
     * 对于svg元素的classname的处理
     * @param  {[type]} node  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function className(node, value) {
        var klass = node.className || "",
            svg = klass && klass.baseVal !== undefined;

        if (value === undefined) return svg ? klass.baseVal : klass;
        svg ? (klass.baseVal = value) : (node.className = value);
    }

    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // "08"    => "08"
    // JSON    => parse if valid
    // String  => self
    /**
     * 值的简单处理
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function deserializeValue(value) {
        try {
            return value
                ? value == "true" ||
                      (value == "false"
                          ? false
                          : value == "null"
                              ? null
                              : +value + "" == value
                                  ? +value
                                  : /^[\[\{]/.test(value)
                                      ? $.parseJSON(value)
                                      : value)
                : value;
        } catch (e) {
            return value;
        }
    }

    /**
     * 函数公共出去，可以直接通过window下的$对象直接使用
     * @type {[type]}
     */
    $.type = type;
    $.isFunction = isFunction;
    $.isWindow = isWindow;
    $.isArray = isArray;
    $.isPlainObject = isPlainObject;

    /**
     * 判断是否为空对象
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    $.isEmptyObject = function(obj) {
        var name;
        for (name in obj) return false;
        return true;
    };

    /**
     * 获取指定的值在数组中的位置，查找数组元素方法
     * @param  {[type]} elem  [description]
     * @param  {[type]} array [description]
     * @param  {[type]} i     [description]
     * @return {[type]}       [description]
     */
    $.inArray = function(elem, array, i) {
        return emptyArray.indexOf.call(array, elem, i);
    };

    //将字符串转成驼峰式的格式
    $.camelCase = camelize;

    //去字符串头尾空格，第一行的String.trim方法
    $.trim = function(str) {
        return str == null ? "" : String.prototype.trim.call(str);
    };

    // plugin compatibility
    $.uuid = 0;
    $.support = {};
    $.expr = {};

    /**
     * 遍历elements，将每条记录放入callback里进行处理，保存处理函数返回值不为null或undefined的结果
     * 注意这里没有统一的用for in,是为了避免遍历数据默认属性的情况，如数组的toString,valueOf
     * @param  {[type]}   elements [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    $.map = function(elements, callback) {
        var value,
            values = [],
            i,
            key;
        //如果被遍历的数据是数组或者nodeList
        if (likeArray(elements))
            for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i);
                if (value != null) values.push(value);
            }
        else
            //如果是对象
            for (key in elements) {
                value = callback(elements[key], key);
                if (value != null) values.push(value);
            }
        return flatten(values); //得到数组的一个副本
    };

    /**
     * 遍历数组，将每条数据作为callback的上下文，并传入数据以及数据的索引进行处理，如果其中一条数据的处理结果明确返回false，则停止遍历，并返回elements
     * @param  {[type]}   elements [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    $.each = function(elements, callback) {
        var i, key;
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++)
                //实际上出现值为false时，返回reture true,一样中断函数
                if (callback.call(elements[i], i, elements[i]) === false)
                    return elements;
        } else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false)
                    return elements;
        }

        return elements;
    };

    /**
     * 过滤
     * @param  {[type]}   elements [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    $.grep = function(elements, callback) {
        return filter.call(elements, callback);
    };

    /**
     * 判断是否直接支持JSON对象，将parse方法赋给parseJSON
     * @type {[type]}
     */
    if (window.JSON) $.parseJSON = JSON.parse;

    // Populate the class2type map
    /**
     * 填充class2type的值，里面的所有值都是小写
     * @param  {[type]} i     [description]
     * @param  {[type]} name) {               class2type["[object " + name + "]"] [description]
     * @return {[type]}       [description]
     */
    $.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
            " "
        ),
        function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        }
    );

    // Define methods that will be available on all
    // Zepto collections
    /**
     * 这里的扩展与zepto.Z.prototype指向的是同一空间，相当于对Z的原型链的扩展，在之前说过给dom设置__proto__属性指向$.fn来达到继承$.fn上所有方法的目的
     * @type {Object}
     */
    $.fn = {
        // Because a collection acts like an array
        // copy over these useful array functions.
        // 首先是原生javaScript的array自带的一些功能函数的调用
        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        sort: emptyArray.sort,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,

        // `map` and `slice` in the jQuery API work differently
        // from their array counterparts
        // 使用了与jQuery不一样的map方法，和slice方法，(jQuery的slice有特殊处理？)
        map: function(fn) {
            return $(
                $.map(this, function(el, i) {
                    return fn.call(el, i, el);
                })
            );
        },
        slice: function() {
            return $(slice.apply(this, arguments));
        },

        /**
         * DOM 加载就绪之后的callback
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        ready: function(callback) {
            // need to check if document.body exists for IE as that browser reports
            // document ready when it hasn't yet created the body element
            // 先通过对document.readyState的正则判断一下，是否加载完；如果没有，则对DOMContentLoaded进行监听，回调里，再返回callback
            if (readyRE.test(document.readyState) && document.body) callback($);
            else
                document.addEventListener(
                    "DOMContentLoaded",
                    function() {
                        callback($);
                    },
                    false
                );
            return this;
        },
        /**
         * 取集合中对应指定索引的值，如果idx小于0,则idx等于idx+length,length为集合的长度，如果没有idx值，将其通过call直接转为数组
         * @param  {[type]} idx [description]
         * @return {[type]}     [description]
         */
        get: function(idx) {
            return idx === undefined
                ? slice.call(this)
                : this[idx >= 0 ? idx : idx + this.length];
        },
        /**
         * 将集合转换为数组
         * @return {[type]} [description]
         */
        toArray: function() {
            return this.get();
        },
        /**
         * 获取集合长度
         * @return {[type]} [description]
         */
        size: function() {
            return this.length;
        },
        /**
         * 从dom中将该集合删除
         * @return {[type]} [description]
         */
        remove: function() {
            return this.each(function() {
                if (this.parentNode != null) this.parentNode.removeChild(this);
            });
        },
        /**
         * 遍历集合，将集合中的每一项放入callback中进行处理，去掉结果为false的项，注意这里的callback如果明确返回false，那么就会停止循环了 （return false的结果）
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        each: function(callback) {
            emptyArray.every.call(this, function(el, idx) {
                return callback.call(el, idx, el) !== false;
            });
            return this;
        },
        /**
         * 过滤集合，返回处理结果为true的记录
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        filter: function(selector) {
            // this.not(selector)取到需要排除的集合，第二次再取反(这个时候this.not的参数就是一个集合了)，得到想要的集合
            if (isFunction(selector)) return this.not(this.not(selector));
            // filter收集返回结果为true的记录
            return $(
                filter.call(this, function(element) {
                    return zepto.matches(element, selector); //当element与selector匹配，则收集
                })
            );
        },
        /**
         * 将由selector获取到的结果追加到当前集合中
         * @param {[type]} selector [description]
         * @param {[type]} context  [description]
         */
        add: function(selector, context) {
            return $(uniq(this.concat($(selector, context)))); //追加并去重
        },
        /**
         * 返回集合中的第1条记录是否与selector匹配
         * @param  {[type]}  selector [description]
         * @return {Boolean}          [description]
         */
        is: function(selector) {
            return this.length > 0 && zepto.matches(this[0], selector);
        },
        /**
         * 排除集合里满足条件的记录，接收参数为：css选择器，function, dom ,nodeList
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        not: function(selector) {
            var nodes = [];
            //当selector为函数时，safari下的typeof nodeList也是function，所以这里需要再加一个判断selector.call !== undefined
            if (isFunction(selector) && selector.call !== undefined)
                this.each(function(idx) {
                    //注意这里收集的是selector.call(this,idx)返回结果为false的时候记录
                    if (!selector.call(this, idx)) nodes.push(this);
                });
            else {
                //当selector为字符串的时候，对集合进行筛选，也就是筛选出集合中满足selector的记录
                var excludes =
                    typeof selector == "string"
                        ? this.filter(selector)
                        : //当selector为nodeList时执行slice.call(selector),注意这里的isFunction(selector.item)是为了排除selector为数组的情况
                          //当selector为css选择器，执行$(selector)
                          likeArray(selector) && isFunction(selector.item)
                            ? slice.call(selector)
                            : $(selector);
                this.forEach(function(el) {
                    //筛选出不在excludes集合里的记录，达到排除的目的
                    if (excludes.indexOf(el) < 0) nodes.push(el);
                });
            }
            return $(nodes); //由于上面得到的结果是数组，这里需要转成zepto对象，以便继承其它方法，实现链写
        },
        /**
         * 接收node和string作为参数，给当前集合筛选出包含selector的集合
         * isObject(selector)是判断参数是否是node，因为typeof node == 'object'
         * 当参数为node时，只需要判读当前记录里是否包含node节点即可
         * 当参数为string时，则在当前记录里查询selector，如果长度为0，则为false，filter函数就会过滤掉这条记录，否则保存该记录
         * @param  {[type]}  selector [description]
         * @return {Boolean}          [description]
         */
        has: function(selector) {
            return this.filter(function() {
                return isObject(selector)
                    ? $.contains(this, selector)
                    : $(this)
                          .find(selector)
                          .size();
            });
        },
        /**
         * 选择集合中指定索引的记录，当idx为-1时，取最后一个记录
         * @param  {[type]} idx [description]
         * @return {[type]}     [description]
         */
        eq: function(idx) {
            return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
        },
        /**
         * 取集合中的第一条记录
         * @return {[type]} [description]
         */
        first: function() {
            var el = this[0]; //取集合中的第一条记录
            //如果集合中的第一条数据本身就已经是zepto对象则直接返回本身，否则转成zepto对象
            //el && !isObject(el)在这里取到一个判断el是否为节点的情况，因为如果el是节点，那么isObject(el)的结果就是true
            return el && !isObject(el) ? el : $(el);
        },
        /**
         * 取集合中的最后一条记录
         * @return {[type]} [description]
         */
        last: function() {
            var el = this[this.length - 1]; //取集合中的最后一条记录
            return el && !isObject(el) ? el : $(el);
        },
        /**
         * 在当前集合中查找selector，selector可以是集合，选择器，以及节点
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        find: function(selector) {
            var result,
                $this = this;
            if (!selector) result = $();
            else if (typeof selector == "object")
                //如果selector为node或者zepto集合时
                //遍历selector，筛选出父级为集合中记录的selector
                result = $(selector).filter(function() {
                    var node = this;
                    //如果$.contains(parent, node)返回true，则emptyArray.some也会返回true,外层的filter则会收录该条记录
                    return emptyArray.some.call($this, function(parent) {
                        return $.contains(parent, node);
                    });
                });
            else if (this.length == 1)
                //如果当前集合长度为1时，调用zepto.qsa，将结果转成zepto对象
                result = $(zepto.qsa(this[0], selector));
            else
                //如果长度大于1，则调用map遍历,但这样返回的是一个数组
                result = this.map(function() {
                    return zepto.qsa(this, selector);
                });
            return result;
        },
        /**
         * 取集合中第一记录的最近的满足条件的父级元素
         * @param  {[type]} selector [description]
         * @param  {[type]} context  [description]
         * @return {[type]}          [description]
         */
        closest: function(selector, context) {
            var node = this[0],
                collection = false;
            if (typeof selector == "object") collection = $(selector);
            //当selector是node或者zepto集合时，如果node不在collection集合中时需要取node.parentNode进行判断
            //当selector是字符串选择器时，如果node与selector不匹配，则需要取node.parentNode进行判断
            while (
                node &&
                !(collection
                    ? collection.indexOf(node) >= 0
                    : zepto.matches(node, selector))
            )
                //当node 不是context,document的时候，取node.parentNode
                node = node !== context && !isDocument(node) && node.parentNode;
            return $(node);
        },
        /**
         * 取集合所有父级元素
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        parents: function(selector) {
            var ancestors = [],
                nodes = this;
            //通过遍历nodes得到所有父级，注意在while里nodes被重新赋值了
            //本函数的巧妙之处在于，不停在获取父级，再遍历父级获取父级的父级
            //然后再通过去重，得到最终想要的结果，当到达最顶层的父级时，nodes.length就为0了
            while (nodes.length > 0)
                //nodes被重新赋值为收集到的父级集合
                nodes = $.map(nodes, function(node) {
                    //遍历nodes，收集集合的第一层父级
                    //ancestors.indexOf(node) < 0用来去重复
                    if (
                        (node = node.parentNode) &&
                        !isDocument(node) &&
                        ancestors.indexOf(node) < 0
                    ) {
                        ancestors.push(node); //收集已经获取到的父级元素，用于去重复
                        return node;
                    }
                });
            //上面还只是取到了所有的父级元素，这里还需要对其进行筛选从而得到最终想要的结果
            return filtered(ancestors, selector);
        },
        /**
         * 获取集合的直属父节点
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        parent: function(selector) {
            return filtered(uniq(this.pluck("parentNode")), selector);
        },
        /**
         * 获取集合的子节点
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        children: function(selector) {
            return filtered(
                this.map(function() {
                    return children(this);
                }),
                selector
            );
        },
        /**
         * 获得每个匹配元素集合元素的子元素，包括文字和注释节点。
         * contents()和.children()方法类似，只不过前者包括文本节点以及jQuery对象中产生的HTML元素。
         * @return {[type]} [description]
         */
        contents: function() {
            return this.map(function() {
                return slice.call(this.childNodes);
            });
        },
        /**
         * 获取对象集合中所有元素的兄弟节点。如果给定CSS选择器参数，过滤出符合选择器的元素。
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        siblings: function(selector) {
            return filtered(
                this.map(function(i, el) {
                    //先获取该节点的父节点中的所有子节点，再排除本身
                    return filter.call(children(el.parentNode), function(
                        child
                    ) {
                        return child !== el;
                    });
                }),
                selector
            );
        },
        /**
         * 实质是通过innerHTML设置值为''，达到清空html文档的目的
         * @return {[type]} [description]
         */
        empty: function() {
            return this.each(function() {
                this.innerHTML = "";
            });
        },
        // `pluck` is borrowed from Prototype.js
        /**
         * 根据属性来获取当前集合的相关集合
         * @param  {[type]} property [description]
         * @return {[type]}          [description]
         */
        pluck: function(property) {
            return $.map(this, function(el) {
                return el[property];
            });
        },
        /**
         * 元素显示，对于节点的display属性操作
         * @return {[type]} [description]
         */
        show: function() {
            return this.each(function() {
                //清除元素的内联display="none"的样式
                this.style.display == "none" && (this.style.display = "");
                //当样式表里的该元素的display样式为none时，设置它的display为默认值
                if (
                    getComputedStyle(this, "").getPropertyValue("display") ==
                    "none"
                )
                    this.style.display = defaultDisplay(this.nodeName); //defaultDisplay是获取元素默认display的方法
            });
        },
        /**
         * 将要替换的内容插入到被替换的内容前面，然后删除被替换的内容
         * @param  {[type]} newContent [description]
         * @return {[type]}            [description]
         */
        replaceWith: function(newContent) {
            return this.before(newContent).remove();
        },
        /**
         * 在每个匹配的元素外层包上一个html元素
         * @param  {[type]} structure [description]
         * @return {[type]}           [description]
         */
        wrap: function(structure) {
            var func = isFunction(structure);
            if (this[0] && !func)
                //如果structure是字符串，则将其转成DOM
                var dom = $(structure).get(0),
                    //如果structure是已经存在于页面上的节点或者被wrap的记录不只一条，则需要clone dom
                    clone = dom.parentNode || this.length > 1;
            return this.each(function(index) {
                $(this).wrapAll(
                    func
                        ? structure.call(this, index)
                        : clone ? dom.cloneNode(true) : dom
                );
            });
        },
        /**
         * 在所有匹配元素外面包一个单独的结构。结构可以是单个元素或 几个嵌套的元素，并且可以通过在作为HTML字符串或DOM节点。
         * 最关键的其实是before和append，再通过把集合插入到最里层的节点，也就是终点的位置，来wrapAll
         * @param  {[type]} structure [description]
         * @return {[type]}           [description]
         */
        wrapAll: function(structure) {
            if (this[0]) {
                // 将要包裹的内容插入到第一条记录的前面，算是给structure定位起始位置
                $(this[0]).before((structure = $(structure)));
                var children;
                // drill down to the inmost element
                // 取structure里的第一个子节点的最里层
                while ((children = structure.children()).length)
                    structure = children.first();
                // 将当前集合插入到最里层的节点里，达到wrapAll的目的
                $(structure).append(this);
            }
            return this;
        },
        /**
         * 将每个元素中的内容包裹在一个单独的结构中。结构可以是单个元件或多个嵌套元件，并且可以通过在作为HTML字符串或DOM节点，或者是一个生成用来包元素的回调函数，这个函数返回前两种类型的包裹片段。（zepto中文文档）
         * 在匹配元素里的  内容  外包一层结构
         * @param  {[type]} structure [description]
         * @return {[type]}           [description]
         */
        wrapInner: function(structure) {
            var func = isFunction(structure);
            return this.each(function(index) {
                // 原理就是获取节点的内容，然后用structure将内容包起来，如果内容不存在，则直接将structure append到该节点
                var self = $(this),
                    contents = self.contents(),
                    dom = func ? structure.call(this, index) : structure;
                contents.length ? contents.wrapAll(dom) : self.append(dom);
            });
        },
        /**
         * 使用其子元素，替换其父级元素
         * @return {[type]} [description]
         */
        unwrap: function() {
            this.parent().each(function() {
                $(this).replaceWith($(this).children());
            });
            return this;
        },
        /**
         * 复制node节点
         * @return {[type]} [description]
         */
        clone: function() {
            return this.map(function() {
                return this.cloneNode(true);
            });
        },
        /**
         * 隐藏元素，给其css属性的display添加none
         * @return {[type]} [description]
         */
        hide: function() {
            return this.css("display", "none");
        },
        /**
         * 显示或隐藏匹配元素
         * @param  {[type]} setting [description]
         * @return {[type]}         [description]
         */
        toggle: function(setting) {
            return this.each(function() {
                var el = $(this);
                /*
            这个setting取得作用就是控制显示与隐藏，并不切换，当它的值为true时，一直显示，false时，一直隐藏
            这个地方的判断看上去有点绕，其实也简单，意思是说，当不给toogle参数时，根据元素的display是否等于none来决定显示或者隐藏元素
            当给toogle参数，就没有切换效果了，只是简单的根据参数值来决定显示或隐藏。如果参数true,相当于show方法，false则相当于hide方法
        */
                (setting === undefined ? el.css("display") == "none" : setting)
                    ? el.show()
                    : el.hide();
            });
        },
        /**
         * 获取对象集合中每一个元素的前一个兄弟节点，通过选择器来进行过滤。
         * @param  {[type]} selector [description]
         * @return {[type]}          [description]
         */
        prev: function(selector) {
            return $(this.pluck("previousElementSibling")).filter(
                selector || "*"
            );
        },
        /**
         * 获取对象集合中每一个元素的下一个兄弟节点(可以选择性的带上过滤选择器)。
         * @param  {[type]}   selector [description]
         * @return {Function}          [description]
         */
        next: function(selector) {
            return $(this.pluck("nextElementSibling")).filter(selector || "*");
        },
        /**
         * 获取或设置对象集合中元素的HTML内容。当没有给定content参数时，返回对象集合中第一个元素的innerHtml。当给定content参数时，用其替换对象集合中每个元素的内容。content可以是append中描述的所有类型。
         * 当有参数时，设置集合每条记录的HTML，没有参数时，则为获取集合第一条记录的HTML，如果集合的长度为0,则返回null
         * @param  {[type]} html [description]
         * @return {[type]}      [description]
         */
        html: function(html) {
            return 0 in arguments
                ? this.each(function(idx) {
                      var originHtml = this.innerHTML;
                      //如果参数html是字符串直接插入到记录中，
                      //如果是函数，则将当前记录作为上下文，调用该函数，且传入该记录的索引和原始innerHTML作为参数
                      $(this)
                          .empty()
                          .append(funcArg(this, html, idx, originHtml));
                  })
                : 0 in this ? this[0].innerHTML : null; //参数html不存在时，获取集合中第一条记录的html
        },
        /**
         * 设置或获取对象的文本值
         * @param  {[type]} text [description]
         * @return {[type]}      [description]
         */
        text: function(text) {
            //如果不给定text参数，则为获取功能，集合长度大于0时，取第一条数据的textContent，否则返回null,
            //如果给定text参数，则为集合的每一条数据设置textContent为text
            return 0 in arguments
                ? this.each(function(idx) {
                      var newText = funcArg(this, text, idx, this.textContent);
                      this.textContent = newText == null ? "" : "" + newText;
                  })
                : 0 in this ? this[0].textContent : null;
        },
        /**
         * 读取或设置dom的属性。如果没有给定value参数，则读取对象集合中第一个元素的属性值。
         * 当给定了value参数。则设置对象集合中所有元素的该属性的值。
         * 当value参数为null，那么这个属性将被移除(类似removeAttr)，多个属性可以通过对象键值对的方式进行设置。
         * 要读取DOM的属性如 checked和selected, 使用 prop。或者is
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        attr: function(name, value) {
            var result;
            //当只有name且为字符串时，表示获取第一条记录的属性
            return typeof name == "string" && !(1 in arguments)
                ? //集合没有记录或者集合的元素不是node类型，返回undefined
                  !this.length || this[0].nodeType !== 1
                    ? undefined
                    : //注意直接定义在node上的属性，在标准浏览器和ie9,10中用getAttribute取不到,得到的结果是null
                      //比如div.aa = 10,用div.getAttribute('aa')得到的是null,需要用div.aa或者div['aa']这样来取
                      !(result = this[0].getAttribute(name)) && name in this[0]
                        ? this[0][name]
                        : result
                : this.each(function(idx) {
                      if (this.nodeType !== 1) return;
                      //如果name是一个对象，如{'id':'test','value':11},则给数据设置属性
                      if (isObject(name))
                          for (key in name) setAttribute(this, key, name[key]);
                      else
                          //如果name只是一个普通的属性字符串，用funcArg来处理value是值或者function的情况最终返回一个属性值
                          //如果funcArg函数返回的是undefined或者null，则相当于删除元素的属性
                          setAttribute(
                              this,
                              name,
                              funcArg(this, value, idx, this.getAttribute(name))
                          );
                  });
        },
        /**
         * 移除当前对象集合中所有元素的指定属性。
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        removeAttr: function(name) {
            return this.each(function() {
                this.nodeType === 1 &&
                    name.split(" ").forEach(function(attribute) {
                        setAttribute(this, attribute); //setAttribute的第三个参数为null时，效果是删除name属性
                    }, this);
            });
        },
        /**
         * 读取或设置dom元素的属性值。
         * 它在读取属性值的情况下优先于 attr，因为这些属性值会因为用户的交互发生改变，如checked 和 selected。
         * 简写或小写名称，比如for, class, readonly及类似的属性，将被映射到实际的属性上，比如htmlFor, className, readOnly, 等等。
         * 获取第一条数据的指定的name属性或者给每条数据添加自定义属性，注意和setAttribute的区别
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        prop: function(name, value) {
            name = propMap[name] || name;
            return 1 in arguments
                ? this.each(function(idx) {
                      //没有给定value时，为获取，给定value则给每一条数据添加，value可以为值也可以是一个返回值的函数
                      this[name] = funcArg(this, value, idx, this[name]);
                  })
                : this[0] && this[0][name];
        },
        /**
         * 读取或写入dom的 data-* 属性。行为有点像 attr ，但是属性名称前面加上 data-。
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        data: function(name, value) {
            var attrName =
                "data-" + name.replace(capitalRE, "-$1").toLowerCase();
            //通过调用attr方法来实现获取与设置的效果，注意attr方法里，当value存在的时候，返回的是集合本身，如果不存在，则是返回获取的值
            var data =
                1 in arguments
                    ? this.attr(attrName, value)
                    : this.attr(attrName);

            return data !== null ? deserializeValue(data) : undefined;
        },
        /**
         * 获取或设置匹配元素的值。当没有给定value参数，返回第一个元素的值。如果是<select multiple>标签，则返回一个数组。当给定value参数，那么将设置所有元素的值。
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        val: function(value) {
            return 0 in arguments
                ? this.each(function(idx) {
                      this.value = funcArg(this, value, idx, this.value);
                  })
                : //如果是多选的select，则返回一个包含被选中的option的值的数组
                  this[0] &&
                      (this[0].multiple
                          ? $(this[0])
                                .find("option")
                                .filter(function() {
                                    return this.selected;
                                })
                                .pluck("value")
                          : this[0].value);
        },
        /**
         * 获得当前元素相对于document的位置。返回一个对象含有： top, left, width和height
         * 当给定一个含有left和top属性对象时，使用这些值来对集合中每一个元素进行相对于document的定位。
         * @param  {[type]} coordinates [description]
         * @return {[type]}             [description]
         */
        offset: function(coordinates) {
            if (coordinates)
                return this.each(function(index) {
                    var $this = $(this),
                        //coordinates为{}时直接返回，为函数时返回处理结果给coords
                        coords = funcArg(
                            this,
                            coordinates,
                            index,
                            $this.offset()
                        ),
                        //取父级的offset
                        parentOffset = $this.offsetParent().offset(),
                        //计算出它们之间的差，得出其偏移量
                        props = {
                            top: coords.top - parentOffset.top,
                            left: coords.left - parentOffset.left
                        };
                    //注意元素的position为static时，设置top,left是无效的
                    if ($this.css("position") == "static")
                        props["position"] = "relative";
                    $this.css(props);
                });
            //取第一条记录的offset,包括offsetTop,offsetLeft,offsetWidth,offsetHeight
            if (!this.length) return null;
            var obj = this[0].getBoundingClientRect();
            //window.pageYOffset就是类似Math.max(document.documentElement.scrollTop||document.body.scrollTop)
            return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: Math.round(obj.width),
                height: Math.round(obj.height)
            };
        },
        /**
         * 读取或设置DOM元素的css属性。当value参数不存在的时候，返回对象集合中第一个元素的css属性。当value参数存在时，设置对象集合中每一个元素的对应css属性。
         * 多个属性可以通过传递一个属性名组成的数组一次性获取。多个属性可以利用对象键值对的方式进行设置。
         * 当value为空(空字符串，null 或 undefined)，那个css属性将会被移出。当value参数为一个无单位的数字，如果该css属性需要单位，“px”将会自动添加到该属性上。
         * @param  {[type]} property [description]
         * @param  {[type]} value    [description]
         * @return {[type]}          [description]
         */
        css: function(property, value) {
            //获取指定的样式
            if (arguments.length < 2) {
                var computedStyle,
                    element = this[0];
                if (!element) return;
                computedStyle = getComputedStyle(element, "");
                if (typeof property == "string")
                    return (
                        element.style[camelize(property)] ||
                        computedStyle.getPropertyValue(property)
                    );
                else if (isArray(property)) {
                    var props = {};
                    $.each(property, function(_, prop) {
                        props[prop] =
                            element.style[camelize(prop)] ||
                            computedStyle.getPropertyValue(prop);
                    });
                    return props;
                }
            }
            //设置样式
            var css = "";
            if (type(property) == "string") {
                if (!value && value !== 0)
                    //当value的值为非零的可以转成false的值时如(null,undefined)，删掉property样式
                    this.each(function() {
                        //style.removeProperty 移除指定的CSS样式名(IE不支持DOM的style方法)
                        this.style.removeProperty(dasherize(property));
                    });
                else
                    css =
                        dasherize(property) + ":" + maybeAddPx(property, value);
            } else {
                //当property是对象时
                for (key in property)
                    if (!property[key] && property[key] !== 0)
                        //当property[key]的值为非零的可以转成false的值时，删掉key样式
                        this.each(function() {
                            this.style.removeProperty(dasherize(key));
                        });
                    else
                        css +=
                            dasherize(key) +
                            ":" +
                            maybeAddPx(key, property[key]) +
                            ";";
            }
            //设置
            return this.each(function() {
                this.style.cssText += ";" + css;
            });
        },
        /**
         * 获取一个元素的索引值（愚人码头注：从0开始计数）。
         * 当elemen参数没有给出时，返回当前元素在兄弟节点中的位置。
         * 当element参数给出时，返回它在当前对象集合中的位置。如果没有找到该元素，则返回-1。
         * @param  {[type]} element [description]
         * @return {[type]}         [description]
         */
        index: function(element) {
            //这里的$(element)[0]是为了将字符串转成node,因为this是个包含node的数组
            //当不指定element时，取集合中第一条记录在其父节点的位置
            //this.parent().children().indexOf(this[0])这句很巧妙，和取第一记录的parent().children().indexOf(this)相同
            return element
                ? this.indexOf($(element)[0])
                : this.parent()
                      .children()
                      .indexOf(this[0]);
        },
        /**
         * 检查对象集合中是否有元素含有指定的class。
         * @param  {[type]}  name [description]
         * @return {Boolean}      [description]
         */
        hasClass: function(name) {
            if (!name) return false;
            return emptyArray.some.call(
                this,
                function(el) {
                    //注意这里的this是classRE(name)生成的正则
                    return this.test(className(el));
                },
                classRE(name)
            );
        },
        /**
         * 为每个匹配的元素添加指定的class类名。多个class类名使用空格分隔。
         * @param {[type]} name [description]
         */
        addClass: function(name) {
            if (!name) return this;
            return this.each(function(idx) {
                if (!("className" in this)) return;
                classList = [];
                var cls = className(this),
                    newName = funcArg(this, name, idx, cls);
                //处理同时多个类的情况，用空格分开
                newName.split(/\s+/g).forEach(function(klass) {
                    if (!$(this).hasClass(klass)) classList.push(klass);
                }, this);
                classList.length &&
                    className(
                        this,
                        cls + (cls ? " " : "") + classList.join(" ")
                    );
            });
        },
        /**
         * 移除当前对象集合中所有元素的指定class。如果没有指定name参数，将移出所有的class。多个class参数名称可以利用空格分隔
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        removeClass: function(name) {
            return this.each(function(idx) {
                if (!("className" in this)) return;
                if (name === undefined) return className(this, "");
                classList = className(this);
                funcArg(this, name, idx, classList)
                    .split(/\s+/g)
                    .forEach(function(klass) {
                        classList = classList.replace(classRE(klass), " ");
                    });
                className(this, classList.trim());
            });
        },
        /**
         * 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类。如果class的名称存在则删除它，如果不存在，就添加它。如果 setting的值为真，这个功能类似于 addClass，如果为假，这个功能类似与 removeClass。
         * @param  {[type]} name [description]
         * @param  {[type]} when [description]
         * @return {[type]}      [description]
         */
        toggleClass: function(name, when) {
            if (!name) return this;
            return this.each(function(idx) {
                var $this = $(this),
                    names = funcArg(this, name, idx, className(this));
                names.split(/\s+/g).forEach(function(klass) {
                    (when === undefined ? !$this.hasClass(klass) : when)
                        ? $this.addClass(klass)
                        : $this.removeClass(klass);
                });
            });
        },
        /**
         * 获取或设置页面上的滚动元素或者整个窗口向下滚动的像素值。
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        scrollTop: function(value) {
            if (!this.length) return;
            var hasScrollTop = "scrollTop" in this[0];
            if (value === undefined)
                return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
            return this.each(
                hasScrollTop
                    ? function() {
                          this.scrollTop = value;
                      }
                    : function() {
                          this.scrollTo(this.scrollX, value);
                      }
            );
        },
        /**
         * 获取或设置页面上的滚动元素或者整个窗口向右滚动的像素值。
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        scrollLeft: function(value) {
            if (!this.length) return;
            var hasScrollLeft = "scrollLeft" in this[0];
            if (value === undefined)
                return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
            return this.each(
                hasScrollLeft
                    ? function() {
                          this.scrollLeft = value;
                      }
                    : function() {
                          this.scrollTo(value, this.scrollY);
                      }
            );
        },
        /**
         * 获取对象集合中第一个元素的位置。相对于 offsetParent。
         * 当绝对定位的一个元素靠近另一个元素的时候，这个方法是有用的。
         * @return {[type]} [description]
         */
        position: function() {
            if (!this.length) return;

            var elem = this[0],
                // Get *real* offsetParent
                offsetParent = this.offsetParent(),
                // Get correct offsets
                offset = this.offset(),
                parentOffset = rootNodeRE.test(offsetParent[0].nodeName)
                    ? {
                          top: 0,
                          left: 0
                      }
                    : offsetParent.offset();

            // Subtract element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            offset.top -= parseFloat($(elem).css("margin-top")) || 0;
            offset.left -= parseFloat($(elem).css("margin-left")) || 0;

            // Add offsetParent borders
            parentOffset.top +=
                parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
            parentOffset.left +=
                parseFloat($(offsetParent[0]).css("border-left-width")) || 0;

            // Subtract the two offsets
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var parent = this.offsetParent || document.body;
                while (
                    parent &&
                    !rootNodeRE.test(parent.nodeName) &&
                    $(parent).css("position") == "static"
                )
                    parent = parent.offsetParent;
                return parent;
            });
        }
    };

    // for now
    $.fn.detach = $.fn.remove;

    // Generate the `width` and `height` functions
    ["width", "height"].forEach(function(dimension) {
        //将width,hegiht转成Width,Height，用于取window或者document的width和height
        var dimensionProperty = dimension.replace(/./, function(m) {
            return m[0].toUpperCase();
        });

        $.fn[dimension] = function(value) {
            var offset,
                el = this[0];
            //没有参数为获取，获取window的width和height用innerWidth,innerHeight
            if (value === undefined)
                return isWindow(el)
                    ? el["inner" + dimensionProperty]
                    : //获取document的width和height时，用offsetWidth,offsetHeight
                      isDocument(el)
                        ? el.documentElement["scroll" + dimensionProperty]
                        : (offset = this.offset()) && offset[dimension];
            else
                return this.each(function(idx) {
                    el = $(this);
                    el.css(
                        dimension,
                        funcArg(this, value, idx, el[dimension]())
                    );
                });
        };
    });

    function traverseNode(node, fun) {
        fun(node);
        for (var i = 0, len = node.childNodes.length; i < len; i++)
            traverseNode(node.childNodes[i], fun);
    }

    // Generate the `after`, `prepend`, `before`, `append`,
    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
    adjacencyOperators.forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2; //=> prepend, append

        $.fn[operator] = function() {
            // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
            var argType,
                nodes = $.map(arguments, function(arg) {
                    argType = type(arg);
                    return argType == "object" ||
                        argType == "array" ||
                        arg == null
                        ? arg
                        : zepto.fragment(arg);
                }),
                parent,
                copyByClone = this.length > 1; //如果集合的长度大于集，则需要clone被插入的节点
            if (nodes.length < 1) return this;

            return this.each(function(_, target) {
                parent = inside ? target : target.parentNode;

                // convert all methods to a "before" operation
                // 通过改变target将after，prepend，append操作转成before操作，insertBefore的第二个参数为null时等于appendChild操作
                target =
                    operatorIndex == 0
                        ? target.nextSibling
                        : operatorIndex == 1
                            ? target.firstChild
                            : operatorIndex == 2 ? target : null;

                var parentInDocument = $.contains(
                    document.documentElement,
                    parent
                );

                nodes.forEach(function(node) {
                    if (copyByClone) node = node.cloneNode(true);
                    else if (!parent) return $(node).remove();

                    //插入节点后，如果被插入的节点是SCRIPT，则执行里面的内容并将window设为上下文
                    parent.insertBefore(node, target);
                    if (parentInDocument)
                        traverseNode(node, function(el) {
                            if (
                                el.nodeName != null &&
                                el.nodeName.toUpperCase() === "SCRIPT" &&
                                (!el.type || el.type === "text/javascript") &&
                                !el.src
                            )
                                window["eval"].call(window, el.innerHTML);
                        });
                });
            });
        };

        // after    => insertAfter
        // prepend  => prependTo
        // before   => insertBefore
        // append   => appendTo
        $.fn[
            inside
                ? operator + "To"
                : "insert" + (operatorIndex ? "Before" : "After")
        ] = function(html) {
            $(html)[operator](this);
            return this;
        };
    });

    //$.fn中的内置函数都处于Z的原型链方法之中
    zepto.Z.prototype = $.fn;

    // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq;
    zepto.deserializeValue = deserializeValue;
    $.zepto = zepto;

    return $;
})();

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);

/**
 * zepto的事件实现，最关键的是add和remove
 * 是一个标准的发布订阅系统，我们对浏览器的操作会生产事件，这个时候浏览器会根据我们的行为通知对应的事件接收者处理事件
 * 所有的绑定最终调用的皆是$.on，而on或者off的最终归宿为局部闭包add和remove方法
 */
(function($) {
    var _zid = 1,
        undefined,
        slice = Array.prototype.slice,
        isFunction = $.isFunction,
        isString = function(obj) {
            return typeof obj == "string";
        },
        handlers = {},
        specialEvents = {},
        focusinSupported = "onfocusin" in window,
        focus = {
            focus: "focusin",
            blur: "focusout"
        },
        hover = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };

    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove =
        "MouseEvents";

    //取element的唯一标示符，如果没有，则设置一个并返回
    function zid(element) {
        return element._zid || (element._zid = _zid++);
    }

    //查找绑定在元素上的指定类型的事件处理函数集合
    //在remove时，这里会根据元素的_zid然后调用findHandlers取出存于闭包handlers里面的事件对象
    function findHandlers(element, event, fn, selector) {
        event = parse(event);
        if (event.ns) var matcher = matcherFor(event.ns);
        return (handlers[zid(element)] || []).filter(function(handler) {
            //判断事件类型是否相同
            return (
                handler &&
                (!event.e || handler.e == event.e) &&
                (!event.ns || matcher.test(handler.ns)) &&
                (!fn || zid(handler.fn) === zid(fn)) &&
                (!selector || handler.sel == selector)
            ); //注意函数是引用类型的数据zid(handler.fn)的作用是返回handler.fn的标示符，如果没有，则给它添加一个，
            //这样如果fn和handler.fn引用的是同一个函数，那么fn上应该也可相同的标示符，
            //这里就是通过这一点来判断两个变量是否引用的同一个函数
        });
    }

    //解析事件类型，返回一个包含事件名称和事件命名空间的对象
    function parse(event) {
        var parts = ("" + event).split(".");
        return {
            e: parts[0], //真正绑定的事件Type
            ns: parts
                .slice(1)
                .sort()
                .join(" ") //其命名空间
        };
    }

    //生成命名空间的正则
    function matcherFor(ns) {
        return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
    }

    //通过给focus和blur事件设置为捕获来达到事件冒泡的目的
    function eventCapture(handler, captureSetting) {
        return (
            (handler.del && (!focusinSupported && handler.e in focus)) ||
            !!captureSetting
        );
    }

    //修复不支持mouseenter和mouseleave的情况
    function realEvent(type) {
        return hover[type] || (focusinSupported && focus[type]) || type;
    }

    //给元素绑定监听事件,可同时绑定多个事件类型，如['click','mouseover','mouseout'],也可以是'click mouseover mouseout'
    function add(element, events, fn, data, selector, delegator, capture) {
        var id = zid(element), //这里的zid非常关键，这里的element为与原生对象，这里在上面加了一个_zid的属性，这个属性会跟随其由始至终，不会丢失，如果是zepto封装的dom对象的话，就很容易丢失，因为每次根据$()创建的dom都是新的，这个_zid放到原生属性上是很有意义的
            set = handlers[id] || (handlers[id] = []); //我们所有绑定的事件以_zid为键值放在了外部闭包环境handlers对象中，每一个id对应的为一个数组，这个与绑定先后顺序相关
        events.split(/\s/).forEach(function(event) {
            if (event == "ready") return $(document).ready(fn);
            var handler = parse(event); //这里定义了一个handler对象，这个对象会存于handlers里面

            handler.fn = fn;
            handler.sel = selector;
            // 模仿 mouseenter, mouseleave
            // 我们知道，绑定时若是使用的是匿名函数的话，其引用会丢失，但是这里就把他保持下来存到了handlers中，为后面off消除句柄提供了条件
            /*
            relatedTarget为事件相关对象，只有在mouseover和mouseout事件时才有值
            mouseover时表示的是鼠标移出的那个对象，mouseout时表示的是鼠标移入的那个对象
            当related不存在，表示事件不是mouseover或者mouseout,mouseover时!$.contains(this, related)当相关对象不在事件对象内
            且related !== this相关对象不是事件对象时，表示鼠标已经从事件对象外部移入到了对象本身，这个时间是要执行处理函数的
            当鼠标从事件对象上移入到子节点的时候related就等于this了，且!$.contains(this, related)也不成立，这个时间是不需要执行处理函数的
        */
            if (handler.e in hover)
                fn = function(e) {
                    var related = e.relatedTarget;
                    console.debug(related);
                    if (
                        !related ||
                        (related !== this && !$.contains(this, related))
                    )
                        return handler.fn.apply(this, arguments);
                };
            //事件委托
            handler.del = delegator;
            var callback = delegator || fn;
            handler.proxy = function(e) {
                e = compatible(e);
                if (e.isImmediatePropagationStopped()) return;
                e.data = data;
                var result = callback.apply(
                    element,
                    e._args == undefined ? [e] : [e].concat(e._args)
                );
                //当事件处理函数返回false时，阻止默认操作和冒泡
                if (result === false) e.preventDefault(), e.stopPropagation();
                return result;
            };
            //设置处理函数的在函数集中的位置
            handler.i = set.length;
            //将函数存入函数集中
            set.push(handler);
            if ("addEventListener" in element)
                element.addEventListener(
                    realEvent(handler.e),
                    handler.proxy,
                    eventCapture(handler, capture)
                );
        });
    }

    //删除绑定在元素上的指定类型的事件监听函数，可同时删除多种事件类型指定的函数，用数组或者还空格的字符串即可，同add
    function remove(element, events, fn, selector, capture) {
        var id = zid(element);
        (events || "").split(/\s/).forEach(function(event) {
            findHandlers(element, event, fn, selector).forEach(function(
                handler
            ) {
                delete handlers[id][handler.i];
                if ("removeEventListener" in element)
                    element.removeEventListener(
                        realEvent(handler.e),
                        handler.proxy,
                        eventCapture(handler, capture)
                    );
            });
        });
    }

    $.event = {
        add: add,
        remove: remove
    };

    //设置代理
    $.proxy = function(fn, context) {
        var args = 2 in arguments && slice.call(arguments, 2);
        if (isFunction(fn)) {
            //如果fn是函数，则申明一个新的函数并用context作为上下文调用fn
            var proxyFn = function() {
                return fn.apply(
                    context,
                    args ? args.concat(slice.call(arguments)) : arguments
                );
            };
            //引用fn标示符
            proxyFn._zid = zid(fn);
            return proxyFn;
        } else if (isString(context)) {
            if (args) {
                args.unshift(fn[context], fn);
                return $.proxy.apply(null, args);
            } else {
                return $.proxy(fn[context], fn);
            }
        } else {
            throw new TypeError("expected function");
        }
    };

    $.fn.bind = function(event, data, callback) {
        return this.on(event, data, callback);
    };
    $.fn.unbind = function(event, callback) {
        return this.off(event, callback);
    };
    //绑定一次性事件监听函数
    $.fn.one = function(event, selector, data, callback) {
        return this.on(event, selector, data, callback, 1);
    };

    var returnTrue = function() {
            return true;
        },
        returnFalse = function() {
            return false;
        },
        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
        eventMethods = {
            preventDefault: "isDefaultPrevented", //是否调用过preventDefault方法
            //取消执行其他的事件处理函数并取消事件冒泡.如果同一个事件绑定了多个事件处理函数, 在其中一个事件处理函数中调用此方法后将不会继续调用其他的事件处理函数.
            stopImmediatePropagation: "isImmediatePropagationStopped", //是否调用过stopImmediatePropagation方法，
            stopPropagation: "isPropagationStopped" //是否调用过stopPropagation方法
        };

    /**
     * 对字符串类型的事件类型进行封装,转变为一个合成事件
     * [compatible description]
     * @param  {[type]} event  [副本值]
     * @param  {[type]} source [初始值]
     * @return {[type]}        [description]
     */
    function compatible(event, source) {
        if (source || !event.isDefaultPrevented) {
            source || (source = event);

            //将三大事件对象进行新增接口，将preventDefault，stopImmediatePropagatio,stopPropagation方法定义到proxy上
            $.each(eventMethods, function(name, predicate) {
                var sourceMethod = source[name];
                event[name] = function() {
                    this[predicate] = returnTrue;
                    return (
                        sourceMethod && sourceMethod.apply(source, arguments)
                    );
                };
                event[predicate] = returnFalse;
            });

            if (
                source.defaultPrevented !== undefined
                    ? source.defaultPrevented
                    : "returnValue" in source
                        ? source.returnValue === false
                        : source.getPreventDefault && source.getPreventDefault()
            )
                event.isDefaultPrevented = returnTrue;
        }
        return event;
    }
    //创建事件代理
    function createProxy(event) {
        var key,
            proxy = {
                originalEvent: event
            };
        for (key in event)
            if (!ignoreProperties.test(key) && event[key] !== undefined)
                proxy[key] = event[key]; //复制event属性至proxy

        return compatible(proxy, event);
    }
    //事件委托
    $.fn.delegate = function(selector, event, callback) {
        return this.on(event, selector, callback);
    };
    //取消事件委托
    $.fn.undelegate = function(selector, event, callback) {
        return this.off(event, selector, callback);
    };

    $.fn.live = function(event, callback) {
        $(document.body).delegate(this.selector, event, callback);
        return this;
    };
    $.fn.die = function(event, callback) {
        $(document.body).undelegate(this.selector, event, callback);
        return this;
    };
    //on也有live和事件委托的效果，所以可以只用on来绑定事件
    $.fn.on = function(event, selector, data, callback, one) {
        var autoRemove,
            delegator,
            $this = this;

        // event处理节点，递归
        if (event && !isString(event)) {
            $.each(event, function(type, fn) {
                $this.on(type, selector, data, fn, one);
            });
            return $this;
        }

        // 函数简写方式，
        if (!isString(selector) && !isFunction(callback) && callback !== false)
            (callback = data), (data = selector), (selector = undefined);
        if (isFunction(data) || data === false)
            (callback = data), (data = undefined);
        if (callback === false) callback = returnFalse;

        return $this.each(function(_, element) {
            if (one)
                autoRemove = function(e) {
                    remove(element, e.type, callback);
                    return callback.apply(this, arguments);
                };

            if (selector)
                delegator = function(e) {
                    var evt,
                        match = $(e.target)
                            .closest(selector, element)
                            .get(0);
                    if (match && match !== element) {
                        evt = $.extend(createProxy(e), {
                            currentTarget: match,
                            liveFired: element
                        });
                        return (autoRemove || callback).apply(
                            match,
                            [evt].concat(slice.call(arguments, 1))
                        );
                    }
                };

            add(
                element,
                event,
                callback,
                data,
                selector,
                delegator || autoRemove
            );
        });
    };
    $.fn.off = function(event, selector, callback) {
        var $this = this;
        if (event && !isString(event)) {
            $.each(event, function(type, fn) {
                $this.off(type, selector, fn);
            });
            return $this;
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false)
            (callback = selector), (selector = undefined);

        if (callback === false) callback = returnFalse;

        return $this.each(function() {
            remove(this, event, callback, selector);
        });
    };

    //主动触发事件
    $.fn.trigger = function(event, args) {
        event =
            isString(event) || $.isPlainObject(event)
                ? $.Event(event)
                : compatible(event);
        event._args = args;
        return this.each(function() {
            // handle focus(), blur() by calling them directly
            if (event.type in focus && typeof this[event.type] == "function")
                this[event.type]();
            else if ("dispatchEvent" in this)
                // items in the collection might not be DOM elements
                this.dispatchEvent(event);
            else $(this).triggerHandler(event, args);
        });
    };

    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    //触发元素上绑定的指定类型的事件，但是不冒泡
    $.fn.triggerHandler = function(event, args) {
        var e, result;
        this.each(function(i, element) {
            e = createProxy(isString(event) ? $.Event(event) : event);
            e._args = args;
            e.target = element;
            $.each(findHandlers(element, event.type || event), function(
                i,
                handler
            ) {
                result = handler.proxy(e);
                if (e.isImmediatePropagationStopped()) return false;
            });
        });
        return result;
    };

    // shortcut methods for `.bind(event, fn)` for each event type
    (
        "focusin focusout focus blur load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select keydown keypress keyup error"
    )
        .split(" ")
        .forEach(function(event) {
            $.fn[event] = function(callback) {
                return 0 in arguments
                    ? this.bind(event, callback)
                    : this.trigger(event);
            };
        });

    //根据参数创建一个event对象，类似click
    $.Event = function(type, props) {
        //当type是个对象时
        if (!isString(type)) (props = type), (type = props.type);
        //创建一个event对象，如果是click,mouseover,mouseout时，创建的是MouseEvent,bubbles为是否冒泡
        var event = document.createEvent(specialEvents[type] || "Events"),
            bubbles = true;

        //确保bubbles的值为true或false,并将props参数的属性扩展到新创建的event对象上
        if (props)
            for (var name in props)
                name == "bubbles"
                    ? (bubbles = !!props[name])
                    : (event[name] = props[name]);
        //初始化event对象，type为事件类型，如click，bubbles为是否冒泡，第三个参数表示是否可以用preventDefault方法来取消默认操作
        event.initEvent(type, bubbles, true);
        return compatible(event);
    };
})(Zepto);

//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
(function($) {
    var touch = {},
        touchTimeout,
        tapTimeout,
        swipeTimeout,
        longTapTimeout,
        longTapDelay = 750,
        gesture;

    function touchLeft() {
        var initX;
        var moveX;
        var X = 0;
        var objX = 0;
        $(document)
            .on("touchstart", ".z-ecp-li", function(e) {
                e.preventDefault();
                var obj = this;
                initX = event.targetTouches[0].pageX;
                objX =
                    obj.style.WebkitTransform.replace(
                        /translateX\(/g,
                        ""
                    ).replace(/px\)/g, "") * 1;
                if (objX === 0) {
                    $(obj).on("touchmove", function(e) {
                        e.preventDefault();
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            $(".z-ecp-li").each(function(index, el) {
                                this.style.WebkitTransform =
                                    "translateX(" + 0 + "px)";
                            });
                            obj.style.WebkitTransform =
                                "translateX(" + 0 + "px)";
                        } else if (X < 0) {
                            var l = Math.abs(X);
                            $(".z-ecp-li").each(function(index, el) {
                                this.style.WebkitTransform =
                                    "translateX(" + 0 + "px)";
                            });
                            obj.style.WebkitTransform =
                                "translateX(" + -l + "px)";
                            if (l > 159) {
                                l = 159;
                                $(".z-ecp-li").each(function(index, el) {
                                    this.style.WebkitTransform =
                                        "translateX(" + 0 + "px)";
                                });
                                obj.style.WebkitTransform =
                                    "translateX(" + -l + "px)";
                            }
                        }
                    });
                } else if (objX < 0) {
                    $(obj).on("touchmove", function(e) {
                        e.preventDefault();
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            var r = -159 + Math.abs(X);
                            $(".z-ecp-li").each(function(index, el) {
                                this.style.WebkitTransform =
                                    "translateX(" + 0 + "px)";
                            });
                            obj.style.WebkitTransform =
                                "translateX(" + r + "px)";
                            if (r > 0) {
                                r = 0;
                                $(".z-ecp-li").each(function(index, el) {
                                    this.style.WebkitTransform =
                                        "translateX(" + 0 + "px)";
                                });
                                obj.style.WebkitTransform =
                                    "translateX(" + r + "px)";
                            }
                        } else {
                            $(".z-ecp-li").each(function(index, el) {
                                this.style.WebkitTransform =
                                    "translateX(" + 0 + "px)";
                            });
                            obj.style.WebkitTransform =
                                "translateX(" + -159 + "px)";
                        }
                    });
                }
            })
            .on("touchend", ".z-ecp-li", function(e) {
                e.preventDefault();
                var obj = this;
                objX =
                    obj.style.WebkitTransform.replace(
                        /translateX\(/g,
                        ""
                    ).replace(/px\)/g, "") * 1;
                if (objX > -40) {
                    $(".z-ecp-li").each(function(index, el) {
                        this.style.WebkitTransform = "translateX(" + 0 + "px)";
                    });
                    obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                } else {
                    $(".z-ecp-li").each(function(index, el) {
                        this.style.WebkitTransform = "translateX(" + 0 + "px)";
                    });
                    obj.style.WebkitTransform = "translateX(" + -159 + "px)";
                }
            });
    }

    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
            ? x1 - x2 > 0 ? "Left" : "Right"
            : y1 - y2 > 0 ? "Up" : "Down";
    }

    function longTap() {
        longTapTimeout = null;
        if (touch.last) {
            touch.el.trigger("longTap");
            touch = {};
        }
    }

    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout);
        longTapTimeout = null;
    }

    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout);
        if (tapTimeout) clearTimeout(tapTimeout);
        if (swipeTimeout) clearTimeout(swipeTimeout);
        if (longTapTimeout) clearTimeout(longTapTimeout);
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
        touch = {};
    }

    function isPrimaryTouch(event) {
        return (
            (event.pointerType == "touch" ||
                event.pointerType == event.MSPOINTER_TYPE_TOUCH) &&
            event.isPrimary
        );
    }

    function isPointerEventType(e, type) {
        return (
            e.type == "pointer" + type ||
            e.type.toLowerCase() == "mspointer" + type
        );
    }

    $(document).ready(function() {
        var now,
            delta,
            deltaX = 0,
            deltaY = 0,
            firstTouch,
            _isPointerType;

        if ("MSGesture" in window) {
            gesture = new MSGesture();
            gesture.target = document.body;
        }

        console.debug($(document.body));

        $(document)
            .bind("MSGestureEnd", function(e) {
                var swipeDirectionFromVelocity =
                    e.velocityX > 1
                        ? "Right"
                        : e.velocityX < -1
                            ? "Left"
                            : e.velocityY > 1
                                ? "Down"
                                : e.velocityY < -1 ? "Up" : null;
                if (swipeDirectionFromVelocity) {
                    touch.el.trigger("swipe");
                    touch.el.trigger("swipe" + swipeDirectionFromVelocity);
                }
            })
            .on("touchstart MSPointerDown pointerdown", function(e) {
                //document.activeElement.blur();

                if (
                    (_isPointerType = isPointerEventType(e, "down")) &&
                    !isPrimaryTouch(e)
                )
                    return;
                firstTouch = _isPointerType ? e : e.touches[0];
                if (e.touches && e.touches.length === 1 && touch.x2) {
                    // Clear out touch movement data if we have it sticking around
                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.
                    touch.x2 = undefined;
                    touch.y2 = undefined;
                }
                now = Date.now();
                delta = now - (touch.last || now);
                touch.el = $(
                    "tagName" in firstTouch.target
                        ? firstTouch.target
                        : firstTouch.target.parentNode
                );
                touchTimeout && clearTimeout(touchTimeout);
                touch.x1 = firstTouch.pageX;
                touch.y1 = firstTouch.pageY;
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
                touch.last = now;
                longTapTimeout = setTimeout(longTap, longTapDelay);
                // adds the current touch contact for IE gesture recognition
                if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
            })
            .on("touchmove MSPointerMove pointermove", function(e) {
                if (
                    (_isPointerType = isPointerEventType(e, "move")) &&
                    !isPrimaryTouch(e)
                )
                    return;
                firstTouch = _isPointerType ? e : e.touches[0];
                cancelLongTap();
                touch.x2 = firstTouch.pageX;
                touch.y2 = firstTouch.pageY;

                deltaX += Math.abs(touch.x1 - touch.x2);
                deltaY += Math.abs(touch.y1 - touch.y2);

                console.log(deltaX, deltaY);
            })
            .on("touchend MSPointerUp pointerup", function(e) {
                //e.target.focus();
                //e.preventDefault()
                if (
                    (_isPointerType = isPointerEventType(e, "up")) &&
                    !isPrimaryTouch(e)
                )
                    return;
                cancelLongTap();

                // swipe
                if (
                    (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)
                )
                    swipeTimeout = setTimeout(function() {
                        if (touch.el) {
                            touch.el.trigger("swipe");
                            touch.el.trigger(
                                "swipe" +
                                    swipeDirection(
                                        touch.x1,
                                        touch.x2,
                                        touch.y1,
                                        touch.y2
                                    )
                            );
                        }
                        touch = {};
                    }, 0);
                else if ("last" in touch)
                    // normal tap
                    if (deltaX < 30 && deltaY < 30) {
                        // don't fire tap when delta position changed by more than 30 pixels,
                        // for instance when moving to a point and back to origin
                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                        // ('tap' fires before 'scroll')
                        tapTimeout = setTimeout(function() {
                            // trigger universal 'tap' with the option to cancelTouch()
                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                            var event = $.Event("tap");
                            event.cancelTouch = cancelAll;
                            // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
                            if (touch.el) touch.el.trigger(event);

                            // trigger double tap immediately
                            if (touch.isDoubleTap) {
                                if (touch.el) touch.el.trigger("doubleTap");
                                touch = {};
                            } else {
                                // trigger single tap after 250ms of inactivity
                                touchTimeout = setTimeout(function() {
                                    touchTimeout = null;
                                    if (touch.el) touch.el.trigger("singleTap");
                                    touch = {};
                                }, 250);
                            }
                        }, 1);
                    } else {
                        touch = {};
                    }
                deltaX = deltaY = 0;
            })
            // when the browser window loses focus,
            // for example when a modal dialog is shown,
            // cancel all ongoing events
            .on("touchcancel MSPointerCancel pointercancel", cancelAll);

        // scrolling the window indicates intention of the user
        // to scroll, not tap or swipe, so cancel all ongoing events
        $(window).on("scroll", cancelAll);
    });
    [
        "swipe",
        "swipeLeft",
        "swipeRight",
        "swipeUp",
        "swipeDown",
        "doubleTap",
        "tap",
        "singleTap",
        "longTap"
    ].forEach(function(eventName) {
        $.fn[eventName] = function(callback) {
            return this.on(eventName, callback);
        };
    });
})(Zepto);

/**
 * zepto的ajax实现
 */
(function($) {
    var jsonpID = 0,
        document = window.document,
        key,
        name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = "application/json",
        htmlType = "text/html",
        blankRE = /^\s*$/,
        originAnchor = document.createElement("a");

    originAnchor.href = window.location.href;

    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName);
        $(context).trigger(event, data);
        return !event.isDefaultPrevented();
    }

    // trigger an Ajax "global" event
    // 触发ajax的全局事件
    function triggerGlobal(settings, context, eventName, data) {
        if (settings.global)
            return triggerAndReturn(context || document, eventName, data);
    }

    // Number of active Ajax requests
    $.active = 0;

    //settings.global为true时表示需要触发全局ajax事件
    //注意这里的$.active++ === 0很巧妙，用它来判断开始，因为只有$.active等于0时$.active++ === 0才成立
    function ajaxStart(settings) {
        if (settings.global && $.active++ === 0)
            triggerGlobal(settings, null, "ajaxStart");
    }

    //注意这里的 !(--$.active)同上面的异曲同工，--$.active为0，则表示$.active的值为1，这样用来判断结束，也很有意思
    function ajaxStop(settings) {
        if (settings.global && !--$.active)
            triggerGlobal(settings, null, "ajaxStop");
    }

    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    //触发全局ajaxBeforeSend事件，如果返回false,则取消此次请求
    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        if (
            settings.beforeSend.call(context, xhr, settings) === false ||
            triggerGlobal(settings, context, "ajaxBeforeSend", [
                xhr,
                settings
            ]) === false
        )
            return false;

        triggerGlobal(settings, context, "ajaxSend", [xhr, settings]);
    }

    function ajaxSuccess(data, xhr, settings, deferred) {
        var context = settings.context,
            status = "success";
        settings.success.call(context, data, status, xhr);
        if (deferred) deferred.resolveWith(context, [data, status, xhr]);
        triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
        ajaxComplete(status, xhr, settings);
    }
    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings, deferred) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error);
        if (deferred) deferred.rejectWith(context, [xhr, type, error]);
        triggerGlobal(settings, context, "ajaxError", [
            xhr,
            settings,
            error || type
        ]);
        ajaxComplete(type, xhr, settings);
    }
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status);
        triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
        ajaxStop(settings);
    }

    // Empty function, used as default callback
    function empty() {}

    $.ajaxJSONP = function(options, deferred) {
        if (!("type" in options)) return $.ajax(options);

        var _callbackName = options.jsonpCallback,
            callbackName =
                ($.isFunction(_callbackName)
                    ? _callbackName()
                    : _callbackName) || "jsonp" + ++jsonpID, //创建回调函数名
            script = document.createElement("script"),
            originalCallback = window[callbackName],
            responseData,
            abort = function(errorType) {
                $(script).triggerHandler("error", errorType || "abort"); //这里通过将回调函数重新赋值为空函数来达到看似阻止加载JS的目的，实际上给script标签设置了src属性后，请求就已经产生了，并且不能中断
            },
            xhr = {
                abort: abort
            },
            abortTimeout;

        if (deferred) deferred.promise(xhr);

        $(script).on("load error", function(e, errorType) {
            console.log(e, errorType);
            clearTimeout(abortTimeout);
            $(script)
                .off()
                .remove();

            if (e.type == "error" || !responseData) {
                ajaxError(null, errorType || "error", xhr, options, deferred);
            } else {
                ajaxSuccess(responseData[0], xhr, options, deferred);
            }

            window[callbackName] = originalCallback;
            if (responseData && $.isFunction(originalCallback))
                originalCallback(responseData[0]);

            originalCallback = responseData = undefined;
        });

        if (ajaxBeforeSend(xhr, options) === false) {
            abort("abort");
            return xhr;
        }

        window[callbackName] = function() {
            responseData = arguments;
        };
        //将回调函数名追加到请求地址，并赋给script，至此请求产生
        script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName);
        document.head.appendChild(script);

        //如果设置了超时处理
        if (options.timeout > 0)
            abortTimeout = setTimeout(function() {
                abort("timeout");
            }, options.timeout);

        return xhr;
    };

    //ajax全局设置
    $.ajaxSettings = {
        // Default type of request
        type: "GET",
        // Callback that is executed before request
        beforeSend: empty,
        // Callback that is executed if the request succeeds
        success: empty,
        // Callback that is executed the the server drops error
        error: empty,
        // Callback that is executed on request complete (both: error and success)
        complete: empty,
        // The context for the callbacks
        context: null,
        // Whether to trigger "global" Ajax events
        global: true,
        // Transport
        xhr: function() {
            return new window.XMLHttpRequest();
        },
        // MIME types mapping
        // IIS returns Javascript as "application/x-javascript"
        accepts: {
            script:
                "text/javascript, application/javascript, application/x-javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        // Whether the request is to another domain
        crossDomain: false,
        // Default timeout
        timeout: 0,
        // Whether data should be serialized to string
        processData: true,
        // Whether the browser should be allowed to cache GET responses
        cache: true
    };

    //根据MIME返回相应的数据类型，用作ajax参数里的dataType用，设置预期返回的数据类型
    //如html,json,scirpt,xml,text
    function mimeToDataType(mime) {
        if (mime) mime = mime.split(";", 2)[0];
        return (
            (mime &&
                (mime == htmlType
                    ? "html"
                    : mime == jsonType
                        ? "json"
                        : scriptTypeRE.test(mime)
                            ? "script"
                            : xmlTypeRE.test(mime) && "xml")) ||
            "text"
        );
    }

    //将查询字符串追加到URL后面
    function appendQuery(url, query) {
        if (query == "") return url;
        //注意这里的replace,将第一个匹配到的&或者&&,&?,? ?& ??替换成?,用来保证地址的正确性
        return (url + "&" + query).replace(/[&?]{1,2}/, "?");
    }

    // serialize payload and append it to the URL for GET requests
    // 序列化发送到服务器上的数据，如果是GET请求，则将序列化后的数据追加到请求地址后面
    function serializeData(options) {
        //options.processData表示对于非Get请求,是否自动将 options.data转换为字符串,前提是options.data不是字符串
        if (
            options.processData &&
            options.data &&
            $.type(options.data) != "string"
        )
            //options.traditional表示是否以$.param方法序列化
            options.data = $.param(options.data, options.traditional);
        if (
            options.data &&
            (!options.type || options.type.toUpperCase() == "GET")
        )
            //如果是GET请求，将序列化后的数据追加到请求地址后面
            (options.url = appendQuery(options.url, options.data)),
                (options.data = undefined);
    }

    $.ajax = function(options) {
        //注意这里不能直接将$.ajaxSettings替换掉$.extend的第一个参数,这样会改变 $.ajaxSettings里面的值
        //这里的做法是创建一个新对象
        var settings = $.extend({}, options || {}),
            deferred = $.Deferred && $.Deferred(),
            urlAnchor;
        //如果它没有定义$.ajaxSettings里面的属性的时候，才去将$.ajaxSettings[key] 复制过来
        for (key in $.ajaxSettings)
            if (settings[key] === undefined)
                settings[key] = $.ajaxSettings[key];

        //执行全局ajaxStart
        ajaxStart(settings);

        //通过判断请求地址和当前页面地址的host是否相同来设置是跨域
        if (!settings.crossDomain) {
            urlAnchor = document.createElement("a");
            urlAnchor.href = settings.url;
            urlAnchor.href = urlAnchor.href;
            settings.crossDomain =
                originAnchor.protocol + "//" + originAnchor.host !==
                urlAnchor.protocol + "//" + urlAnchor.host;
        }

        //如果没有设置请求地址，则取当前页面地址
        if (!settings.url) settings.url = window.location.toString();
        //将data进行转换
        serializeData(settings);

        var dataType = settings.dataType,
            hasPlaceholder = /\?.+=\?/.test(settings.url);
        if (hasPlaceholder) dataType = "jsonp";

        //如果不设置缓存
        if (
            settings.cache === false ||
            ((!options || options.cache !== true) &&
                ("script" == dataType || "jsonp" == dataType))
        )
            settings.url = appendQuery(settings.url, "_=" + Date.now());

        //如果请求的是jsonp，则将地址栏里的=?替换为callback=?,相当于一个简写
        if ("jsonp" == dataType) {
            if (!hasPlaceholder)
                settings.url = appendQuery(
                    settings.url,
                    settings.jsonp
                        ? settings.jsonp + "=?"
                        : settings.jsonp === false ? "" : "callback=?"
                );
            return $.ajaxJSONP(settings, deferred);
        }

        var mime = settings.accepts[dataType],
            headers = {},
            //如果请求地址没有定请求协议，则与当前页面协议相同
            setHeader = function(name, value) {
                headers[name.toLowerCase()] = [name, value];
            },
            protocol = /^([\w-]+:)\/\//.test(settings.url)
                ? RegExp.$1
                : window.location.protocol,
            xhr = settings.xhr(),
            nativeSetHeader = xhr.setRequestHeader,
            abortTimeout;
        //如果没有跨域
        if (deferred) deferred.promise(xhr);

        if (!settings.crossDomain)
            setHeader("X-Requested-With", "XMLHttpRequest");
        setHeader("Accept", mime || "*/*");
        if ((mime = settings.mimeType || mime)) {
            if (mime.indexOf(",") > -1) mime = mime.split(",", 2)[0];
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
        //如果不是GET请求，设置发送信息至服务器时内容编码类型
        if (
            settings.contentType ||
            (settings.contentType !== false &&
                settings.data &&
                settings.type.toUpperCase() != "GET")
        )
            setHeader(
                "Content-Type",
                settings.contentType || "application/x-www-form-urlencoded"
            );

        if (settings.headers)
            for (name in settings.headers)
                setHeader(name, settings.headers[name]);
        xhr.setRequestHeader = setHeader;

        //javaScript原生方法封装
        xhr.onreadystatechange = function() {
            console.log(xhr.readyState);
            if (xhr.readyState == 4) {
                xhr.onreadystatechange = empty;
                clearTimeout(abortTimeout);
                var result,
                    error = false;
                //根据状态来判断请求是否成功
                //状态>=200 && < 300 表示成功
                //状态 == 304 表示文件未改动过，也可认为成功
                //如果是取要本地文件那也可以认为是成功的，xhr.status == 0是在直接打开页面时发生请求时出现的状态，也就是不是用localhost的形式访问的页面的情况
                if (
                    (xhr.status >= 200 && xhr.status < 300) ||
                    xhr.status == 304 ||
                    (xhr.status == 0 && protocol == "file:")
                ) {
                    //获取返回的数据类型
                    dataType =
                        dataType ||
                        mimeToDataType(
                            settings.mimeType ||
                                xhr.getResponseHeader("content-type")
                        );
                    result = xhr.responseText;

                    try {
                        // http://perfectionkills.com/global-eval-what-are-the-options/
                        if (dataType == "script") (1, eval)(result);
                        else if (dataType == "xml")
                            //如果返回的数据类型是JS
                            result = xhr.responseXML;
                        else if (dataType == "json")
                            result = blankRE.test(result)
                                ? null
                                : $.parseJSON(result);
                    } catch (e) {
                        error = e;
                    }
                    //如果解析出错，则执行全局parsererror事件
                    if (error)
                        ajaxError(
                            error,
                            "parsererror",
                            xhr,
                            settings,
                            deferred
                        );
                    else
                        //否则执行ajaxSuccess
                        ajaxSuccess(result, xhr, settings, deferred);
                } else {
                    //如果请求出错，则根据xhr.status来执行相应的错误处理函数
                    ajaxError(
                        xhr.statusText || null,
                        xhr.status ? "error" : "abort",
                        xhr,
                        settings,
                        deferred
                    );
                }
            }
        };

        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.abort();
            ajaxError(null, "abort", xhr, settings, deferred);
            return xhr;
        }

        if (settings.xhrFields)
            for (name in settings.xhrFields)
                xhr[name] = settings.xhrFields[name];

        var async = "async" in settings ? settings.async : true;
        xhr.open(
            settings.type,
            settings.url,
            async,
            settings.username,
            settings.password
        );
        //设置请求头信息
        for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

        //当设置了settings.timeout，则在超时后取消请求，并执行timeout事件处理函数
        if (settings.timeout > 0)
            abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = empty;
                xhr.abort();
                ajaxError(null, "timeout", xhr, settings, deferred);
            }, settings.timeout);

        // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null);
        return xhr;
    };

    // handle optional data/success arguments
    //将参数转换成ajax函数指定的参数格式
    function parseArguments(url, data, success, dataType) {
        if ($.isFunction(data))
            (dataType = success), (success = data), (data = undefined);
        if (!$.isFunction(success)) (dataType = success), (success = undefined);
        return {
            url: url,
            data: data,
            success: success,
            dataType: dataType
        };
    }

    $.get = function(/* url, data, success, dataType */) {
        return $.ajax(parseArguments.apply(null, arguments));
    };

    $.post = function(/* url, data, success, dataType */) {
        var options = parseArguments.apply(null, arguments);
        options.type = "POST";
        return $.ajax(options);
    };

    $.getJSON = function(/* url, data, success */) {
        var options = parseArguments.apply(null, arguments);
        options.dataType = "json";
        return $.ajax(options);
    };

    $.fn.load = function(url, data, success) {
        if (!this.length) return this;
        //将请求地址用空格分开
        var self = this,
            parts = url.split(/\s/),
            selector,
            options = parseArguments(url, data, success),
            callback = options.success;
        if (parts.length > 1) (options.url = parts[0]), (selector = parts[1]);
        //要对成功后的回调函数进行一个改写，因为需要将加载进来的HTML添加进当前集合
        options.success = function(response) {
            //selector就是对请求到的数据就行一个筛选的条件，比如只获取数据里的类名为.test的标签
            self.html(
                selector
                    ? $("<div>")
                          .html(response.replace(rscript, ""))
                          .find(selector)
                    : response
            );
            //这里才是你写的回调
            callback && callback.apply(self, arguments);
        };
        $.ajax(options);
        return this;
    };

    var escape = encodeURIComponent;

    function serialize(params, obj, traditional, scope) {
        var type,
            array = $.isArray(obj),
            hash = $.isPlainObject(obj);
        $.each(obj, function(key, value) {
            type = $.type(value);
            //scope用作处理value也是object或者array的情况
            //traditional表示是否以传统的方式拼接数据，
            //传统的意思就是比如现有一个数据{a:[1,2,3]},转成查询字符串后结果为'a=1&a=2&a=3'
            //非传统的的结果则是a[]=1&a[]=2&a[]=3
            if (scope)
                key = traditional
                    ? scope
                    : scope +
                      "[" +
                      (hash || type == "object" || type == "array" ? key : "") +
                      "]";
            // handle data in serializeArray() format
            //当处理的数据为[{},{},{}]这种情况的时候，一般指的是序列化表单后的结果
            if (!scope && array) params.add(value.name, value.value);
            else if (type == "array" || (!traditional && type == "object"))
                // recurse into nested objects
                //当value值是数组或者是对象且不是按传统的方式序列化的时候，需要再次遍历value
                serialize(params, value, traditional, key);
            else params.add(key, value);
        });
    }
    //将obj转换为查询字符串的格式，traditional表示是否转换成传统的方式，至于传统的方式的意思看上面的注释
    $.param = function(obj, traditional) {
        var params = [];
        //注意这里将add方法定到params，所以下面serialize时才不需要返回数据
        params.add = function(key, value) {
            if ($.isFunction(value)) value = value();
            if (value == null) value = "";
            this.push(escape(key) + "=" + escape(value));
        };
        serialize(params, obj, traditional);
        return params.join("&").replace(/%20/g, "+");
    };
})(Zepto);

/**
 * 表单序列化
 */
(function($) {
    $.fn.serializeArray = function() {
        var name,
            type,
            result = [],
            add = function(value) {
                if (value.forEach) return value.forEach(add);
                result.push({
                    name: name,
                    value: value
                });
            };
        if (this[0])
            $.each(this[0].elements, function(_, field) {
                (type = field.type), (name = field.name);
                if (
                    name &&
                    field.nodeName.toLowerCase() != "fieldset" &&
                    !field.disabled &&
                    type != "submit" &&
                    type != "reset" &&
                    type != "button" &&
                    type != "file" &&
                    ((type != "radio" && type != "checkbox") || field.checked)
                )
                    add($(field).val());
            });
        return result;
    };

    $.fn.serialize = function() {
        var result = [];
        this.serializeArray().forEach(function(elm) {
            result.push(
                encodeURIComponent(elm.name) +
                    "=" +
                    encodeURIComponent(elm.value)
            );
        });
        return result.join("&");
    };

    $.fn.submit = function(callback) {
        if (0 in arguments) this.bind("submit", callback);
        else if (this.length) {
            var event = $.Event("submit");
            this.eq(0).trigger(event);
            if (!event.isDefaultPrevented()) this.get(0).submit();
        }
        return this;
    };
})(Zepto);
(function($) {
    // __proto__ doesn't exist on IE<11, so redefine
    // the Z function to use object extension instead
    if (!("__proto__" in {})) {
        $.extend($.zepto, {
            Z: function(dom, selector) {
                dom = dom || [];
                $.extend(dom, $.fn);
                dom.selector = selector || "";
                dom.__Z = true;
                return dom;
            },
            // this is a kludge but works
            isZ: function(object) {
                return $.type(object) === "array" && "__Z" in object;
            }
        });
    }

    // getComputedStyle shouldn't freak out when called
    // without a valid element as argument
    try {
        getComputedStyle(undefined);
    } catch (e) {
        var nativeGetComputedStyle = getComputedStyle;
        window.getComputedStyle = function(element) {
            try {
                return nativeGetComputedStyle(element);
            } catch (e) {
                return null;
            }
        };
    }
})(Zepto);
