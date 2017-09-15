var thirteen_chapter = {
  'name': '事件',
  'small': '第13章',
  'content': 'js和HTML之间的交互',
  'subStr': [{
    'name': '事件流',
    'content': [{
      'body': '事件流描述的是从页面中接收事件的顺序，有事件冒泡和事件捕获',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '事件冒泡',
      'content': [{
        'body': '事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）<pre>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;head&gt;<br>&lt;body&gt;<br>&lt;div id="myDIV"&gt;Click Me&lt;/div&gt;<br>&lt;/body&gt;<br>&lt;/head&gt;<br>&lt;/html&gt;</pre>',
        'conSub': []
      }, {
        'body': '如果点击了div元素，则会产生如下顺序：(1)div;(2)body;(3)html;(4)document;IE5.5及更早版本的事件冒泡会跳过html元素.IE9、Firefox、Chrome和Safari则将事件一直冒泡到window对象',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '事件捕获',
      'content': [{
        'body': '不常用',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'DOM事件流',
      'content': [{
        'body': 'DOM2级事件规定的事件流包括三个阶段:事件捕获阶段、处于目标阶段和事件冒泡阶段；而IE9、safari、Chrome、Firefox和Opera9.5及更高版本都会在捕获阶段触发事件对象上的事件。结果，有两次机会可以在目标对象上操作事件。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '事件处理程序',
    'content': [{
      'body': '事件就是用户或者浏览器自身执行的某种动作。诸如click、load和mouseover，都是事件的名字。而响应某个事件的函数就叫做事件处理程序。以“on”开头',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'HTML事件处理程序',
      'content': [{
        'body': '内联式处理程序，耦合性高',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'DOM0级事件处理程序',
      'content': [{
        'body': '传统方式，将一个函数赋值给一个事件处理程序属性。使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行；程序中的this引用当前元素，实际上可以在事件处理程序中通过this访问元素的任何属性和方法。以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理，也可以直接为该程序赋值为null，删除指定的事件处理程序',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'DOM2级事件处理程序',
      'content': [{
        'body': '其定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。所有DOM节点中都包含这两个方法，并且它们都接受三个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序<br>通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除；移除时传入的参数与添加处理程序时使用的参数相同。匿名函数无效；最好只在需要在事件到达目标之前截获它的时候将事件处理程序添加到捕获阶段。不建议在事件捕获阶段注册事件处理程序',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '跨浏览器的事件处理程序',
      'content': [{
        'body': '根据能力检测，做出自己的跨浏览器的事件处理程序',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '事件对象',
    'content': [{
      'body': '在触发DOM上的某个事件时，会产生一个事件对象event，这个对象包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'DOM中的事件对象',
      'content': [{
        'body': 'event对象表，p355；在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则this、currentTarget和target包含相同的值。stopPropagation()方法用于立即停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡。而事件对象的eventPhase属性，可以用来确定事件当前正处于事件流的哪个阶段。如果是在捕获阶段调用的事件处理程序，那么eventPhase等于1；如果事件处理程序处于目标对象上，则eventPhase等于2，最后一个被触发的事件处理程序，是在冒泡阶段执行的添加到document.body上的那一个，显示eventPhase的值为3，当eventPhase等于2时，this、target和currentTarget始终都是相等的。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '只有在事件处理程序执行期间，event对象才会存在；一旦事件处理程序执行完成，event对象就会被销毁'
      }]
    }, {
      'name': '跨浏览器的事件对象',
      'content': [{
        'body': '根据能力检测，得到跨浏览器的事件对象的引用',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '事件类型',
    'content': [{
      'body': 'DOM3级规定了以下几类事件',
      'conSub': [{
        'name': 'UI事件，当用户与页面上的元素交互时触发'
      }, {
        'name': '焦点事件，当元素获得或失去焦点时触发'
      }, {
        'name': '鼠标事件，当用户通过鼠标在页面上执行操作时触发'
      }, {
        'name': '滚轮事件，当使用鼠标滚轮（或类似设备时触发）'
      }, {
        'name': '文本事件，当在文档中输入文本时触发'
      }, {
        'name': '键盘事件，当用户通过键盘在页面上执行操作时触发'
      }, {
        'name': '合成事件，当为IME（输入法编辑器）输入字符时触发'
      }, {
        'name': '变动事件，当底层DOM结构发生变化时触发'
      }]
    }, {
      'body': '包括IE9在内的所有主流浏览器都支持DOM2级事件。IE9也支持DOM3级事件。',
      'conSub': ''
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'UI事件',
      'content': [{
        'body': 'UI事件指的是那些不一定与用户操作有关的事件，现有的UI事件如下',
        'conSub': [{
          'name': 'DOMActivate:表示元素已经被用户操作（通过鼠标或键盘激活。），已不使用'
        }, {
          'name': 'load:当页面完全加载后再window上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在img元素上面触发，或者当嵌入的内容加载完毕时在object元素上面触发'
        }, {
          'name': 'unload:当页面完全卸载后在window上触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在object上触发'
        }, {
          'name': 'abort:在用户停止下载过程中，如果嵌入的内容没有加载完，则在object元素上触发'
        }, {
          'name': 'error:当发生JavaScript错误时在window上触发，当无法加载图像时在img元素上触发，当无法加载嵌入内容时在object上触发。'
        }, {
          'name': 'select:当用户选择文本框中的一个或多个字符时触发。'
        }, {
          'name': 'resize:当窗口或框架的大小变化时在window或框架上面触发。'
        }, {
          'name': 'scroll:当窗口滚动带滚动条的元素中的内容时，在该元素上面触发，'
        }]
      }],
      'extra_content': []
    }, {
      'name': '焦点事件，当元素获得或失去焦点时触发',
      'content': [{
        'body': '其会在页面元素获得或失去焦点时触发。利用这些事件并与document.hasFocus()方法及document.activeElement属性配合，有以下事件',
        'conSub': [{
          'name': 'blur:在元素失去焦点时触发，这个事件不会冒泡；所有浏览器支持'
        }, {
          'name': '<s>DOMFocusIn:在元素获得焦点时触发</s>'
        }, {
          'name': '<s>DOMFocusOut:在元素失去焦点时触发。</s>'
        }, {
          'name': 'focus:在元素获得焦点时触发。这个事件不会冒泡；所有浏览器支持'
        }, {
          'name': 'focusin:在元素获得焦点时触发。这个事件与HTML事件focus等价，但它冒泡，支持的有IE5.5+、Safari5.1+、Opera11.5+和Chrome'
        }, {
          'name': 'focusout:在元素失去焦点时触发。这个事件是HTML事件blur的通用版本。支持这个事件的浏览器有IE5.5+、Safari5.1+、Opera11.5+、Chrome'
        }]
      }, {
        'body': '当焦点从页面的一个元素移动到另一个元素，会依次触发：',
        'conSub': [{
          'name': 'focusout在失去焦点的元素上触发'
        }, {
          'name': 'focuein在获得焦点的元素上触发'
        }, {
          'name': 'blur在失去焦点的元素上触发'
        }, {
          'name': 'focus在获得焦点的元素上触发'
        }]
      }],
      'extra_content': []
    }, {
      'name': '鼠标与滚轮事件',
      'content': [{
        'body': 'DOM3级定义了9个鼠标事件',
        'conSub': [{
          'name': 'click:单击鼠标或按回车时触发，'
        }, {
          'name': 'dbclick:在用户双击鼠标时触发，'
        }, {
          'name': 'mousedown:在用户按下鼠标按钮时触发，不能通过键盘触发该事件'
        }, {
          'name': 'mouseenter:在鼠标光标从元素外部首次移动到元素范围内触发，这个事件不冒泡，而且在光标移动到后代元素上不会触发，IE、Firefox9+、和Opera支持这个事件'
        }, {
          'name': 'mouseleave:在位于元素上方的鼠标光标移动到元素范围之外时触发，这个事件不冒泡，而且在光标移动到后代元素时不会触发，IE、Firefox9+、和Opera支持这个事件'
        }, {
          'name': 'mousemove:当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件'
        }, {
          'name': 'mouseout:在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入地另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件'
        }, {
          'name': 'mouseover:在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。不能通过键盘触发这个事件'
        }, {
          'name': 'mouseup:在用户释放鼠标按钮时触发。不能通过键盘触发这个事件'
        }]
      }],
      'extra_content': []
    }, {
      'name': '键盘文本事件',
      'content': [{
        'body': '用户在使用键盘时会触发键盘事件。',
        'conSub': [{
          'name': 'keydown:当用户按下键盘上的任意键触发,如果按着不放，会重复触发'
        }, {
          'name': 'keypress:当用户按下键盘上的字符键时触发，如果按着不放，会重复触发'
        }, {
          'name': 'keyup:当用户释放键盘上的键时触发'
        }]
      }, {
        'body': '只有一个文本事件：textInput，在文本插入文本框之前会触发textInput事件；textInput只会在用户按下能够输入实际字符的键时才会被触发，而keypress则在按下那些能够影响文本显示的键时也会触发；p380 键码',
        'conSub': []
      }, {
        'body': 'event还有一个属性，inputMethod，表示把文本输入到文本框中的方式',
        'conSub': [{
          'name': '0,表示浏览器不确定如何输入的'
        }, {
          'name': '1，表示使用键盘输入的'
        }, {
          'name': '2，表示文本是粘贴进来的'
        }, {
          'name': '3，表示文本是拖放进来的'
        }, {
          'name': '4，表示文本是使用IME输入的'
        }, {
          'name': '5，表示文本是通过在表单中选择某一项输入的'
        }, {
          'name': '6，表示文本是通过手写输入的'
        }, {
          'name': '7，表示文本是通过语音输入的'
        }, {
          'name': '8，表示文本是通过几种方法组合输入的'
        }, {
          'name': '9，表示文本是通过脚本输入的'
        }]
      }],
      'extra_content': []
    }, {
      'name': '<s>复合事件</s>',
      'content': [{
        'body': '用于处理IME的输入序列，有以下三种复合事件',
        'conSub': [{
          'name': 'compositionstart：在IME的文本复合系统打开时触发，'
        }, {
          'name': 'compositionupdate：在向输入字段中插入新字符时触发'
        }, {
          'name': 'compositionend：在IME的文本复合系统关闭时触发，表示返回正常键盘输入状态'
        }]
      }],
      'extra_content': []
    }, {
      'name': '变动事件',
      'content': [{
        'body': '能在DOM中的某一部分发生变化时给出提示',
        'conSub': [{
          'name': 'DOMSubtreeModified：在DOM结构中发生任何变化时触发'
        }, {
          'name': 'DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发'
        }, {
          'name': 'DOMNodeRemoved：在节点从其父节点中被移除时触发'
        }, {
          'name': 'DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在DOMNodeInserted之后触发'
        }, {
          'name': 'DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在DOMNodeRemoved之后触发'
        }, {
          'name': 'DOMAttrModified：在特性被修改之后触发'
        }, {
          'name': 'DOMCharacterDataModified：在文本节点的值发生变化时触发'
        }]
      }],
      'extra_content': []
    }, {
      'name': 'HTML5事件',
      'content': [{
        'body': '1.contextmenu事件<br>由于contextmenu事件是冒泡的，因此可以为document指定一个事件处理程序，用于处理页面中发生的所有此类事件。这个事件的目标是发生用户操作的元素，在所有浏览器都可以取消这个事件',
        'conSub': []
      }, {
        'body': '2.beforeunload事件<br>页面被关闭之前触发，可以通过它取消关闭页面，而继续浏览页面',
        'conSub': []
      }, {
        'body': '3.DOMContentLoaded事件<br>在形成完整的DOM树之后就触发',
        'conSub': []
      }, {
        'body': '4.readystatechange事件<br>目的是提供与文档或元素的加载状态有关的信息，支持该事件的每个对象有个readyState属性，包含',
        'conSub': [{
          'name': 'uninitialized(未初始化)：对象存在但尚未初始化'
        }, {
          'name': 'loading(正在加载)：对象正在加载数据'
        }, {
          'name': 'loaded(加载完毕)：对象加载数据完成'
        }, {
          'name': 'interactive(交互)：可以操作对象了，但还没有完全加载'
        }, {
          'name': 'complete(完成)：对象已经加载完毕'
        }]
      }, {
        'body': '但load事件与readystatechange事件并不能保证以相同的顺序触发。支持readystatechange事件的浏览器有IE、Firefox4+、Opera',
        'conSub': []
      }, {
        'body': '5.pageshow和pagehide事件<br>pageshow,在页面显示时触发。在重新加载的页面中，pageshow会在load事件触发后触发。而pagehide，会在浏览器卸载页面时触发，而且是在unload事件之前触发。支持的浏览器有Firefox、Safari5+、Chrome和Opera。IE9及之前版本不支持这两个事件',
        'conSub': []
      }, {
        'body': '6.hashchange事件<br>以便在URL的参数列表（及URL中#号后面的所有字符串）发生变化时通知开发人员。必须把hashchange事件添加给window对象。此时的event对象会额外包含两个属性：oldURL、newURL。支持hashchange事件的浏览器有IE8+、Firefox3.6+、Safari5+、Chrome、Opera10.6+，只有Firefox6+、Chrome、和Opera支持oldURL和newURl属性',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '设备事件',
      'content': [{
        'body': '1.orientationchange事件<br>为了开发人员能够确定用户何时将设备由横向查看模式切换为纵向查看模式。可能包含三个值，0为肖像模式，90表示向左旋转的横向模式，-90表示向右旋转的横向模式。',
        'conSub': []
      }, {
        'body': '2.MozOrientation事件<br>Firefox的检测设备的方向,但该事件只能提供一个平面的方向变化。',
        'conSub': []
      }, {
        'body': '3.deviceorientation事件<br>其是为了显示在空间中朝向哪儿，而不是如何移动支持的浏览器有IOS4.2+中的Safari、Chrome和Android版WebKit。',
        'conSub': []
      }, {
        'body': '4.devicemotion事件<br>设备什么时候移动。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '触摸与手势事件',
      'content': [{
        'body': 'Touch Events<br>1.触摸事件',
        'conSub': [{
          'name':'touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发'
        },{
          'name':'touchmove:当手指在屏幕上滑动时连续地触发。在这个期间，调用preventDefault()可以阻止滚动'
        },{
          'name':'touchend:当手指从屏幕上移开时触发'
        },{
          'name':'touchcancel:当系统停止跟踪触摸时触发？'
        }]
      },{
        'body':'上述几个事件都会冒泡，也都可以取消而且每个触摸事件的event对象都提供了在鼠标事件中常见的属性bubbles,cancelable,view,clientX,clientY,screenX,screenY,detail,altKey,shiftKey,ctrlKey和metaKey',
        'conSub':[{
          'name':'touches:表示当前跟踪的触摸操作的Touch对象的数组'
        },{
          'name':'targetTouchs：特定于事件目标的Touch对象的数组'
        },{
          'name':'changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组'
        }]
      },{
        'body':'每个Touch对象包含如下属性：',
        'conSub':[{
          'name':'clientX触摸目标在视口中的x坐标'
        },{
          'name':'clientY触摸目标在视口中的y坐标'
        },{
          'name':'identifier标识触摸的唯一ID'
        },{
          'name':'pageX:触摸目标在页面中的x坐标'
        },{
          'name':'pageY:触摸目标在页面中的y坐标'
        },{
          'name':'screenX:触摸目标在屏幕中的x坐标'
        },{
          'name':'screenY:触摸目标在屏幕中的y坐标'
        },{
          'name':'target:触摸的DOM节点目标'
        }]
      },{
        'body':'支持的浏览器有IOS版Safari、Android版WebKit、bada版Dolfin、OS6+中的BlackBerry WebKit、Opera Mobile10.1+和LG专有OS中的Phantom浏览器。桌面版Firefox6+和Chrome也支持触摸事件',
        'conSub':[]
      },{
        'body':'2.手势事件<br>ios的多点触摸，',
        'conSub':[{
          'name':'getsturestart'
        },{
          'name':'getsturchange'
        },{
          'name':'getstureend'
        }]
      }],
      'extra_content': []
    }]
  },{
    'name':'内存和性能',
    'content':[{
      'body':'提供交互能力的大量事件处理程序会影响页面性能。内存中的对象越多，性能就越差',
      'conSub':[]
    }],
    'extra_content': [],
    'subStr': [{
      'name':'事件委托',
      'content':[{
        'body':'事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件，使用事件委托，只需在DOm树中尽量最高的层次上添加一个事件处理程序；可以提高性能，增强维护性。',
        'conSub':[]
      }],
      'extra_content': []
    },{
      'name':'移除事件处理程序',
      'content':[{
        'body':'在不需要的时候移除事件处理程序，内存中留有那些过时不用的“空事件处理程序”，也是造成web应用程序内存与性能问题的主要原因。我们可以在删除元素之前，先移除元素上的事件处理程序，这样就确保了内存可以被再次利用。而在事件处理程序中删除元素也能阻止事件冒泡。目标元素在文档中是事件冒泡的前提',
        'conSub':[]
      }],
      'extra_content': []
    }]
  },{
    'name':'模拟事件',
    'content':[{
      'body':'模拟触发事件',
      'conSub':[]
    }],
    'extra_content':[],
    'subStr':[{
      'name':'DOM中的事件模拟',
      'content':[{
        'body':'在document对象上使用createEvent()方法创建event对象。接收一个参数，即表示要创建的事件类型的字符串，DOM2级是英文复数，而DOM3级是单数。具体模拟事件p406',
        'conSub':[{
          'name':'UIEvents:一般化的UI事件，DOM3级是UIEvent'
        },{
          'name':'MouseEvents:一般化的鼠标事件，DOM3级是MouseEvent'
        },{
          'name':'MutationEvents:一般化的DOM变动事件。DOM3级中是MutationEvent'
        },{
          'name':'HTMLEvents:一般化的HTML事件。没有对应的DOM3级事件。'
        }]
      }],
      'extra_content':[]
    }]
  }],
  'sum': [{
    'content': '事件是将JavaScript与网页联系在一起的主要方式',
    'conSub': [{
      'name': '关注事件，可以提高性能'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
