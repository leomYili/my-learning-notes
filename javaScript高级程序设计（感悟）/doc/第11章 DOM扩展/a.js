var eleven_chapter = {
  'name': 'DOM',
  'small': '第11章',
  'content': 'DOM扩展',
  'subStr': [{
    'name': '选择符API',
    'content': [{
      'body': '最常用的功能，就是根据CSS选择符选择与某个模式匹配的DOM元素。jQuery的核心就是通过css选择符查询DOM文档取得元素的引用。',
      'conSub': []
    }, {
      'body': 'Selectors API Level1的核心是两个方法：querySelector()和querySelectorAll()支持的浏览器有IE8+、Firefox3.5+、safari3.5+、Chrome和Opera 10+',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'querySelector()',
      'content': [{
        'body': '该方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有，返回null，通过Document类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素，而通过Element类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'querySelectorAll()',
      'content': [{
        'body': 'querySelectorAll()方法接收的参数与querySelector()方法一样，都是一个css选择符，但返回的是一个nodelist的实例，其底层实现则类型于一组元素的快照，而非不断对文档进行搜索的动态查询，如果没有找到元素，则该方法返回null，要取得nodelist中的某一个元素，可以使用item()方法，也可以使用方括号方法。',
        'conSub': [{
          'name': 'nodeType的值为9'
        }, {
          'name': 'nodeName的值为"#document"'
        }, {
          'name': 'nodeValue的值为null'
        }, {
          'name': 'parentNode的值为null'
        }, {
          'name': 'ownerDocument的值为null'
        }, {
          'name': '其子节点可能是一个DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction或Comment'
        }]
      }],
      'extra_content': []
    }, {
      'name': 'matchesSelector()方法',
      'content': [{
        'body': 'Selectors API Level2 规范为element类型新增了一个方法matchesSelector()。这个方法接收一个参数，即css选择符，如果调用元素与该选择符匹配，返回true；否则，返回false。可以用来检测是否会被querySelector()或querySelectorAll()方法返回，该方法支持度低。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '元素遍历',
    'content': [{
      'body': 'Element Traversal API为DOM元素添加了以下5个属性，解决空格带来的空白节点',
      'conSub': [{
        'name': 'childElementCount:返回子元素（不包括文本节点和注释）的个数'
      }, {
        'name': 'firstElementChild:指向第一个子元素；firstChild的元素版'
      }, {
        'name': 'lastElementChild:指向最后一个子元素；lastChild的元素版'
      }, {
        'name': 'previousElementSibling:指向前一个同辈元素；previousSibling的元素版'
      }, {
        'name': 'nextElementSibling:指向后一个同辈元素；nextSibling的元素版'
      }]
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': 'HTML5',
    'content': [{
      'body': '定义了浏览器应该支持的DOM扩展和新增标记',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '与类相关',
      'content': [{
        'body': 'HTML5新增了API，致力简化CSS类的用法',
        'conSub': [{
          'name': 'getElementsByClassName()方法<br>可以通过document对象及所有HTML元素调用该方法。其接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的NodeList。传入多个类名时，类名的先后顺序不重要；调用这个方法时，只有位于调用元素子树中的元素才会返回。在document对象上调用getElementsByClassName()始终会返回与类名匹配的所有元素，在元素上调用该方法就只会返回后代元素中匹配的元素；支持的浏览器有IE9+、Firefox3+、Safari3.1+、Chrome和Opera9.5+'
        }, {
          'name': 'classList属性<br>在操作类名时，需要通过className属性添加、删除和替换类名。但很麻烦。HTML5简化了操作，为所有元素提供了classList属性。其是新集合类型DOMTokenList的实例。与其他DOM集合类似，DOMTokenList有一个表示自己包含多少元素的length属性，而要取得每个元素可以使用item()方法，也可以使用方括号语法。其定义了：<ul><li>add：将给定的字符串值添加到列表中，如果值已经存在，就不添加了</li><li>contains：表示列表中是否存在给定的值，如果存在则返回true，否则返回false</li><li>remove：从列表中删除给定的字符串</li><li>toggle：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它</li></ul>支持的浏览器有Firefox3.6+、Chrome'
        }]
      }],
      'extra_content': []
    }, {
      'name': '焦点管理',
      'content': [{
        'body': 'HTML5也添加了辅助管理DOM焦点的功能，首先就是document.activeElement属性，这个属性始终会引用DOM中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入和在代码中调用focus()方法。默认情况下，文档刚刚加载完时，document.activeElement中保存的是document.body元素的引用。文档加载期间，document.hasFocus()方法，这个方法用于确定文档是否获得了焦点。实现这两个属性的浏览器的包括IE4+、Firefox3.6+、Safari、Chrome和Opera8+',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'HTMLDocument的变化',
      'content': [{
        'body': 'HTML5扩展了HTMLDocument，增加了新功能。与HTML5中新增的其他DOM扩展类似，这些变化同样基于那些已经得到很多浏览器支持的扩展。',
        'conSub': [{
          'name': 'readyState属性<br>IE4最早为document对象引入了readyState属性。其有两个可能的值<ul><li>loading，正在加载文档</li><li>complete，已经加载完文档</li></ul>'
        }, {
          'name': '兼容模式<br>compatMode属性，在标准模式下，等于“CSS1Compat”，而在混杂模式下，document.compatMode的值等于“BackCompat”'
        }, {
          'name': 'head属性<br>作为对document.body引用文档的<body>元素的补充，HTML5新增了document.head属性。实现document.head属性的浏览器就包括Chrome和Safari5'
        }]
      }],
      'extra_content': []
    }, {
      'name': '字符集属性',
      'content': [{
        'body': 'charset属性表示文档中实际使用的字符集，也可以用来指定新字符集。默认情况下，这个属性的值为“UTF-16”，但可以通过<meta>元素、响应头部或直接设置charset属性修改这个值。另一个属性是defaultCharset，表示根据默认浏览器及操作系统的设置，当前文档默认的字符集应该是什么。支持前者的浏览器多些，而后者的有IE、Safari和Chrome',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '自定义数据属性',
      'content': [{
        'body': 'HTML5规定了可以为元素添加非标准的属性，以data-*开头，然后可以通过dataset属性来访问自定义属性的值。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '插入标记',
      'content': [{
        'body': 'HTML5将一些扩展纳入规范',
        'conSub': [{
          'name': 'innerHTML属性<br>其会返回与调用元素的所有子节点对应的HTML标记。在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个树完全替换调用元素原先的所有子节点。不同浏览器返回的文本格式会有所不同。在写模式下，innerHTML的值会被解析为DOM子树，替换调用元素原来的所有子节点。因为它的值被认为是HTML，所以其中的所有标签都会按照浏览器处理HTML的标准方式转换为元素。如果设置的值仅是文本而没有HTML标签，那么结果就是设置纯文本。并不是所有元素都支持innerHTMl属性'
        }, {
          'name': 'outerHTML属性<br>在读模式下，outerHTML返回调用它的元素及所有子节点的HTML标签。在写模式下，outerHTML会根据指定的HTML字符串创建新的DOM字树，然后用这个DOM子树完全替换调用元素。Firefox 7及之前版本都不支持outerHTML属性'
        }, {
          'name': 'insertAdjacentHTML()<br>插入标记的最后一个新增方式，其接收两个参数：插入位置和要插入的HTML文本。<ul><li>beforebegin,在当前元素之前插入一个紧邻的同辈元素</li><li>afterbegin，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素</li><li>beforeend，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素</li><li>afterend,在当前元素之后插入一个紧邻的同辈元素</li></ul>这些值都必须是小写形式。第二个参数是一个HTML字符串，如果浏览器无法解析该字符串，就会报错。'
        }, {
          'name': '内存和性能问题<br>使用上述介绍的方法替换子节点可能会导致浏览器的内存占用问题。在删除带有事件处理程序或引用了其他JavaScript对象子树时，就有可能导致内存占用问题。不过，使用一些innerHTML、outerHTML的，仍然可以提高便利程度'
        }]
      }],
      'extra_content': []
    }, {
      'name': 'scrollIntoView()方法',
      'content': [{
        'body': '其可以在所有HTML元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中，如果给其传入true，或者不传，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入false，调用元素会尽可能全部出现在视口中，不过顶部不一定平齐。支持的浏览器有IE、Firefox、Safari、Opera',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '专有扩展',
    'content': [{
      'body': '简介',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '文档模式',
      'content': [],
      'extra_content': []
    }, {
      'name': 'children属性',
      'content': [],
      'extra_content': []
    },{
      'name': 'contains()方法',
      'content': [{
        'body':'调用contains()方法的应该是祖先节点，这个方法接收一个参数，即要检测的后代节点。如果是后代节点返回true，否则false。支持的有IE、Firefox9+、Safari、Opera、Chrome；使用DOM Level3 compareDocumentPosition()也能确定节点之间的关系。返回位掩码。p300，支持的有IE9+、Firefox、Safari、Opera9.5+、Chrome',
        'conSub':[]
      }],
      'extra_content': []
    },{
      'name': '插入文本',
      'content': [],
      'extra_content': []
    },{
      'name': '滚动',
      'content': [{
        'body':'对于HTMLElement的扩展',
        'conSub':[{
          'name':'scrollIntoViewIfNeeded();只在元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见，如果元素可见，什么也不做，如果传参为true，则尽量显示在视口中部（垂直方向），Safari和Chrome实现了这个方法'
        },{
          'name':'scrollByLines();将元素的内容滚动指定的行高，Safari和Chrome实现了这个方法'
        },{
          'name':'scrollByPages();将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。Safari和Chrome实现了这个方法'
        }]
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': '节：',
    'conSub': [{
      'name': 'Selectors API，定义了两个方法，让开发人员能够基于CSS选择符从DOM中取得元素，这俩方法是querySelector()和querySelectorAll()'
    }, {
      'name': 'ELement Traversal，为DOM元素定义了额外的属性，是因为浏览器处理DOM元素间空白符的方式不一样'
    }, {
      'name': 'HTML5，规范和新增了很多属性'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
