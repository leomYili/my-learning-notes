var five_chapter = {
  'name': '引用类型',
  'small': '第五章',
  'content': '引用类型的值（对象）是引用类型的一个实例。在ECMAScript中，引用类型是一种数据结构，用于将数据和功能组织在一起。引用类型有时候也被称为对象定义，因为它们描述的是一类对象所具有的属性和方法。<br>对象是某个特定引用类型的实例。新对象是使用new操作符后跟一个构造函数来创建的，构造函数本身就是一个函数，只不过该函数是处于创建新对象的目的而定义的。',
  'subStr': [{
    'name': 'Object类型',
    'content': [{
      'body': '创建Object实例的方式有两种，第一种是使用new操作符后跟Object构造函数。<pre>var person = new Object();<br>person.name="aaa";<br>person.age=22;</pre>另一种方式是使用对面字面量表示法。对象字面量是对象定义的一种简写形式，目的在于简化包含大量属性的对象的过程。<pre>var person={<br> name:"aaa",<br> age:22<br>}</pre>在使用对象字面量表示法的时候，属性名可以为字符串。另外，使用对象字面量语法时，如果留空其花括号，则可以定义只包含默认属性和方法的对象。<pre>var person={};//与new Object()相同<br>person.name="aaa"<br>person.age=29;</pre>而对于函数的参数而言，可以使用对象字面量来向函数传递大量可选参数，只不过函数体内部需要对该参数看成对象来使用。<br>一般来说，访问对象属性时使用的都是点表示法，不过，在JavaScript也可以使用方括号表示法来访问对象的属性。<pre>alert(person["name"]);//aaa<br>alert(person.name);//aaa</pre>而且方括号可以通过变量来访问属性，<pre>var propertyName = "name";<br>alert(person[propertyName]);//aaa</pre>如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法。',
      'conSub': []
    }],
    'extra_content': [{
      'name': '在通过对象字面量定义对象时，实际上不会调用Object构造函数。'
    }, {
      'name': '对于那些必需值使用命名参数，而使用对象字面量来封装多个可选参数。'
    }],
    'subStr': []
  }, {
    'name': 'Array类型',
    'content': [{
      'body': '在ECMAScript中，数组的每一项可以保存任何类型的数据。而且，数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。创建数组的解百纳方式有两种。第一种是使用Array构造函数:<pre>var colors=new Array();</pre>而在使用Array构造函数时也可以省略new操作符。<pre>var colors=Array(3);//创建一个包含3个字符串的数组。</pre>',
      'conSub': []
    }, {
      'body': '创建数组的第二种方式是使用数组字面量表示法。数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开，<pre>var colors=["red","blue","green"];</pre>,同时不要滥用逗号，避免出错。',
      'conSub': []
    }, {
      'body': '数组的length很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项<pre>var colors=["red","blue","green"];<br>colors.length = 2;<br>alert(colors[2]);//undefined</pre>利用length属性也可以方便地在数组末尾添加新项<pre>var colors=["red"];<br>colors[colors.length]="black"//在位置1添加一种颜色</pre>',
      'conSub': []
    }],
    'extra_content': [{
      'name': '与对象一样，在使用数组字面量表示法时，也不会调用Array构造函数。'
    }],
    'subStr': [{
      'name': '检测数组',
      'content': [{
        'body': '对于一个网页，或者一个全局作用域而言，使用instanceof操作符就能得到满意的结果：而instanceof操作符的问题在于，它假定只有一个全局环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生构建的数组分别具有各自不同的构造函数。',
        'conSub': []
      }, {
        'body': '为了解决这个问题，ECMAScript5新增了Array.isArray()方法。这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。该方法用法如下：<pre>if(Array.isArray(value)){<br> //对数组执行某些操作<br>}</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': '在IE8及之前版本的JavaScript实现中，存在一个与标准不一致的地方，即在catch中捕获的错误对象会被添加到执行环境的变量对象，而不是catch语句的变量对象中。'
      }]
    }, {
      'name': '转换方法',
      'content': [{
        'body': '所有对象都具有toLocaleString(),toString()和valueOf()方法。其中，调用数组的toString()方法会返回由数组中每个值的字符串拼接而成的一个以逗号分隔的字符串。而调用valueOf()返回的还是数组。实际上，为了创建这个字符串会调用数组每一项的toString()方法。',
        'conSub': []
      }, {
        'body': '数组继承的toLocaleString()、toString()和valueOf()方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用join()方法，则可以使用不同的分隔符来构建这个字符串。join方法只接受一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '如果数组中的某一项的值是null或undefined，那么该值在join(),toLocaleString(),toString()和valueOf()方法返回的结果中以空字符串表示。'
      }]
    }, {
      'name': '栈方法',
      'content': [{
        'body': 'ECMAScript可以让数组的行为类似于其他数据结构的方法，数组可以表现的和栈一样，栈是一种可以限制插入和删除项的数据结构，栈是一种LIFO的数据结构(后进先出)，也就是最新添加的项最早被移除。而栈中项的插入（叫推入）和移除（叫弹出），只发生在一个位置——栈的顶部。ECMAScript为数组专门提供了push()和pop()方法，来实现类似栈的行为。',
        'conSub': []
      }, {
        'body': 'push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。<pre>var colors=new Array();//创建一个数组<br>var count=colors.push("red","green");<br>alert(count);//2<br>count=colors.push("black");//在原来的基础上加入black.<br>alert(count);//3<br><strong>var item=colors.pop();</strong>//取得最后一项，也就是顶部.<br>alert(item);//black<br>alert(colors.length);//2</pre>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '队列方法',
      'content': [{
        'body': '队列数据结构的访问规则是FIFO（先进先出），队列在列表的末端添加项，从列表的前端移除项。由于push()是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。这一操作就是shift():<pre>var colors=new Array();//创建一个数组<br>var count=colors.push("red","green");<br>alert(count);//2<br>count=colors.push("black");//在原来的基础上加入black.<br>alert(count);//3<br><strong>var item=colors.shift();</strong>//取得第一项，也就是尾部.<br>alert(item);//red<br>alert(colors.length);//2</pre>',
        'conSub': []
      }, {
        'body': 'ECMAScript还为数组提供了一个unshift()方法，与shift()用法相反。',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'IE7及更早版本对JavaScript的实现中存在一个偏差，其unshift()方法总是返回underfined而不是数组的新长度，而在IE8的非兼容模式下会返回正确的长度值。'
      }]
    }, {
      'name': '重排序方法',
      'content': [{
        'body': '数组中已经存在两个可以直接用来重排序的方法：reverse()和sort()。reverse()会反转数组项的顺序。而在默认情况下，sort()方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序，sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。所以就会产生问题；但可以对sort()方法进行传值=自定义函数。<pre>function compare(value1,value2) {<br> if(value1 < value2) {<br>  return -1;<br> } else if (value1 > value2) {<br>  return 1;<br> } else {<br>  return 0;<br> }<br>}<br><br>var values=[0,1,5,10,15];<br>values.sort(compare);<br>alert(values);//0,1,5,10,15</pre>',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'reverse()和sort()方法的返回值是经过排序之后的数组。'
      }]
    }, {
      'name': '操作方法',
      'content': [{
        'body': 'concat()方法可以基于当前数组中的所有项创建一个新数组。具体来说，这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个符笨的末尾，最后返回新构建的数组，如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。',
        'conSub': []
      }, {
        'body': 'slice()方法，能够基于当前数组中的一或多个项创建一个新数组。其可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。注意，slice方法不会影响原始数组。',
        'conSub': []
      }, {
        'body': 'splice方法，其主要用途是向数组的中部插入项，使用这种方法的方式则有三种',
        'conSub': [{
          'name': '删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。例：splice(0,2)会删除数组中的前两项。'
        }, {
          'name': '插入：可以向指定位置插入任意数量的项，只需提供三个参数：起始位置、0、和要插入的项。如果要插入多个项，可以再传第四，第五，第n个项。例：splice(2,0,"red","green")会从当前数组的位置2开始插入字符串“red”和“green”'
        }, {
          'name': '替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例：splice(2,1,"red","green")会删除当前数组的2的项，然后再从位置2开始插入“red”和“green”'
        }]
      }, {
        'body': 'splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）',
        'conSub': []
      }],
      'extra_content': [{
        'name': '如果slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置，如果结束位置小于起始位置，则返回空数组'
      }]
    }, {
      'name': '位置方法',
      'content': [{
        'body': 'ECMAScript为数组实例添加了两个位置方法：indexOf()、lastIndexOf()。这两个方法都接收两个参数：要查找的项和表示查找起点位置的索引。其中，indexOf()方法从数组的开头开始向后查找，lastIndexOf()方法则从数组的末尾开始向前查找。<br>这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符；也就是说，要求查找的项必须严格相等；（返回下标）',
        'conSub': ''
      }],
      'extra_content': []
    }, {
      'name': '迭代方法',
      'content': [{
        'body': 'ECMAScript5为数组定义了5个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响方法的返回值：',
        'conSub': [{
          'name': 'every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。'
        }, {
          'name': 'filter()：对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。'
        }, {
          'name': 'forEach()：对数组中的每一项运行给定函数，这个方法没有返回值。'
        }, {
          'name': 'map()：对数组中的每一项运行给定函数，返回每次函数调用的结构组成的数组'
        }, {
          'name': 'some()：对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true'
        }]
      }, {
        'body': '以上方法都不会修改数组中的包含的值。<br>在这些方法中，最相似的是every()和some()，它们都用于查询数组中的项是否满足某个条件。对every()来说，传入的函数必须对每一项都返回true，这个方法才返回true，否则，它就返回false。而some()方法则是只要传入的函数对数组中的某一项返回true，就会返回true。<br>最后一个方法是forEach(),它只对数组中的每一项运行传入的函数，该方法没有返回值，本质上与使用for循环迭代数组一样。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '归并方法',
      'content': [{
        'body': 'ECMAScript5还新增了两个归并数组的方法：reduce()和reduceRight()。这两个方法都会迭代数组的所有项，然后构建了一个最终返回的值。其中，reduce()方法从数组的第一项开始，逐个遍历到最后，而reduceRight()则从数组的最后一项开始，向前遍历到第一项。',
        'conSub': []
      }, {
        'body': '这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值，而调用的函数会接收4个参数：前一个值，当前值，项的索引和数组对象。例:<pre>var values=[1,2,3,4,5];<br>var sum=values.reduce(function(prev,cur,index,array){<br> return prev+cur;<br>});<br>alert(sum);//15</pre>，使用这两个函数，主要取决于从哪头开始遍历数组，除此之外，完全相同。',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': 'Date类型',
    'content': [{
      'body': 'ECMAScript中的Date类型是在早期Java中的java.util.Date类基础上构建的。所以，Date使用的是自UTC开始经过的毫秒数来保存日期，要创建一个日期对象，例:<pre>var date=new Date();</pre>在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间。如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数。为了简化这一过程，ECMAScript提供了两个方法：Date.parse()和Date.UTC()。',
      'conSub': []
    }, {
      'body': '其中，Date.pares()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。ECMA-262没有定义Date.parse()应该支持哪种日期格式，所以可以因地区和需求而异。如果传入Date.parse()方法的字符串不能表示日期，那么它会返回NaN。实际上，如果直接将表示日期的字符串传递给Date构造函数，也会在后台调用Date.parse()函数。',
      'conSub': []
    }, {
      'body': 'Date.UTC()方法同样也返回了表示日期的毫秒数，但它与Date.parse()在构建值时使用不同的信息，例：<pre>var test1=new Date(Date.UTC(2000,0));//GMT时间2000年1月1日午夜零时<br>var test2=new Date(Date.UTC(2005,4,5,17,55,55));//GMT时间2005年5月5日下午5:55:55</pre>',
      'conSub': []
    }, {
      'body': 'ECMAScript5添加了Date.now()方法返回表示调用这个方法时的日期和时间的毫秒数。这个方法简化了使用Date对象分析代码的工作。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '继承的方法',
      'content': [{
        'body': '与其他引用类型一样，Date类型也重写了toLocaleString()、toString()和valueOf()方法；而对于该类型而言，toLocaleString()会按照浏览器设置的地区相适应的格式返回日期和时间，而toString()方法则通常会返回带有时区信息的日期和时间，其中时间一般以军用时间表示。至于Date类型的valueOf()方法，则根本不返回字符串，而是返回日期的毫秒表示。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '日期格式化方法',
      'content': [{
        'body': 'Date类型还有一些专门用于将日期格式化为字符串的方法，',
        'conSub': [{
          'name': 'toDateString()——以特定于实现的格式显示星期几、月、日和年'
        }, {
          'name': 'toTimeString()——以特定于实现的格式显示时、分、秒和时区'
        }, {
          'name': 'toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年'
        }, {
          'name': 'toLocaleTimeString()——以特定于实现的格式显示时、分、秒'
        }, {
          'name': 'toUTCString()——以特定于实现的格式完整的UTC日期。'
        }]
      }, {
        'body': '以上的字符串格式方法的输出也是因浏览器而异的。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '日期/时间组件方法',
      'content': [{
        'body': '到目前为止，剩下还未介绍的Date类型的方法，都是直接取得和设置日期值中特定部分的方法了。<table class="table table-bordered"><thead><tr><td>方法</td><td>说明</td></tr></thead><tbody><tr><td>getTime()</td><td>返回表示日期的毫秒数；与valueOf()方法返回的值相同</td></tr><tr><td>setTime(毫秒)</td><td>以毫秒数设置日期，会改变整个日期</td></tr><tr><td>getFullTear()</td><td>取得4位数的年份</td></tr><tr><td>getUTCFullYear()</td><td>返回UTC日期的4位数年份</td></tr><tr><td>setFullYear(年)</td><td>设置日期的年份。传入的年份值必须是4位数字</td></tr><tr><td>setUTCFullYear(年)</td><td>设置UTC日期中的年份。传入的年份值必须是4位数字</td></tr><tr><td>getMonth()</td><td>返回日期的月份，以0开头，以11结尾</td></tr><tr><td>getUTCMonth()</td><td>返回UTC日期中的月份，其中0表示1月，11表示12月。</td></tr><tr><td>setMonth(月)</td><td>设置日期的月份。传入的月份值必须大于等于0，超过11则增加年份</td></tr><tr><td>setUTCMonth()</td><td>设置UTC日期中的月份。传入的月份值必须大于0，超过11则增加年份</td></tr><tr><td>getDate();</td><td>返回日期月份中的天数（1~31）</td></tr><tr><td>getUTCDate()</td><td>返回UTC日期月份中的天数</td></tr><tr><td>setDate(日)</td><td>设置日期月份的天数，如果传入值超过该月最大天数，则增加月份</td></tr><tr><td>setUTCDate()</td><td>设置UTC日期月份的天数，如果传入值超过该月最大天数，则增加月份</td></tr><tr><td>getDay()</td><td>返回日期中的星期的星期几（0为周日，6为周六）</td></tr><tr><td>getUTCDay()</td><td>返回UTC日期中星期的星期几（0为周日，6为周六）</td></tr><tr><td>getHours()</td><td>返回日期中的小时数（0~23）</td></tr><tr><td>getUTCHours()</td><td>返回UTC日期中的小时数（0~23）</td></tr><tr><td>setHours()</td><td>设置日期中的小时数。传入的值超过了23则增加月份中的天数</td></tr><tr><td>setUTCHours(时)</td><td>设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数</td></tr><tr><td>getMinutes()</td><td>返回日期中的分钟数（0~59）</td></tr><tr><td>setMinutes()</td><td>设置日期中的分钟数，传入的值超过59则增加小时数</td></tr><tr><td>setUTCMinutes(分)</td><td>设置UTC日期中的分钟数，传入的值超过59则增加小时数</td></tr><tr><td>getSeconds()</td><td>返回日期中的秒数（0~59）</td></tr><tr><td>getUTCSeconds()</td><td>返回UTC日期中的秒数（0~59）</td></tr><tr><td>setSeconds(秒)</td><td>设置日期中的秒数，传入的值超过了59会增加分钟数。</td></tr><tr><td>setUTCSeconds()</td><td>设置UTC日期中的秒数，传入的值超过了59会增加分钟数。</td></tr><tr><td>getMilliseconds()</td><td>返回日期中的毫秒数</td></tr><tr><td>getUTCMilliseconds()</td><td>返回UTC日期中的毫秒数</td></tr><tr><td>setMilliseconds()</td><td>设置日期中的毫秒数</td></tr><tr><td>setUTCMilliseconds()</td><td>设置UTC日期中的毫秒数</td></tr><tr><td>getTimezonOffset()</td><td>返回本地时间与UTC时间相差的分钟数。例如：美国东部标准时间返回300.在某地进入夏令时的情况下，这个值会有所变化</td></tr></tbody></table>',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': 'RegExp类型',
    'content': [{
      'body': 'ECMAScript通过RegExp类型来支持正则表达式，例：<pre>var expression = /pattern/flags;</pre>其中的模式（pattern）部分可以是任何简单或复杂的正则表达式，可以包含字符类，限定符，分组，向前查找以及反向引用。每个正则表达式都可带有一或多个标志（flags），用以标明正则表达式的行为。其匹配模式支持以下三个标志。',
      'conSub': [{
        'name': 'g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止。'
      }, {
        'name': 'i：表示不区分大小写模式，即在确定匹配项时忽略模式与字符串的大小写；'
      }, {
        'name': 'm：表示多行模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项'
      }]
    }, {
      'body': '因此，一个正则表达式就是一个模式与上述3个标志的组合体。不同组合产生不同结果。与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义。正则表达式中的元字符包括<pre>( [ { \\\ ^ $ | ? * + . } ])<br>//匹配第一个“bat”或“cat”,不区分大小写<br>var pattern1= /[bc]at/i;<br>//匹配第一个“[bc]at”，不区分大小写<br>var pattern2= /\\\[bc\\\]at/i;<br>//匹配所有以“at”结尾的3个字符的组合，不区分大小写<br>var pattern3=/.at/gi;<br>//匹配所有“.at”，不区分大小写<br>var pattern4=/\\\.at/gi</pre>',
      'conSub': []
    }, {
      'body': '下表给出了一些模式，左边是这些模式的字面量形式，右边是使用RegExp构造函数定义相同模式时使用的字符串。<table class="table table-bordered"><thead><tr><td>字面量模式</td><td>等价的字符串</td></tr></thead><tbody><tr><td>/\\\[bc\\\]at/</td><td>"\\\\[bc\\\\]at"</td></tr><tr><td>/\\\.at/</td><td>"\\\\.at"</td></tr><tr><td>/name\\\/age/</td><td>"name\\\\/age"</td></tr><tr><td>/\\\d.\\\d{1,2}/</td><td>"\\\\d.\\\\d{1,2}"</td></tr><tr><td>/\\\w\\\\hello\\\\123/</td><td>"\\\\w\\\\\\\\hello\\\\\\\\123"</td></tr></tbody></table>',
      'conSub': []
    }, {
      'body': '使用正则表达式字面量和使用RegExp构造函数创建的正则表达式不一样。在ECMAScript3中，正则表达式字面量始终会共享同一个RegExp实例，而使用构造函数创建的每一个新RegExp实例都是一个新实例。',
      'conSub': []
    }, {
      'body': 'ECMAScript5明确规定，使用正则表达式字面量必须像直接调用RegExp构造函数一样，每次都创建新的RegExp实例。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'RegExp实例属性',
      'content': [{
        'body': 'RegExp的每个实例都具有下列属性：',
        'conSub': [{
          'name': 'global：布尔值，表示是否设置了g标志',
        }, {
          'name': 'ignoreCase：布尔值，表示是否设置了i标志'
        }, {
          'name': 'lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从0算起'
        }, {
          'name': 'multiline：布尔值，表示是否设置了m标志'
        }, {
          'name': 'source：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回'
        }]
      }, {
        'body': '例：<pre>var pattern1=/\\\[bc\\\]at/i;//(new RegExp("\\\\[bc\\\\]at","i"))<br>alert(pattern1.global);//false<br>alert(pattern1.ignoreCase);//true<br>alert(pattern1.multiline);//false<br>alert(pattern1.lastIndex);//0<br>alert(pattern1.source);//"\\\[bc\\\]at"</pre>注意：source属性保存的是规范形式的字符串，即字面量形式所用的字符串。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'RegExp实例方法',
      'content': [{
        'body': 'RegExp对象的主要方法是exec(),该方法是专门为捕获组而设计的。exec()接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回null。返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。其中，index表示匹配项在字符串中的位置，而input表示应用正则表达式的字符串。在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该数组只包含一项）例：<pre>var text="mom and dad and bady";<br>var pattern=/mom( and dad( and baby)?)?/gi;<br>var matches=pattern.exec(text);<br>alert(matches.index);//0<br>alert(matches.input);//"mom and dad and bady"<br>alert(matches[0]);//"mom and dad and bady"<br>alert(matches[1]);//" and dad and bady"<br>alert(matches[2]);//" and bady"</pre>',
        'conSub': []
      }, {
        'body': '正则表达式的第二个方法是test(),它接受一个字符串参数。在模式与该参数匹配的情况下返回true；否则，返回false。而RegExp实例继承的toLocaleString()和toString()方法都会返回正则表达式的字面量，与创建正则表达式的方式无关。',
        'conSub': []
      }],
      'extra_content': [{
        'name': 'IE的JavaScript实现在lastIndex属性上存在偏差，即使在非全局模式下，lastIndex属性每次也会发生变化。'
      }, {
        'name': '正则表达式的valueOf()方法返回正则表达式本身。'
      }]
    }, {
      'name': 'RegExp构造函数属性',
      'content': [{
        'body': 'RegExp构造函数包含一些属性。这些属性适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化。关于这些属性的另一个独特之处，就是可以通过两种方式访问它们。换句话说，这些属性分别有一个长属性名和一个短属性名（opera不支持短属性名，例外）。下表例出RegExp构造函数的属性。<table class="table table-bordered"><thead><tr><td>长属性名</td><td>短属性名</td><td>说明</td></tr></thead><tbody><tr><td>input</td><td>$_</td><td>最近一次要匹配的字符串。Opera未实现此属性。</td></tr><tr><td>lastMatch</td><td>$&</td><td>最近一次要匹配的捕获组。Opera未实现此属性</td></tr><tr><td>lastParen</td><td>$+</td><td>最近一次匹配的捕获组。Opera未实现此属性</td></tr><tr><td>leftContext</td><td>$`</td><td>input字符串中lastMatch之前的文本</td></tr><tr><td>multiline</td><td>$*</td><td>布尔值，表示是否所有表达式都使用多行模式，IE和Opera未实现此属性</td></tr><tr><td>rightContext</td><td>$' + "'" + '</td><td>input字符串中lastMatch之后的文本</td></tr></tbody></table>',
        'conSub': []
      }, {
        'body': '使用这些属性可以从exec()或test()执行的操作中提取出更具体的信息。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '模式的局限性',
      'content': [{
        'body': '废话',
        'conSub': []
      }],
      'extra_content': []
    }]
  }, {
    'name': 'Function类型',
    'content': [{
      'body': 'ECMAScript中的函数，实际上是一个对象，每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。函数通常是使用函数声明语法定义。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '没有重载(深入理解)',
      'content': [{
        'body': '将函数名想象为指针，也有助于理解为什么ECMAScript中没有函数重载的概念。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '函数声明与函数表达式',
      'content': [{
        'body': '实际上，解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '也可以同时使用函数声明和函数表达式，例如var sum=function sum(){}。但这种语法会在safari中出错。'
      }]
    }, {
      'name': '作为值的函数',
      'content': [{
        'body': '因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '函数内部属性',
      'content': [{
        'body': '在函数内部，有两个特殊的对象：arguments和this。其中，arguments是一个类数组对象，包含着传入函数中的所有参数。虽然arguments的主要用途是保存函数参数，但这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数，相当于arguments.callee()等于functionName();',
        'conSub': []
      }, {
        'body': '函数内部的另一个特殊对象是this，this引用的是函数据以执行的环境对象——或者也可说成是this值(当在网页的全局作用域中调用函数时，this对象引用的就是window)',
        'conSub': []
      }, {
        'body': 'ECMAScript5也规范了另一个函数对象的属性：caller。除了Opera的早期版本不支持，其他浏览器都支持这个ECMAScript3并没有定义的属性。这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为null。例：<pre>function outer(){<br> inner();<br>}<br>function inner(){<br> alert(inner.caller);<br>}<br>outer();//会显示outer()函数的源代码，。</pre>为了实现更松散的耦合，也可以通过arguments.callee.caller来访问相同的信息。而在严格模式里，访问这两个，caller和callee属性都会出错，以上变化都是为了加强这门语言的安全性。防止第三方窥探其他代码。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的sayColor()函数与o.sayColor()指向的仍然是同一个函数。'
      }]
    }, {
      'name': '函数属性和方法',
      'content': [{
        'body': 'ECMAScript中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接收的命名参数的个数。而在ECMAScript核心所定义的全部属性中，最耐人寻味的就要数prototype属性了。对于ECMAscript中的引用类型而言，prototype是保存它们所有实例方法的真正问题所在。在ECMAScript5中，prototype属性是不可枚举的，因此使用for-in无法发现。',
        'conSub': []
      }, {
        'body': '每个函数都包括两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先，apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以使Array的实例，也可以是arguments对象。',
        'conSub': []
      }, {
        'body': 'call方法与apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。对于call()方法而言，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须逐个列举出来。',
        'conSub': []
      }, {
        'body': '事实上。apply()和call()最强大的地方是能够扩充函数赖以运行的作用域。最大好处是，对象不需要与方法有任何的耦合关系。ECMAScript5还定义了一个方法：bind()，这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值',
        'conSub': []
      }],
      'extra_content': [{
        'name': '在严格模式下，未指定环境对象而调用函数，则this值不会转型为window。除非明确把函数添加到某个对象或者调用apply()或call(),否则this值将是undefined。'
      }]
    }]
  }, {
    'name': '基本包装类型',
    'content': [{
      'body': '为了便于操作基本类型值，ECMAScript还提供了3个特殊的引用类型：Boolean、Number、和String。这些类型具有与各自的基本类型相应的特殊行为。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象。从而让我们能够调用一些方法来操作这些数据。',
      'conSub': ''
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'Boolean类型',
      'content': [{
        'body': '<del>Boolean类型是与布尔值对应的引用类型要创建Boolean对象，例：<pre>var booleanObject=new Boolean(true);</pre>,容易产生误解，弃用<del>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'Number类型',
      'content': [{
        'body': '<del>Number是与数字值对应的引用类型。与Boolean类型一样，Number类型也重写了valueOf()、toLocaleString()、toString()方法，重写后的valueOf()方法返回对象表示的基本类型的数值，另外两个方法则返回字符串形式的数值。Number类型还指定了一些用于将数值格式化为字符串的方法。其中toFixed()方法会按照指定的小数位返回数值的字符串表示，其能够自动舍入，很适合处理货币值，但不同浏览器给这个方法设定的舍入规则可能会有所不同，</del>',
        'conSub': []
      }, {
        'body': '<del>另外可用于格式化数值的方法是toExponential()，该方法返回以指数表示法表示的数值的字符串形式。与toFixed()一样，toExponential()也接收一个参数，而且该参数同样也是指定输出结果中的小数位数。</del>',
        'conSub': []
      }, {
        'body': '<del>还有toPrecision()方法，其返回的是以最准确的格式自动返回值。</del>',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': 'String类型',
      'content': [{
        'body': 'String类型是字符串的对象包装类型，例：<pre>var string1=new String("dfgfd");</pre>String对象的方法也可以在所有基本的字符串值中访问到。其中，继承的valueOf()、toLocaleString()和toString()方法，都返回对象所表示的基本字符串值。String类型的每个实例都有一个length属性，表示字符串中包含多个字符。String类型提供了很多方法，用于辅助完成对ECMAScript中字符串的解析和操作。',
        'conSub': [{
          'name': '字符方法<br>两个用于访问字符串中特定字符的方法是：charAt()和charCodeAt()。这两个方法都接收一个参数，即基于0的字符位置。其中，charAt()方法以单字符字符串的形式返回给定位置的那个字符。（ECMAScript没有字符类型。），但如果你想得到的是字符编码，那么就得使用charCodeAt();使用方括号表示法访问个别字符的方法只在IE7和更早版本中会返回undefined。'
        }, {
          'name': '字符串操作方法<br>concat(),用于将一个或多个字符串拼接起来，返回拼接得到的新字符串。而原始值则不变<br>ECMAScript还提供了三个基于子字符串创建新字符串的方法：slice()、substr()和substring()。这三个方法都会返回被操作字符串的一个个字符串。而且也都接受一或两个参数。第一个参数指定子字符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪里结束。而且与conact()方法一样，slice()、substr()、substring()也不会修改字符串本身的值——它们只是返回一个基本类型的字符串值，对原始字符串没有任何影响。'
        }, {
          'name': '字符串位置方法<br>有两个可以从字符串中查找子字符串的方法：indexOf()和lastIndexOf()。这两个方法都是从一个字符串中搜索给定的子字符串，然后返回子字符串的位置（如果没有找到该子字符串，则返回-1）。这两个方法的区别在于：indexOf()方法从字符串的开头向后搜索子字符串，而lastIndexOf()方法是从字符串的末尾向前搜索子字符串。'
        }, {
          'name': 'trim()<br>该方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。原始字符串中的前置及后缀空格会保持不变，'
        }, {
          'name': '字符串大小写转换方法<br>ECMAScript中涉及字符串大小写转换的方法有4个：toLowerCase()、toLocaleLowerCase()、toUpperCase()和toLocaleUpperCase(),而如果不知道代码将在哪种语言环境下运行的情况下，还是使用针对地区的方法更稳妥一些。'
        }, {
          'name': '字符串的模式匹配方法<br>String类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是match()，在字符串调用这个方法，本质上与调用RegExp的exec()方法相同。match()方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象。另一个用于查找模式的方法是search().这个方法的唯一参数与match()方法的参数相同：由字符串或RegExp对象指定的一个正则表达式。search()方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。search()方法始终是从字符串开头向后查找模式。<br>为了简化替换子字符串的操作，ECMAScript提供了replace()方法。这个方法接收两个参数：第一个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的方法就是提供一个正则表达式，而且要指定全局(g)标志。<br>下表列出了ECMAScript提供的这些特殊的字符序列。<table class="table table-bordered"><thead><tr><td style="width:10%">字符序列</td><td>替换文本</td></tr></thead><tbody><tr><td>$$</td><td><strong>$</strong></td></tr><tr><td>$&</td><td>匹配整个模式的字符串。与RegExp.lastMacth的值相同</td></tr><tr><td>$' + "'" + '</td><td>匹配的子字符串之前的子字符串。与RegExp.letContext的值相同</td></tr><tr><td>$`</td><td>匹配的子字符串之后的子字符串。与RegExp.rightContext</td></tr><tr><td>$n</td><td>匹配第n个捕获组的子字符串，其中n等于0~9，例：$1是匹配第一个捕获组的子字符串，$2是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串。</td></tr><tr><td>$nn</td><td>匹配第nn个捕获组</td></tr></tbody></table>最后一个与模式匹配有关的方法是split()，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以使字符串，也可以是一个RegExp对象。split()方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小。'
        }, {
          'name': 'localeCompare()方法<br>与操作字符串有关的最后一个方法是localeCompare(),这个方法比较两个字符串，并返回下列值中的一个：<ul><li>如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况是-1，具体的值同样要视实现而定）</li><li>如果字符串等于字符串参数，则返回0;</li><li>如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况是1，具体的值同样要视实现而定）</li></ul>'
        }, {
          'name': 'fromCharCode()方法<br>另外，String构造函数本身还有一个静态方法：fromCharCode()。这个方法的任务是接收一或多个字符编码，然后将他们转换成一个字符串。从本质上来看，这个方法与实例方法charCodeAt()执行的是相反的操作。'
        }, {
          'name': 'HTML方法<br>废话'
        }]
      }],
      'extra_content': [{
        'name': 'IE的JavaScript实现在处理向subStr()方法传递负值的情况时存在问题，它会返回原始的字符串。IE9修复了这个问题。'
      }]
    }]
  }, {
    'name': '单体内置对象',
    'content': [{
      'name': 'ECMA-262对内置对象的定义就是：“由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了”意思是，开发人员不必显式地实例化内置对象，因为它们已经实例化了。前面的内置对象有：Object、Array和String。ECMAScript还定义了两个单体内置对象：Global和Math。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': 'Global对象',
      'content': [{
        'body': 'Global(全局)对象可以说是ECMAScript中最特别的一个对象了，不属于任何其他对象的属性和方法，最终都是它的属性和方法。事实上，没有全局变量和全局函数；所有在全局作用域中定义的属性和方法，都是Global对象的属性。',
        'conSub': [{
          'name': 'URL编码方法<br>Global对象的encodeURI()和encodeURIComponent()方法可以对URI进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，例如空格。而这两个URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。其中，encodeURI()主要用于整个URI，而encodeURIComponent()主要用于对URI中的某一段进行编码。它们的主要区别在于，encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而encodeURIComponent()则会对它所发现的任何非标准字符进行编码。与这两个方法相对应的是decodeURI(),decodeURIComponent()。其中，decodeURI()只能对使用encodeURI()替换的字符进行解码，'
        }, {
          'name': 'eval()方法<br>该方法就像是一个完整的ECMAScript解析器，它只接受一个参数，即要执行的ECMAScript（或JavaScript）字符串。当解析器发现代码中待用eval()方法时，它会将传入的参数当作实际的ECMAScript语句来解析，然后把执行结构插入到原位置。通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。这意味着通过eval()执行的代码可以引用在包含环境中定义的变量或函数。<pre>eval("function sayHi() {alert("11");}");<br>sayHi();//"11"</pre>在eval()中创建的任何变量或函数都不会提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只在eval()执行的时候创建。而在严格模式中，在外部访问不到eval()中创建的任何变量或函数，因此前面两个例子都会导致错误，同样，在严格模式下，为eval()赋值也会导致错误。'
        }, {
          'name': 'Global对象的属性<br>Global对象还包含一些属性，下表列出。<table class="table table-bordered"><thead><tr><td>属性</td><td>说明</td><td>属性</td><td>说明</td></tr></thead><tbody><tr><td>undefined</td><td>特殊值undefined</td><td>Date</td><td>构造函数Date</td></tr><tr><td>NaN</td><td>特殊值NaN</td><td>RegExp</td><td>构造函数RegExp</td></tr><tr><td>Infinity</td><td>特殊值Infinity</td><td>Error</td><td>构造函数Error</td></tr><tr><td>Object</td><td>构造函数Object</td><td>EvalError</td><td>构造函数EvalError</td></tr><tr><td>Array</td><td>构造函数Array</td><td>RangeError</td><td>构造函数RangeError</td></tr><tr><td>Function</td><td>构造函数Function</td><td>ReferenceError</td><td>构造函数ReferenceError</td></tr><tr><td>Boolean</td><td>构造函数Boolean</td><td>SyntaxError</td><td>构造函数SyntaxError</td></tr><tr><td>String</td><td>构造函数String</td><td>TypeError</td><td>构造函数TypeError</td></tr><tr><td>Number</td><td>构造函数Number</td><td>URIError</td><td>构造函数URIError</td></tr></tbody></table>ECMAScript明确禁止给undefined、NaN、和Infinity赋值，这样做即使在非严格模式下也会导致错误。'
        }, {
          'name': 'window对象<br>ECMAScript虽然没有指出如何直接访问Global对象，但web浏览器都是将这个全局对象作为window对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了window对象的属性。'
        }]
      }],
      'extra_content': [{
        'name': 'URI方法encodeURI()、encodeURIComponent()、decodeURI()、decodeURIComponent()用于替代已被废弃的escape()和unescape()方法。'
      }, {
        'name': '有效运用eval(),防止代码注入'
      }]
    }, {
      'name': 'Math对象',
      'content': [{
        'name': 'ECMAScript还为保存数学公式和信息提供了一个公共位置，即Math对象。与我们在JavaScript直接编写的计算功能相比，Math对象提供的计算功能执行起来要快很多，',
        'conSub': [{
          'name': 'Math对象的属性<br><table class="table table-bordered"><thead><tr><td>属性</td><td>说明</td></tr></thead><tbody><tr><td>Math.E</td><td>自然对数的底数，即常量e的值</td></tr><tr><td>Math.LN10</td><td>10的自然对数</td></tr><tr><td>Math.LN2</td><td>2的自然对数</td></tr><tr><td>Math.LOG2E</td><td>以2为底e的对数</td></tr><tr><td>Math.LOG10E</td><td>以10为底e的对数</td></tr><tr><td>Math.PI</td><td>π的值</td></tr><tr><td>Math.SQRT1_2</td><td>1/2的平方根（即2的平方根的倒数）</td></tr><tr><td>Math.SQRT2</td><td>2的平方根</td></tr></tbody></table>'
        }, {
          'name': 'min()和max()方法<br>min()和max()方法用于确定一组数值中的最小值和最大值。要找到数组中的最大或最小值，可以例：<pre>var values=[1,2,3,4,5,6,7,8];<br>var max=Math.max.apply(Math,values);</pre>'
        }, {
          'name': '舍入方法<br>Math.ceil()、Math.floor()、和Math.round()，这三个方法分别遵循下列舍入规则。<ul><li>Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数</li><li>Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数</li><li>Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数</li></ul>'
        }, {
          'name': 'random<br>Math.random()方法返回大于0小于1的一个随机数。'
        }, {
          'name': '其他方法<br>Math对象中还包含其他一些与完成各种简单或复杂计算有关的方法，例：<table class="table table-bordered"><thead><tr><td>方法</td><td>说明</td><td>方法</td><td>说明</td></tr></thead><tbody><tr><td>Math.abs(num)</td><td>返回num的绝对值</td><td>Math.asin(x)</td><td>返回x的反正弦值</td></tr><tr><td>Math.exp(num)</td><td>返回num的自然对数</td><td>Math.atan(x)</td><td>返回x的反正切值</td></tr><tr><td>Math.log(num)</td><td>返回num的自然对数</td><td>Math.atan2(y,x)</td><td>返回y/x的反正切值</td></tr><tr><td>Math.pow(num,power)</td><td>返回num的power次幂</td><td>Math.cos(x)</td><td>返回x的余弦值</td></tr><tr><td>Math.sqrt(num)</td><td>返回num的平方根</td><td>Math.sin(x)</td><td>返回x的正弦值</td></tr><tr><td>Math.acos(x)</td><td>返回x的反余弦值</td><td>Math.tan(x)</td><td>返回x的正切值</td></tr></tbody></table>'
        }]
      }],
      'extra_content': []
    }]
  }],
  'sum': [{
    'content': '对象在JavaScript中被称为引用类型的值，而且有一些内置的引用类型可以用来创建特定的对象，总结：',
    'conSub': [{
      'name': '引用类型与传统面向对象程序设计中的类相似，但实现不同'
    },{
      'name':'Object是一个基础类型，其他所有类型都从Object继承了基本的行为'
    },{
      'name':'Array类型是一组值的有序列表，同时还提供了操作和转换这些值的功能'
    },{
      'name':'Date类型提供了有关日期和时间的信息，包括当前日期和时间以及相关的计算功能'
    },{
      'name':'RegExp类型是ECMAScript支持正则表达式的一个接口。提供了最基本的和一些高级的正则表达式功能。'
    }]
  }, {
    'content': '函数实际上是Function类型的实例，因此函数也是对象；而这一点正是JavaScript最有特色的地方。由于函数是对象，所以函数也拥有方法，可以用来增强其行为。',
    'conSub': []
  }, {
    'content': '因为有了基本包装类型，所以JavaScript中的基本类型值可以被当作对象来访问。三种基本包装类型分别是：Boolean、Number和String。',
    'conSub': [{
      'name': '每个包装类型都映射到同名的基本类型'
    }, {
      'name': '在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便了数据操作'
    }, {
      'name': '操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象。'
    }]
  },{
    'content':'在所有代码执行之前，作用域中就已经存在两个内置对象：Global和Math。在大多数ECMAScript实现中都不能直接访问Global对象；不过，web浏览器实现了承担该角色的window对象，全局变量和函数都是Global对象的属性。Math对象提供了很多属性和方法，用于辅助完成复杂的数学计算任务',
    'conSub':[]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
