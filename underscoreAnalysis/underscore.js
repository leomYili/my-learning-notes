//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    // 实质保存下上下文对象,
    var root = this;

    // Save the previous value of the `_` variable.
    // 将原来对象中的 _ 对象进行缓存
    var previousUnderscore = root._;

    // Save bytes in the minified (but not gzipped) version:
    // 缓存变量用于压缩代码
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    // Create quick reference variables for speed access to core prototypes.
    // 缓存变量,并减少js查找原型链的次数(原生方法,不用先确定类型);
    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    // es5原生方法,如果浏览器支持,则underscore就能够直接使用已被支持的方法
    var
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;

    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function() {};

    // Create a safe reference to the Underscore object for use below.
    // 初始化 _ 构造函数
    // 相当于自动new 初始化
    // _(obj).each ,这里相当于把直接传给构造函数的中的_wrapped
    // 以下都是oop形式的调用
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj); //这里就是在不是_函数的实例时,创建一个新的_实例
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    // 将上面定义的 `_` 局部变量赋值给全局对象中的 `_` 属性
    // 即客户端中 window._ = _
    // 这样就可以达到直接调用的目的
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // Current version.
    _.VERSION = '1.8.2';

    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    // 内部处理函数
    var optimizeCb = function(func, context, argCount) {
        // 如果没有指定 this 指向，则返回原函数
        // 这里充分考虑到了undefined会在局部作用域中可能被复写的情况,而改成了void 0
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function(value) {
                    return func.call(context, value);
                };
            case 2:
                return function(value, other) {
                    return func.call(context, value, other);
                };
                // 如果有指定 this，但没有传入 argCount 参数
                // 则执行以下 case
                // 类似_.each、_.map
            case 3:
                return function(value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function(accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }

        // 当然,也可以直接使用apply,而把上面的switch干掉,这里只是为了节省时间
        return function() {
            return func.apply(context, arguments);
        };
    };

    // A mostly-internal function to generate callbacks that can be applied
    // to each element in a collection, returning the desired result — either
    // identity, an arbitrary callback, a property matcher, or a property accessor.
    var cb = function(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };

    // 内部函数使用了cb来分发处理,产生相应的回调
    // 本质上使用了调用过闭包的函数,把相应的参数保留下来,方便调用
    _.iteratee = function(value, context) {
        return cb(value, context, Infinity);
    };

    // An internal function for creating assigner functions.
    // 可以看到,这个函数的使用里,基本都是extend方法,也就是复制对象值
    // 在zepto或者jQuery中,都会有extend方法,而这里因为分成了三种方法,而功能差不多,所以代码设计api可以理解一下
    var createAssigner = function(keysFunc, undefinedOnly) {
        return function(obj) {
            // 这里使用了闭包,在返回给相应函数做处理时,将参数做了判断,既保留了api函数的参数值规则,又在返回的函数中对于真实传入的参数做了处理
            var length = arguments.length;
            if (length < 2 || obj == null) return obj; // 判断是否只有一个属性,或者为null

            for (var index = 1; index < length; index++) {
                // 枚举第一个对象除外的对象参数
                // 这里的keysFunc使用allKeys或keys来获取所有可枚举的键名称
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                // 遍历键值对
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    // _.extend 和 _.extendOwn 方法
                    // 没有传入 undefinedOnly 参数，即 !undefinedOnly 为 true
                    // 即肯定会执行 obj[key] = source[key]
                    // 后面对象的键值对直接覆盖 obj
                    // ==========================================
                    // _.defaults 方法，undefinedOnly 参数为 true
                    // 即 !undefinedOnly 为 false
                    // 那么当且仅当 obj[key] 为 undefined 时才覆盖
                    // 即如果有相同的 key 值，取最早出现的 value 值
                    // *defaults 中有相同 key 的也是一样取首次出现的
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }

            // 这里的obj只代表第一个参数,也就是在调用_.extend或_.extendOwn时,第一个被扩展的对象(a,b,c)
            return obj;
        };
    };

    // An internal function for creating a new object that inherits from another.
    // 创建一个从另一个对象继承的新对象的内部函数。
    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);

        // 这里把原型链保存在一个新的对象中并返回,实际上与原来的对象拉开了关系
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };

    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Math.pow(2, 53) - 1 是 JavaScript 中能精确表示的最大数字
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    // 判断是否是 ArrayLike Object
    // 类数组，即拥有 length 属性并且 length 属性值为 Number 类型的元素
    // 包括数组、arguments、HTML Collection 以及 NodeList 等等
    // 包括类似 {length: 10} 这样的对象
    // 包括字符串、函数等
    // 这里与zepto不同的是,不仅判断了是否有length属性,而且判断是否超标
    var isArrayLike = function(collection) {
        var length = collection != null && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // Collection Functions
    // 集合的扩展方法()
    // --------------------

    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    // each或者forEach
    // 每次调用iteratee都会传递三个参数：(element, index, list)
    // 如果list是个JavaScript对象，iteratee的参数是 (value, key, list))。返回list以方便链式调用。
    _.each = _.forEach = function(obj, iteratee, context) {
        // 根据 context 确定不同的迭代函数
        iteratee = optimizeCb(iteratee, context);
        var i, length;

        // 类数组
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            // 获取对象的所有 key 值
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }

        // 返回 obj 参数
        // 供链式调用（Returns the list for chaining）
        return obj;
    };

    // Return the results of applying the iteratee to each element.
    // 与 ES5 中 Array.prototype.map 使用方法类似
    // 传参形式与 _.each 方法类似
    // 遍历数组（每个元素）或者对象的每个元素（value）
    // 对每个元素执行 iteratee 迭代方法
    // 将结果保存到新的数组中，并返回
    // 实质上是使用函数进行数组的每个值的处理之后,将处理完的值进行返回
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    // Create a reducing function iterating left or right.
    // 创建一个迭代函数 用于reduce和reduceRight的调用api
    function createReduce(dir) {
        // Optimized iterator function as using arguments.length
        // in the main function will deoptimize the, see #1991.
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }

        // _.reduce（_.reduceRight）可传入的 4 个参数
        // obj 数组或者对象
        // iteratee 迭代方法，对数组或者对象每个元素执行该方法
        // memo 初始值，如果有，则从 obj 第一个元素开始迭代
        // 如果没有，则从 obj 第二个元素开始迭代，将第一个元素作为初始值
        // context 为迭代函数中的 this 指向
        return function(obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            // Determine the initial value if none is provided.
            if (arguments.length < 3) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        };
    }

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    // 与 ES5 中 Array.prototype.reduce 使用方法类似
    // 这里传入的dir确定了数据会从左边开始,递增
    _.reduce = _.foldl = _.inject = createReduce(1);

    // The right-associative version of reduce, also known as `foldr`
    // 与 ES5 中 Array.prototype.reduceRight 使用方法类似.
    // 这里传入的dir确定了数据会从右边开始,也就是递减
    _.reduceRight = _.foldr = createReduce(-1);

    // Return the first value which passes a truth test. Aliased as `detect`.
    // 在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。
    // 注意,这里return是返回的数组中的项而不是下标
    _.find = _.detect = function(obj, predicate, context) {
        var key;
        if (isArrayLike(obj)) {
            // 如果 obj 是数组，key 为满足条件的下标
            key = _.findIndex(obj, predicate, context);
        } else {
            // 如果 obj 是对象，key 为满足条件的元素的 key 值
            key = _.findKey(obj, predicate, context);
        }

        // 如果该元素存在，则返回该元素
        // 如果不存在，则默认返回 undefined（函数没有返回，即返回 undefined）
        if (key !== void 0 && key !== -1) return obj[key];
    };

    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    // 与 ES5 中 Array.prototype.filter 使用方法类似 过滤器
    // 寻找数组或者对象中所有满足条件的元素
    // 如果是数组，则将 `元素值` 存入数组
    // 如果是对象，则将 `value 值` 存入数组
    // 返回该数组
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];

        // 根据 this 指向，返回 predicate 函数（判断函数）
        predicate = cb(predicate, context);

        // 遍历每个元素，如果符合条件则存入数组
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    // Return all the elements for which a truth test fails.
    // 寻找数组或者对象中所有不满足条件的元素
    // 并以数组方式返回
    // 所得结果是 _.filter 方法的补集,其中_.negate返回的是一个相反的判断条件
    _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    // 与 ES5 中的 Array.prototype.every 方法类似
    // 判断数组中的每个元素或者对象中每个 value 值是否都满足 predicate 函数中的判断条件
    // 如果是，则返回 ture；否则返回 false（有一个不满足就返回 false）
    // _.every(list, [predicate], [context])
    _.every = _.all = function(obj, predicate, context) {
        // 根据 this 指向，返回相应 predicate 函数
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            // 如果有一个无法满足条件的值,则返回false
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    // 与 ES5 中 Array.prototype.some 方法类似
    // 判断数组或者对象中是否有一个元素（value 值 for object）满足 predicate 函数中的条件
    // 如果是则返回 true；否则返回 false
    _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };

    // Determine if the array or object contains a given value (using `===`).
    // Aliased as `includes` and `include`.
    // 判断数组或者对象中（value 值）是否有指定元素
    // 如果是 object，则忽略 key 值，只需要查找 value 值即可
    // 即该 obj 中是否有指定的 value 值
    // 返回布尔值
    _.contains = _.includes = _.include = function(obj, target, fromIndex) {
        if (!isArrayLike(obj)) obj = _.values(obj);

        // 直接通过indexOf来查找元素,如果正确,返回的下标肯定大于等于0
        return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
    };

    // Invoke a method (with arguments) on every item in a collection.
    // 数组或者对象中的每个元素都调用 method 方法
    // 返回调用后的结果（数组或者关联数组）
    // method 参数后的参数会被当做参数传入 method 方法中
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            // 如果 method 不是函数，则可能是 obj 的 key 值
            // 而 obj[method] 可能为函数
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    };

    // Convenience version of a common use case of `map`: fetching a property.
    // 萃取数组对象中某属性值，返回一个数组。
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    // 遍历list中的每一个值，返回一个数组，这个数组包含properties所列出的属性的所有的 键 - 值对。
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    // 遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };

    // Return the maximum element (or element-based computation).
    // 返回list中的最大值
    _.max = function(obj, iteratee, context) {
        var result = -Infinity,
            lastComputed = -Infinity,
            value, computed;
        // 这里同样根据参数的类型做判断
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list);
                // && 的优先级高于 ||
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Return the minimum element (or element-based computation).
    // 寻找最小的元素
    _.min = function(obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Shuffle a collection, using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    // 将数组乱序
    // 如果是对象，则返回一个数组，数组由对象 value 值构成
    // Fisher-Yates shuffle 算法
    // 最优的洗牌算法，复杂度 O(n)
    // 乱序不要用 sort + Math.random()，复杂度 O(nlogn)
    // 而且，并不是真正的乱序
    _.shuffle = function(obj) {
        var set = isArrayLike(obj) ? obj : _.values(obj);
        var length = set.length;

        // 乱序后返回的数组副本（参数是对象则返回乱序后的 value 数组）
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            // 将当前所枚举位置的元素和 `index=rand` 位置的元素交换
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    };

    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    // 随机返回数组或者对象中的一个元素
    // 如果指定了参数 `n`，则随机返回 n 个元素组成的数组
    // 如果参数是对象，则数组由 values 组成
    _.sample = function(obj, n, guard) {
        // 当只有一个元素要返回时,调用_.random返回一个随机的下标
        if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }

        // 这里再次使用了shuffle,并截取1或n个元素,从0开始
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };

    // Sort the object's values by a criterion produced by an iteratee.
    // 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。
    // 主要针对iteratee来进行扩展,将每一个list的项在处理过后,通过array.sort的方法,来动态排序
    _.sortBy = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };

    // An internal function used for aggregate "group by" operations.
    // behavior 是一个函数参数
    // _.groupBy, _.indexBy 以及 _.countBy 其实都是对数组元素进行分类
    // 分类规则就是 behavior 函数
    var group = function(behavior) {
        return function(obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    // 把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.
    // 同样使用了闭包,将group中通过这里的behavior函数来处理,这时key已存在于返回函数中,再通过push来达到分类的目的
    // 最后返回一个result
    _.groupBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key].push(value);
        else result[key] = [value];
    });

    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    // 相比较上面而言,这里的key是固定的,所以不存在多个分类的情况
    _.indexBy = group(function(result, value, key) {
        result[key] = value;
    });

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    // 相比较groupBy,这里是对于项的计数,返回的也是类的条目
    _.countBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key]++;
        else result[key] = 1;
    });

    // Safely create a real, live array from anything iterable.
    // 把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
    };

    // Return the number of elements in an object.
    // 返回集合的长度,这里如果不是类数组,则返回的是对象的keys的长度
    _.size = function(obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };

    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    // 建立两个内部数组,根据predicate函数的返回值,来确定true,or,false并分别加入数组中
    _.partition = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [],
            fail = [];
        _.each(obj, function(value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [pass, fail];
    };

    // Array Functions
    // 数组的扩展方法
    // ---------------

    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    // 返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始的n个元素（愚人码头注：返回数组中前 n 个元素.）。
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };

    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    // 返回数组中除了最后一个元素外的其他全部元素。
    // 这里只是保证了不出现负数
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    // 返回array（数组）的最后一个元素
    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    // 返回数组中除了第一个元素外的其他全部元素
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    // Trim out all falsy values from an array.
    // 使用过滤函数
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };

    // Internal implementation of a recursive `flatten` function.
    // 递归调用函数,如果有多层的话;或者直接返回一个数组
    // 使用shallow判断,是否只需要一层结构就好,
    var flatten = function(input, shallow, strict, startIndex) {
        var output = [],
            idx = 0;
        for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                //flatten current level of array or arguments object
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0,
                    len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                // 如果是深度展开，即 shallow 参数为 false
                // 那么当最后 value 不是数组，是基本类型时
                // 肯定会走到这个 else-if 判断中
                // 而如果此时 strict 为 true，则不能跳到这个分支内部
                // 所以 shallow === false 如果和 strict === true 搭配
                // 调用 flatten 方法得到的结果永远是空数组 []
                output[idx++] = value;
            }
        }
        return output;
    };

    // Flatten out an array, either recursively (by default), or just one level.
    // 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, false);
    };

    // Return a version of the array that does not contain the specified value(s).
    // 返回一个删除所有values值后的 array副本
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    // 数组去重
    // 如果第二个参数 `isSorted` 为 true
    // 则说明事先已经知道数组有序
    // 程序会跑一个更快的算法（一次线性比较，元素和数组前一个元素比较即可）
    // 如果有第三个参数 iteratee，则对数组每个元素迭代
    // 对迭代之后的结果进行去重
    // 返回去重后的数组（array 的子数组）
    // PS: 暴露的 API 中没 context 参数
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        if (array == null) return [];

        // 如果没有isSorted,则将参数提前
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            // 如果指定了迭代函数
            // 则对数组每一个元素进行迭代
            // 迭代函数传入的三个参数通常是 value, index, array 形式
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                // 当i为0,也就是第一项时,直接推入队列
                if (!i || seen !== computed) result.push(value);
                // seen 保存当前元素，供下一次对比
                seen = computed;
            } else if (iteratee) {
                // 只有在computed不存在在seen时,则push
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                // 如果不用经过迭代函数计算，也就不用 seen[] 变量了,则直接push
                result.push(value);
            }
        }
        return result;
    };

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    // 返回传入的 arrays（数组）并集
    // 也就是先使用flatten将元素都集中到一个数组,再对该数组去重
    _.union = function() {
        return _.uniq(flatten(arguments, true, true));
    };

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    // 寻找几个数组中共有的元素
    // 将这些每个数组中都有的元素存入另一个数组中返回
    _.intersection = function(array) {
        if (array == null) return [];
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = array.length; i < length; i++) {
            var item = array[i];

            // 如果 result[] 中已经有 item 元素了，continue
            // 即 array 中出现了相同的元素
            // 返回的 result[] 其实是个 "集合"（是去重的）
            if (_.contains(result, item)) continue;

            for (var j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) break;
            }

            // 遍历其他参数数组完毕
            // j === argsLength 说明其他参数数组中都有 item 元素
            // 则将其放入 result[] 中
            if (j === argsLength) result.push(item);
        }
        return result;
    };

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    // 类似于without，但返回的值来自array参数数组，并且不存在于other 数组.
    _.difference = function(array) {
        var rest = flatten(arguments, true, true, 1);
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    // 将 每个arrays中相应位置的值合并在一起。
    _.zip = function() {
        return _.unzip(arguments);
    };

    // Complement of _.zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices
    // 与zip功能相同，给定若干arrays，返回一串联的新数组
    _.unzip = function(array) {
        var length = array && _.max(array, 'length').length || 0;
        var result = Array(length);

        console.log(length);
        // 通过length值,来确定,是
        for (var index = 0; index < length; index++) {
            result[index] = _.pluck(array, index);
        }
        return result;
    };

    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values.
    // 将数组转化为对象
    _.object = function(list, values) {
        var result = {};
        for (var i = 0, length = list && list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = function(array, item, isSorted) {
        var i = 0,
            length = array && array.length;
        if (typeof isSorted == 'number') {
            i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        } else if (isSorted && length) {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
        }
        if (item !== item) {
            return _.findIndex(slice.call(array, i), _.isNaN);
        }
        for (; i < length; i++)
            if (array[i] === item) return i;
        return -1;
    };

    _.lastIndexOf = function(array, item, from) {
        var idx = array ? array.length : 0;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        if (item !== item) {
            return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
        }
        while (--idx >= 0)
            if (array[idx] === item) return idx;
        return -1;
    };

    // Generator function to create the findIndex and findLastIndex functions
    // (dir === 1) => 从前往后找
    // (dir === -1) => 从后往前找
    // 查找元素在数组中的位置
    function createIndexFinder(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            var length = array != null && array.length;
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    }

    // Returns the first index on an array-like that passes a predicate test
    _.findIndex = createIndexFinder(1);

    _.findLastIndex = createIndexFinder(-1);

    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    // 二分查找
    // 将一个元素插入已排序的数组
    // 返回该插入的位置下标
    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = array.length;
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1;
            else high = mid;
        }
        return low;
    };

    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    // 一个用来创建整数灵活编号的列表的函数，便于each 和 map循环。如果省略start则默认为 0；step 默认为 1.返回一个从start 到stop的整数的列表，用step来增加 （或减少）独占。值得注意的是，如果stop值在start前面（也就是stop值小于start值），那么值域会被认为是零长度，而不是负增长。-如果你要一个负数的值域 ，请使用负数step.
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    // Function (ahem) Functions
    // 函数相关的方法
    // ------------------

    // Determines whether to execute a function as a constructor
    // or a normal function with the provided arguments
    // 决定是否使用提供的参数来执行构造函数或正常函数
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        // 非 new 调用 _.bind 返回的方法（即 bound）
        // callingContext 不是 boundFunc 的一个实例
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);

        // 如果是用 new 调用 _.bind 返回的方法
        // self 为 sourceFunc 的实例，继承了它的原型链
        // self 理论上是一个空对象（还没赋值），但是有原型链
        var self = baseCreate(sourceFunc.prototype);

        // 用 new 生成一个构造函数的实例
        // 正常情况下是没有返回值的，即 result 值为 undefined
        // 如果构造函数有返回值
        // 如果返回值是对象（非 null），则 new 的结果返回这个对象
        // 否则返回实例
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;

        // 否则返回 self
        // var result = sourceFunc.apply(self, args);
        // self 对象当做参数传入
        // 会直接改变值
        return self;
    };

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    // ES5 bind 方法的扩展（polyfill）
    // 将 func 中的 this 指向 context（对象）
    // _.bind(function, object, *arguments)
    // 可选的 arguments 参数会被当作 func 的参数传入
    // func 在调用时，会优先用 arguments 参数，然后使用 _.bind 返回方法所传入的参数
    _.bind = function(func, context) {
        // 如果es5自带的bind函数可以使用,则直接使用
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var args = slice.call(arguments, 2);
        var bound = function() {
            // args.concat(slice.call(arguments))
            // 最终函数的实际调用参数由两部分组成
            // 一部分是传入 _.bind 的参数（会被优先调用）
            // 另一部分是传入 bound（_.bind 所返回方法）的参数
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
        };
        return bound;
    };

    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    // _.partial 能返回一个方法
    // pre-fill 该方法的一些参数
    _.partial = function(func) {
        // 提取希望 pre-fill 的参数
        // 如果传入的是 _，则这个位置的参数暂时空着，等待手动填入
        var boundArgs = slice.call(arguments, 1);
        var bound = function() {
            var position = 0,
                length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
                // 如果该位置的参数为 _，则用 bound 方法的参数填充这个位置
                // args 为调用 _.partial 方法的 pre-fill 的参数 & bound 方法的 arguments
                args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
            }

            // bound 方法还有剩余的 arguments，添上去
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        };
        return bound;
    };

    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    // 把methodNames参数指定的一些方法绑定到object上，这些方法就会在对象的上下文环境中执行。绑定函数用作事件处理函数时非常便利，否则函数被调用时this一点用也没有。methodNames参数是必须的。
    // 这里相当于不仅要传入对象,还要指定对象上哪些方法需要指定上下文
    _.bindAll = function(obj) {
        var i, length = arguments.length,
            key;
        if (length <= 1) throw new Error('bindAll must be passed function names');
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };

    // Memoize an expensive function by storing its results.
    //「记忆化」，存储中间运算结果，提高效率
    // 参数 hasher 是个 function，用来计算 key
    // 如果传入了 hasher，则用 hasher 来计算 key
    // 否则用 key 参数直接当 key（即 memoize 方法传入的第一个参数）
    // _.memoize(function, [hashFunction])
    // 适用于需要大量重复求值的场景
    // 比如递归求解菲波那切数
    _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;

            // 求 key
            // 如果传入了 hasher，则用 hasher 函数来计算 key
            // 否则用 参数 key（即 memoize 方法传入的第一个参数）当 key
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    // 延迟触发某方法
    // _.delay(function, wait, *arguments)
    //  如果传入了 arguments 参数，则会被当作 func 的参数在触发时调用
    // 其实是封装了「延迟触发某方法」，使其复用
    // 如果传入了第三个及之后的参数,则会在延时执行时,被当做函数的参数进行使用
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    // 延时调用func,其实就是使用了setTimeout(func,1),来将函数调用栈顺序调至最后
    _.defer = _.partial(_.delay, _, 1);

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    // 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。
    // 每间隔 wait(Number) milliseconds 触发一次 func 方法
    // 如果 options 参数传入 {leading: false}
    // 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
    // 如果 options 参数传入 {trailing: false}
    // 那么最后一次回调不会被触发
    // **Notice: options 不能同时设置 leading 和 trailing 为 false**
    // 示例：
    // var throttled = _.throttle(updatePosition, 100);
    // $(window).scroll(throttled);
    // 调用方式（注意看 A 和 B console.log 打印的位置）：
    // _.throttle(function, wait, [options])
    // sample 1: _.throttle(function(){}, 1000)
    // print: A, B, B, B ...
    // sample 2: _.throttle(function(){}, 1000, {leading: false})
    // print: B, B, B, B ...
    // sample 3: _.throttle(function(){}, 1000, {trailing: false})
    // print: A, A, A, A ...
    _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            // console.log('B')
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                // console.log('A')
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // 如果已经存在一个定时器，则不会进入该 if 分支
                // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
                // 间隔 remaining milliseconds 后触发 later 方法
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // 函数去抖（连续事件触发结束后只触发一次）
    // sample 1: _.debounce(function(){}, 1000)
    // 连续事件结束后的 1000ms 后触发
    // sample 1: _.debounce(function(){}, 1000, true)
    // 连续事件触发后立即触发（此时会忽略第二个参数）
    _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = _.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    // 将第一个函数 function 封装到函数 wrapper 里面, 并把函数 function 作为第一个参数传给 wrapper. 这样可以让 wrapper 在 function 运行之前和之后 执行代码, 调整参数然后附有条件地执行.
    _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
    };

    // Returns a negated version of the passed-in predicate.
    // 返回一个 predicate 方法的对立方法
    // 即该方法可以对原来的 predicate 迭代结果值取补集
    _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this, arguments);
        };
    };

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    // 返回函数集 functions 组合后的复合函数, 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行.
    // 当然,顺序类似f(g(m()));由内而外
    _.compose = function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        };
    };

    // Returns a function that will only be executed on and after the Nth call.
    // 创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时, 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用。
    _.after = function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    // Returns a function that will only be executed up to (but not including) the Nth call.
    // 创建一个函数,调用不超过count 次。 当count已经达到时，最后一个函数调用的结果将被记住并返回。
    _.before = function(times, func) {
        var memo;
        return function() {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if (times <= 1) func = null;

            // 前 times - 1 次触发，memo 都是分别计算返回
            // 第 times 次开始，memo 值同 times - 1 次时的 memo
            return memo;
        };
    };

    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    // 函数至多只能被调用一次
    // 适用于这样的场景，某些函数只能被初始化一次，不得不设置一个变量 flag
    // 初始化后设置 flag 为 true，之后不断 check flag
    // ====== //
    // 其实是调用了 _.before 方法，并且将 times 参数设置为了默认值 2（也就是 func 至多能被调用 2 - 1 = 1 次）
    _.once = _.partial(_.before, 2);

    // Object Functions
    // object对象扩展方法
    // ----------------

    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    // IE < 9 下 不能用 for key in ... 来枚举对象的某些 key
    // 比如重写了对象的 `toString` 方法，这个 key 值就不能在 IE < 9 下用 for in 枚举到
    // IE < 9，{toString: null}.propertyIsEnumerable('toString') 返回 false
    // IE < 9，重写的 `toString` 属性被认为不可枚举
    // 据此可以判断是否在 IE < 9 浏览器环境中可以使用
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'
    ];

    // obj 为需要遍历键值对的对象
    // keys 为键数组
    // 利用 JavaScript 按值传递的特点
    // 传入数组作为参数，能直接改变数组的值
    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;

        // 获取对象的原型
        // 如果 obj 的 constructor 被重写
        // 则 proto 变量为 Object.prototype
        // 如果没有被重写
        // 则为 obj.constructor.prototype
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

        // Constructor is a special case.
        // `constructor` 属性需要特殊处理 (是否有必要？)
        // see https://github.com/hanzichi/underscore-analysis/issues/3
        // 如果 obj 有 `constructor` 这个 key
        // 并且该 key 没有在 keys 数组中
        // 存入 keys 数组
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

        // 遍历 nonEnumerableProps 数组中的 keys
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }

    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    // 检索object拥有的所有可枚举属性的名称。
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        // 如果浏览器支持 ES5 Object.key() 方法
        // 则优先使用该方法
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        // 通过上面的函数,修改fon in 在ie9以下,某些被重写的属性无法枚举的bug
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    // Retrieve all the property names of an object.
    // 返回一个对象的 keys 数组
    // 不仅仅是 own enumerable properties
    // 还包括原型链上继承的属性
    // 这里没有使用_.has来判断属性,所以,全部属性都会被返回
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    // Retrieve the values of an object's properties.
    // 将一个对象的所有 values 值放入数组中
    // 仅限 own properties 上的 values
    // 不包括原型链上的
    // 并返回该数组
    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // Returns the results of applying the iteratee to each element of the object
    // In contrast to _.map it returns an object
    // 跟 _.map 方法很像
    // 但是是专门为对象服务的 map 方法
    // 迭代函数改变对象的 values 值
    // 返回对象副本
    // 它类似于map，但是这用于对象。转换每个属性的值。
    _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {},
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys[index];

            // key 值不变
            // 对每个 value 值用迭代函数迭代
            // 返回经过函数运算后的值
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    // Convert an object into a list of `[key, value]` pairs.
    // 将一个对象转换为元素为 [key, value] 形式的数组
    // _.pairs({one: 1, two: 2, three: 3});
    // => [["one", 1], ["two", 2], ["three", 3]]
    _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    // Invert the keys and values of an object. The values must be serializable.
    // 将一个对象的 key-value 键值对颠倒
    // 即原来的 key 为 value 值，原来的 value 值为 key 值
    // 需要注意的是，value 值不能重复（不然后面的会覆盖前面的）
    // 且新构造的对象符合对象构造规则
    // 并且返回新构造的对象
    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    // 传入一个对象
    // 遍历该对象的键值对（包括 own properties 以及 原型链上的）
    // 如果某个 value 的类型是方法（function），则将该 key 存入数组
    // 将该数组排序后返回
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    // Extend a given object with all the properties in passed-in object(s).
    _.extend = createAssigner(_.allKeys);

    // Assigns a given object with all the own properties in the passed-in object(s)
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);

    // Returns the first key on an object that passes a predicate test
    // 跟数组方法的 _.findIndex 类似
    // 找到对象的键值对中第一个满足条件的键值对
    // 并返回该键值对 key 值
    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };

    // Return a copy of the object only containing the whitelisted properties.
    // 根据一定的需求（key 值，或者通过 predicate 函数返回真假）
    // 返回拥有一定键值对的对象副本
    // 第二个参数可以是一个 predicate 函数
    // 也可以是 >= 0 个 key
    _.pick = function(object, oiteratee, context) {
        var result = {},
            obj = object,
            iteratee, keys;
        if (obj == null) return result;
        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee, context);
        } else {
            // 如果第二个参数不是函数
            // 则后面的 keys 可能是数组
            // 也可能是连续的几个并列的参数
            // 用 flatten 将它们展开
            keys = flatten(arguments, false, false, 1);
            iteratee = function(value, key, obj) { return key in obj; };
            obj = Object(obj);
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) result[key] = value;
        }
        return result;
    };

    // Return a copy of the object without the blacklisted properties.
    // 跟 _.pick 方法相对
    // 返回 _.pick 的补集
    // 即返回没有指定 keys 值的对象副本
    // 或者返回不能通过 predicate 函数的对象副本
    _.omit = function(obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function(value, key) {
                return !_.contains(keys, key);
            };
        }
        // 意思是将函数取反,来达到判断条件完全反过来,再使用pick,自然就是补集了
        return _.pick(obj, iteratee, context);
    };

    // Fill in a given object with default properties.
    // 和 _.extend 非常类似
    // 区别是如果 *defaults 中出现了和 object 中一样的键
    // 则不覆盖 object 的键值对
    // 如果 *defaults 多个参数对象中有相同 key 的对象
    // 则取最早出现的 value 值
    // 参数个数 >= 1
    _.defaults = createAssigner(_.allKeys, true);

    // Creates an object that inherits from the given prototype object.
    // If additional properties are provided then they will be added to the
    // created object.
    // 给定 prototype
    // 以及一些 own properties
    // 构造一个新的对象并返回
    _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
    };

    // Create a (shallow-cloned) duplicate of an object.
    // 对象的 `浅复制` 副本
    // 注意点：所有嵌套的对象或者数组都会跟原对象用同一个引用
    // 所以是为浅复制，而不是深度克隆
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;

        // 如果是数组，则用 obj.slice() 返回数组副本
        // 如果是对象，则提取所有 obj 的键值对覆盖空对象，返回
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    // 用 object作为参数来调用函数interceptor，然后返回object。这种方法的主要意图是作为函数链式调用 的一环, 为了对此对象执行操作并返回对象本身。
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };

    // Returns whether an object has a given set of `key:value` pairs.
    // attrs 参数为一个对象
    // 判断 object 对象中是否有 attrs 中的所有 key-value 键值对
    // 返回布尔值
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;

        // 如果 object 为空
        // 根据 attrs 的键值对数量返回布尔值
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };


    // Internal recursive comparison function for `isEqual`.
    // "内部的"/ "递归地"/ "比较"
    // 该内部方法会被递归调用
    var eq = function(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        // a === b 时
        // 需要注意 `0 === -0` 这个 special case
        // 0 和 -0 被认为不相同（unequal）
        // 至于原因可以参考上面的链接
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        // 如果 a 和 b 是 underscore OOP 的对象
        // 那么比较 _wrapped 属性值（Unwrap）
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        // 用 Object.prototype.toString.call 方法获取 a 变量类型
        var className = toString.call(a);
        // 如果 a 和 b 类型不相同，则返回 false
        if (className !== toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            // 以上五种类型的元素可以直接根据其 value 值来比较是否相等
            case '[object RegExp]':
                // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return '' + a === '' + b;
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive.
                // Object(NaN) is equivalent to NaN
                // 如果 +a !== +a
                // 那么 a 就是 NaN
                // 判断 b 是否也是 NaN 即可
                if (+a !== +a) return +b !== +b;
                // An `egal` comparison is performed for other numeric values.
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a === +b;
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            // 如果 a 不是 object 或者 b 不是 object
            // 则返回 false
            if (typeof a != 'object' || typeof b != 'object') return false;

            // Objects with different constructors are not equivalent, but `Object`s or `Array`s
            // from different frames are.
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                    _.isFunction(bCtor) && bCtor instanceof bCtor) &&
                ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

        // Initializing stack of traversed objects.
        // It's done here since we only need them for objects and arrays comparison.
        // 第一次调用 eq() 函数，没有传入 aStack 和 bStack 参数
        // 之后递归调用都会传入这两个参数
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a) return bStack[length] === b;
        }

        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);

        // Recursively compare objects and arrays.
        // 将嵌套的对象和数组展开
        // 如果 a 是数组
        // 因为嵌套，所以需要展开深度比较
        if (areArrays) {
            // Compare array lengths to determine if a deep comparison is necessary.
            // 根据 length 判断是否应该继续递归对比
            length = a.length;

            // 如果 a 和 b length 属性大小不同
            // 那么显然 a 和 b 不同
            // return false 不用继续比较了
            if (length !== b.length) return false;
            // Deep compare the contents, ignoring non-numeric properties.
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            // Deep compare objects.
            var keys = _.keys(a),
                key;
            length = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            if (_.keys(b).length !== length) return false;
            while (length--) {
                // Deep compare each member
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        // Remove the first object from the stack of traversed objects.
        // 与 aStack.push(a) 对应
        // 此时 aStack 栈顶元素正是 a
        // 而代码走到此步
        // a 和 b isEqual 确认
        // 所以 a，b 两个元素可以出栈
        aStack.pop();
        bStack.pop();
        return true;
    };

    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function(a, b) {
        return eq(a, b);
    };

    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    // 是否是 {}、[] 或者 "" 或者 null、undefined
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };

    // Is a given value a DOM element?
    // 确保 obj 不是 null, undefined 等假值
    // 并且 obj.nodeType === 1
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    // 判断是否为数组
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    // Is a given variable an object?
    // 判断是否为对象
    // 这里的对象包括 function 和 object
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    // _.isArguments 方法在 IE < 9 下的兼容
    // IE < 9 下对 arguments 调用 Object.prototype.toString.call 方法
    // 结果是 => [object Object]
    // 而并非我们期望的 [object Arguments]。
    // so 用是否含有 callee 属性来做兼容
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return _.has(obj, 'callee');
        };
    }

    // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
    // IE 11 (#1621), and in Safari 8 (#1929).
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }

    // Is a given object a finite number?
    // 判断是否是有限的数字
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    _.isNaN = function(obj) {
        // 这样会自动转类型,使用了+相当于new Number()
        return _.isNumber(obj) && obj !== +obj;

        //return _.isNumber(obj) && isNaN(obj); es6
    };

    // Is a given value a boolean?
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    // Is a given value equal to null?
    _.isNull = function(obj) {
        return obj === null;
    };

    // Is a given variable undefined?
    // 判断是否是 undefined
    // undefined 能被改写 （IE < 9）
    // undefined 只是全局对象的一个属性
    // 在局部环境能被重新定义
    // 但是「void 0」始终是 undefined
    _.isUndefined = function(obj) {
        return obj === void 0;
    };

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    // 判断对象中是否有指定key
    // obj 不能为 null 或者 undefined
    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    // Utility Functions
    // 工具类方法
    // -----------------

    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    // 如果全局环境中已经使用了 `_` 变量
    // 可以用该方法返回其他变量
    // 继续使用 underscore 中的方法
    // var underscore = _.noConflict();
    // underscore.each(..);
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };

    // Keep the identity function around for default iteratees.
    // 能简化很多迭代函数的书写
    _.identity = function(value) {
        return value;
    };

    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function(value) {
        return function() {
            return value;
        };
    };

    _.noop = function() {};

    _.property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    // Generates a function for a given object that returns a given property.
    _.propertyOf = function(obj) {
        return obj == null ? function() {} : function(key) {
            return obj[key];
        };
    };

    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    // 判断一个给定的对象是否有某些键值对
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    };

    // Run a function **n** times.
    // 执行某函数 n 次
    _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };

    // Return a random integer between min and max (inclusive).
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function() {
        return new Date().getTime();
    };

    // List of HTML entities for escaping.
    //  能将 & " ' < > 转为实体编码（下面的前 5 种）
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };

    // 用于解码
    var unescapeMap = _.invert(escapeMap);

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);

    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    _.result = function(object, property, fallback) {
        var value = object == null ? void 0 : object[property];
        if (value === void 0) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
    };

    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    // 生成客户端临时的 DOM ids
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    // Underscore 默认采用 ERB-style 风格模板，也可以根据自己习惯自定义模板
    // 1. <%  %> - to execute some code
    // 2. <%= %> - to print some value in template
    // 3. <%- %> - to print some values HTML escaped
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function(match) {
        return '\\' + escapes[match];
    };

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings); // 相同的 key，优先选择 settings 对象中的
        // 其次选择 _.templateSettings 对象中的
        // 生成最终用来做模板渲染的字符串
        // 自定义模板优先于默认模板 _.templateSettings
        // 如果定义了相同的 key，则前者会覆盖后者

        // Combine delimiters into one regular expression via alternation.
        var matcher = RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offest.
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function(data) {
            // render 为模板渲染函数
            // 传入参数 _ ，使得模板里 <%  %> 里的代码能用 underscore 的方法
            //（<%  %> - to execute some code）
            return render.call(this, data, _);
        };

        // Provide the compiled source as a convenience for precompilation.
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };

    // Add a "chain" function. Start chaining a wrapped Underscore object.
    _.chain = function(obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.

    // Helper function to continue chaining intermediate results.
    // OOP
    // 如果 `_` 被当做方法（构造函数）调用, 则返回一个被包装过的对象
    // 该对象能使用 underscore 的所有方法
    // 并且支持链式调用

    // Helper function to continue chaining intermediate results.
    // 一个帮助方法（Helper function）
    var result = function(instance, obj) {
        // 如果需要链式操作，则对 obj 运行 _.chain 方法，使得可以继续后续的链式操作
        // 如果不需要，直接返回 obj
        return instance._chain ? _(obj).chain() : obj;
    };

    // Add your own custom functions to the Underscore object.
    // 可向 underscore 函数库扩展自己的方法
    // obj 参数必须是一个对象（JavaScript 中一切皆对象）
    // 且自己的方法定义在 obj 的属性上
    // 如 obj.myFunc = function() {...}
    // 形如 {myFunc: function(){}}
    // 之后便可使用如下: _.myFunc(..) 或者 OOP _(..).myFunc(..)
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                // 执行 func 方法
                // 支持链式操作
                return result(this, func.apply(_, args));
            };
        });
    };

    // Add all of the Underscore functions to the wrapper object.
    // 将前面定义的 underscore 方法添加给包装过的对象
    // 即添加到 _.prototype 中
    // 使 underscore 支持面向对象形式的调用
    _.mixin(_);

    // 整个链式,使用了这里的_.mixin(_),相当于每个返回的对象都因为result函数而有了两种方式返回,一种就是直接返回obj,也就是处理过的数据,一种返回_.chain(),相当于返回_对象,来达到每一次的返回值都是this.而在下面,将计算出来的值都赋给this._wrapped,并在调用_.value时,返回它

    // Add all mutator Array functions to the wrapper.
    // 将 Array 原型链上有的方法都添加到 underscore 中
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return result(this, obj);
        };
    });

    // Add all accessor Array functions to the wrapper.
    _.each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result(this, method.apply(this._wrapped, arguments));
        };
    });

    // Extracts the result from a wrapped and chained object.
    // 一个包装过(OOP)并且链式调用的对象
    // 用 value 方法获取结果
    // _(obj).value === obj?
    _.prototype.value = function() {
        return this._wrapped;
    };

    // Provide unwrapping proxy for some methods used in engine operations
    // such as arithmetic and JSON stringification.
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

    _.prototype.toString = function() {
        return '' + this._wrapped;
    };

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function() {
            return _;
        });
    }
}.call(this)); // 这里是使用了call设置上下文对象,并执行
