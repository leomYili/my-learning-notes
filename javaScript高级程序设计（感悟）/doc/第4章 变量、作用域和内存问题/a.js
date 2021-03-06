var four_chapter = {
  'name': '变量、作用域和内存问题',
  'small': '第四章',
  'content': '',
  'subStr': [{
    'name': '基本类型和引用类型的值',
    'content': [{
      'body': 'ECMAScript变量可能包含两种不同的数据类型的值：基本类型值和引用类型值。基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。而JavaScript不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象，为此，引用类型的值是按引用访问的。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '动态的属性',
      'content': [{
        'body': '定义基本类型值和引用类型值的方式是类似的：创建一个变量并为该变量赋值。但是，当值保存到变量中之后，对不同类型的值执行的操作则不大相同，只能给引用类型的值动态添加属性<pre>var test1="12";<br>test1.age=27;<br>alert(test1.age);//undefined</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '复制变量值',
      'content': [{
        'body': '除了保存的方式不同，在从一个变量向另一个变量复制基本类型值和引用类型值时，也存在不同，如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。而且这两个变量的值是独立的；而当一个变量向另一个变量复制引用类型的值时，也会先将储存在变量对象中的值复制一份放到为新变量分配的空间中。但复制结束后，两个变量实际将引用一个对象<pre>var obj1=new Object();<br>var obj2=obj1;<br>obj1.name="sada";<br>alert(obj2.name);//"sada"</pre>',
        'conSub': []
      }],
      'extra_content': [],
    }, {
      'name': '传递参数',
      'content': [{
        'body': 'ECMAScript中的所有函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样;而对于引用类型的传递，则如同引用类型变量的复制一样。',
        'conSub': []
      }, {
        'body': '在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量（即命名参数，具体表现为arguments对象中的一个元素）。在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，所以这个局部变量的变化会反映在函数的外部',
        'conSub': []
      }],
      'extra_content': [{
        'name': '可以把ECMAScript函数的参数想象成局部变量。'
      }]
    }, {
      'name': '检测类型',
      'content': [{
        'body': '对于基本类型的变量而言，typeof操作符是确定一个变量是字符串，数值，布尔值还是undefined的最佳工具。如果变量的值是一个对象或null，则typeof操作符会返回“object”<pre>var s = "Nicholas";<br>var b = true;<br>var i = 22;<br>var u;<br>var n = null;<br>var o = new Object();<br>alert(typeof s);//string<br>alert(typeof b);//boolean<br>alert(typeof i);//number<br>alert(typeof u);//undefined<br>alert(typeof n)//object;<br>alert(typeof o);//object<br></pre>',
        'conSub': []
      }, {
        'body': '而在检测引用类型的值时，ECMAScript所提供的instanceof操作符就可以做到，如果变量是给定引用类型的实例，那么instanceof操作符就会返回true，<pre>alert(person instanceof Object);//变量是否是Object<br>alert(colors instanceof Array);//变量是否是数组<br>alert(pattern instanceof RegExp);//变量是RegExp吗</pre>根据规定，所有引用类型的值都是Object的实例，因此，在检测一个引用类型值和Object构造函数时，instanceof操作符会始终返回true，但使用instanceof操作符检测基本类型的值时，则该操作符始终会返回false，因为基本类型不是对象。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '使用typeof操作符检测函数时，会返回‘function’，注意，在IE和Firefox中，对正则表达式使用typeof会返回“object”，其他则为“function”'
      }]
    }]
  }, {
    'name': '执行环境及作用域',
    'content': [{
      'body': '执行环境是JavaScript中最为重要的一个概念，其定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。解析器在处理数据时会在后台使用它。',
      'conSub': []
    }, {
      'body': '全局执行环境是最外围的一个执行环境。根据ECMAScript实现所在的宿主环境不同，表示执行环境的对象也不一样。在Web浏览器中，全局执行环境被认为是window对象，因此，所有全局变量和函数都是作为window对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出--例如关闭网页或浏览器时才被销毁）',
      'conSub': []
    }, {
      'body': '每个函数都有自己的执行环境，当执行流进入一个函数，函数的环境就会被推入一个环境栈中，而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。',
      'conSub': []
    }, {
      'body': '当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前段，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象作为变量对象。活动对象在一开始只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量来自包含环境，而再下一个变量对象则来自下一个包含环境，这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。',
      'conSub': []
    }],
    'extra_content': [{
      'name': '函数参数也被当作变量来对待，因此其访问规则与执行环境中的其他变量相同。'
    }],
    'subStr': [{
      'name': '延长作用域链',
      'content': [{
        'body': '有些语句可以在作用域链的前段临时增加一个变量对象，该变量对象会在代码执行后被移除，',
        'conSub': [{
          'name': 'try-catch语句的catch块'
        }, {
          'name': 'with语句'
        }]
      }, {
        'body': '这两个语句都会在作用域链的前段添加一个变量对象。对with来说，会将指定的对象添加到作用域链中。对catch语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。<pre>function buildUrl(){<br> var qs = "?debug=true";<br> with(location){<br>  var url = href+qs;<br> }<br> return url;//"?debug=true"<br>}</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '在IE8及之前版本的JavaScript实现中，存在一个与标准不一致的地方，即在catch中捕获的错误对象会被添加到执行环境的变量对象，而不是catch语句的变量对象中。'
      }]
    }, {
      'name': '没有块级作用域',
      'content': [{
        'body': '在其他类C语言中，由花括号封闭的代码块都有自己的作用域，因而支持根据条件来定义变量。如果是在C、C++、或Java中，for中定义的变量会在语句执行完毕后被销毁。但JavaScript则不会，而是会将变量添加到当前的执行环境中，所以，在使用，if，for时，应单独为其创建独立环境，而不去影响全局或大环境。',
        'conSub': [{
          'name': '声明变量<br>使用var声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境；在with语句中，最接近的环境是函数环境。如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境。'
        }, {
          'name': '查询标识符<br>搜索过程从作用域链的前段开始，向上逐级查询与给定名字匹配的标识符。如果在局部环境中找到了该标识符，搜索过程停止，变量就绪。如果在局部环境中没有找到该变量名，则继续沿作用域链向上搜索，。搜索过程将一直追溯到全局环境的变量对象。如果在全局环境中也没有找到这个标识符，则意味着该变量未声明。在局部环境中存在着同名标识符，就不会使用位于父环境中的标识符。'
        }]
      }],
      'extra_content': [{
        'name': '一定要在初始化变量时，先声明变量。'
      }]
    }]
  }, {
    'name': '垃圾收集',
    'content': [{
      'body': 'JavaScript具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '标记清除',
      'content': [{
        'body': '当变量进入环境时，就将这个变量标记为“进入环境”而当变量离开环境时，则将其标记为“离开环境”，而现在主流的浏览器都使用的是标记清除（新版本），只不过垃圾收集的时间间隔有所不同。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '引用计数',
      'content': [{
        'body': '是跟踪记录每个值被引用的次数，在IE中，会存在循环引用的问题，可以使用<pre>myObject.element = null;</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '管理内存',
      'content': [{
        'body': '确保占用最少的内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为null来释放其引用——这个做法叫做解除引用，',
        'conSub': []
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': 'JavaScript变量可以用来保存两种类型的值：基本类型值和引用类型值。基本类型的值源自一下5种基本数据类型：Undefined、Null、Boolean、Number和String。基本类型值和引用类型值具有以下特点',
    'conSub': [{
      'name': '基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中。'
    }, {
      'name': '从一个变量向另一个变量赋值基本类型的值，会创建这个值的一个副本。'
    }, {
      'name': '引用类型的值是对象，保存在堆内存中。'
    }, {
      'name': '包含引用类型值的对象实际上包含的不是对象本身，而是一个指向该对象的指针。'
    }, {
      'name': '从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象。'
    }, {
      'name': '确定一个值是那种基本类型可以使用typeof操作符，而确定一个值是哪种引用类型可以使用instanceof操作符。'
    }]
  }, {
    'content': '所有变量都存在一个执行环境（作用域），这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。',
    'conSub': [{
      'name': '执行环境有全局执行环境和函数执行环境之分。'
    }, {
      'name': '每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链。'
    }, {
      'name': '函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含父环境，乃至全局环境。'
    }, {
      'name': '全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据'
    }, {
      'name': '变量的执行环境有助于确定应该何时释放内存。'
    }]
  },{
    'content':'JavaScript是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。',
    'conSub':[{
      'name':'离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。'
    },{
      'name':'"标记清除"是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。'
    },{
      'name':'另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有制被引用的次数。不常用，但在IE中访问非原生JavaScript对象时，这种算法会导致问题（IE9以下。）'
    },{
      'name':'当代码中存在循环引用现象时，“引用计数”算法就会出现问题。'
    },{
      'name':'解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局变量、全局对象属性以及循环引用变量的引用、'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
