var twenty_chapter = {
  'name': 'Ajax与comet',
  'small': '第20章',
  'content': 'XMLHttpRequest对象是核心',
  'subStr': [{
    'name': 'XMLHttpRequest对象',
    'content': [{
      'body': 'IE7+、Firefox、Opera、Chrome和Safari都支持原生的XHR对象',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'XHR的用法',
      'content': [{
        'body': '在使用XHR对象时，要调用的第一个方法是open()，它接收3个参数：要发送的请求的类型（get、post），请求的URL和表示是否异步发送请求的布尔值；而调用open()方法并不会真正发送请求，而只是启动一个请求以备发送。',
        'conSub': []
      }, {
        'body': '而send()方法接收一个参数，即要作为请求主题发送的数据。如果不需要通过请求主体发送数据，则必须传入null，调用send之后，请求就会被分派到服务器，而收到响应之后响应的数据会自动填充XHR对象的属性，简介',
        'conSub': [{
          'name': 'responseText:作为响应主体被返回的文本'
        }, {
          'name': 'responseXML:如果响应的内容类型是“text/xml”或“application/xml”，这个属性将保存包含着响应数据的XMLDOM文档'
        }, {
          'name': 'status:响应的HTTP状态'
        }, {
          'name': 'statusText:HTTP状态的说明'
        }]
      }, {
        'body': 'XHR的readyState属性，表示请求/响应过程中的当前活动阶段。',
        'conSub': [{
          'name': '0:未初始化。尚未调用open()方法'
        }, {
          'name': '1:启动。已经调用open()方法，但尚未调用send()方法'
        }, {
          'name': '2:发送。已经调用send()方法，但尚未接收到响应'
        }, {
          'name': '3:接收。已经接收到部分响应数据。'
        }, {
          'name': '4:完成。已经接收到全部响应数据，而且已经可以在客户端使用'
        }]
      }, {
        'body': '在接收之前还可以调用abort()方法来取消异步请求，在中止请求后，还应该对XHR对象进行解引用操作。由于内存愿意，不建议重用XHR对象',
        'conSub': []
      }],
      'extra_content': [{
        'name': '只能向同一个域中使用相同端口和协议的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发安全错误'
      }]
    }, {
      'name': 'HTTP头部信息',
      'content': [{
        'body': 'XHR提供了操作头部信息（即请求头部和响应头部）的方法',
        'conSub': [{
          'name': 'Accept:浏览器能够处理的内容类型'
        }, {
          'name': 'Accept-Charset:浏览器能够处理的字符集'
        }, {
          'name': 'Accept-Encoding:浏览器能够处理的压缩编码'
        }, {
          'name': 'Accept-Language:浏览器当前设置的语言'
        }, {
          'name': 'Connection:浏览器与服务器之间连接的类型'
        }, {
          'name': 'Cookie:当前页面设置的任何Cookie'
        }, {
          'name': 'Host:发出请求的页面所在的域'
        }, {
          'name': 'Referer:发出请求的页面的URL。'
        }, {
          'name': 'User-Agent:浏览器的用户代理字符串'
        }]
      }],
      'extra_content': []
    }, {
      'name': 'GET请求',
      'content': [{
        'body': '必要时，可以将查询字符串参数追加到URL的末尾，以便将信息发送到服务器。对XHR而言，位于传入open()方法的URL末尾的查询字符串必须经过正确的编码才行',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'POST请求',
      'content': [{
        'body': 'POST请求的主题可以包含非常多的数据，而且格式不限。发送POST请求的第二步就是向send()方法中传入某些数据。可以使用XHR来模仿表单提交：首先将Content-Type头部信息设置为application/x-www-form-urlencoded,也就是表单提交时的内容类型，再将主题部分通过serialize()函数来序列化。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '从性能角度看，以发送相同的数据计，get请求的速速最多可达到post请求的两倍'
      }]
    }]
  }, {
    'name': 'XMLHttpRequest二级',
    'content': [{
      'body': '所有浏览器都实现了二级规定的部分',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'FormData',
      'content': [{
        'body': 'FormData为序列化表单以及创建与表单格式相同的数据（用于通过XHR传输）提供了便利。支持的浏览器有Firefox4+、Safari5+、Chrome和Android3+版WebKit',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '超时设定',
      'content': [{
        'body': 'p579',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'overrideMimeType()方法',
      'content': [{
        'body': '可以用来重写服务器返回的MIME类型。支持的有Firefox、Safari4+、Opera10.5和Chrome',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '进度事件',
    'content': [{
      'body': '有以下6个进度事件',
      'conSub': [{
        'name': 'loadstart:在接收到响应数据的第一个字节时触发'
      }, {
        'name': 'progress:在接收响应期间持续不断地触发'
      }, {
        'name': 'error:在请求发生错误时触发'
      }, {
        'name': 'abort:在因为调用abort()方法而终止连接时触发'
      }, {
        'name': 'load:在接收到完整的响应数据时触发'
      }, {
        'name': 'loadend:在通信完成或者触发error、abort或load事件后触发。'
      }]
    }, {
      'body': '每个请求都从触发loadstart事件开始，接下来是一或多个progress事件，然后触发error、abort或load事件中的一个，最后以触发loadend事件结束；支持前5个事件的浏览器有Firefox3.5+、Safari4+、Chrome、IOS版Safari和Android版WebKit。Opera（从第11版开始）、IE8+只支持load事件。目前还没有浏览器支持loadend事件',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'load事件',
      'content': [{
        'body': '必须检查status属性，才能确定数据是否真的已经可用了。Firefox、Opera、Chrome和Safari都支持load事件',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'progress事件',
      'content': [{
        'body': '新加的事件',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '跨源资源共享',
    'content': [{
      'body': 'XHR的主要限制，就是跨源安全资源，而CORS是W3C的一个工作草案，其基本思想是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'IE对CORS的实现',
      'content': [{
        'body': 'p582',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '其他浏览器对CORS的实现',
      'content': [{
        'body': '都通过XMLHttpRequest对象实现了对CORS的原生支持。要请求位于另一个域中的资源，使用标准的XHR对象并在open()方法中传入绝对URL即可，也会有一些限制',
        'conSub': [{
          'name': '不能使用setRequestHeader()设置自定义头部'
        }, {
          'name': '不能发送和接收cookie'
        }, {
          'name': '调用getAllResponseHeaders()方法总会返回空字符串'
        }]
      }],
      'extra_content': []
    }, {
      'name': 'Preflighted Reqeusts',
      'content': [{
        'body': 'CORS通过一种叫做Preflighted Reqeusts的透明服务器验证机制支持开发人员使用自定义的头部、GET或POST之外的方法，以及不同类型的主体内容。支持Preflight请求的浏览器包括Firefox3.5+、Safari4+和Chrome。IE10及更早版本都不支持',
        'conSub': []
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': 'Ajax',
    'conSub': []
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
