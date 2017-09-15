var ten_chapter = {
  'name': 'DOM',
  'small': '第10章',
  'content': 'DOM(文档对象模型)是针对HTML和XML文档的一个API。DOM描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一个部分。DOM脱胎于DHTML（动态HTML），但现在它已经成为表现和操作页面标记的真正的跨平台、语言中立的方式<br><strong>IE中的所有DOM对象都是以COM对象的形式实现的。这意味着IE中的DOM对象与原生JavaScript对象的行为或活动特点并不一致。</strong>',
  'subStr': [{
    'name': '节点层次',
    'content': [{
      'body': 'DOM可以将任何HTML或XML文档描绘成一个由多层节点构成的结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点、数据和方法，另外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构',
      'conSub': []
    }, {
      'body': '文档节点是每个文档的根节点，文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文档只能有一个文档元素。在HTML中，文档元素始终是<html>元素，在XML中，没有预定义的元素，因此任何元素都可能成为文档元素。总共有12种节点类型，这些类型都继承自一个基类型。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'Node类型',
      'content': [{
        'body': 'DOM1级定义了一个Node接口，该接口将由DOM中的所有节点类型实现。这个Node接口在JavaScript中是作为Node类型实现的；除了IE之外，在其他所有浏览器中都可以访问到这个类型，因此所有节点类型都共享着相同的基本属性和方法。每个节点都有一个nodeType属性，用于表明节点的类型。节点类型由在Node类型中定义的下列12个数值常量来表示，任何节点必居其一。',
        'conSub': [{
          'name': 'Node.ELEMENT_NODE(1)'
        }, {
          'name': 'Node.ATTRIBUTE_NODE(2)'
        }, {
          'name': 'Node.TEXT_NODE(3)'
        }, {
          'name': 'Node.CDATA_SECTION_NODE(4)'
        }, {
          'name': 'Node.ENTITY_REFERENCE_NODE(5)'
        }, {
          'name': 'Node.ENTITY_NODE(6)'
        }, {
          'name': 'Node.PROCESSING_INSTRUCTION_NODE(7)'
        }, {
          'name': 'Node.COMMENT_NODE(8)'
        }, {
          'name': 'Node.DOCUMENT_NODE(9)'
        }, {
          'name': 'Node.DOCUMENT_TYPE_NODE(10)'
        }, {
          'name': 'Node.DOCUMENT_FRAGMENT_NODE(11)'
        }, {
          'name': 'Node.NOTATION_NODE(12)'
        }]
      }, {
        'body': '例：<pre>if(someNode.nodeType === 1) {<br> alert("Node is an element.");<br>}</pre>确保兼容性写法。',
        'conSub': [{
          'name': 'nodeName和nodeValue属性<br>这两个的值完全取决于节点的类型。'
        }, {
          'name': '节点关系<br>每个节点都有一个childNodes属性其中保存着一个NodeList对象，NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点，虽然可以通过方括号语法来访问NodeList的值，而且这个对象也有length属性，但它并不是Array的实例。NodeList对象的独特之处在于，它实际上是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映在NodeList对象中。例：<pre>var firstChild = someNode.childNodes[0];<br>var secondChild = someNode.childNodes.item(1);<br>var count = someNode.childNodes.length;</pre>无论使用方括号还是使用item()方法都没有问题，但使用方括号看起来与访问数组相似。对于arguments对象使用Array.prototype.slice()方法可以将其转换为数组。而采用同样的方法，也可以将NodeList对象转换为数组。<pre>//ie8及之前无效<br>var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0)</pre>所有节点都有的最后一个属性是ownerDocument，该属性指向表示整个文档的文档节点，这种关系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。'
        }, {
          'name': '操作节点<br>因为关系指针都是只读的，所以DOM提供了一些操作节点的方法。其中，最常用的方法是appendChild()，用于向childNodes列表的末尾添加一个节点。添加节点后，childNodes的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。更新完成后，appendChild()返回新增的节点。如果需要把节点放在childNodes列表中某个特定的位置上，而不是放在末尾，那么可以使用insertBefore()方法。这个方法接收两个参数：要插入的节点和作为参照的节点。插入节点后，被掺入的节点会变成参照节点的前一个同胞节点，同时被方法返回。如果参照节点是null，则其与之前的appendChild()执行相同的操作。而replaceChild()方法接受的两个参数是：要插入的节点和药替换的节点。要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置。如果只想移除而非替换节点，可以使用removeChild()方法。这个方法接收一个参数，即要移除的节点。被移除的节点将成为方法的返回值。'
        }, {
          'name': '其他方法<br>有两个方法是所有类型的节点都有的。第一个就是cloneNode()，用于创建调用这个方法的节点的一个完全相同的副本。cloneNode()方法接收一个布尔值参数，表示是否执行深复制（复制节点及其整个子节点树，或只复制节点本身）'
        }, {
          'name': '我们要介绍的最后一个方法是normalize()，这个方法唯一的作用就是处理文档树中的文本节点。由于解析器的实现或DOM操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点的情况。当在某个节点上调用这个方法时，就会在节点的后代节点中查询上述两种情况。如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点。'
        }]
      }],
      'extra_content': [{
        'name': 'cloneNode()方法不会复制添加到DOM节点中的JavaScript属性，例如事件处理程序等。这个方法只复制特性、子节点，其他一切都不会复制，在ie中存在一个bug，它会复制事件处理程序，所以我们建议在复制之前最好先移除事件处理程序。'
      }]
    }, {
      'name': 'Document类型',
      'content': [{
        'body': 'JavaScript通过Document类型表示文档。在浏览器中，document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个HTML页面。而且，document对象是window对象的一个属性，因此可以将其作为全局对象来访问。Document节点具有以下特征：',
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
      }, {
        'body': 'Document类型可以表示HTML页面或者其他基于XML的文档。不过，最常见的应用还是作为HTMLDocument实例的document对象。通过这个文档对象，不仅可以取得与页面相关的信息，而且还能操作页面的外观及其底层结构',
        'conSub': [{
          'name': '文档的子节点<br>虽然DOM标准规定的Document节点的子节点可以是DocumentType、Element、ProcessingInstruction或Comment，但还是有两个内置的访问其子节点的快捷方式。第一个就是documentElement属性，该属性始终指向HTML页面中的<html>元素。另一个就是通过childNodes列表访问文档元素，但通过documentElement属性则能更快捷、更直接地访问该元素。<pre>var html = document.documentElement;//取得对<html>的引用<br>alert(html === document.childNodes[0]);//true<br>alert(html === document.firstChild);//true</pre>document对象还有一个body属性，直接指向<body>元素。所有浏览器都支持document.documentElement和document.body。<br>Document另一个可能的子节点是DocumentType。通常将<!DOCTYPE>标签看成一个与文档其他部分不同的实体，可以通过doctype属性来访问它的信息<ul><li>IE8及之前版本：如果存在文档类型声明，会将其错误地解释为一个注释并把它当作Comment节点；而document.doctype的值始终是null</li><li>IE9+及Firefox：如果存在文档类型声明，则将其作为文档的第一个子节点；document.doctype是一个DocumentType节点，也可以通过document.firstChild或document.childNodes[0]访问同一个节点。</li><li>Safari、Chrome和Opera中：如果存在文档声明，则将其解析，但不作为文档的子节点。document.doctype是一个DocumentType的节点，但该节点不会出现在document.childNodes中。</li></ul>同样的，在处理注释时，各浏览器也存在差异。多数情况下，我们都用不着在document对象上调用appendChild()、removeChild()和replaceChild()方法，因为文档类型是只读的，而且它只能有一个元素子节点。'
        }, {
          'name': '文档信息<br>document对象还有一些标准的Document对象所没有的属性。这些属性提供了document对象所表现的网页的一些信息。其中第一个属性就是title，包含着&lt;title&gt;元素中的文本，显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改title属性的值不会改变&lt;title&gt;元素<pre>//取得文档标题<br>var originalTitle=document.title;<br>//设置文档标题<br>document.title="New page title";</pre>URL属性包含着页面完整的URL，domain属性只包含页面的域名，而referrer属性中则保存着链接到当前页面的那个页面的URL。在没有来源页面的情况下，referrer属性中可能会包含空字符串。所有这些信息都存在于请求的HTTP头部，只不过是通过这些属性让我们能够在JavaScript中访问它们而已，在这三个属性中，只有domain是可以设置的。但由于安全方面的限制，也并非可以给domain设置任何值。不能将这个属性设置为URL中不包含的域。当页面中包含来自其他子域的框架或内嵌框架时，能够设置document.domain就非常方便了。由于跨域安全限制，来自不同子域的页面无法通过JavaScript通信。而通过将每个页面的document.domain设置为相同的值，这些页面就可以互相访问对方包含的JavaScript对象了。<br>浏览器对domain属性还有一个限制，即如果域名一开始是松散的（loose），那么不能将它再设为紧绷的（tight），所有浏览器都存在这个限制'
        }, {
          'name': '查找元素<br>说到最常见的DOM应用，恐怕就要数取得特定的某个元素或某组元素的引用。取得元素可以用document对象的几个方法完成：<br>getElementById():接收一个参数：要取得的元素的ID。如果找到相应的元素则返回该元素，否则为null。这里的ID必须与页面中元素的ID特性严格匹配，包括大小写。<pre>&lt;div id="myDIV"&gt;sadasd&lt;/div&gt;<br>var div=document.getElementById("myDIV");//取得引用</pre> 而在IE7及更早版本中可以不区分ID的大小写。<strong>如果页面中多个元素的ID值相同，getElementById()只返回文档中第一次出现的元素</strong>。IE7及较低版本还为此方法添加了一个怪癖：name特性与给定ID匹配的表单元素也会被该方法返回。如果有哪个表单元素的name特性等于指定的ID，而且该元素在文档中位于带有给定ID的元素前面，那么IE就会返回那个表单元素。<br>getElementsByTagName()。这个方法接收一个参数，即要取得元素的标签名，而返回的是包含0或多个元素的NodeList。在HTML文档中，这个方法会返回一个HTMLCollection对象，作为一个“动态”的集合，该对象与NodeList非常相似。<pre>var images=document.getElementsByTagName("img");</pre>HTMLCollection对象还有一个方法，叫做namedItem()，使用这个方法可以通过元素的name特性取得集合中的项。<pre>var myImage = images.namedItem("myImage");</pre>，而且其支持方括号语法来访问，对HTMLCollection而言，我们可以向方括号中传入数值或字符串形式的索引值。在后台，对数值索引就会调用item()，而对字符串索引就会调用namedItem()。要想取得文档中的所有元素，可以向getElementsByTagName()中传入"*"。<br>第三个方法，也是只有HTMLDocument类型才有的方法，是getElementsByname()。这个方法会返回带有给定name特性的所有元素。'
        }, {
          'name': '特殊集合<br>这些集合都是HTMLCollection对象，为访问文档常用的部分提供了快捷方式：<ul><li>document.anchors,包含文档中所有带name特性的&lt;a&gt;元素</li><li>document.appelts,包含文档中所有的&lt;applet&gt;元素，不再推荐使用</li><li>document.forms,包含文档中所有的&lt;form&gt;元素，与document.getElementsByTagName("form")得到的结果相同。</li><li>document.images,包含文档中所有的&lt;img&gt;元素,与document.getElementsByTagName("img")得到的结果相同。</li><li>document.links,包含文档中所有带href特性的&lt;a&gt;元素</li></ul>'
        }, {
          'name': 'DOM一致性检测<br>document.implementation属性就是为此提供相应信息和功能的对象，与浏览器对DOM的实现直接对应。DOM1级只为document.implementation规定了一个方法，即hasFeature()。这个方法接收两个参数：要检测的DOM功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该方法返回true。<pre>var hasXmlDom = document.implementation.hasFeature("XML","1.0");</pre>,当然，最好和能力检测一起进行。'
        }, {
          'name': '文档写入<br>有一个document对象的功能已经存在很多年了，那就是将输出流写入到网页的能力。这个能力体现在4个方法中：write(),writeln(),open(),close()。其中，write()和writeln()方法都接受一个字符串参数，即要写到输出流的文本。write()会原样写入，而writeln()则会在字符串的末尾添加一个换行符(\\n)。此外，还可以使用write()和writeln()方法动态的包含外部资源，但要注意转义。如果在文档加载结束后再调用document.write(),那么输出的内容将会重写整个页面。'
        }]
      }],
      'extra_content': [{
        'name': '在Firefox、Safari、Chrome和Opera中，可以通过脚本访问Document类型的构造函数和原型。但在所有浏览器中都可以访问HTMLDocument类型的构造函数和原型，包括IE8及后续版本。'
      }]
    }, {
      'name': 'Element类型',
      'content': [{
        'body': 'Element类型用于表现XML和HTML元素，提供了对元素标签名、子节点及特性的访问。其具有以下特点：',
        'conSub': [{
          'name': 'nodeType的值为1'
        }, {
          'name': 'nodeName的值为元素的标签名'
        }, {
          'name': 'nodeValue的值为null'
        }, {
          'name': 'parentNode可能是Document或Element'
        }, {
          'name': '其子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection或EntityReference'
        }]
      }, {
        'body': '要访问元素的标签名，可以使用nodeName属性，也可以使用tagName属性；这两个属性会返回相同的值，<pre>&lt;div id="myDIV"&gt;sadasd&lt;/div&gt;<br>var div=document.getElementById("myDIV");//取得引用<br>alert(div.tagName);//"DIV"<br>alert(div.tagName == div.nodeName);//true</pre>在HTML中，标签名始终是大写，而在XML中（有时也包括XHTML），标签名始终与源代码一致，在使用之前，可以使用toLowerCase()函数，将其转为小写。',
        'conSub': []
      }, {
        'body': '1.HTML元素<br>所有HTML元素都由HTMLElement类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement类型直接继承自Element并添加了一些属性。',
        'conSub': [{
          'name': 'id,元素在文档中的唯一标识符',
        }, {
          'name': 'title，有关元素的附加说明信息'
        }, {
          'name': 'lang,元素内容的语言代码，很少使用'
        }, {
          'name': 'dir,语言的方向。值为“ltr”或“rtl”，也很少使用'
        }, {
          'name': 'className,与元素的class特性对应，即为元素指定的CSS类。没有将这个属性命名为class，是因为class是ECMAScript的保留字'
        }]
      }, {
        'body': '2.取得特性<br>每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。操作特性的DOM方法主要有三个，分别是getAttribute()、setAttribute()和removeAttribute()。这三个方法可以针对任何特性使用包括以HTMLElement类型属性的形式定义的特性。因此要想得到class特性值，应该传入“class”而不是“className”，如果不存在，返回null。而根据HTML5特性，自定义特性应该加上data-前缀以便验证。有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过getAttribute()返回的值并不相同',
        'conSub': []
      }, {
        'body': '3.设置特性<br>setAttribute();接受两个参数：要设置的特性名和值。如果特性已经存在，其会以指定的值替换，如果不存在，则设置该特性值；该方法设置的特性名会转为小写；自定义属性在IE中会被当作元素的特性。',
        'conSub': []
      }, {
        'body': '4.attributes<br>Element类型是使用其属性的唯一DOM节点类型其属性中包含一个NamedNodeMap。与“Nodelist”类似，也是一个“动态”的集合。元素的每个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap对象中。其拥有',
        'conSub': [{
          'name':'getNamedItem(name):返回nodeName属性中等于name的节点'
        },{
          'name':'removeNamedItem(name):从列表中移除nodeName属性等于name的节点'
        },{
          'name':'setNamedItem(node):向列表中添加节点，以节点的nodeName属性为索引'
        },{
          'name':'item(pos):返回位于数字pos位置处的节点'
        }]
      },{
        'body':'5.创建元素<br>document.createElement();该方法只接受一个参数，即要创建元素的标签名。这个标签名在HTML文档中不区分大小写（XML反）；在IE中可使用createElement();可以解决一些兼容问题,p268',
        'conSub':[]
      },{
        'body':'6.元素的子节点<br>childNodes属性中包含了它的所有子节点，不同浏览器看待节点不同；getElementsByTagName()会取得节点元素。',
        'conSub':[]
      }],
      'extra_content': [{
        'name': '在Safari2之前版本和Opera8之前的版本中，不能访问Element类型的构造函数'
      }, {
        'name': '在IE7及以前版本中，setAttribute()存在一写异常行为。通过这个方法设置class和style特性，没有效果'
      }]
    }, {
      'name': 'Text类型',
      'content': [{
        'body':'text节点具有以下特性',
        'conSub':[{
          'name':'nodeType的值为3'
        },{
          'name':'nodeName的值为“#text”'
        },{
          'name':'nodeValue的值为节点所包含的文本'
        },{
          'name':'parentNode是一个Element'
        }]
      },{
        'body':'使用下列方法操作节点文本，文本节点有个length属性',
        'conSub':[{
          'name':'appendData(text):将文本添加到节点末尾'
        },{
          'name':'deleteData(offset,count):从offset指定的位置开始删除count个字符。'
        },{
          'name':'insertData(offset,text):在offset指定的位置插入text'
        },{
          'name':'replaceData(offset,count,text):用text替换从offset指定的位置开始到offset+count为止处的文本'
        },{
          'name':'splitText(offset):从offset指定的位置将当前节点分成两个文本节点。'
        },{
          'name':'substringData(offset,count):提取从offset指定的位置开始到offset+count为止处的字符串'
        }]
      },{
        'body':'1.创建文本节点<br>document.createTextNode()创建新文本节点，在创建的同时，也会为其设置ownerDocument属性。只有已存在的节点，创建完成后，才能看到效果，否则找不到元素。',
        'conSub':[]
      },{
        'body':'2.规范化文本节点<br>DOM文档中存在相邻的同胞文本节点很容易导致混乱，因为分不清哪个文本节点表示哪个字符串，另外，DOM文档中出现相邻文本节点的情况也不在少数，于是催生了一个能够将相邻节点合并的方法。normalize()。调用则会将所有文本节点合并成一个节点。结果节点的nodeValue等于将合并前每个文本节点的nodeValue值拼接起来的值',
        'conSub':[]
      },{
        'body':'3.分隔文本节点<br>Text类型提供了一个splitText()。按照指定的位置分割nodeValue值。原来的文本节点将包含从开始到指定位置之前的内容，新文本节点将包含剩下的文本',
        'conSub':[]
      }],
      'extra_content': []
    },{
      'name':'Comment类型',
      'content':[{
        'body':'注释在DOM中是Comment类型。其特征：',
        'conSub':[{
          'name':'nodeType的值为8'
        },{
          'name':'nodeName的值为“#comment”'
        },{
          'name':'nodeValue的值是注释的内容'
        },{
          'name':'parentNode可能是Document或Element'
        },{
          'name':'没有子节点'
        }]
      },{
        'body':'可通过nodeValue或data属性来取得注释的内容',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'CDATASection类型',
      'content':[{
        'body':'只针对XML，表示CDATA区域',
        'conSub':[{
          'name':'nodeType的值为4'
        },{
          'name':'nodeName的值为“#cdata-section”'
        },{
          'name':'nodeValue的值是CDATA区域的内容'
        },{
          'name':'parentNode可能是Documente或Element'
        },{
          'name':'没有子节点'
        }]
      }],
      'extra_content':[]
    },{
      'name':'DocumentType类型',
      'content':[{
        'body':'ie无效，包含着与文档中的dctype有关的所有信息，在DOM1级中，该对象不能动态创建，只能通过解析文档来创建。DOM1级描述了其的三个属性：name（文档类型名称）、entities（文档类型描述的实体的NameNodeMap对象）和notations（文档类型描述的符号的NamedNodeMap对象）。',
        'conSub':[{
          'name':'nodeType的值为10'
        },{
          'name':'nodeName的值为doctype的名称'
        },{
          'name':'nodeValue的值是null'
        },{
          'name':'parentNode是Documente'
        },{
          'name':'没有子节点'
        }]
      }],
      'extra_content':[]
    },{
      'name':'DocumentFragment类型',
      'content':[{
        'body':'DOM规定文档片段是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。可以当作一个额外的仓库，存储可能会用到的节点。创建文档片段可以使用document.createDocumentFragment()方法；文档片段本身永远不会成为文档树的一部分',
        'conSub':[{
          'name':'nodeType的值为11'
        },{
          'name':'nodeName的值为“documnet-fragment”'
        },{
          'name':'nodeValue的值是null'
        },{
          'name':'parentNode是null'
        },{
          'name':'子节点可以是Element、ProcessingInstruction、Comment、Text、CDATASection或EntityReference'
        }]
      }],
      'extra_content':[]
    },{
      'name':'Attr类型',
      'content':[{
        'body':'元素的特性在DOM中以Attr类型表示。在所有浏览器，都可以访问Attr类型的构造函数和原型。',
        'conSub':[{
          'name':'nodeType的值为2'
        },{
          'name':'nodeName的值为特性的名称'
        },{
          'name':'nodeValue的值是特性的值'
        },{
          'name':'parentNode是null'
        },{
          'name':'在HTML中没有子节点'
        },{
          'name':'在XML中子节点可以是Text或EntityReference'
        }]
      }],
      'extra_content':[]
    }]
  }, {
    'name': 'DOM操作技术',
    'content': [{
      'body': '定义',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '动态脚本',
      'content': [{
        'body': '指的是在页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。两种方式：插入外部文件和直接插入JavaScript代码',
        'conSub': []
      }],
      'extra_content': []
    },{
      'name':'动态样式',
      'content':[{
        'body':'通过创建link元素，动态添加',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'操作表格',
      'content':[{
        'body':'<table>元素是HTML最复杂的结构之一，p282有着DOM为其添加的一系列方法，',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'使用NodeList',
      'content':[{
        'body':'NodeList,NamedNodeMap和HTMLCollection是关键。每当文档结构发生变化，他们都会得到更新。从本质上说，所有NodeList对象都是在访问DOM文档时实时运行的查询。尽量减少访问NodeList的次数。',
        'conSub':[]
      }],
      'extra_content':[]
    }]
  }],
  'sum': [{
    'content': 'DOM是api，用于访问和操作HTML和XML文档。DOM1级将这俩看成一个层次化的节点树。',
    'conSub': [{
      'name': '最基本的节点是Node，所有其他类型都继承自Node'
    }, {
      'name': 'Document类型表示整个文档，是一组分层节点的根节点。'
    }, {
      'name': 'Element节点表示文档中的所有HTML或XML元素，可以用来操作这些元素的内容和特性。'
    },{
      'name':'另外还有一些节点类型，分别表示文本内容、注释、文档类型、CDATA区域和文档片段'
    },{
      'name':'访问DOM的操作在多数情况下都很直观，不过在处理script和style元素时仍然存在一些复杂性。'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
