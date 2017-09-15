var third_chapter = {
  'name': 'JavaScript基本概念',
  'small': '第三章',
  'content': 'JavaScript的最基本的工作原理，包括语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念，而ECMA-262通过叫做ECMAScript的‘伪语言’（该版本为第3版，*为第5版），来描述这些基本概念',
  'subStr': [{
    'name': '语法',
    'content': [{
      'body': '概述，和java等类C语言相似',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '区分大小写',
      'content': [{
        'body': 'ECMAScript中的一切（变量，函数名和操作符）都区分大小写。这也就意味着，变量名test和变量名Test分别表示两个不同的变量，函数名不能使用typeof(关键字)，但typeOf则可以使用。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '标识符',
      'content': [{
        'body': '指变量、函数、属性的名字，或者函数的参数。标识符的规则：',
        'conSub': [{
          'name': '第一个字符必须是一个字母、下划线（_）或一个美元符号（$）'
        }, {
          'name': '其他字符可以是字母、下划线、美元符号或数字。'
        }]
      }, {
        'body': '按照惯例，ECMAScript标识符采用驼峰式大小写格式，',
        'conSub': []
      }],
      'extra_content': [],
    }, {
      'name': '注释',
      'content': [{
        'body': 'ECMAScript的注释包括单行注释(//)和块级注释(/**/)',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '严格模式',
      'content': [{
        'body': 'ECMAScript引入了严格模式（strict mode）的概念，其是为JavaScript定义了一种不同的解析和执行模型。在严格模式中，ECMAScript3中的一些不确定的行为将得到处理，而且对某些不安全的操作会抛出错误启用严格模式，可在作用域的最顶部加上<pre>"use strict"</pre>支持严格模式的浏览器ie10+等现代浏览器',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '语句',
      'content': [{
        'body': 'ECMAScript中的语句以一个分号结尾；如果省略分号，则由解析器确定语句的结尾:<pre>var sum= a+b //不推荐 <br>var draff= a-b; //推荐</pre>，虽然语句结尾的分号不是必须属性，但最好不要省略<br>在控制语句中使用代码块可以增加可读性，也能降低出错率.',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '关键字和保留字',
    'content': [{
      'body': 'ECMA-262定义了一组具有特定用途的关键字，可用于表示控制语句的开始或结束，或者用于执行特定操作等。按照规则，关键字也是语言保留的，不能用于标识符:<table class="table table-bordered"><tbody><tr><td>break</td><td>do</td><td>instanceof</td><td>typeof</td></tr><tr><td>case</td><td>else</td><td>new</td><td>var</td></tr><tr><td>catch</td><td>finally</td><td>return</td><td>void</td></tr><tr><td>continue</td><td>for</td><td>switch</td><td>while</td></tr><tr><td>debugger*</td><td>function</td><td>this</td><td>with</td></tr><tr><td>default</td><td>if</td><td>throw</td></tr><tr><td>delete</td><td>in</td><td>try</td></tr></tbody></table>',
      'conSub': []
    }, {
      'body': 'ECMA-262还描述了另外一组不能用于标识符的保留字（下一版本可能会有问题）：<table class="table table-bordered"><tbody><tr><td>abstract</td><td>enum</td><td>int</td><td>short</td></tr><tr><td>boolean</td><td>export</td><td>interface</td><td>static</td></tr><tr><td>byte</td><td>extends</td><td>long</td><td>super</td></tr><tr><td>char</td><td>final</td><td>native</td><td>synchronized</td></tr><tr><td>class</td><td>float</td><td>package</td><td>throws</td></tr><tr><td>const</td><td>goto</td><td>private</td><td>transient</td></tr><tr><td>debugger</td><td>implements</td><td>protected</td><td>volatile</td></tr><tr><td>double</td><td>import</td><td>public</td></tr></tbody></table>',
      'conSub': []
    }, {
      'body': '第五版把在非严格模式下运行的保留字缩减为：<table class="table table-bordered"><tbody><tr><td>class</td><td>enum</td><td>extends</td><td>super</td></tr><tr><td>const</td><td>export</td><td>import</td></tr></tbody></table>',
      'conSub': []
    }, {
      'body': '在严格模式下，第5版还对以下保留字施加了限制：<table class="table table-bordered"><tbody><tr><td>implements</td><td>package</td><td>public</td></tr><tr><td>interface</td><td>private</td><td>static</td></tr><tr><td>let*</td><td>protected</td><td>yield*</td></tr></tbody></table>',
      'conSub': []
    }, {
      'body': 'let和yield是第五版新增的保留字；其他保留字都是第三版。在实现ECMAScript3的JavaScript引擎中使用关键字作标识符，会导致"Identifier Expected"的错误。而使用保留字做标识符可能会也可能不会导致相同的错误，取决特定的引擎<br>ECMA-262第五版对eval和arguments还施加了限制。在严格模式下，这两个名字也不能作为标识符或属性名，否则会抛出错误。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': '变量',
    'content': [{
      'body': 'ECMAScript的变量是松散类型的，就是可以用来保存任何类型的数据。每个变量仅仅是一个用于保存值得占位符而已。<pre>var message</pre>这行代码中的变量，可以用来保存任何值，（未经初始化，undefined），也可以直接初始化。<br>有一点必须注意，即使用var操作符定义的变量将成为定义该变量的作用域中的局部变量。<pre>function test(){<br>  var i=1;<br>}<br>test();<br>alert(i);//error</pre>而且在局部定义的变量，在外部访问不到',
      'conSub': []
    }, {
      'body': '可以使用一条语句定义多个变量，使用逗号隔开：<pre>var a="1",b=1,c=["1"],d={"1":1};</pre>在严格模式里，不能定义eval或arguments的变量，否则会导致语法错误',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': []
  }, {
    'name': '数据类型',
    'content': [{
      'body': 'ECMAScipt的五种简单数据类型（基本数据类型），Undefined、Null、Boolean、Number和String。还有一种复杂的数据类型--Object，Object本质上是由一组无序的名值对组成的，ECMAScript不支持任何创建自定义类型的机制。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'typeof操作符',
      'content': [{
        'body': '鉴于ECMAScript是松散类型的，typeof可以检测给定变量的数据类型。',
        'conSub': [{
          'name': '"undefined"——值未定义'
        }, {
          'name': '"boolean"——值是布尔值'
        }, {
          'name': '"string"——值是字符串'
        }, {
          'name': '"number"——值是数值'
        }, {
          'name': '"object"——值是对象或null'
        }, {
          'name': '"function"——值是函数'
        }]
      }, {
        'body': 'safari 5及之前版本、chrome7及之前版本对正则表达式调用typeof操作符时会返回"function"，而其他浏览器返回"object"',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'Undefined类型',
      'content': [{
        'body': '该类型只有一个值，即特殊的undefined。在使用var声明变量但未对其初始化时，变量的值就是undefined，',
        'conSub': []
      }, {
        'body': '不过，包含undefined的值的变量与尚未定义的变量还是不一样的。<pre>var message;//这个变量声明之后默认取得了undefined的值<br>alert(message);//"undefined<br>//未定义test<br>alert(test);//error"</pre>',
        'conSub': []
      }, {
        'body': '但是，对于未初始化的变量和未声明的变量执行typeof，都会返回undefined<pre>var message;<br>alert(typeof message);//"undefined"<br>alert(typeof test);//"undefined"</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '字面值Undefined的主要目的是为了比较，是为了正式区分空对象指针与未经初始化的变量。'
      }, {
        'name': '显式的初始化变量，当typeof返回"undefined"时，我们就会知道变量是还未声明，而不是未初始化'
      }]
    }, {
      'name': 'Null类型',
      'content': [{
        'body': 'Null是第二个只有一个值的数据类型，这个特殊的值是null。从逻辑角度看，null值表示一个空对象指针，所以typeof null会返回object',
        'conSub': []
      }, {
        'body': '实际上，undefined是派生自null值的，因此ECMA-262规定对它们的相等性测试返回true;<pre>alert(null == undefined);//"true"</pre>要注意的是，这个操作符会出于比较的目的转换其操作数。',
        'conSub': []
      }, {
        'body': '只要想保存对象的变量，在初始化时，就该直接保存对象或null值，这样可以区分null和undefined',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'Boolean类型',
      'content': [{
        'body': '该类型只有两个值：true和false（区分大小写）,虽然该类型字面值只有两个，但所有类型都有与这两个值等价的值。要将一个值转换为其对应的Boolean值，可以调用转型函数Boolean();<pre>var message="hello";var testBoolean=Boolean(message);</pre>至于返回的值是true还是false，则和转换值的数据类型和实际值有关：<table class="table table-bordered"><thead><tr><td>数据类型</td><td>转换为true的值</td><td>转换为false的值</td></tr></thead><tbody><tr><td>Boolean</td><td>true</td><td>false</td></tr><tr><td>String</td><td>任何非空字符串</td><td>""（空字符串）</td></tr><tr><td>Number</td><td>任何非0数字</td><td>0和NaN</td></tr><tr><td>Object</td><td>任何对象</td><td>null</td></tr><tr><td>Undefined</td><td>n/a（not applicable）</td><td>undefined</td></tr></tbody></table>这些规则对于流控制语句所自动进行的Boolean转化很有帮助，',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'Number类型',
      'content': [{
        'body': '这种类型使用IEEE754格式来表示整数和浮点数；最基本的数值字面量是10进制，而在严格模式下，八进制字面量是无效的，会导致支持的JavaScript引擎抛出错误。在进行算术计算时，八进制数和十六进制数最终都将被转换成十进制值，',
        'conSub': [{
          'name': '浮点数值<br>即数值中必须包含一个小数点，并且小数点后有一位数字。<pre>var testfloat1=0.2111</pre>由于保存浮点数需要的内存空间是保存整数值的两倍，因此ECMAScript会自动的将浮点数转为整数<pre>var testfloat2=1.0;//解析为1</pre>，对于极大或极小的数值，可以用e表示法表示的浮点类型表示。浮点数在进行算术运算时精确度不高，这是使用IEEE754格式的语言的通病。'
        }, {
          'name': '数值范围<br>由于内存的限制，ECMAScript能够表示的最小数值为Number.MIN_VALUE,最大值为Number.MAX_VALUE。如果计算的结果超出了JavaScript的范围，那这个数值会自动转换为特殊的Infinity值，也就是说一旦为Infinity，那该值无法进行下一次的运算。要想确定一个数值是不是位于JavaScript数值范围之间，可使用isFinite()函数，该函数会在值位于数值范围时，返回true.'
        }, {
          'name': 'NaN<br>即非数值，是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误了）<br>NaN的特点，任何涉及NaN的操作都会返回NaN，其次，NaN与任何值包括自身都不相等，<pre>alert(NaN === NaN);//false</pre>所以，可以使用isNaN()来确定该数字是不是不是数值，而任何不能被转换的数值都会返回true。'
        }, {
          'name': '数值转换<br>有三个函数（原生）可把非数值转为数值，NUmber(),parseInt(),parseFloat(),Number()用于任何数据类型，而后两个用于把字符串转为数值；Number转换的规则:<pre>var num1=Number("Hello world!");//NaN<br>var num2=Number("");//0<br>var num3=Number("000011");//11<br>var num4=Number(true);//1</pre>而在处理整数的时候更常用的是parseInt()函数，其在转换字符串时，更多看其是否符合数值模式。它会忽略字符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或-号，parseInt()就会返回NaN；<pre>var num1=parseInt("1234blue");//1234<br>var num2=parseInt("");//NaN<br>var num3=parseInt("0xA");//10<br>var num4=parseInt(22.5);//22<br>var num5=parseInt("070");//56<br>var num6=parseInt("70");//70<br>var num7=parseInt(0xf);//15</pre>为了消除在使用parseInt()函数时可能导致的问题，可以在使用时加上需要转换而成的基数<pre>var num8=parseInt("0xAF",16);</pre>parseFloat()类似于parseInt(),区别是只识别一个.号，而且始终忽略前面的0，还有如果字符串包含的是一个可解析为整数的数值（没有小数点，或小数点后都是0）其就会返回整数。'
        }]
      }],
      'extra_content': [{
        'name': '可以保存+0和-0.'
      }, {
        'name': '访问Number.NEGATIVE_INFINITY和Number.POSITIVE_INFINITY可以得到负和正infinity的值'
      }, {
        'name': 'isNaN适用于对象，在对对象使用时，会首先调用对象的valueof()方法，然后确定这个方法产生的值能否转成数值。如果不行，再基于这个返回值再调用toString()方法，再测试返回值。'
      }, {
        'name': '一元加操作符操作和Number()函数相同'
      }]
    }, {
      'name': 'String类型',
      'content': [{
        'body': '用于表示由0或多个16位Unicode字符组成的字符序列，即字符串。而且在ECMAScript中，使用双引号和单引号表示的字符串完全相同，',
        'conSub': [{
          'name': '字符字面量<br>String数据类型包含一些特殊的字面量，也叫转义序列，用于表示非打印字符，或具有其他用途的字符：<table class="table table-bordered"><thead><tr><td>字面量</td><td>含义</td></tr></thead><tbody><tr><td>\\n</td><td>换行</td></tr><tr><td>\\t</td><td>制表</td></tr><tr><td>\\b</td><td>空格</td></tr><tr><td>\\r</td><td>回车</td></tr><tr><td>\\f</td><td>换页</td></tr><tr><td>\\\</td><td>斜杠</td></tr><tr><td>\'\</td><td>单引号</td></tr><tr><td>\"\</td><td>双引号</td></tr><tr><td>\\xnn</td><td>以16进制代码nn表示的一个字符</td></tr><tr><td>\\unnnn</td><td>以16进制代码nnnn表示的一个字符</td></tr></tbody></table>这些字符字面量可以出现在字符串的任意位置，而且会被作为一个字符去解析，'
        }, {
          'name': '字符串特点<br>字符串一旦创建，他们的值就不能改变。要改变某个变量保存的某个字符串，先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量。'
        }, {
          'name': '转换为字符串<br>第一种toString(),只有null和undefined值没有这个方法。而且在调用数值的toString()方法时可以加入基数，可以转换成相应基数的值。二，在不知道值是否是null和undefined的时候，还可以使用String()；值是null，返回null；值是undefined，返回undefined'
        }]
      }],
      'extra_content': [{
        'name': '要把某个值转为字符串，可以使用+号把它和另一个字符串加在一起'
      }]
    }, {
      'name': 'Object类型',
      'content': [{
        'body': 'ECMAScript的对象其实就是一组数据和功能的集合。对象可以通过执行new操作符后跟要创建的对象类型的名称来创建。而创建Object类型的实例并为其添加属性和方法，就可以创建自定义对象<pre>var o=new object();</pre>而Object的实例和方法则是:',
        'conSub': [{
          'name': 'Constructor:保存着用于创建当前对象的函数，指向该对象'
        }, {
          'name': 'hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中是否存在（而不是实例的原型中），作为参数的属性名必须以字符串形式指定。'
        }, {
          'name': 'isPrototypeof(object):用于检查传入的对象是否是另一个对象的原型。'
        }, {
          'name': 'propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in来枚举，'
        }, {
          'name': 'toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应。'
        }, {
          'name': 'toString():返回对象的字符串表示'
        }, {
          'name': 'valueOf():返回对象的字符串，数值或布尔值表示，通常与toString()返回的值相同'
        }]
      }],
      'extra_content': [{
        'name': 'ECMA-262中对象的行为不一定适用JavaScript中其他对象。浏览器环境中的对象，都属于宿主对象，是由宿主实现提供和定义的。'
      }]
    }]
  }, {
    'name': '操作符',
    'content': [{
      'body': 'ECMAScript的操作符与众不同的是，它们能够适用很多值，而在应用于对象时，相应的操作符都会调用valueOf()和toString()方法，来取得可以操作的值',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '一元操作符',
      'content': [{
        'body': '只能操作一个值的操作符叫一元操作符',
        'conSub': [{
          'name': '递增和递减操作符<br>其直接借鉴C，有前置型，后置型，执行前置递增和递减操作时，变量的值都是在语句被求值以前改变的。<pre>var age=29;<br>var testage=--age+2;<br>alert(age);//28<br>alert(testage);//30</pre>而后置型递增和递减操作符的语法不变，但操作是在包含他们的语句之后再执行的<pre>var num1=2;<br>var num2=20;<br>var num3=num1--+num2//22<br>var num4=num1 + num2;//21</pre>所有这四个操作符对任何值都适用，并遵循以下规则。<ul><li>在应用于一个包含有效数字字符的字符串时，先将其转为数字值，再执行操作。字符串变量会自动转成数字变量。<pre>var s1="2";<br>++s1;//数值3</pre></li><li>在应用于一个不包含有效数字字符的字符串时，将变量的值设为NaN，变量变为数值变量。<pre>var s2="3";<br>++s2;//数值NaN</pre></li><li>在应用于布尔值false/true时，先将其转换为0/1再执行，布尔值变成数值变量.<pre>var b=false/true;<br>++b//数值0/1</pre></li><li>在应用于对象时，先调用对象的valueOf()方法，再对该值进行操作，如果结果为NaN，则在调用toString()方法后再应用前述规则，对象变成数值变量</li></ul>'
        }, {
          'name': '一元加减操作符<br>其放在数值前，对数值不会产生任何影响。不过，在对非数值应用一元加操作符时，会产生和Number()一样的效果。'
        }]
      }, {
        'body': '',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '位操作符',
      'content': [{
        'body': '先将64位的数转换成32位的整数，然后执行操作，最后再将结果转为64位。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '布尔操作符',
      'content': [{
        'body': '其共有三个：非（NOT）、与（AND）、或（OR）。',
        'conSub': [{
          'name': '逻辑非<br>逻辑非由（!）表示，应用于任何值。会返回一个Boolean值：<ul><li>如果操作数是一个对象，返回false</li><li>如果操作数是一个空字符串，返回true</li><li>如果操作数是一个非空字符串，返回false</li><li>如果操作数是数值0，返回true</li><li>如果操作数是任意非0数值（包括Infinity）,返回false</li><li>如果操作数是null，返回true</li><li>如果操作数是NaN，返回true</li><li>如果操作数是undefined，返回true</li></ul>'
        }, {
          'name': '逻辑与<br>逻辑与操作符由两个和号(&&)表示，有两个操作数，可以应用于任何类型的操作数，而不仅仅是布尔值，而且该操作符属于短路操作，即如果第一个操作数是false，就不会对第二个操作数进行判断了，规则：<ul><li>如果第一个操作数是对象，则返回第二个操作数</li><li>如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象</li><li>如果两个操作数都是对象，则返回第二个操作数</li><li>如果有一个操作数是null，则返回null</li><li>如果有一个操作数是NaN，则返回NaN</li><li>如果有一个操作数是undefined，则返回undefined</li></ul>'
        }, {
          'name': '逻辑或<br>逻辑或操作符由两个竖线符号(||)表示，有两个操作数，该操作符也属于短路操作，即如果第一个操作数是false，就不会对第二个操作数进行判断了，规则：<ul><li>如果第一个操作数是对象，则返回第一个操作数</li><li>如果第一个操作数的求值结果是false，则返回第二个操作数</li><li>如果两个操作数都是对象，则返回第一个操作数</li><li>如果有一个操作数是null，则返回null</li><li>如果有一个操作数是NaN，则返回NaN</li><li>如果有一个操作数是undefined，则返回undefined</li></ul>ECMAScript经常会采用或的方式进行赋值<pre>var myObject=preferredObject || backupObject;</pre>'
        }]
      }],
      'extra_content': []
    }, {
      'name': '乘性操作符',
      'content': [{
        'body': 'ECMAScript定义了三个乘性操作符：乘法，除法和求模，会自动对操作数为非数值的进行转换，空字符串被当成0，布尔值true将当成1。',
        'conSub': [{
          'name': '乘法<br>由一个(*)号表示，用于计算两个数值的乘积,在处理特殊值得情况下：<ul><li>如果操作数都是数值，执行常规计算。</li><li>如果有一个操作数是NaN，则返回NaN</li><li>如果是Infinity与0相乘，则结果是NaN,</li><li>如果是Infinity与非0相乘，则结果是Infinity或-Infinity</li><li>如果是Infinity与Infinity相乘,则结果是Infinity</li><li>如果有一个操作数不是数值，则先用Number()进行转换，再应用上述规则。</li></ul>'
        }, {
          'name': '除法<br>由一个斜线符号(/)表示,规则<ul><li>如果操作数都是数值，执行常规的除法计算。</li><li>如果有一个操作数是NaN，则返回NaN</li><li>如果是Infinity与Infinity相除，则返回NaN</li><li>如果是0被0除，则返回NaN</li><li>如果是非0的有限数被0除，则结果是Infinity或-Infinity</li><li>如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity</li><li>如果有一个操作数不是数值，则先用Number()进行转换，再应用上述规则。</li></ul>'
        }, {
          'name': '求模（余）<br>由一个%表示：<ul><li>如果操作数都是数值，执行常规的除法计算。返回除得的余数</li><li>如果被除数是无穷大值而除数是有限大的数值，则结果是NaN</li><li>如果被除数是有限大的数值而除数是0，则结果是NaN；</li><li>如果是Infinity被Infinity除，则结果是NaN；如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数，如果被除数是0，则结果是0</li><li>如果有一个操作数不是数值，则先用Number()进行转换，再应用上述规则。</li></ul>'
        }],
        'extra_content': []
      }],
      'extra_content': []
    }, {
      'name': '加性操作符',
      'content': [{
        'body': '加法和减法',
        'conSub': [{
          'name': '加法<br><pre>var result1 =5+5</pre>如果两个操作符都是数值，规则<ul><li>如果有一个操作数是NaN，则结果为NaN</li><li>如果是Infinity+Infinity,结果是Infinity</li><li>如果是-Infinity+-Infinity，结果是-Infinity</li><li>如果是Infinity+-Infinity,结果是NaN</li><li>如果是+0加+0，则结果是+0</li><li>如果是-0+-0,则结果是-0</li><li>如果是+0+-0，则结果是+0</li></ul>如果有操作符是字符串类型，规则<ul><li>如果两个操作符都是字符串，则拼接字符串</li><li>如果只有一个字符串，则将另一个转为字符串，再将两个拼接在一起</li></ul>如果有一个操作数是对象、数值或布尔值，则调用他们的toString()方法取得字符串，对于undefined和null,则分别调用String()并取得字符串"undefined"和"null"'
        }, {
          'name': '减法<br>与加法规则类似'
        }],
        'extra_content': []
      }],
      'extra_content': []
    }, {
      'name': '关系操作符',
      'content': [{
        'body': '小于(<),大于(>),小于等于(<=)和大于等于(>=)用于对两个操作符进行比较，而当关系操作符的操作数使用了非数值时。也要进行数据转换或完成操作。',
        'conSub': [{
          'name': '如果两个操作数都是数值，则进行数值比较'
        }, {
          'name': '如果两个操作数都是字符串，则比较两个字符串对应的字符编码值'
        }, {
          'name': '如果一个操作数是数值，则将另一个操作数转换成一个数值，然后进行数值比较'
        }, {
          'name': '如果一个操作数是对象，则调用这个对象的valueOf()方法，用得到的结果按照前面的规则进行比较，如果对象没有valueOf()方法，则调用toString()方法，用得到的结果按照前面的规则进行比较。'
        }],
        'extra_content': []
      }, {
        'body': '而在比较字符串时，实际比较的是两个字符串中对应位置的每个字符的字符编码值。经过比较，再返回布尔值，由于大写字母的字符编码全部小于小写字母，因此<pre>var result = "Brick" < "alphabet"//true</pre>,如果要真正按字母表顺序比较字符串，就必须把英文全部转为大写或小写<pre>var result = "Brick".toLowerCase() < "alphabet".toLowerCase()//false</pre>对于NaN，任何操作数与NaN进行关系比较，结果都是false',
        'conSub': [],
        'extra_content': []
      }],
      'extra_content': []
    }, {
      'name': '相等操作符',
      'content': [{
        'body': '对于两个变量是否相等，比较字符串，数值，布尔值都比较简单，而对于对象的比较上,ECMAScript的解决方案就是提供两组操作符：相等和不相等——先转换再比较，全等和不全等——仅比较不转换。',
        'conSub': [{
          'name': '相等和不相等<br>ECMAScript中的相等操作符由两个（==）组成，如果两个操作符相等，则返回true。而不相等操作符由叹号后跟等于号(!=)表示，如果两个操作数不相等，则返回true。这两个操作符都会先转换操作数（强制转型），再比较它们的相等性，规则：<table class="table table-bordered"><thead><tr><td>表达式</td><td>值</td></tr></thead><tbody><tr><td>null == undefined</td><td>true</td></tr><tr><td>"NaN" == NaN</td><td>false</td></tr><tr><td>5 == NaN</td><td>false</td></tr><tr><td>NaN == NaN</td><td>false</td></tr><tr><td>NaN != NaN</td><td>true</td></tr><tr><td>false == 0</td><td>true</td></tr><tr><td>true == 1</td><td>true</td></tr><tr><td>true == 2</td><td>false</td></tr><tr><td>undefined == 0</td><td>false</td></tr><tr><td>null == 0</td><td>false</td></tr><tr><td>"5" == 5</td><td>true</td></tr></tbody></table>'
        }, {
          'name': '全等和不全等<br>它只会在两个操作符未经转换就相等的情况下返回true。<pre>var result1=("55" == 55)//true<br>var result2=("55" === 55)//false</pre>不全等操作符由一个叹号后跟俩等号(!==)组成，它在两个操作数未经转换就不相等的情况下返回true'
        }]
      }],
      'extra_content': [{
        'name': '相等和不相等存在类型转换问题，谨慎使用'
      }]
    }, {
      'name': '条件操作符',
      'content': [{
        'body': '<pre>var ss=boolean_expression ? true_value : false_value;</pre>问号之前表达式返回一个布尔值，为true，则赋true_value的值；为false，则赋false_value的值',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '赋值操作符',
      'content': [{
        'body': '简单的赋值操作符由（=）组成',
        'conSub': [{
          'name': '乘/赋值（*=）'
        }, {
          'name': '除/赋值（/=）'
        }, {
          'name': '模/赋值（%=）'
        }, {
          'name': '加/赋值（+=）'
        }, {
          'name': '减/赋值（-=）'
        }, {
          'name': '左移/赋值（<<=）'
        }, {
          'name': '有符号右移/赋值（>>=）'
        }, {
          'name': '无符号右移（>>>=）'
        }]
      }],
      'extra_content': []
    }, {
      'name': '逗号操作符',
      'content': [{
        'body': '使用逗号操作符可以在一条语句中执行多个操作<pre>var num1=1,num2=2.num3=3;</pre>除此之外，逗号操作符还可以赋值，在用于赋值的时候，逗号操作符总会返回表达式中的最后一项<pre>var num=(1,12,3,4,6,8,2)//result:2</pre>',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': '语句',
    'content': [{
      'body': '语句（流控制语句）。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'if语句',
      'content': [{
        'body': '语法<pre>if (condition) statement1 else statement2</pre>其中的条件可以是任意表达式；而且对这个表达式求值的结果不一定是布尔值。ECMAScript会自动调用Boolean()转换函数将表达式的结果转换为布尔值。普遍使用代码块模式，不容易产生歧义，',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'do-while语句',
      'content': [{
        'body': 'do-while语句是一种后测试语句，只有在循环体中的代码执行之后，才会测试出口条件。也就是在对条件表达式求值之前，循环体内的代码至少会执行一次；<pre>do{<br> statement<br>} while (expression)</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'while语句',
      'content': [{
        'body': 'while语句属于前测试循环语句，就是在循环体内的代码被执行之前，就会对出口条件求值，所以，循环体内的代码有可能永远都不执行。<pre>while(expression) statement</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'for语句',
      'content': [{
        'body': 'for语句也是一种前测试循环语句，但它具有在执行循环之前初始化变量和定义循环后要执行的代码的能力。<pre>for (initialization;expression;post-loop-expression) statement</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'for-in语句',
      'content': [{
        'body': 'for-in语句也是一种精确的迭代语句，可以用来枚举对象的属性。<pre>for (property in expression) statement</pre>而为了保证最大限度的兼容性，建议在for-in循环之前，先检测确认该对象的值不是null或undefined',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'Safari3以前的版本的for-in语句会导致某些属性被返回两次'
      }]
    }, {
      'name': 'label语句',
      'content': [{
        'body': '使用label语句可以在代码中添加标签，以便将来使用<pre>label: statement</pre>其可以在将来由break语句或continue语句引用。加标签的语句一般都要与for语句等循环语句配合使用',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'break和continue语句',
      'content': [{
        'body': 'break和continue语句用于在循环中精确地控制代码的执行。其中，break会立即退出循环，强制继续执行循环后面的语句。而continue也会立刻退出循环，但退出循环后会从循环的顶端继续执行。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'with语句',
      'content': [{
        'body': 'with语句的作用是将代码的作用域设置到一个特定的对象中。语法为<pre>with(expression) statement;</pre>主要目的是为了简化多次编写同一个对象的工作，<pre>with(location){<br> var w1=search.subString(1);<br> var w2=hostname;<br> var w3= href<br>}</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '大量使用with语句会导致性能下降。'
      }]
    }, {
      'name': 'switch语句',
      'content': [{
        'body': 'switch语句与if语句关系相近，<pre>switch (expression) {<br> case value:statement<br>  break<br> case value:statement<br>  break;<br> default: statement<br>}</pre>',
        'conSub': []
      }, {
        'body': 'switch语句中的每一种情形的含义是："如果表达式等于该value，则执行后面的语句"。而break关键字会导致代码执行流跳出switch语句<br>虽然ECMAScript中的switch借鉴其他语言，但也有自己的特色：可以在switch语句中使用任何数据类型；其次，每个case的值不一定是常量，可以是变量，甚至是表达式。',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'switch语句在比较值时使用的是全等操作符，因此不会发生类型转换'
      }]
    }]
  }, {
    'name': '函数',
    'content': [{
      'body': '通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。ECMAScript中的函数使用function关键字来声明，后跟一组参数以及函数体.<pre>function functionName(arg0,arg1,······,argN){<br> statements<br>}</pre>ECMAScript中的函数在定义时不必指定是否返回值，任何函数在任何时候都可以通过return语句后跟要返回的值来实现返回值。严格模式对函数有一些限制：',
      'conSub': [{
        'name': '不能把函数命名为eval或arguments;'
      }, {
        'name': '不能把参数命名为eval或arguments;'
      }, {
        'name': '不能出现两个命名参数同名的情况'
      }]
    }, {
      'body': '如果发生以上情况，就会导致语法错误，代码无法执行。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '理解参数',
      'content': [{
        'body': 'ECMAScript函数不介意传递进来多少个参数，也不在乎传进来的参数是什么类型。ECMAScript中的参数在内部是用一个数组表示的。函数接收到的始终是这个数组，而在函数体内，可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每个参数，所以，命名的参数只提供便利，但不是必需的。<pre>function test(){<br> if(arguments.length === 1){<br>  alert("一个参数")<br> }else if(argumnets.length === 2){<br>  alert("俩参数");<br> }<br>}</pre>关于arguments的行为，它的值永远与对应命名参数的值保持同步修改arguments[index],等于修改了第index+1位的参数，但这种影响是单向的，无法由参数修改使arumnets[index]也修改，而在严格模式中，没有这一特点，arguments和参数无法同步，',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数'
      }]
    }, {
      'name': '没有重载',
      'content': [{
        'body': '因为函数参数由包含零或多个值的数组来表示，没有签名（接收的参数的类型和数量）。在ECMAScript中定义两个名字相同的函数，则后一个会把前一个覆盖。对于检查传入函数中参数的类型和数量并做出不同的反应时，可以模仿方法的重载。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': 'JavaScript的核心语言特性在ECMA-262中是以名为ECMAScript的伪语言的形式来定义的。ECMAScript中包含了所有基本的语法、操作符、数据类型以及完成基本的计算任务所必需的对象，但没有对取得输入和产生输出的机制作出规定。理解ECMAScript及其细节，是理解其在Web浏览器中的实现——JavaScript的关键。目前大多数实现所遵循的都是ECMA-262第3版，以下为要素：',
    'conSub': [{
      'name': 'ECMAScript中的基本数据类型包括Number，String，Boolean，Null，Undefined。'
    }, {
      'name': '与其他语言不同，ECMAScript没有为整数和浮点数值分别定义不同的数据类型，Number类型可用于表示所有数值。'
    }, {
      'name': 'ECMAScript中的复杂数据类型，即Object类型，是其所有对象的基础类型'
    }, {
      'name': '严格模式为这门语言中容易出错的地方施加了限制'
    }, {
      'name': 'ECMAScript提供了很多与C及其他类C语言中相同的基本操作符，包括算术操作符、布尔操作符、关系操作符、相等操作符及赋值操作符'
    }, {
      'name': 'ECMAScript从其他语言中借鉴了很多流控制语句，例如if，switch，for等'
    }]
  }, {
    'content': 'ECMAScript中的函数与其他语言中的函数有很多不同之处:',
    'conSub': [{
      'name': '无须指定函数的返回值，任何ECMAScript函数可以在任何时候返回任何值，'
    }, {
      'name': '实际上，未指定返回值的函数返回的是一个特殊的undefined值，'
    }, {
      'name': 'ECMAScript中没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式来传递的。'
    }, {
      'name': '可以向ECMAScript函数传递任意数量的参数，并且可以通过arguments对象来访问这些参数，'
    }, {
      'name': '由于不存在函数签名的特性，ECMAScript函数不能重载。'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
