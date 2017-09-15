var seven_chapter = {
  'name': '函数表达式',
  'small': '第七章',
  'content': '在第5章，曾介绍过，定义函数的方式有两种：一种是函数声明，另一种是函数表达式。<pre>function functionName(arg0){<br> //函数体<br> }</pre>而Firefox，Safari，Chrome和Opera都给函数定义了一个非标准的name属性，通过这个属性可以访问到给函数指定的名字。这个属性的值永远等于跟在function关键字后面的标识符。<pre>alert(functionName.name);//functionName</pre>而关于函数声明，它的一个重要特征就是函数声明提升，意思是在执行代码之前会先读取函数声明。第二种创建函数的方式是使用函数表达式：<pre>var functionName=function(arg0){<br> //函数体<br>}</pre>这种情况下创建的函数叫做匿名函数，因为function关键字后面没有标识符。匿名函数的name属性是空字符串。',
  'subStr': [{
    'name': '递归',
    'content': [{
      'body': '递归函数是在一个函数通过自己名字调用自身的情况下构成的，<pre>function factorial(num){<br> if(num<=1){<br>  return 1;<br> }else{<br>  return num*factorial(num-1);<br> }<br>}<br>var anotherFactorial=factorial;<br>factorial=null;<br>alert(anotherFactorial(4));//出错</pre>因为将原始函数赋null之后，院士函数消失，所以会出错。可以使用arguments.callee解决问题。arguments.callee是一个指向正在执行的函数的指针，因此可以用它来实现对函数的递归调用。<pre>function factorial(num){<br> if(num<=1){<br>  return 1;<br> }else{<br>  return num*arguments.callee(num-1);<br> }<br>}</pre>可以避免上述问题。而在严格模式下，因为访问不到arguments.callee,所以可以用命名函数表达式来达成相同的结果。<pre>var factorial = (function f(num){<br> if(num<=1){<br>  return 1;<br> }else{<br>  return num*f(num-1);<br> }<br>};</pre>',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': '闭包',
    'content': [{
      'body': '闭包是指有权访问另一个函数作用域中的变量的函数，（无所谓有无函数名，只要能访问到另一个函数作用域中的变量）。<pre>function test(propertyName){<br> return function(object1,object2){<br>  var value1=object1[propertyName];<br>  var value2=object2[propertyName];<br>  if(value1 < value2){<br>   return -1;<br>  }else if(value1>value2){<br>   return 1;<br>  }eles{<br>   return 0;<br>  }<br> };<br>}</pre>',
      'conSub': []
    }, {
      'body': '无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域，但闭包不同。因为闭包仍然能够调用到该函数作用域中的变量，所以阻止该函数活动对象自动销毁，只有当匿名函数被销毁后，该函数的活动对象才会被销毁。例<pre>//创建函数<br>var compareNames=test("name");<br>//调用函数<br>var result=compareNames({name:"Nicholas"},{name:"Greg"});<br>//解除对匿名函数的引用（以便释放内存）<br>compareName=null;</pre>',
      'conSub': []
    }],
    'extra_content': [{
      'name': '由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。'
    }],
    'subStr': [{
      'name': '闭包与变量',
      'content': [{
        'body': '副作用是闭包只能取得包含函数中任何变量的最后一个值。<pre>function createFunctions(){<br> var result=new Array();<br> for(var i=0;i<10;i++){<br>  result[i]=function(){<br>   return i;<br>  };<br> }<br> return result;//[10,10,10……,10]<br>}</pre>可以修改成<pre>function createFunctions(){<br> var result=new Array();<br> for(var i=0;i<10;i++){<br>  result[i]=function(num){<br>   return function(){<br>    return num;<br>   };<br>  }(i);<br> };<br> return result;<br>}</pre>由于函数参数是按值传递的，所以就会将变量i的当前值复制给参数num，而在这个匿名函数内部，又创建并返回了一个访问num的闭包。这样一来，result数组中的每个函数都有自己num变量的一个副本，因此就可以返回各自不同的数值了。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '关于this对象',
      'content': [{
        'body': 'this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window。而当函数被作为某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性，因此其this对象通常指向window。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。<pre>var name="the window";<br>var object={<br> name:"My Object",<br> getNameFunc:function(){<br>  return function(){<br>   return this.name;<br>  };<br> }<br>};<br>alert(object.getNameFunc());//the window（非严格模式下）</pre>可以看出，值并不是"My Object"。',
        'conSub': []
      }, {
        'body': '每个函数在被调用时都会自动取得两个特殊变量：this和arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量。但如果把外部作用域的this对象保存在一个闭包能够访问到的变量中，就可以让闭包访问该对象了。<pre>var name="the window";<br>var object={<br> name:"My Object",<br> getNameFunc:function(){<br>   var that=this;<br>  return function(){<br>   return that.name;<br>  };<br> }<br>};<br>alert(object.getNameFunc());//My Object</pre>因为即使在函数返回之后，that也仍然引用着object，所以调用object.getNameFunc()就返回了"My Object"。',
        'conSub': []
      }, {
        'body': '例，this的特殊情况：<pre>var name="the window";<br>var object={<br> name:"My Object",<br> getName:function(){<br>  return this.name;<br> }<br>}<br>object.getName();//"My Object"<br>(object.getName)();//"My Object"<br>(object.getName=object.getName)();//the window（非严格模式下）</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'this和arguments也存在同样的问题。如果想访问作用域中的arguments对象，必须将对该对象的引用保存到另一个闭包能够访问的变量中。'
      }]
    }, {
      'name': '内存泄漏',
      'content': [{
        'body': '闭包会引用包含函数的整个活动对象，而其中包含着element，即使闭包不直接引用element，包含函数的活动对象中也仍然会保存一个引用。因此，有必要把element变量设置为null，这样就能解除对DOM对象的引用，顺利地减少其引用数，确保正常回收其占用的内存。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '模仿块级作用域',
    'content': [{
      'body': '因为JavaScript没有块级作用域的概念，所以意味着在块语句中定义的变量，实际上是在包含函数中而非语句中创建的。（最简单的是在function中定义的for的i）。匿名函数可以用来模仿块级作用域并避免这个问题。语法为：<pre>(function (){<br> //这里是块级作用域<br>})();</pre>注意：JavaScript将function关键字当作一个函数声明的开始，而函数声明后面不能跟圆括号，而函数表达式的后面可以跟圆括号。for的i的问题：<pre>function test(){<br> (function(){<br>  for(var i=0;i<10;i++){<br>   alert(i);//error,已将i私有，所以外部访问不到<br> })();<br>};</pre>',
      'conSub': []
    }],
    'extra_content': [{
      'name': '这种模仿做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了。'
    }],
    'subStr': []
  }, {
    'name': '私有变量',
    'content': [{
      'body': 'JavaScript中没有私有成员的概念：所有对象属性都是公有的。不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。特权方法，第一种是在构造函数中定义特权方法，<pre>function MyObject(){<br> //私有变量和私有函数<br> var privateVariable=10;<br> function privateFunction(){<br>  return false;<br> }<br> //特权方法<br> this.publicMethod=function(){<br>  privateVariable++;<br>  return privateFunction();<br> }<br>};</pre>利用私有和特权成员，可以隐藏那些不应该被直接修改的数据。而缺点是必须使用构造函数模式来针对每个实例都会创建一组新方法。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '静态私有变量',
      'content': [{
        'body': '通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法，<pre>(function(){<br> var privateVariable=10;<br> function privateFunction(){<br>  return false<br> }<br> //构造函数<br> MyObject=function(){};<br> //公有/特权方法<br> MyObject.prototype.publicMethod=function(){<br>  privateVariable++;<br>  return privateFunction();<br> };<br>})();</pre>需要注意的是，由于MyObject没有使用var关键字，所以会变成全局变量。但在严格模式下，给未经声明的变量赋值会报错。以这种方式创建静态私有变量会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '模块模式',
      'content': [{
        'body': '前面的模式是用于为自定义类型创建私有变量和特权方法的。而模块模式则是为单例创建私有变量和特权方法。模块模式通过为单例添加私有变量和特权方法，来增强单例<pre>var singleton=function(){<br> //私有变量和私有函数<br> var privateVariable=10<br> function privateFunction(){<br>  return false;<br> }<br> //特权/公有方法和属性<br> return {<br>  publicProperty:true,<br>  publicMethod:function(){<br>   privateVariable++;<br>   return privateFunction();<br>  }<br> };<br>}();</pre>',
        'conSub':[]
      }],
      'extra_content': []
    }, {
      'name': '增强的模块模式',
      'content': [{
        'body': '即在返回对象之前加入对其增强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和方法对其加以增强的情况。<pre>var singleton=function(){<br> //私有变量和私有函数<br> var privateVariable=10;<br> function privateFunction(){<br>  return false;<br> }<br> //创建对象，继承实例<br> var object=new CustomType();<br> //添加特权/公有属性和方法<br> object.publicProperty=true;<br> object.publicMethod=function(){<br>  privateVariable++;<br>  return privateFunction();<br> };<br> return object<br>}();</pre>',
        'conSub': []
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': 'JavaScript中函数表达式可以无须对函数命名，从而实现动态编程。匿名函数，是一种使用JavaScript函数的强大方式。以下总结了函数表达式的特点。',
    'conSub': [{
      'name': '函数表达式不同于函数声明，函数声明要求有名字，但函数表达式不需要。没有名字的函数表达式也叫做匿名函数。'
    }, {
      'name': '在无法确定如何引用函数的情况下，递归函数就会变得比较复杂。'
    }, {
      'name': '递归函数应该始终使用arguments.callee来递归地调用本身，不要使用函数名——函数名可能会发生变化。'
    }]
  }, {
    'content': '当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，',
    'conSub': [{
      'name':'在后台执行环境中，闭包的作用域链包含着自己的作用域、包含函数的作用域和全局作用域。'
    },{
      'name':'通常，函数的作用域及其所在的变量都会在函数执行结束后被销毁'
    },{
      'name':'但当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。'
    }]
  }, {
    'content': '使用闭包模仿的块级作用域要点如下：',
    'conSub': [{
      'name': '创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。'
    }, {
      'name': '结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了外部作用域中的变量。'
    }]
  },{
    'content':'闭包还可用于在对象中创建私有变量',
    'conSub':[{
      'name':'可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。'
    },{
      'name':'特权方法，可以访问私有变量。'
    },{
      'name':'可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强的模块模式来实现单例的特权方法。'
    }]
  },{
    'content':'内存',
    'conSub':[]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
