var nine_chapter = {
  'name': '客户端检测',
  'small': '第9章',
  'content': '对于浏览器的兼容性判断',
  'subStr': [{
    'name': '能力检测',
    'content': [{
      'body': '最常用的客户端检测形式，又称特性检测，是通过对浏览器的能力进行识别。例：<pre>if(object.propertyInQuestion){<br> //使用object.propertyInQuestion<br>}</pre>要理解能力检测，得理解，第一个概念是先检测达成目的的最常用的特性。第二个概念是必须测试实际要用到的特性。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '更可靠的能力检测',
      'content': [{
        'body': '在可能的情况下，要尽量使用typeof进行能力检测。特别是，宿主对象没有义务让typeof返回合理的值。所以，可以使用下面的函数进行检测<pre>function isHostMethod(object,property){<br> var t=typeof object[property];<br> return t=="function" || (!!(t=="object" && object[property])) || t=="unknown";<br>}</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '能力检测，不是浏览器检测',
      'content': [],
      'extra_content': []
    }]
  }, {
    'name': '怪癖检测',
    'content': [{
      'body': '其目标是识别浏览器的特殊行为，但与能力检测确认浏览器支持什么能力不同，怪癖检测是想要知道浏览器的缺陷。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': '用户代理检测',
    'content': [{
      'body': '其通过检测用户代理字符串来确定实际使用的浏览器。在每一次HTTP请求中，用户代理字符串是作为响应首部发送的，而且该字符串可以通过JavaScript的navigator.userAgent属性访问。在服务端，该方法较为常用，而在客户端，则不常用。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '用户代理字符串的历史',
      'content': [{
        'body': '书222~228',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '用户代理字符串检测技术',
      'content': [{
        'body': '按呈现引擎和最低限度的版本来编写脚本。',
        'conSub': [{
          'name': '识别呈现引擎<br><pre>var client=function(){<br> var engine={<br>  //呈现引擎<br>  ie:0,<br>  gecko:0,<br>  webkit:0,<br>  khtml:0,<br>  opera:0,<br>  //具体的版本号<br>  ver:null<br> };<br> //在此检测呈现引擎、平台和设备<br> return {<br>  engine:engine<br> }<br>}();</pre>'
        }]
      }],
      'extra_content': []
    }, {
      'name': '完整的用户代理字符串检测脚本。',
      'content': [{
        'body':'包括检测呈现引擎、平台、Windows系统，移动设备和游戏系统。案例中client',
        'conSub':[]
      }],
      'extra_content': []
    },{
      'name':'使用方法',
      'content': [{
        'body':'用户代理一般适用：',
        'conSub':[{
          'name':'不能直接准确地使用能力检测或怪癖检测。'
        },{
          'name':'同一款浏览器在不同平台下具备不同的能力。'
        },{
          'name':'为了跟踪分析等目的需要知道确切的浏览器'
        }]
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': '简介',
    'conSub': [{
      'name': '<strong>能力检测</strong>:在编写代码之前先检测特定浏览器的能力。'
    }, {
      'name': '<strong>怪癖检测</strong>:怪癖实际上是浏览器实现中存在的bug，例如早期的WebKit中就存在一个怪癖，即它会在for-in循环中返回被隐藏的属性。'
    }, {
      'name': '<strong>用户代理检测</strong>:通过检测用户代理字符串来识别浏览器。用户代理字符串中包含大量与浏览器有关的信息。'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
