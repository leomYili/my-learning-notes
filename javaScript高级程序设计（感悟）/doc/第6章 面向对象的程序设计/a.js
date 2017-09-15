var six_chapter = {
  'name': '面向对象的程序设计',
  'small': '第六章',
  'content': '我们可以把ECMAScript的对象想象成散列表：一组名值对，其中值可以是数据或函数，每个对象都是基于一个引用类型创建的。',
  'subStr': [{
    'name': '理解对象',
    'content': [{
      'body': '对象字面量语法，例：<pre>var person = {<br> name:"Nicholas",<br> age:29,<br> job:"web development",<br> sayName:function(){<br>  alert(this.name);<br> }<br>};</pre>',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name':'属性类型',
      'content':[{
        'body':'ECMAScript中有两种属性：数据属性和访问器属性。',
        'conSub':[{
          'name':'数据属性<br>数据属性包含一个数值对的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。<ul><li>[[Configurable]]:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。对于直接在对象上定义的属性，默认值为true</li><li>[[Enumerable]]:表示能否通过for-in循环返回属性。对于直接在对象上定义的属性，默认值为true</li><li>[[Writable]]:表示能否修改属性的值。对于直接在对象上定义的属性，默认值为true</li><li>[[Value]]:包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。该特性默认值为undefined，对于直接在对象上定义的属性，该值为定义的值</li></ul>要修改属性默认的特性，必须使用ECMAScript5的Object.definProperty()，该方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。其中，描述符对象的属性必须是：configurable，enumerable，writable和value。例：<pre>var person = {};<br>Object.definProperty(person,"name",{<br> writable:false,<br> value:"Nicholas"<br>});<br>alert(person.name);//"Nicholas";<br>person.name="greg";<br>alert(person.name);//Nicholas</pre>,在非严格模式下，将特性设为false会使操作被忽略，在严格模式下，则会出错。而且一旦把属性定义为不可配置的（configurable=false），在调用方法对特性进行修改就会出错。'
        },{
          'name':'访问器属性<br>访问器属性不包含数据值；它们包含一对getter和setter函数。在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据。<ul><li>[[Configurable]]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true</li><li>[[Enumerable]]：表示能否通过for-in循环返回属性。对于直接在对象上定义的属性，默认值为true</li><li>[[Get]]：在读取属性时调用的函数。默认值为undefined。</li><li>[[Set]]：在写入属性时调用的属性。默认值为undefined</li></ul>访问器属性不能直接定义，必须使用Object.definProperty()来定义。以前的方法是：_defineGetter_()和_defineSetter_()'
        }]
      }],
      'extra_content':[{
        'name':'不要在ie8中使用Object.definProperty()'
      }]
    },{
      'name':'定义多个属性',
      'content':[{
        'body':'ECMAScript5定义了一个Object.defineProperties()方法。利用这个方法可以通过描述符一次定义多个属性。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。（上面例的一次定义多个属性）',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'读取属性的特性',
      'content':[{
        'body':'使用ECMAScript5的Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述符，这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有Configurable、enumerable、get和set；如果是数据属性，这个对象的属性有configurable,enumerable,writable,value。',
        'conSub':[]
      }],
      'extra_content':[]
    }]
  }, {
    'name': '创建对象',
    'content': [{
      'body': '虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码，所以提出新的模式来解决问题。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '工厂模式',
      'content': [{
        'body': '用函数来封装以特定接口创建对象的细节<pre>function createPerson(name,age,job){<br> var o = new Object();<br> o.name=name;<br> o.age=age;<br> o.job=job;<br> o.sayName=function(){<br>  alert(this.name);<br> }<br> return o;<br>}<br>var person1=createPerson("Nicholas",29,"software Engineer");</pre>工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '构造函数模式',
      'content': [{
        'body': '例：<pre>function Person(name,age,job){<br> this.name=name;<br> this.age=age;<br> this.job=job;<br> this.sayName=function(){<br>  alert(this.name);<br> };<br>}</pre>该例子与工厂模式相比，不同在于',
        'conSub': [{
          'name':'没有显式的创建对象'
        },{
          'name':'直接将属性和方法赋给了this对象，'
        },{
          'name':'没有return语句'
        }]
      }, {
        'body': '构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。创建新实例过程。',
        'conSub': [{
          'name':'创建一个新对象'
        },{
          'name':'将构造函数的作用域赋给新对象（this指向了这个新对象）'
        },{
          'name':'执行构造函数中的代码（为这个新对象添加属性）'
        },{
          'name':'返回新对象'
        }]
      },{
        'body':'检测对象类型，使用instanceof操作符更可靠。创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方',
        'conSub':[{
          'name':'将构造函数当作函数<br>构造函数与其他函数的唯一区别，就在于调用它们的方式不同。是否new。'
        },{
          'name':'构造函数的问题<br>构造函数的缺点：每个方法都要在每个实例上重新创建一遍。ECMAScript中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。'
        }]
      }],
      'extra_content': [{
        'name': '以这种方式定义的构造函数是定义在Global对象（在浏览器中是window对象）中的。'
      }]
    }, {
      'name': '原型模式',
      'content': [{
        'body': '我们创建的每个函数都有个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。但与构造函数不同的是，新对象的这些属性和方法是由所有实例共享的。',
        'conSub': [{
          'name':'理解原型对象<br>无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor属性，这个属性包含一个指向prototype属性所在函数的指针。创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性；至于其他方法，则都是从Object继承而来的。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针，指向构造函数的原型对象。ECMA-262第5版中管这个指针叫[[prototype]]。虽然在脚本中没有标准的方式访问[[Prototype]]，但主流浏览器都支持一个属性_proto_;而在其他实现中，这个属性对脚本则是完全不可见的。不过，要明确的真正重要的一点就是，这个连接存在于实例与构造函数的原型对象之间。而不是存在于实例和构造函数之间。<br>虽然在所有实现中都无法访问到[[prototype]],但可以通过isPrototypeOf()方法来确定对象之间是否存在这种关系。从本质上讲，如果[[Prototype]]指向调用isPrototypeOf()方法的对象(例：Person.prototype)，那么这个方法就返回true;ECMAScript5增加了一个新方法，叫Object.getPrototypeOf()，在所有支持的实现中，这个方法返回[[Prototype]]的值。例：<pre>alert(Object.getPrototypeOf(person1) === Person.prototype);//true<br>alert(Object.getPrototypeOf(person1).name);//true</pre>每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。先实例，后原型。<br>虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性。<pre>function Person(){}<br>Person.prototype.name="Nicholas";<br>Person.prototype.age=29;<br>Person.prototype.job="web develop;<br>Person.prototype.sayName=function(){<br> alert(this.name);<br>};<br>var person1=new Person();<br>var person2=new Person();<br>person1.name="Greg";alert(person1.name);//Greg 来自实例<br>alert(preson2.name);//Nicholas 来自原型</pre>当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为null，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，可以使用delete删除实例属性，从而重新访问原型中的属性。<br>使用hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中，这个方法只在给定属性存在于对象实例中时，才会返回true'
        },{
          'name':'原型与in操作符<br>有两种方式使用in操作符：单独使用和在for-in循环中使用。在单独使用时，in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。而同时使用hasOwnProperty()方法和in操作符，就可以确定该属性到底位于对象里还是原型中。<br>在使用for-in循环时，返回的是所有能够通过对象访问的、可枚举的属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性（即将[[Enumerable]]标记为false的属性）的实例属性也会在for-in中返回，因为所有开发人员定义的属性都是可枚举的——只在IE8及更早版本中例外。要取得对象上所有可枚举的实例属性，可以使用ECMAScript5的Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组，如果想要得到所有实例属性，无论是否可枚举，可以使用Object.getOwnPropertyNames()'
        },{
          'name':'更简单的原型语法,例：<pre>function Person(){}<br>Person.prototype={<br> name:"Nicholas",<br> age:29,<br> job:"web develop",<br> sayName:function(){<br>  alert(this.name);<br> }<br>};</pre>但在上述的代码中，constructor属性不再指向Person了。该方式本质上完全重写了默认的prototype对象，因此constructor属性也就变成了新对象的constructor属性(指向Object构造函数)不再指向Person函数。如果constructor很重要，可以<pre>function Person(){};<br>Person.prototype = {<br> constructor:Person,<br> name:"Nicholas"<br> }<br>}</pre>而以这种方式重设constructor属性会导致它的[[Enumerable]]特性被设置为true。默认情况下，原生的constructor属性是不可枚举的，因此如果你使用兼容ECMAScript5的JavaScript引擎，可以试试Object.definProperty();例：<pre>Object.definProperty(Person.prototype,"constructor",{<br> enumerable:false,<br> value:Person<br>});</pre>'
        },{
          'name':'原型的动态性<br>由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能从实例上反映出来——即使是先创建了实例后修改原型也照样如此。但如果是重写整个原型，就不一样了。把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。'
        },{
          'name':'原生对象的原型<br>原生模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（Object、Array、String等）都在其构造函数的原型上定义了方法。而通过原生对象的原型，不仅可以获得所有默认方法的引用，而且也可以定义新方法，可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法，例：<pre>String.prototype.startsWith=function (text) {<br> return this.indexOf(text)==0;<br>};<br>var msg="Hello world";<br>alert(msg.startsWith("Hello"));//true</pre>这里新定义的startsWith()方法会在传入的文本位于一个字符串开始时返回true。既然方法被添加给了String.prototype，那么当前环境中的所有字符串就都可以调用它。由于msg是字符串，而且后台会调用String基本包装函数创建这个字符串，因此通过msg就可以调用startsWith()方法。'
        },{
          'name':'原型对象的问题<br>它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。而最大的问题就是共享性，对于包含引用类型值得属性来说。<pre>function Person(){};<br>Person.prototype={<br> friends:["12","123"]<br>};<br>var person1=new Person(),person2=new Person;<br>person1.friends.push("Van");<br>alert(person1.friends);//"12,123,Van"<br>alert(person2.friends);//"12,123,Van"</pre>可以看出person2也会多出原先想在person1中添加的字符串。'
        }]
      }],
      'extra_content': [{
        'name':'原型最初只包含constructor属性，而该属性也是共享的，因此可以通过对象实例访问'
      },{
        'name':'ECMAScript5的Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用Object.getOwnPropertyDescriptor()方法'
      }]
    }, {
      'name': '组合使用构造函数模式和原型模式',
      'content': [{
        'body': '构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种模式还支持向构造函数传递参数。<pre>function Person(name,ahe,job){<br> this.name=name;<br> this.age=age;<br> this.job=job;<br> this.friends=["11","22"];<br>}<br>Person.prototype = {<br> constructor:Person,<br> sayName:function(){<br>  alert(this.name);<br> }<br>}<br>var person1=new Person("asd",29,"web design");<br>var person2=new Person("xcs",20,"web develop");<br>person1.friends.push("33");<br>alert(person1.friends);//"11,22,33"<br>alert(person2.friends);//"11,22"<br>alert(person1.friends === person2.friends);//false<br>alert(person1.sayName === person2.sayName);//true</pre>上述是将实例属性在构造函数中定义，而由所有实例共享的属性constructor和方法sayName()则是在原型中定义的。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '动态原型模式',
      'content': [{
        'body': '是通过先检查某个应该存在的方法是否有效，来决定是否需要初始化原型<pre>//作用域为上面的Person<br>if(typeof this.sayName != "function"){<br> Person.prototype.sayName=function(){<br>  alert(this.name);<br> }<br>}</pre>这种方式创建的对象，可以使用instanceof操作符确定它的类型。',
        'conSub': []
      }],
      'extra_content': [{
        'name': '使用动态原型模式时，不能使用对象字面量重写原型。'
      }]
    }, {
      'name': '寄生构造函数模式',
      'content': [{
        'body': '例：<pre>function Person(name,age,job){<br> var o=new Object();<br> o.name=name;<br> o.age=age;<br> o.job=job;<br> o.sayName=function() {<br>  alert(this.name);<br> };<br> return o;<br>}<br>var friend = new Person("asd",29,"web");<br>friend.sayName();//asd</pre>但这种模式下，使用instanceof操作符无法确定对象类型。',
        'conSub': []
      }],
      'extra_content': []
    }, {
      'name': '稳妥构造函数模式',
      'content': [{
        'body': '所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。稳妥对象最适合在一些安全的环境中，或者在防止数据被其他应用程序改动时使用。与寄生模式比较而言，不同在于：新创建对象的实例方法不引用this；二是不使用new操作符调用构造函数。除了该模式本身定义的函数，没有其他方法可以访问到构造函数的原始数据。该模式也不能使用instanceof。',
        'conSub': ''
      }],
      'extra_content': []
    }]
  }, {
    'name': '继承',
    'content': [{
      'body': '由于函数没有签名，在ECMAScript中无法实现接口继承。ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。',
      'conSub': []
    }],
    'extra_content': [],
    'subStr': [{
      'name': '原型链',
      'content': [{
        'body': '其是利用原型让一个引用类型继承另一个引用类型的属性和方法；构造函数，原型，实例之间，存在：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。例：<pre>function SuperType() {<br> this.prototype=true;<br>}<br>SuperType.prototype.getSuperValue = function(){<br> return this.prototype;<br>};<br>function SubType(){<br> this.subproperty=false;<br>}<br>//继承SuperType<br>SubType.prototype=new SuperType();<br>SubType.prototype.getSubValue =function (){<br> return this.subproperty;<br>};<br>var instance=new SubType();<br>alert(instance.getSuberValue());//true</pre>实现的本质是重写原型对象，代之以一个新类型的实例。在确立了继承关系后，我们给SubType.prototype添加了一个方法，这样就在继承了SuperType的属性和方法的基础上又添加了一个新方法。最终就是instance指向SubType的原型，SubType的原型又指向SuperType的原型。',
        'conSub': [{
          'name':'别忘记默认的原型<br>所有引用类型默认都继承了Object，而这个继承也是通过原型链实现的。因此默认原型会包含一个内部指针，指向Object.prototype，这也正是所有自定义类型都会继承toString()、valueOf()等默认方法的根本原因'
        },{
          'name':'确定原型和实例的关系<br>第一种方式是使用instanceof操作符，只要用这个操作符测试实例与原型链中出现过的构造函数，结构就会返回true。第二种是使用isPrototypeOf()方法，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，从而返回true。'
        },{
          'name':'谨慎地定义方法<br>子类型有时需要覆盖超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但不管怎么样，给原型添加方法的代码一定要放在替换原型的语句之后。在通过原型链实现继承时，不能再使用对象字面量创建原型方法，因为这样做就会重写原型链。'
        },{
          'name':'原型链的问题<br>最主要的问题来自包含引用类型值的原型。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了<pre>function SuperType(){<br> this.colors=["red","blue"]<br>}<br>function SubType(){};<br>//继承了SuperType<br>SubType.prototype=new SuperType();<br>var instance1=new SubType();<br>instance1.colors.push("black");<br>alert(instance1.colors);//"red,blue,black"<br>var instance2 =new SubType();<br>alert(instance2.colors);//"red,blue,black"</pre>所有的实例都会共享SubType的属性。原型链的第二个问题是在创建子类型的实例时，不能向超类型的构造函数中传递参数。应该是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。'
        }]
      }],
      'extra_content': []
    }, {
      'name': '借用构造函数',
      'content': [{
        'body': '在解决原型中包含引用类型值所带来的问题的过程中，借用构造函数（伪造对象或经典继承）。这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。因此通过使用apply()和call()方法也可以在新创建的对象上执行构造函数，<pre>function SuperType(){<br> this.colors=["red","blue"]<br>}<br>function SubType(){<br> //继承了SuperType<br> SuperType.call(this);<br>}<br>var instancel=new SubType();<br>instance1.colors.push("black");<br>alert(instance1.colors);//"red,blue,black"<br>var instance2=new SubType();<br>alert(instance2.colors);//"red,blue"</pre>这样SubType的每个实例就都具有自己的colors属性的副本了',
        'conSub': [{
          'name':'传递参数<br>借用构造函数可以在子类型构造函数中向超类型构造函数传递参数。<pre>function SuperType(name){<br> this.name=name;<br>}<br>function SubType(){<br> //继承了superType，同时还传递了参数<br> SuperType.call(this,"Nicholas");<br>// 实例属性<br> this.age=29;<br>}<br>var instance=new SubType();<br>alert(instance.name);//Nicholas;<br>alert(instance.age);//29</pre>'
        },{
          'name':'借用构造函数的问题<br>方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。'
        }]
      }],
      'extra_content': []
    }, {
      'name': '组合继承',
      'content': [{
        'body': '有时也叫做为伪经典继承，指的是将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。<pre>function SuperType(name){<br> this.name=name;<br> this.colors=["red","blue"];<br>}<br>SuperType.prototype.sayName=function(){<br> alert(this.name);<br>};<br>function SubType(name,age){<br> //继承属性<br> SuperType.call(this,name);<br>this.age=age;<br>}<br>//继承方法<br>SubType.prototype=new SuperType();<br>SubType.prototype.constructor=SubType;<br>SubType.prototype.sayAge=function(){<br> alert(this.age);<br>};<br>var instance1=new SubType("Nicholas",29);<br>instance1.colors.push("black");<br>alert(instance1.colors);//red,blue,green,black<br>instance1.sayName();//"Nicholas"<br>instance1.sayAge();//29<br>var instance2=new SubType("Greg",27);<br>alert(instance2.colors);//"red,blue,green"<br>instance2.sayName();//"Greg";<br>instance2.sayAge();//27</pre>，这样，instanceof和isPrototypeOf()也能够用于识别基于组合继承创建的对象',
        'conSub': []
      }],
      'extra_content': []
    },{
      'name':'原型式继承',
      'content':[{
        'body':'ECMAScript5通过新增Object.create()方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，Object.create()与object()方法的行为相同<pre>var person={<br> name:"Nicholas",<br> friends:["sd","sds"]<br>};<br>var anotherPerson=Object.create(person);<br>anotherPerson.name="sd";<br>anotherPerson.friends.push("aa");<br>var yetAnotherPerson=Object.create(person);<br>yetAnotherPerson.name="ll";<br>yetAnotherPerson.friends.push("ll");<br>alert(person.friends);//"sd,sds,aa,ll"</pre>Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同，每个属性都是通过自己的描述符定义的。以这种方式指定的任何属性都会覆盖原型对象上的同名属性。',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'寄生式继承',
      'content':[{
        'body':'创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的一样返回对象，但该模式函数无法复用。',
        'conSub':[]
      }],
      'extra_content':[]
    },{
      'name':'寄生组合式继承',
      'content':[{
        'body':'组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。子类型最终会包含超类型对象的全部实例属性，但我们还是得在调用子类型构造函数时重写这些属性。而寄生组合式继承，则是通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结构指定给子类型的原型<pre>function inheritPrototype(subType,superType){<br> var prototype=Object(superType,prototype);//创建对象<br> prototype.constructor=subType;//增强对象<br> subType.prototype=prototype;//指定对象<br>}</pre>然后再去使用这个函数',
        'conSub':[]
      }],
      'extra_content':[]
    }]
  }],
  'sum': [{
    'content': 'ECMAScript支持面向对象编程，但不使用类或者接口。对象可以在代码执行过程中创建和增强，因此具有动态性而非严格定义的尸体。在没有类的情况下，可以采用下列模式创建对象',
    'conSub': [{
      'name': '工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来被构造函数模式所取代'
    },{
      'name':'构造函数模式，可以创建自定义引用类型，可以向创建内置对象实例一样使用new操作符。不过，构造函数模式也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数，'
    },{
      'name':'原型模式，使用构造函数的prototype属性来指定那些应该共享的属性和方法。组合使用构造函数模式和原型模式时，使用构造函数定义实例属性，而使用原型定义共享的属性和方法。'
    }]
  }, {
    'content': 'JavaScript主要通过原型链实现继承。原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与基于类的继承很相似。原型链的问题是对象实例共享所有继承的属性和方法，因此不适宜单独使用。解决这个问题的技术是借用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都有自己的属性，同时还能保证只使用构造函数模式来定义类型。使用最多的继承模式是组合继承，这种模式使用原型链继承共享的属性和方法，而通过借用构造函数继承实例属性。',
    'conSub': []
  }, {
    'content': '还存在下列可供选择的继承模式',
    'conSub': [{
      'name': '原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以继续进一步改造。'
    }, {
      'name': '寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率，可以将这个模式与组合继承一起使用'
    }, {
      'name': '寄生组合式继承，集寄生式继承和组合继承的优点于一身，是实现基于引用类型的最有效方式。'
    }]
  }]
}

/*'name':'',
    'content':[],
    'extra_content': [],
    'subStr':[]*/
