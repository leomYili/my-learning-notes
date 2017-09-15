var eight_chapter = {
  'name': 'BOM',
  'small': '第8章',
  'content': '如果要在web的宿主环境中使用JavaScript，那么BOM（浏览器对象类型）是不得不关注的核心。BOM提供了很多对象，用于访问浏览器的功能，而HTML5中BOM已被规范。',
  'subStr': [{
    'name': 'window对象',
    'content': [{
      'body': 'BOM的核心是window，其表示浏览器的实例（非new，而是全局对象）。在浏览器中，window既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '全局作用域',
      'content': [{
        'body': '由于window对象的Global对象的角色，所以在全局作用域中声明的变量、函数都会变成window对象的属性和方法',
        'conSub': []
      }, {
        'body': '而定义全局变量和直接在window对象上定义变量有所不同，全局变量无法被delete操作符删除，而直接在window对象上的定义的属性可以。IE8会对删除window属性的语句抛出异常，而IE9及更高版本不会。',
        'conSub': []
      }, {
        'body': '通过查询window对象，从而检测某个全局变量是否存在则不会抛出错误。',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'WP平台的IE浏览器不允许通过window.property=value之类的，直接在window对象上创建新的属性或方法。但是，在全局作用域中声明的所有变量和函数，照样会变成window对象的成员。'
      }]
    }, {
      'name': '窗口关系及框架',
      'content': [{
        'body': '如果页面中包含框架，则每个框架都拥有自己的window对象，并保存在frames集合中，最好可以通过top.frames[i]，来请求每个框架中的window对象，因为top始终指向最高层的框架。而parent则指向当前框架的直接上策框架，有可能=top。注意：除非最高层窗口时通过window.open()打开的，否则其window对象的name属性不会包含任何值。还有self。其始终指向window；',
        'conSub': []
      }],
      'extra_content': [{
        'name': '在使用框架的情况下，浏览器中会存在多个Global对象。在每个框架中定义的全局变量会自动成为框架中window对象的属性。由于每个window对象都包含原生类型的构造函数，因此每个框架都有一套自己的构造函数，这些构造函数一一对应，但并不相等。'
      }]
    }, {
      'name': '窗口位置',
      'content': [{
        'body': '主流浏览器包括IE都提供了screenLeft和screenTop属性，firefox则在screenX和screenY中提供相同的属性，但在各个浏览器中，这些属性的值可能不尽相同。而moveTo()接收的是新位置的x和y坐标值，而moveBy()方法接收的是在水平和垂直方向上移动的像素值。这两个方法可能会被浏览器禁用。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '窗口大小',
      'content': [{
        'body': 'IE9+、Firefox、Safari、Opera和Chrome均为此提供了：innerWidth(),innerHeight(),outerWidth(),outerHeight()。在IE9+、Safari和Firefox中，outerWidth和outerHeight返回浏览器窗口本身的尺寸。在Opera中。这两个值表示页面视图容器的大小，而innerWidth和innerHeight表示该容器中页面视图区的大小（减去边框宽度）。在Chrome中，outerWidth和outerHeight与innerWidth和innerHeight返回同样的视口大小。例：跨浏览器获取页面视口大小<pre>var pageWidth=window.innerWidth,<br>    pageHeight=window.innerHeight;<br>if(typeof pageWidth !== "number"){<br> if(document.compatMode == "CSS1Compat"){//页面是否处于标准模式<br>  pageWidth=document.documentElement.clientWidth;<br>  pageHeight=document.documentElement.clientHeight;<br> } else {<br>  pageWidth=document.body.clientWidth;<br>  pageHeight=document.body.clientHeight<br> }<br>}</pre>而对于移动设备而言，window.innerWidth和window.innerHeight保存着可见视口，也就是屏幕上可见页面区域的大小。注意，移动IE不支持。但通过document.documentElement.clientWidth和document.documentElement.clientHeight提供相同的信息。最好先检测设备，再决定使用哪个窗口属性。',
        'conSub': []
      }, {
        'body': '使用resizeTo()和resizeBy()方法可以调整浏览器窗口的大小。这两个方法都接收两个参数，其中resizeTo()接收浏览器窗口的新宽度和新高度，而resizeBy()接收新窗口与原窗口的宽度和高度之差。这两个方法也可能被浏览器禁用。而且不适用框架，只能对最外层的window对象使用。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '导航和打开窗口',
      'content': [{
        'body': '使用window.open()既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。这个方法可以接收4个参数：要加载的url，窗口目标，一个特性字符串以及一个表示新页面是否取代浏览器历史纪录中当前加载页面的布尔值。如果使用了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具有该名称的窗口或框架中加载第一个参数指定的URL，如果没有，就会新创建一个新窗口并将其命名为"topFrame"',
        'conSub': [{
          'name': '弹出窗口<br>如果没有存在的窗口或框架，则会根据第三个参数传入的字符串，创建一个新窗口或新标签页。如果没有传第三个参数，就会打开一个浏览器新窗口或新标签页。下表是第三个窗口的设置选项<table class="table table-bordered"><thead><tr><td>设置</td><td>值</td><td>说明</td></tr></thead><tbody><tr><td>fullscreen</td><td>yes或no</td><td><s>表示浏览器窗口是否最大化。仅限IE</s></td></tr><tr><td>height</td><td>数值number</td><td>表示新窗口的高度。不能小于100</td></tr><tr><td>left</td><td>数值number</td><td>表示新窗口的左坐标。不能是负值</td></tr><tr><td>location</td><td>yes或no</td><td>表示是否在浏览器窗口显示地址栏，取决浏览器</td></tr><tr><td>menubar</td><td>yes或no</td><td>表示是否在浏览器窗口中显示菜单栏。默认值为no</td></tr><tr><td>resizable</td><td>yes或no</td><td>表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为no</td></tr><tr><td>scrollbars</td><td>yes或no</td><td>表示如果内容在视口中显示不下，是否允许滚动。默认值为no</td></tr><tr><td>status</td><td>yes或no</td><td>表示是否在浏览器窗口中显示状态栏，默认值为no</td></tr><tr><td>toolbar</td><td>yes或no</td><td>表示是否在浏览器窗口中显示工具栏，默认值为no</td></tr><tr><td>top</td><td>数值</td><td>表示新窗口的上坐标。不能是负值</td></tr><tr><td>width</td><td>数值</td><td>表示新窗口的宽度，不能小于100</td></tr></tbody></table>'
        }, {
          'name': '安全限制<br>防乱弹框。'
        }, {
          'name': '弹出窗口屏蔽程序<br>可以检测window.open()返回的值来确定弹出窗口是否被屏蔽了。值是否为null。如果是浏览器扩展或其他程序阻止的弹出窗口，那么window.open()通常会抛出一个错误。'
        }]
      }],
      'extra_content': []
    }, {
      'name': '间歇调用和超时调用',
      'content': [{
        'body': '超时调用，setTimeout()方法，接受两个参数：要执行的代码和以毫秒表示的时间。其中，第一个参数可以是一个包含JavaScript的字符串，也可以是一个函数。<pre>setTimeout(function(){<br> alert("ok")<br>},300)</pre>第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。该方法会返回一个数值ID，可以用clearTimeout()将其取消。',
        'conSub': []
      }, {
        'body': '间歇调用，setInterval()方法，参数与setTimeout()方法相同，其会按照指定的时间间隔重复执行代码。调用setInterval()方法同样会返回一个间歇调用ID，该ID用于在以后取消间隔调用。使用clearInterval()方法并传入相应的间隔调用ID。取消间隔调用的重要性要远远高于取消超时调用。<pre>var num=0,max=10,interValId=null;<br>function incrementNumber(){<br> num++;<br> //如果执行次数达到了max设定的值，则取消后续尚未执行的调用<br> if(num === max){<br>  clearInterval(interValId);<br> }<br>}<br>interValId=setInerval(incrementNumber,500);</pre>',
        'conSub': []
      }, {
        'body': '使用间歇调用来模拟超时调用，能提高利用率。<pre>var num=0,max=10,interValId=null;<br>function incrementNumber(){<br> num++;<br> //如果执行次数达到了max设定的值，则取消后续尚未执行的调用<br> if(num < max){<br>  setTimeout(incrementNumber(),500);<br> }<br>}<br>setTimeout(incrementNumber(),500);</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '超时调用的代码都是在全局作用域中执行的，因此函数中的this的值在非严格模式下指向window对象，在严格模式中是undefined。'
      }]
    }, {
      'name': '系统对话框',
      'content': [{
        'body': '浏览器通过alert(),confirm()和prompt()方法调用系统对话框向用户展示信息。它们的外观由操作系统及浏览器设置决定而不由css决定，而且，通过这几个方法打开的对话框都是同步和模态的。执行对话框时，代码会停止执行。而关掉这些对话框后代码又会恢复执行。',
        'conSub': []
      }, {
        'body': 'alert();接受一个字符串并显示出来。',
        'conSub': []
      }, {
        'body': 'confirm();除了显示ok按钮外，还显示取消按钮。为了确定用户是点击了哪个按钮，可以对其返回值做判断，true为ok，false为取消。',
        'conSub': []
      }, {
        'body': 'prompt();提示框用于提示用户输入一些文本，除了ok和取消按钮之外，还会生成一个文本输入域。其提供两个参数，显示的文本和文本输入域的默认文本（可为空）。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': 'location对象*',
    'content': [{
      'body': '其提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。location既是window对象的属性，也是document对象的属性；location用处不只在它保存着当前文档的信息，还表现在它将url解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。下表列出所有属性。<table class="table table-bordered"><thead><tr><td>属性名</td><td>例子</td><td>说明</td></tr></thead><tbody><tr><td>hash</td><td>"#contents"</td><td>返回URL中的hash（#号后跟零或多个字符串），如果URL中不包括散列，则返回空字符串</td></tr><tr><td>host</td><td>"www.baidu.com:80"</td><td>返回服务器名称和端口号（如果有）</td></tr><tr><td>hostname</td><td>"www.baidu.com"</td><td>返回不带端口号的服务器名称</td></tr><tr><td>href</td><td>"http:/www.baidu.com"</td><td>返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值</td></tr><tr><td>pathname</td><td>"/wileyCA/"</td><td>返回URL中的目录和文件名</td></tr><tr><td>port</td><td>"8080"</td><td>返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串</td></tr><tr><td>protocol</td><td>"http:"</td><td>返回页面使用的协议。通常是http:或https:</td></tr><tr><td>search</td><td>"?q=javascript"</td><td>返回URL的查询字符串。这个字符串以问号开头</td></tr></tbody></table>',
      'conSub': []
    }],
    'extra_content': [{
      'name': '由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。'
    }],
    'subStr': [{
      'name': '查询字符串参数',
      'content': [{
        'body': '对于location.search的扩充。例：<pre>function getQueryStringArgs(){<br> //取得查询字符串并去掉开头的问号<br> var qs=(location.search.length>0?location.search.substring(1):""),<br> //保存数据的对象<br> args={},<br> //取得每一项<br> items=qs.length?qs.split("&"):[],<br> item=null,name=null,value=null,<br> i=0.len=items.length;<br> //逐个将每一项添加到args对象中<br> for(i=0;i<len;i++){<br>  item=items[i].split("=");<br>  name=decodeURIComponent(item[0]);<br>  value=decodeURIComponent(item[1]);<br>  if(name.length){<br>   args[name]=value;<br>  }<br> }<br> return args;<br>}</pre>自己搜索的方法：<pre>function GetRequest() {<br> var url = location.search; //获取url中"?"符后的字串<br> var theRequest = new Object();<br> if (url.indexOf("?") != -1) {  var str = url.substr(1);<br>  strs = str.split("&");<br>  for(var i = 0; i < strs.length; i ++) {<br>   theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);<br>  }<br> }<br> return theRequest;<br>}</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '位置操作',
      'content': [{
        'body': '使用location对象可以通过很多方式来改变浏览器的位置。assign(),与href一样,例：<pre>location.assign("http://www.wrox.com");</pre>该方法可以立即打开新url并在浏览器的历史纪录中生成一条记录。如果是将location.href或window.location设置为一个URL值，也会以该值调用assign()方法。而每次修改location，除hash外，页面都会以新url加载。',
        'conSub': []
      }, {
        'body': '与位置有关的最后一个方法是reload(),作用是重新加载当前显示的页面。如果调用reload()时不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，需要<pre>location.reload(true);</pre>',
        'conSub': []
      },{
        'body':'如果不想生成一条新纪录，那么可以使用replace()方法，相当于重新第一次打开一个地址。',
        'conSub':[]
      }],
      'extra_content': [{
        'name': '在IE8,Firefox 1,Safari2+,Opera9+和Chrome中，修改hash的值会在浏览器的历史纪录中生成一条新纪录。在IE的早期版本中，hash属性不会在用户单击“后退”和“前进”按钮时被更新，而只会在用户单击包含hash的URL时才会被更新。'
      }]
    }]
  }, {
    'name': 'navigator对象',
    'content': [{
      'body': '下表列出了存在于所有浏览器中的属性和方法，以及支持其的浏览器版本。<table class="table table-bordered"><thead><tr><td>属性和方法</td><td>说明</td><td>IE</td><td>Firefox</td><td>Safari/Chrome</td><td>Opera</td></tr></thead><tbody><tr><td>appCodeName</td><td>浏览器的名称，通常为Mozilla</td><td>3.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>appMinorVersion</td><td>次版本信息</td><td>4.0+</td><td>-</td><td>-</td><td>9.5+</td></tr><tr><td>appName</td><td>完整的浏览器名称</td><td>3.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>appVersion</td><td>浏览器的版本。不对应当前版本</td><td>3.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>buildID</td><td>浏览器编译</td><td>-</td><td>2.0+</td><td>-</td><td>-</td></tr><tr><td>cookieEnabled</td><td>表示cookie是否启用</td><td>4.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>cpuClass</td><td>客户端计算机中使用的CPU类型</td><td>4.0+</td><td>-</td><td>-</td><td>-</td></tr><tr><td>javaEnabled</td><td>表示当前浏览器中是否启用了java</td><td>4.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>language</td><td>浏览器的主语言</td><td>-</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>mimeTypes</td><td>在浏览器中注册的MIME类型数组</td><td>4.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>onLine</td><td>表示浏览器是否连接到了因特网</td><td>4.0+</td><td>1.0+</td><td>-</td><td>9.5+</td></tr><tr><td>opsProfile</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>oscpu</td><td>客户端计算机的操作系统或使用的CPU</td><td>-</td><td>1.0+</td><td>-</td><td>-</td></tr><tr><td>platform</td><td>浏览器所在的系统平台</td><td>4.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>plugins</td><td>浏览器安装的插件信息的数组</td><td>4.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>preference()</td><td>设置用户的首选项</td><td>-</td><td>1.5+</td><td>-</td><td>-</td></tr><tr><td>product</td><td>产品名称</td><td>-</td><td>1.0+</td><td>1.0+</td><td>-</td></tr><tr><td>productSub</td><td>关于产品的次要信息</td><td>-</td><td>1.0+</td><td>1.0+</td><td>-</td></tr><tr><td>register-ContentHandler()</td><td>针对特定的MIME类型将一个站点注册为处理程序</td><td>-</td><td>2.0+</td><td>-</td><td>-</td></tr><tr><td>register-ProtocolHandler()</td><td>针对特定的协议将一个站点注册为处理程序</td><td>-</td><td>2.0</td><td>-</td><td>-</td></tr><tr><td>securityPolicy</td><td>安全策略的名称</td><td>-</td><td>1.0+</td><td>-</td><td>-</td></tr><tr><td>systemLanguage</td><td>操作系统的语言</td><td>4.0+</td><td>-</td><td>-</td><td>-</td></tr><tr><td>taintEnabled()</td><td>废弃</td><td></td><td></td><td></td><td></td></tr><tr><td>userAgent</td><td>浏览器的用户代理字符串</td><td>3.0+</td><td>1.0+</td><td>1.0+</td><td>7.0+</td></tr><tr><td>userLanguage</td><td>操作系统对的默认语言</td><td>4.0+</td><td>-</td><td>-</td><td>7.0+</td></tr><tr><td>userProfile</td><td>借以访问用户个人信息的对象</td><td>4.0+</td><td>-</td><td>-</td><td>-</td></tr><tr><td>vendor</td><td>浏览器的品牌</td><td>-</td><td>1.0+</td><td>1.0+</td><td>-</td></tr><tr><td>vendorSub</td><td>有关供应商的次要信息</td><td>-</td><td>1.0+</td><td>1.0+</td><td>-</td></tr></tbody></table>',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '检测插件',
      'content': [{
        'body': '对于非IE浏览器，可以使用plugins数组来达到这个目的。该数组中每一项都包括',
        'conSub': [{
          'name': 'name:插件的名字'
        }, {
          'name': 'description:插件的描述'
        }, {
          'name': 'filename:插件的文件名'
        }, {
          'name': 'length:插件所处理的MIME类型数量'
        }]
      }, {
        'body': '<pre>//检测插件（在IE中无效）<br>function hasPlugin(name){<br> name=name.toLowerCase();<br> for(var i=0;i<navigator.plugins.length;i++){<br>  if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1 ){<br>   return true;<br>  }<br> return false;<br> }<br>}<br>//检测Flash<br>alert(hasPlugin("Flash"));<br>//检测QuickTime<br>alert(hasPlugin("QuickTime"));</pre>在Firefox、Safari、Opera、Chrome来检测插件',
        'conSub': []
      }, {
        'body': '检测IE中的插件，可以使用专有的ActiveXObject类型，并尝试创建一个特定插件的实例。IE是以COM对象的方式实现插件的，而COM对象使用唯一标识符来标识。所以要想检查特定的插件，就必须知道其COM标识符。<pre>//检测IE中的插件<br>function hasIEPlugin(name){<br> try{<br>  new ActiveXObject(name);<br>  return true;<br> } catch(ex){<br>  return false<br> }<br>}<br>//检测Flash<br>alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));<br>//检测QuickTime<br>alert(hasIEPlugin("QuickTime.QuickTime"));</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '每个插件对象本身也是一个MimeType对象的数组，这些对象可以通过方括号语法来访问。每个MimeType对象有4个属性：包含MiME类型描述的description、回指插件对象的enabledPlugin、表示与MIME类型对应的文件扩展名的字符串suffixes（以逗号分隔）和表示完整MIME类型字符串的type。'
      }, {
        'name': 'plugins集合中有一个名叫refresh()的方法，用于刷新plugins以反映最新安装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果将这个值设置为true，则会重新加载包含插件的所有页面；否则，只更新plugins集合，不重新加载页面。'
      }]
    }, {
      'name': '注册处理程序',
      'content': [{
        'body': 'registerContentHandler()和registerProtocolHandler()方法，这两个方法可以让一个站点指明它可以处理特定类型的信息。其中，registerContentHandler()方法接收三个参数：要处理的MIME类型、可以处理该MIME类型的页面的URL以及应用程序的名称。类似的调用方式也适用于registerProtocolHandler()方法，它也接收三个参数：要处理的协议、处理该协议的页面的URL和应用程序的名称。（需在Firefox3,+使用）',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': 'screen对象',
    'content': [{
      'body': '参考<table class="table table-bordered"><thead><tr><td>属性</td><td>说明</td><td>IE</td><td>Firefox</td><td>Safari/Chrome</td><td>Opera</td></tr></thead><tbody><tr><td>availHeight</td><td>屏幕的像素高度减系统部件高度之后的值（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr><tr><td>availLeft</td><td>未被系统部件占用的最左侧的像素值（只读）</td><td></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td></td></tr><tr><td>availTop</td><td>未被系统部件占用的最上方的像素值（只读）</td><td></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td></td></tr><tr><td>availWidth</td><td>屏幕的像素宽度减系统部件宽度之后的值（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr><tr><td>bufferDepth</td><td>读、写用于呈现屏外位图的位数</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>colorDepth</td><td>用于表现颜色的位数；多数系统都是32（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr><tr><td>deviceXDPI</td><td>屏幕的实际的水平DPI（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>deviceYDPI</td><td>屏幕的实际的垂直DPI（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>fontSmooth-ingEnabled</td><td>表示是否启用了字体平滑（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>height</td><td>屏幕的像素高度</td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr><tr><td>left</td><td>当前屏幕距左边的像素距离</td><td></td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td></tr><tr><td>logicalXDPI</td><td>屏幕逻辑的水平DPI（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>logicalYDPI</td><td>屏幕逻辑的垂直DPI（只读）</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>pixelDepth</td><td>屏幕的位深（只读）</td><td></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr><tr><td>top</td><td>当前屏幕距上边的像素距离</td><td></td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td></tr><tr><td>updateInterval</td><td>读、写以毫秒表示的屏幕刷新时间间隔</td><td><i class="glyphicon glyphicon-ok"></i></td><td></td><td></td><td></td></tr><tr><td>width</td><td>屏幕的像素宽度</td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td><td><i class="glyphicon glyphicon-ok"></i></td></tr></tbody></table>而在移动设备上，ios的设备始终返回竖屏比例，而Android设备则相应调用screen.width和screen.height的值',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': 'history对象',
    'content': [{
      'body':'history对象保存着用户上网的记录。使用go()方法可以在用户的历史纪录中任意跳转，可以向后也可以向前。这个方法接收一个参数，表示向前或向后跳转的一个整数值，负数表示向后跳转（返回），正数表示向前跳转。也可以给该方法传递一个字符串参数，此时会跳至最近的和该字符串有关的位置，另外，可以使用back()【后退】和forward()【前进】来代替go()。history对象还有一个length属性，保存着历史纪录的数量。这个数量包括所有历史纪录，即所有向后或向前的记录，对于第一个页面而言，history.length=0,',
      'conSub':[]
    }],
    'extra_content': [],
    'subStr': []
  }],
  'sum': [{
    'content': '浏览器对象模型(BOM)以window对象为依托，表示浏览器窗口以及页面可见区域。同时，window对象还是ECMAScript中的Global对象，因而所有全局变量和函数都是它的属性，且所有原生的构造函数及其他函数也都存于它的命名空间下。',
    'conSub': [{
      'name': '在使用框架时，每个框架都有自己的window对象以及所有原生构造函数及其他函数的副本，每个框架都保存在frames集合中，可以通过位置或通过名称来访问。'
    }, {
      'name': '有一些窗口指针，可以用来引用其他框架，包括父框架'
    }, {
      'name': 'top对象始终指向最外围的框架，也就是整个浏览器窗口'
    },{
      'name':'parent对象表示包含当前框架的框架，而self对象则回指window。'
    },{
      'name':'使用replace()方法可以导航到一个新URL，同时这个URL将会替换浏览器历史纪录中当前显示的页面'
    }]
  }, {
    'content': 'BOM中的其他两个对象，screen和history中，screen保存着与客户端显示器有关的信息，这些信息一般只用于站点分析。history对象为访问浏览器的历史纪录有关。',
    'conSub': []
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
