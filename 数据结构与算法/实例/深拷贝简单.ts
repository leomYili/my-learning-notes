function getType(x) {
  return Object.prototype.toString.call(x);
}

// Object.create(null) 的对象，没有hasOwnProperty方法
function hasOwnProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isObject(obj) {
  return typeof obj === "object" && obj != null;
}

/**
 * 简单方式,不考虑循环引用,如果考虑循环引用,需要加字典表进行记忆,从而去判断
 * @param source
 * @returns
 */
function cloneDeep3(source) {
  if (!isObject(source)) return source; // 非对象返回自身

  var target = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep2(source[key]); // 注意这里
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

/**
 * 递归方式
 *
 * @param {*} source
 * @param {*} hash
 */
export function cloneDeep1(source, hash = new WeakMap()): any {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  var target = Array.isArray(source) ? [...source] : { ...source };

  hash.set(source, target); // 新增代码，哈希表设值 这里是引用，所以并不是初始值的意思，会在下面被改掉

  Reflect.ownKeys(target).forEach((key) => {
    // 改动 2
    if (isObject(source[key])) {
      target[key] = cloneDeep1(source[key], hash);
    } else {
      target[key] = source[key];
    }
  });

  return target;
}

/**
 * 循环方式
 */
export function cloneDeep2(x) {
  const root = {};

  const uniqueList = []; // 用来去重

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];

  while (loopList.length) {
    // 广度优先
    const node = loopList.shift();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (isObject(data[k])) {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === key) {
      return arr[i];
    }
  }

  return null;
}
