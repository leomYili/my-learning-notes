var second_chapter = {
  'name': '在HTML页面中使用JavaScript',
  'small':'第二章',
  'content': '如何使用-JavaScript',
  'subStr': [{
    'name': '&lt;script&gt;元素',
    'content': [{
      'body': '向页面插入JavaScript的主要方法，就是使用<code>&lt;script&gt;</code>元素,下面是HTML 4.0.1为script定义的六个属性',
      'conSub': [{
        'name': 'async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本有效'
      }, {
        'name': 'charset：可选。表示通过src属性指定的代码的字符集。大多数浏览器会忽略它的值。'
      }, {
        'name': 'defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本有效。IE7及更早版本也支持该属性'
      }, {
        'name': 'language：已废弃表示编写代码的脚本语言'
      }, {
        'name': 'src：可选。表示包含要执行代码的外部文件'
      }, {
        'name': 'type：可选。language的替代；表示编写代码使用的脚本语言的内容类型(MIME),最多使用的还是text/javascript(默认值)。而服务器在传送JavaScript文件时使用的通常类型是application/x-javascript,但在type中设置这个值却可能导致脚本被忽略，而在非IE浏览器中，还可以使用：application/javascript和application/ecmascript。'
      }]
    }, {
      'body': '使用<code>&lt;script&gt;</code>元素的方式有两种：直接在页面中嵌入JavaScript代码和包含外部文件',
      'conSub': []
    }, {
      'body': '在使用<code>&lt;script&gt;</code>元素嵌入代码时，只需为<code>&lt;script&gt;</code>指定type属性（默认type）。然后，直接放入<code>&lt;script&gt;</code>元素内部:<br><pre><code>&lt;script type="text/javascript"&gt;<br>  function sayHi(){<br>    alert("hh");<br>  }<br>&lt;/script&gt;</code></pre>',
      'conSub': []
    }, {
      'body': '包含在<code>&lt;script&gt;</code>元素内部的JavaScript代码将被从上至下依次执行解释。',
      'conSub': []
    }, {
      'body': '在使用<code>&lt;script&gt;</code>元素嵌入代码时，记住不要在代码中的任何地方出现<code>&lt;/script&gt;</code>字符串，因为按照解析嵌入式代码的规则，当浏览器遇到字符串<code>&lt;/script&gt;</code>时，就会认为那是结束的<code>&lt;/script&gt;</code>标签。只需把这个字符串分为两部分即可解决该问题:<br><pre><code>&lt;script type="text/javascript"&gt;<br>  function sayScript(){<br>    alert("<\/script>");<br>  }<br>&lt;/script&gt;</code></pre>',
      'conSub': []
    }, {
      'body': '在使用<code>&lt;script&gt;</code>元素嵌入代码时，记住不要在代码中的任何地方出现<code>&lt;/script&gt;</code>字符串，因为按照解析嵌入式代码的规则，当浏览器遇到字符串<code>&lt;/script&gt;</code>时，就会认为那是结束的<code>&lt;/script&gt;</code>标签。只需把这个字符串分为两部分即可解决该问题:<br><pre><code>&lt;script type="text/javascript"&gt;<br>  function sayScript(){<br>    alert("<\/script>");<br>  }<br>&lt;/script&gt;</code></pre>如果是在XHTML中,也可以省略前面示例代码结束的<code>&lt;/script&gt;</code>标签:<br><pre><code>&lt;script type="text/javascript" /&gt;</code></pre>',
      'conSub': []
    }, {
      'body': '注意,带有src属性的<code>&lt;script&gt;</code>元素不应在其<code>&lt;script&gt;</code>和<code>&lt;/script&gt;</code>之间再包含额外的JavaScript代码，如果加入，则会忽略。<br>无论如何包含代码，只要不存在defer和async属性，浏览器都会按照<code>&lt;script&gt;</code>元素在页面中出现的先后顺序对它们依次进行解析。',
      'conSub': []
    }],
    'extra_content': [{
      'content': '外部JavaScript的文件的.js扩展名不是必须的。因为浏览器不会检查包含JavaScript的文件的扩展名。这样一来，使用jsp，PHP等服务器端语言动态生成JavaScript代码就可以实现，但服务器通常还是需要看扩展名决定为响应应用哪种MIME类型。如果不使用.js扩展名，请确保服务器能返回正确的MIME类型'
    }],
    'subStr': [{
      'name': '标签的位置',
      'content': [{
        'body': '当所有<code>&lt;script&gt;</code>元素放在页面的<head>元素中时，目的就是把所有的外部文件（css和js的引用都放在相同的地方），但在文档的<code>&lt;head&gt;</code>元素内部包含了所有的js文件之后，就得等全部js代码被下载完之后，才开始解析页面内容（浏览器从<code>&lt;body&gt;</code>开始解析内容），这会造成一定的空白期，所以可放在<code>&lt;body&gt;</code>中的内容之后,这样，就会先显示页面内容。再加载js文件。',
        'conSub': []
      }],
      'extra_content':[]
    }, {
      'name': 'defer延迟脚本',
      'content': [{
        'body': '该属性用途是表明脚本在执行时不会影响页面的构造。脚本会被延迟到整个页面都解析完毕后再执行，在<code>&lt;script&gt;</code>元素中设置defer属性，相当于告诉浏览器立即下载，但延迟执行。在HTML5中，规范要求脚本按照它们出现的先后顺序执行,而且会在<a href="#">DOMContentLoaded</a>事件触发之前执行',
        'conSub': []
      }],
      'extra_content': [{
        'content': '在XHTML文档中，要把defer属性设置为defer="defer"'
      }],
    },{
      'name':'异步脚本',
      'content':[{
        'body':'HTML5为<code>&lt;script&gt;</code>元素定义了async属性。该属性与defer相似，都用于改变处理脚本的行为，只适用外部文件，并告诉浏览器立即下载文件，但并不保证按照指定它们的先后顺序执行（例：两个定义该属性的外部文件），而使用该属性的目的是不让页面等待脚本下载和执行，从而异步加载页面其他内容。为此，建议异步脚本不要在加载期间修改DOM。<br>异步脚本一定会在页面的load事件之前执行，但可能会在<a href="#">DOMContentLoaded</a>事件触发之前和之后执行',
        'conSub':[]
      }],
      'extra_content':[{
        'content':'在XHTML文档中，要把async属性设为async="async"'
      }]
    },{
      'name':'在XHTML中的用法',
      'content':[{
        'body':'在XHTML中，语法的使用更加严格，所以可以使用hack的方法:<br><pre><code>&lt;script type="text/javascript"&gt;<br>//&lt;![CDATA[<br>  function test(){}<br>//]]&gt;<br>&lt;/script&gt;</code></pre>这种方法可以通过XHTML的验证，而且对XHTML之前的浏览器也会平稳退化',
        'conSub':[]
      }],
      'extra_content':[{
        'content':'在将页面的MIME类型指定为"application/xhtml+xml"的情况下会触发XHTML模式。'
      }]
    }]
  },{
    'name':'嵌入代码与外部文件',
    'content':[{
      'body':'支持使用外部文件的人多会强调如下优点',
      'conSub':[{
        'name':'可维护性：将所有文件分类再进行维护，能提高可维护性'
      },{
        'name':'可缓存：浏览器能够根据具体的设置缓存链接的所有外部文件。'
      },{
        'name':'适应未来：通过外部文件来使用JavaScript，XHTML无需使用上述hack语法。其与普通的HTML语法一致'
      }]
    }],
    'extra_content': [],
    'subStr':[]
  },{
    'name':'文档模式',
    'content':[{
      'body':'IE5.5引入文档模式，通过文档类型（doctype）来实现的。混杂（quirks mode），标准（standards mode）两种模式，混杂是在文档开始没有进行声明的情况下才会出现的模式。',
      'conSub':[]
    }],
    'extra_content': [],
    'subStr':[]
  },{
    'name':'&lt;noscript&gt;元素',
    'content':[{
      'body':'在浏览器不支持脚本的时候所提示的内容，或浏览器支持脚本，但脚本被禁用。只在这两种情况下出现内容。',
      'conSub':[]
    }],
    'extra_content': [],
    'subStr':[]
  }],
  'sum': [{
    'content':'<code>&lt;script&gt;</code>元素，可以把JavaScript嵌入到页面上，也可将外部文件引入HTML页面',
    'conSub':[{
      'name':'包含外部文件时，src属性必须指向文件的URL'
    },{
      'name':'所有<code>&lt;script&gt;</code>元素都会按照在页面中出现的先后顺序依次被解析。在不使用defer和async属性的情况下，只有解析完前面<code>&lt;script&gt;</code>元素中的代码之后，，才会开始解析后面的代码。'
    },{
      'name':'一般把<code>&lt;script&gt;</code>元素放在最后，即主要内容后面，<code>&lt;/body&gt;</code>标签前面'
    },{
      'name':'使用defer属性可以让脚本在文档完全呈现后再执行。延迟脚本总是按照指定它们的顺序执行'
    },{
      'name':'使用async属性可以表示出当前脚本不必等待其他脚本，也不必阻塞文档呈现。不能保证异步脚本按照它们在页面中出现的顺序执行。'
    },{
      'name':'noscript元素可以指定在不支持脚本的浏览器中显示特定的内容，而在脚本启用的情况下，浏览器不会显示noscript元素的内容'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
