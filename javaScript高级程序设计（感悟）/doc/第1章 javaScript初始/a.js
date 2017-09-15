var first_chapter = {
  "name": "JavaScript的实现",
  "content": "JavaScript和ECMAScript不是一样的东西，应该说JavaScript由:ECMAScript,BOM,DOM组成",
  "subStr": [{
    "name": "ECMAScript(核心)",
    "content": "ECMAScript与浏览器没有依赖关系，实际上，这门语言本身并不包含输入和输出定义；web浏览器只是ECMAScript实现可能的宿主环境之一。宿主环境不仅提供基本的ECMAScript的实现，同时也会提供该语言的扩展，以便语言与环境之间对接交互。而这些扩展，则利用ECMAScript的核心类型和语法提供更多的功能",
    "extra_content": [{
      "content": "ECMAScript的版本，以第X版表示"
    }, {
      "content": "ECMAScript的兼容，支持ECMA-262描述的所有类型、值、对象、属性、函数以及程序句法和语义，且支持Unicode字符标准，才为兼容"
    }, {
      "content": "WEB浏览器对于ECMAScript的支持，ie5~ie8以下，safari 1-2.0x支持ec3，ie8及以上，safari 4.x~5.x,Firefox3.5以上支持ec5"
    }],
    "subStr": [{
      "name": "语法"
    }, {
      "name": "类型"
    }, {
      "name": "语句"
    }, {
      "name": "关键字"
    }, {
      "name": "保留字"
    }, {
      "name": "操作符"
    }, {
      "name": "对象"
    }]
  }, {
    "name": "DOM(文档对象模型)",
    "content": "是针对xml但经过扩展用于HTML的应用程序编程接口（API），DOM把整个页面映射为一个多层节点结构。HTML或XML页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据",
    "extra_content": [{
      "content": "因为要保持web跨平台的天性，保持兼容性，所以使用DOM"
    }, {
      "content": "DOM级别在DOM章节详细说明"
    }, {
      "content": "其他DOM标准：SVG"
    }, {
      "content": "WEB浏览器对于DOM的支持:ie5.5~8(1级几乎全部)，ie9+(1~3级)，opera 10+(1,2,3级部分)，safari 2+(1级，2级部分)，chrome 1+(1级，2级部分)，Firefox 1+(1级，2几乎全部，3级部分)"
    }],
    "subStr": [{
      "name": "语法"
    }, {
      "name": "类型"
    }, {
      "name": "语句"
    }, {
      "name": "关键字"
    }, {
      "name": "保留字"
    }, {
      "name": "操作符"
    }, {
      "name": "对象"
    }]
  }, {
    "name": "BOM(浏览器对象模型)",
    "content": "用来控制浏览器显示的页面以外的部分，只有在HTML5中才能得到较好的展现",
    "extra_content": [],
    "subStr": [{
      "name": "弹出新浏览器窗口的功能"
    }, {
      "name": "移动，缩放和关闭浏览器窗口的功能"
    }, {
      "name": "提供浏览器详细信息的navigator对象"
    }, {
      "name": "提供浏览器所加载页面的详细信息的location对象"
    }, {
      "name": "提供用户显示器分辨率详细信息的sceen对象"
    }, {
      "name": "对cookies的支持"
    }, {
      "name": "像XMLHttpRequest和IE的ActiveXObject这样的自定义对象"
    }]
  }],
  "sum": "JavaScript是一种专门为与网页交互而设计的脚本语言，由三个不同的部分组成：ECMAScript，DOM，BOM组成，在当前主要的浏览器中都得到了不同程度的支持。其中，所有浏览器对EC3的支持很好，对EC5的支持越来越高，但对DOM的支持则彼此相差很多，但对DOM的支持则彼此相差较多"
}
