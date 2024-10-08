# 知识点汇总

- [知识点汇总](#知识点汇总)
  - [js的基本类型](#js的基本类型)
  - [js的引用类型](#js的引用类型)
  - [类型存放](#类型存放)
    - [栈数据结构(stack)](#栈数据结构stack)
    - [堆数据结构(heap)](#堆数据结构heap)
    - [队列(queue)](#队列queue)
  - [Null和undefined的区别](#null和undefined的区别)
  - [如何判断一个变量是Array类型 ? 如何判断一个变量是Number类型 ？](#如何判断一个变量是array类型--如何判断一个变量是number类型-)
    - [判断对象是否为空](#判断对象是否为空)
    - [toString方法详解](#tostring方法详解)
  - [dom api](#dom-api)
  - [attribute和property的区别](#attribute和property的区别)
  - [事件](#事件)
  - [闭包](#闭包)
    - [什么是闭包](#什么是闭包)
    - [为什么需要闭包呢](#为什么需要闭包呢)
    - [特点](#特点)
  - [箭头函数与普通函数的区别](#箭头函数与普通函数的区别)
  - [javaScript函数参数传值的方式](#javascript函数参数传值的方式)
  - [http协议](#http协议)
  - [特点](#特点-1)
  - [无状态协议：](#无状态协议)
  - [工作流程](#工作流程)
  - [https](#https)
  - [javaScript的全局函数](#javascript的全局函数)
  - [uri(Uniform Rescource Identifiers)编码](#uriuniform-rescource-identifiers编码)
  - [eval()](#eval)
  - [Global的所有属性](#global的所有属性)
  - [Math](#math)
  - [Window](#window)
  - [惰性载入函数](#惰性载入函数)
  - [在函数被调用时再处理函数](#在函数被调用时再处理函数)
  - [在声明函数时就指定适当的函数](#在声明函数时就指定适当的函数)
  - [for in 与 for of 区别](#for-in-与-for-of-区别)
  - [call，apply，bind](#callapplybind)
    - [手动实现一个bind](#手动实现一个bind)
    - [手动实现一个call和apply](#手动实现一个call和apply)
  - [undefined和void 0](#undefined和void-0)
  - [原型及原型链](#原型及原型链)
    - [显示原型和隐式原型](#显示原型和隐式原型)
    - [字面量原型及原型链](#字面量原型及原型链)
    - [构造函数原型及原型链](#构造函数原型及原型链)
    - [总结](#总结)
  - [创建对象的多种方式](#创建对象的多种方式)
    - [对象字面量](#对象字面量)
    - [通过工厂函数创建相同类型的对象](#通过工厂函数创建相同类型的对象)
    - [object.create()创建对象](#objectcreate创建对象)
  - [实现继承的多种方式和优缺点](#实现继承的多种方式和优缺点)
    - [借用构造函数继承](#借用构造函数继承)
    - [原型链式继承（借用原型链实现继承）](#原型链式继承借用原型链实现继承)
    - [组合式继承](#组合式继承)
    - [组合式继承优化](#组合式继承优化)
    - [寄生式继承](#寄生式继承)
    - [ES6中继承](#es6中继承)
  - [new 一个对象具体做了什么](#new-一个对象具体做了什么)
  - [XMLHttpRequest-模拟一个ajax](#xmlhttprequest-模拟一个ajax)
  - [匿名函数](#匿名函数)
  - [JS的宿主对象和原生对象](#js的宿主对象和原生对象)
  - [document load和document DOMContentLoaded两个事件的区别](#document-load和document-domcontentloaded两个事件的区别)
  - [js的重载和多态](#js的重载和多态)
  - [dom0级和dom2级](#dom0级和dom2级)
  - [给定一个元素获取它相对于视图窗口的坐标](#给定一个元素获取它相对于视图窗口的坐标)
  - [图片懒加载](#图片懒加载)
    - [呈现形式](#呈现形式)
  - [字符串的类型有哪些方法](#字符串的类型有哪些方法)
  - [js的正则表达式](#js的正则表达式)
  - [深拷贝](#深拷贝)
  - [通用的事件监听](#通用的事件监听)
  - [web端cookie的设置和获取](#web端cookie的设置和获取)
  - [promise和setTimeout执行顺序的疑惑](#promise和settimeout执行顺序的疑惑)
    - [promise](#promise)
  - [JavaScript 的事件流模型都有什么 ???](#javascript-的事件流模型都有什么-)
  - [navigator对象](#navigator对象)
  - [location对象](#location对象)
  - [history对象](#history对象)
  - [js的垃圾回收机制](#js的垃圾回收机制)
  - [js的内存泄漏](#js的内存泄漏)
  - [DOM事件中target和currentTarget的区别](#dom事件中target和currenttarget的区别)
  - [typeof 和 instanceof 区别](#typeof-和-instanceof-区别)
  - [instanceof原理](#instanceof原理)
  - [js动画和css动画的区别](#js动画和css动画的区别)
  - [js处理异常](#js处理异常)
  - [js设计模式](#js设计模式)
  - [js实现轮播](#js实现轮播)
  - [websocket的工作原理和机制](#websocket的工作原理和机制)
  - [手指点击可以触控的屏幕时，是什么事件](#手指点击可以触控的屏幕时是什么事件)
  - [什么是函数柯里化](#什么是函数柯里化)
    - [实现一个add方法，使计算结果能够满足如下预期：](#实现一个add方法使计算结果能够满足如下预期)
  - [利用call/apply封数组的map方法](#利用callapply封数组的map方法)
  - [JS代码调试](#js代码调试)
  - [函数上下文](#函数上下文)
    - [作用域](#作用域)
    - [作用域链](#作用域链)
      - [和原型继承查找时的区别](#和原型继承查找时的区别)
    - [再次理解闭包](#再次理解闭包)
    - [变量对象和活动对象](#变量对象和活动对象)
    - [this绑定规则](#this绑定规则)
      - [调用位置](#调用位置)
      - [默认绑定](#默认绑定)
      - [隐式绑定](#隐式绑定)
      - [显式绑定](#显式绑定)
      - [new绑定](#new绑定)
        - [new实现](#new实现)
      - [优先级](#优先级)
      - [绑定例外](#绑定例外)
        - [被忽略的this](#被忽略的this)
    - [将类数组对象转换为数组](#将类数组对象转换为数组)
  - [js-微前端实现沙箱的机制](#js-微前端实现沙箱的机制)
    - [iframe实现沙箱机制](#iframe实现沙箱机制)
    - [基于diff方式实现沙箱](#基于diff方式实现沙箱)
    - [基于proxy实现单实例沙箱](#基于proxy实现单实例沙箱)
    - [基于proxy实现的多实例沙箱](#基于proxy实现的多实例沙箱)
  - [TypeScript](#typescript)
    - [TypeScript中的interface 与 type 有何异同](#typescript中的interface-与-type-有何异同)
      - [相同点](#相同点)
      - [不同点](#不同点)
      - [总结](#总结-1)
  - [React的setState的更新模式](#react的setstate的更新模式)
  - [React Hook 和 Vue Hook 对比](#react-hook-和-vue-hook-对比)
  - [Vue2.0和Vue3.0的差异](#vue20和vue30的差异)
  - [amd，cmd，es6 module之间的区别](#amdcmdes6-module之间的区别)
    - [AMD](#amd)
    - [RequireJS的特点](#requirejs的特点)
    - [CMD](#cmd)
    - [CommonJS](#commonjs)
    - [ES6 Module](#es6-module)
    - [export default 与 export的区别](#export-default-与-export的区别)
  - [尾语](#尾语)

## js的基本类型

Number,String,Boolean,Null,undefined。

## js的引用类型

Object,function

## 类型存放

基本类型的数据是存放在栈内存中的，而引用类型的数据是存放在堆内存中的

### 栈数据结构(stack)

先进后出，后进先出

### 堆数据结构(heap)

堆数据结构是一种树状结构。它的存取数据的方式，则与书架与书非常相似。

### 队列(queue)

队列是一种先进先出（FIFO）的数据结构。

## Null和undefined的区别

null表示"没有对象"，即该处不应该有值。典型用法是：

* 作为函数的参数，表示该函数的参数不是对象。
* 作为对象原型链的终点。

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

* 变量被声明了，但没有赋值时，就等于undefined。
* 调用函数时，应该提供的参数没有提供，该参数等于undefined。
* 对象没有赋值的属性，该属性的值为undefined。
* 函数没有返回值时，默认返回undefined。

## 如何判断一个变量是Array类型 ? 如何判断一个变量是Number类型 ？

typeof:null、对象、数组返回的都是object类型；对于函数类型返回的则是function，再比如typeof(Date)，typeof(eval)等。

instanceof:

```
var a=[];
console.log(a instanceof Array) //返回true
```

使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false；

特性判断法:
以上方法均有一定的缺陷，但要相信人民大众的智慧是无所不能及的，我们可根据数组的一些特性来判断其类型

```
function isArray(object){
 return object && typeof object==='object' && 
   typeof object.length==='number' && 
   typeof object.splice==='function' && 
    //判断length属性是否是可枚举的 对于数组 将得到false 
   !(object.propertyIsEnumerable('length'));
}
```

有length和splice并不一定是数组，因为可以为对象添加属性，而不能枚举length属性，才是最重要的判断因子。

原型对象上有toString,转码成相应的类型
```
function isArray(o) {
 return Object.prototype.toString.call(o) === ‘[object Array]‘;
}
```

类数组，即拥有 length 属性并且 length 属性值为 Number 类型的元素
包括数组、arguments、HTML Collection 以及 NodeList 等等

### 判断对象是否为空

是否是 {}、[] 或者 "" 或者 null、undefined

### toString方法详解

当调用toString方法时，下列步骤会被执行：

    如果this未定义时，返回“[object Undefined]”

         如果this为null时，返回“[object Null]”

    定义O，并且让O=ToObject(this)

    定义class，并且使class为O内置属性[[class]]的值

    返回三个字符串的拼接字符:"[object",class,"]"

通过官方解释，可以清晰的得出toString()是在以特殊的字符串形式输出this的类型

## dom api

创建型api主要包括createElement，createTextNode，cloneNode和createDocumentFragment

修改页面内容的api主要包括：appendChild，insertBefore，removeChild，replaceChild

节点查询型API:document.getElementById;document.getElementByTagName; document.getElementsByName;document.getElementsByClassName;document.querySelector和document.querySelectorAll

节点关系型api:

* 父关系型parentNode,parentElement
* 兄弟关系型previousSibling,previousElementSibling,nextSibling,nextElementSibling
* 子关系型childNodes,children,firstNode,lastNode,hasChildNodes
* 元素属性型setAttribute,getAttribute
* 元素样式型window.getComputedStyle:`var style = window.getComputedStyle(element[, pseudoElt]);`element是要获取的元素，pseudoElt指定一个伪元素进行匹配。返回的style是一个CSSStyleDeclaration对象。通过style可以访问到元素计算后的样式;element.getBoundingClientRect:返回元素的大小以及相对于浏览器可视窗口的位置

## attribute和property的区别

DOM 元素中的 attribute 与 property 并不相同。attribute 通常翻译为“特性”，property 通常翻译为“属性”。其实它们是近义词，并不能根据特性、属性这两个词汇来区分 attribute 与 property。

特性：某事物所特有的性质；特殊的品性、品质。
属性：事物所具有的不可缺少的性质。
所以，attribute 与 property 都可以叫“特性”，也都可以叫“属性”。

从 HTML 到 DOM 元素，一种是声明式的语言，一种是命令式语言。attribute 是直接收集 HTML 中的属性转为 js 对象，对象的 value 最接近原生态，也就是 HTML 标记里面的样子；
property 也是转为 js 对象，但是转化的过程中会对 value 做一些处理，将 value 转为对 js 来说更有意义的值。

## 事件

<a href="http://www.cnblogs.com/leomYili/p/6051527.html">事件博客</a>

## 闭包

### 什么是闭包

简单来说，闭包是指可以访问另一个函数作用域变量的函数，一般是定义在外层函数中的内层函数。

### 为什么需要闭包呢

局部变量无法共享和长久的保存，而全局变量可能造成变量污染，所以我们希望有一种机制既可以长久的保存变量又不会造成全局污染。

### 特点

* 占用更多内存
* 不容易被释放

## 箭头函数与普通函数的区别

1、没有自己的this、super、arguments和new.target绑定。
2、不能使用new来调用。
3、没有原型对象。
4、不可以改变this的绑定。
5、形参名称不能重复。
箭头函数中没有this绑定，必须通过查找作用域链来决定其值。
如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this，否则this的值则被设置为全局对象。

## javaScript函数参数传值的方式

我们都知道,JavaScript的变量包括基本类型和引用类型,5种基本数据类型:

* Undefined
* Null
* Boolean
* Number
* String

一般来说,引用类型的值是保存在内存中的对象.而JavaScript不允许直接访问内存中的位置,所以,操作对象时,实际上操作的是对象的引用而不是实际的对象,因此,如果使用下面的案例:

```
var obj1 = new Object();
var obj2 = obj1;

obj1.name = "test";
alert(obj2.name);// test
```

就是因为引用类型的值在使用时,实际上起到的是指针的作用,最终都会指到同一个地址上,所以,值会出现同步的情况.
不过可以通过下面的一个小例子<a href="http://sandbox.runjs.cn/show/njluuc3o">函数复制</a>
,说明了对象中的基本类型不受引用类型的影响,可以查看之前对于<a href="http://www.cnblogs.com/leomYili/p/6019502.html">jquery和zepto的扩展方法extend</a>的解析来更好的了解值复制的内容.

而传递参数时,都是按值传递的.
我们知道,函数中的参数,传递时,实际上会当做arguments对象中的一个元素.
![1](img/note1.png)

```
var obj = {};
function func1(obj){
    obj.name = "test"
}
func1(obj);
console.log(obj.name); // test
```

而如果

```
function func1(obj){
    obj = {
        name:"test"
    }
}
```

则obj.name就为`Undefined`了,是因为这里的传参,对于引用类型来说,实际上传参时,传递的是存储空间的地址的副本,如果修改了该副本的指向,那么局部的变量自然就不会影响外部的变量了.

## http协议

首先复习下OSI七层协议,从上到下:

7. 应用层,http,ftp
6. 表示层,数据加密和定义
5. 会话层,维持数据的传输,或者就是数据体
4. 传输层,tcp
3. 网络层,常见设备,路由器,ip
2. 数据链路层,又称网络接口层,最常见设备,网卡
1. 物理层:物理层为设备之间的数据通信提供传输媒体及互连设备，为数据传输提供可靠的环境。物理设备

而http作为应用层中的其中一种协议，即超文本传输协议(Hypertext transfer protocol)。是一种详细规定了浏览器和万维网(WWW = World Wide Web)服务器之间互相通信的规则，通过因特网传送万维网文档的数据传送协议。
HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。

在Internet中所有的传输都是通过TCP/IP进行的。HTTP协议作为TCP/IP模型中应用层的协议也不例外。HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。

http默认的端口号为80,https默认的端口号为443

## 特点

HTTP协议永远都是客户端发起请求，服务器回送响应。这样就限制了使用HTTP协议，无法实现在客户端没有发起请求的时候，服务器将消息推送给客户端。

## 无状态协议：

协议的状态是指下一次传输可以“记住”这次传输信息的能力。
http是不会为了下一次连接而维护这次连接所传输的信息,为了保证服务器内存。
比如客户获得一张网页之后关闭浏览器，然后再一次启动浏览器，再登陆该网站，但是服务器并不知道客户关闭了一次浏览器。

HTTP是一个无状态的面向连接的协议，无状态不代表HTTP不能保持TCP连接
从HTTP/1.1起，默认都开启了Keep-Alive，保持连接特性，简单地说，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。
Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。

解决无状态协议:通过cookie,通过session

Cookie和Session有以下明显的不同点：
1）Cookie将状态保存在客户端，Session将状态保存在服务器端；
2）Cookies是服务器在本地机器上存储的小段文本并随每一个请求发送至同一个服务器。Cookie最早在RFC2109中实现，后续RFC2965做了增强。网络服务器用HTTP头向客户端发送cookies，在客户终端，浏览器解析这些cookies并将它们保存为一个本地文件，它会自动将同一服务器的任何请求缚上这些cookies。Session并没有在HTTP的协议中定义；
3）Session是针对每一个用户的，变量的值保存在服务器上，用一个sessionID来区分是哪个用户session变量,这个值是通过用户的浏览器在访问的时候返回给服务器，当客户禁用cookie时，这个值也可能设置为由get来返回给服务器；
4）就安全性来说：当你访问一个使用session 的站点，同时在自己机子上建立一个cookie，建议在服务器端的SESSION机制更安全些。因为它不会任意读取客户存储的信息。

## 工作流程
一次HTTP操作称为一个事务，其工作过程可分为四步：
1）首先客户机与服务器需要建立连接。只要单击某个超级链接，HTTP的工作开始。
2）建立连接后，客户机发送一个请求给服务器，请求方式的格式为：统一资源标识符（URL）、协议版本号，后边是MIME信息包括请求修饰符、客户机信息和可能的内容。
3）服务器接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括服务器信息、实体信息和可能的内容。
4）客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接。
如果在以上过程中的某一步出现错误，那么产生错误的信息将返回到客户端，有显示屏输出。对于用户来说，这些过程是由HTTP自己完成的，用户只要用鼠标点击，等待信息显示就可以了。

## https

简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL.

## javaScript的全局函数

通常意义上来说,全局对象在JavaScript中,属于不存在的对象:所有在全局作用域中定义的属性和方法,最终都是Global对象的属性;

## uri(Uniform Rescource Identifiers)编码

有encodeURI(),encodeURIComponent()方法对于URI进行编码,它们用特殊的UTF-8编码替换所有无效的字符,从而让浏览器能够接受和理解.

* encodeURI()不会对本身属于URI的特殊字符进行编码,例如冒号,正斜杠,问号和井字号进行编码.
* encodeURIComponent()则对整个url进行编码,任何非标准字符都会产生新的符号.

与之相对的是decodeURI()和decodeURIComponent()

## eval()

用来解析传入的JavaScript字符串,相当于一个解析器,可以用来代码注入.

## Global的所有属性

<table><thead><tr><td>属性</td><td>说明</td><td>属性</td><td>说明</td></tr></thead><tbody><tr><td>undefined</td><td>特殊值undefined</td><td>Date</td><td>构造函数Date</td></tr><tr><td>NaN</td><td>特殊值NaN</td><td>RegExp</td><td>构造函数RegExp</td></tr><tr><td>Infinity</td><td>特殊值Infinity</td><td>Error</td><td>构造函数Error</td></tr><tr><td>Object</td><td>构造函数Object</td><td>EvalError</td><td>构造函数EvalError</td></tr><tr><td>Array</td><td>构造函数Array</td><td>RangeError</td><td>构造函数RangeError</td></tr><tr><td>Function</td><td>构造函数Function</td><td>ReferenceError</td><td>构造函数ReferenceError</td></tr><tr><td>Boolean</td><td>构造函数Boolean</td><td>SyntaxError</td><td>构造函数SyntaxError</td></tr><tr><td>String</td><td>构造函数String</td><td>TypeError</td><td>构造函数TypeError</td></tr><tr><td>Number</td><td>构造函数Number</td><td>URIError</td><td>构造函数URIError</td></tr></tbody></table>

## Math

还包括一个公共对象Math,用来存放数学公式和信息.

## Window

因为Global都是被当做window对象的一部分加以实现的,所以,在全局作用域中声明的所有变量和函数,就都成为了window对象的属性.

## 惰性载入函数

针对于每一次载入页面时,可能存在的大量嵌套或者重复判断,并且该函数使用次数不高,使用惰性载入方法,避免内存的不必要消耗.

## 在函数被调用时再处理函数

```
function demo(){
    if(typeof str != undefined){
        if(typeof str == "string"){
            demo = function(){
                return 1;
            }
        }else if(typeof str == "num"){
            demo = function(){
                return 2;
            }
        }
    }else {
        demo = function(){
            throw new Error("没有参数");
        }
    };
    return demo;
}
```

这样,只要该函数,通过判断之后,下次再使用该函数,就直接不用再通过判断了.

## 在声明函数时就指定适当的函数

其实相当于,在开始加载代码时,就自执行一遍函数,直接赋值给函数,实际上,创建个匿名自执行函数就好了.

```
var demo = (function(){
    return function(){};
})();
```

## for in 与 for of 区别

简单总结就是，for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for-in总是得到对象的key或数组、字符串的下标。

for-of总是得到对象的value或数组、字符串的值，另外还可以用于遍历Map和Set。

## call，apply，bind

唯一区别是apply接受的是数组参数，call接受的是连续参数。
bind是以call的形式传参的，但是bind与call、apply最大的区别就是bind绑定this指向并传参后仍然为一个函数，并没有去调用，而call与apply是直接调用函数
不要忽略其最基本的调用函数的作用

### 手动实现一个bind

```()
// 第三版 实现new调用
Function.prototype.bindFn = function bind(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function');
    }
    // 存储调用bind的函数本身
    var self = this;
    // 去除thisArg的其他参数 转成数组
    var args = [].slice.call(arguments, 1);
    var bound = function(){
        // bind返回的函数 的参数转成数组
        var boundArgs = [].slice.call(arguments);
        var finalArgs = args.concat(boundArgs);
        // new 调用时，其实this instanceof bound判断也不是很准确。es6 new.target就是解决这一问题的。
        if(this instanceof bound){
            // 这里是实现上文描述的 new 的第 1, 2, 4 步
            // 1.创建一个全新的对象
            // 2.并且执行[[Prototype]]链接
            // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
            // self可能是ES6的箭头函数，没有prototype，所以就没必要再指向做prototype操作。
            if(self.prototype){
                // ES5 提供的方案 Object.create()
                // bound.prototype = Object.create(self.prototype);
                // 但 既然是模拟ES5的bind，那浏览器也基本没有实现Object.create()
                // 所以采用 MDN ployfill方案 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
                function Empty(){}
                Empty.prototype = self.prototype;
                bound.prototype = new Empty();
            }
            // 这里是实现上文描述的 new 的第 3 步
            // 3.生成的新对象会绑定到函数调用的`this`。
            var result = self.apply(this, finalArgs);
            // 这里是实现上文描述的 new 的第 5 步
            // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，
            // 那么`new`表达式中的函数调用会自动返回这个新的对象。
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result;
            }
            return this;
        }
        else{
            // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
            return self.apply(thisArg, finalArgs);
        }
    };
    return bound;
}
```

### 手动实现一个call和apply

```()
// 最终版版 删除注释版，详细注释看文章
// 浏览器环境 非严格模式
function getGlobalObject(){
    return this;
}
function generateFunctionCode(argsArrayLength){
    var code = 'return arguments[0][arguments[1]](';
    for(var i = 0; i < argsArrayLength; i++){
        if(i > 0){
            code += ',';
        }
        code += 'arguments[2][' + i + ']';
    }
    code += ')';
    return code;
}
Function.prototype.applyFn = function apply(thisArg, argsArray){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }
    if(typeof argsArray === 'undefined' || argsArray === null){
        argsArray = [];
    }
    if(argsArray !== new Object(argsArray)){
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    if(typeof thisArg === 'undefined' || thisArg === null){
        thisArg = getGlobalObject();
    }
    thisArg = new Object(thisArg);
    var __fn = '__' + new Date().getTime();
    var originalVal = thisArg[__fn];
    var hasOriginalVal = thisArg.hasOwnProperty(__fn);
    thisArg[__fn] = this;
    var code = generateFunctionCode(argsArray.length);
    var result = (new Function(code))(thisArg, __fn, argsArray);
    delete thisArg[__fn];
    if(hasOriginalVal){
        thisArg[__fn] = originalVal;
    }
    return result;
};
Function.prototype.callFn = function call(thisArg){
    var argsArray = [];
    var argumentsLength = arguments.length;
    for(var i = 0; i < argumentsLength - 1; i++){
        argsArray[i] = arguments[i + 1];
    }
    return this.applyFn(thisArg, argsArray);
}
```

## undefined和void 0

js里所有的void + 表达式,都会返回undefined,而undefined是可以被当成对象来重写的.所以使用void + 表达式就可以避免这个问题

## 原型及原型链

### 显示原型和隐式原型

显示原型是`__proto__`:
每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。
通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性。

隐式原型是prototype:
JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过`__proto__`来访问。ES5中有了对于这个内置属性标准的Get方法`Object.getPrototypeOf()`.
Object.prototype 这个对象是个例外，它的`__proto__`值为null

### 字面量原型及原型链

JS 可通过字面量构造对象。为了实现继承，对象里面有个`__proto__`属性可以指向该对象的父对象。这个父对象就是所谓的“原型”。

### 构造函数原型及原型链

但是为了迁就 C++、Java、C# 程序员，让 JavaScript 可以像 Java 那样 new （构造）出一个对象出来，于是这里做了一个变通，也提供了构造函数。

但是这里面存在两个问题：在对象里面定义方法，这样每创建一个对象都会一个sayHello()函数，这样来说显得对象臃肿，浪费资源；同时每个对象各自保有自己的属性和函数的副本，无法做到属性和方法共享。因此，这里有一个更加高效的办法就是把对象共享的属性和方法可以放到 Student.prototype 这个对象当中
我们应该还知道上面的构造函数Student()对象（JS 中函数也是对象）会创建一个 prototype 对象（Student.prototype），而 new 出来的实例对象例如 andy 和 lisa 是没有这个 prototype 对象，但是他会有个 proto 属性（`__proto__`）指向这个构造函数对象的 prototype 对象，从而构成原型链。实例对象其实是通过原型对象与构造函数取得联系的

### 总结

JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做 ``_proto__` 的内置属性，用于指向创建它的函数对象的原型对象 prototype
原型和原型链是 JS 实现继承的一种模型
原型链是靠 proto 形成的，而不是 prototype
所有的原型对象都有 constructor 属性，该属性对应创建所有指向该原型的实例构造函数
函数对象和原型对象通过 prototype 和 constructor 属性进行相互关联

## 创建对象的多种方式

### 对象字面量

```
var o = {};
```

### 通过工厂函数创建相同类型的对象

```
function thing() {
  return {
    x: 42,
    y: 3.14,
    f: function() {},
    g: function() {}
  };
}

var o = thing();
```

### object.create()创建对象

## 实现继承的多种方式和优缺点

### 借用构造函数继承

```
function Parent0(){
    this.name = "parent0";
    this.colors = ["red","blue","yellow"];
}
function Child0(){
    Parent0.call( this ); // 或apply
    this.type = "child0";
}
```

但是通过这种方式，父类原型上的东西是没法继承的
缺点：Child1无法继承Parent1的原型对象，并没有真正的实现继承（部分继承）

### 原型链式继承（借用原型链实现继承）

```
function Parent1(){
    this.name = "parent1";
    this.colors = ["red","blue","yellow"];
}
function Child1(){
    this.name = "child1";
}
Child1.prototype = new Parent1();
```

但是，这种方式仍有缺点,原型链上中的原型对象是共用的

### 组合式继承

```
function Parent2(){
    this.name = "parent2";
    this.colors = ["red","blue","yellow"];
}
function Child2(){
    Parent2.call(this);
    this.type = "child2";
}
Child2.prototype = new Parent2()
```

但这种方式仍有缺点。父类的构造函数被执行了两次，第一次是`Child2.prototype = new Parent2()`，第二次是在实例化的时候，这是没有必要的。

### 组合式继承优化

```
function Parent4(){
    this.name = "parent4";
    this.colors = ["red","blue","yellow"];
}
Parent4.prototype.sex = "男";
Parent4.prototype.say = function(){console.log("Oh, My God！")}
function Child4(){
    Parent4.call(this);
    this.type = "child4";
}
Child4.prototype = Object.create(Parent4.prototype)；
Child4.prototype.constructor = Child4;
```

### 寄生式继承

function _inherits(Child, Parent){
    // Object.create
    Child.prototype = Object.create(Parent.prototype);
    // __proto__
    // Child.prototype.__proto__ = Parent.prototype;
    Child.prototype.constructor = Child;
    // ES6
    // Object.setPrototypeOf(Child, Parent);
    // __proto__
    Child.__proto__ = Parent;
}

### ES6中继承

Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```
class Parent {
}
class Child1 extends Parent {
    constructor(x, y, colors) {
         super(x, y); // 调用父类的constructor(x, y)
         this.colors = colors;
    }
    toString() {
         return this.colors + ' ' + super.toString(); // 调用父类的toString()
    }
}
```

## new 一个对象具体做了什么

```
var cat = new Animal("cat");
```

```
var obj = {};
var args = Array.prototype.slice.call(arguments,1);
 obj.__proto__ = Animal.prototype;
 obj.__proto__.constructor = Animal;
 var result = Animal.apply(obj,args);
 return typeof result === 'obj'? result : obj;
```

（1）创建一个空对象obj;
（2）把obj的__proto__ 指向Animal的原型对象prototype，此时便建立了obj对象的原型链：obj->Animal.prototype->Object.prototype->null;
（3）在obj对象的执行空间调用Animal函数并传递参数“cat”。 相当于var result = obj.Animal("cat")。
       当这句执行完之后，obj便产生了属性name并赋值为"cat"。【关于JS中call的用法请阅读：JS的call和apply】
（4）考察第3步返回的返回值，如果无返回值或者返回一个非对象值，则将obj返回作为新对象；否则会将返回值作为新对象返回。

## XMLHttpRequest-模拟一个ajax

<a href="">ajax原生对象</a>

```
function ajax(options){
    var default = {
        "type": "GET",
        "dataType": "string",
        "data":{},
        "url": '',
        "headers": {},
        "async": true,
        "success":function(){},
        "error":function(){}
    };

    this.opts = extend(true,default,options);

    if(_this.opts.dataType == "jsonp"){
        ajaxJSONP(opts);
    }

    var xhr = new XMLHttpRequest();

    // 举例
    if(options.type == 'GET'){
        xhr.open('GET',options.url + '?' + params,true)
        xhr.setRequestHeader(this.opts.headers)
        xhr.send(null)
    }else if(options.type == 'POST'){
        xhr.open('POST',options.url,true)
        xhr.setRequestHeader(this.opts.headers)
        xhr.send(params)
    }

    xhr.onreadystatechange=function(e){
        if(xhr.readystate === 4){
            if(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                success.call(this,e.response);
            }else{
                error.call(this,e.response);
            }
        }
    };
}

//模拟form表单提交:

xhr.open("post","example.json",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send("key=0&key1=1}");
```

## 匿名函数

```
(function(){})();
```

## JS的宿主对象和原生对象

所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象.非内置对象,即为宿主对象.

ECMA-262 只定义了两个内置对象，即 Global 和 Math

## document load和document DOMContentLoaded两个事件的区别

他们的区别是，触发的时机不一样，先触发DOMContentLoaded事件，后触发load事件。

DOM文档加载的步骤为

* 解析HTML结构。
* 加载外部脚本和样式表文件。
* 解析并执行脚本代码。
* DOM树构建完成。//DOMContentLoaded
* 加载图片等外部文件。
* 页面加载完毕。//load

在第4步，会触发DOMContentLoaded事件。在第6步，触发load事件。

## js的重载和多态

多态: 同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。
重载: 一组具有相同名字、不同参数列表的函数（方法）。

## dom0级和dom2级

dom0级事件:
实际上，DOM0级标准是不存在的，所谓的DOM0级是DOM历史坐标中的一个参照点而已，具体说呢，DOM0级指的是IE4和Netscape 4.0这些浏览器最初支持的DHTML..大概2000年的时候争论过DOM0的问题，最后结论大概是，没有官方形成此标准.。

DOM1级（DOM Level 1）于1998年10月成为W3C的推荐标准。DOM1级由两个模块组成：DOM核心（DOM Core）和DOM HTML。其中，DOM核心规定的是如何映射基于XML的文档结构，以便简化对文档中任意部分的访问和操作。DOM HTML模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法。

dom2级:
新增了更多的节点操作以及交互模块

DOM3级则进一步扩展了DOM，引入了以统一方式加载和保存文档的方法–在DOM加载和保存（DOM Load and Save）模块中定义；新增了验证文档的方法–在DOM验证（DOM Validation）模块中定义。DOM3级也对DOM核心进行了扩展，开始支持XML 1.0规范，涉及XML Infoset、XPath和XML Base。

## 给定一个元素获取它相对于视图窗口的坐标

element.getBoundingClientRect():返回元素的大小以及相对于浏览器可视窗口的位置

或者通过offsetWidth;offsetHeight;一层层向上计算与浏览器窗口的偏移值.

## 图片懒加载

将页面里所有img属性src属性用data-xx代替，当页面滚动直至此图片出现在可视区域时，用js取到该图片的data-xx的值赋给src。

### 呈现形式

【1】延时加载，使用setTimeout或setInterval进行加载延迟，如果用户在加载前就离开，自然就不会进行加载。
【2】条件加载，符合某些条件或者触发了某些条件才开始异步加载。
【3】可视区域加载，仅仅加载用户可以看到的区域，这个主要监控滚动条来实现，一般距离用户看到的底边很近的时候开始加载，这样能保证用户下拉时图片正好接上，不会有太长时间的停顿。

```
window.onscroll = function(){
    loadImg(aImages);
};
function loadImg(arr){
    for( var i = 0,len = arr.length; i < len; i++){
        if(arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad){
            arr[i].isLoad = true;
            arr[i].style.cssText = "transition: ''; opacity: 0;"
            if(arr[i].dataset){
                aftLoadImg(arr[i],arr[i].dataset.original);    
            }else{
                aftLoadImg(arr[i],arr[i].getAttribute("data-original"));
            }
            (function(i){
                setTimeout(function(){
                    arr[i].style.cssText = "transition: 1s; opacity: 1;"
                },16)
            })(i);
        }
    }
}
```

## 字符串的类型有哪些方法

* charCodeAt方法返回一个整数，代表指定位置字符的Unicode编码。
* fromCharCode方法从一些Unicode字符串中返回一个字符串。
* slice方法返回字符串的片段(start,[end])
* substring方法返回位于String对象中指定位置的子字符串.
* substr方法返回一个从指定位置开始的指定长度的子字符串
* indexOf方法放回String对象内第一次出现子字符串位置。如果没有找到子字符串，则返回-1
* 将一个字符串分割为子字符串，然后将结果作为字符串数组返回,split

## js的正则表达式

```
var reg=/hello/    或者  var reg=new RegExp("hello")
```

## 深拷贝

<a href="http://www.cnblogs.com/leomYili/p/6019502.html">extend</a>

## 通用的事件监听

```
var EventUtil = {
    addHandler: function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        } else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        } else {
            element["on"+type] = handler;
        }
    },
    removeHandler: function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else {
            element["on"+type] = null
        }
    }
}
```

## web端cookie的设置和获取

获取:document.cookie

设置:document.cookie="name="+username;

删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可，如下所示，设置为 Thu, 01 Jan 1970 00:00:00 GMT:
`document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"`;

## promise和setTimeout执行顺序的疑惑

从规范上来讲，setTimeout有一个4ms的最短时间，也就是说不管你设定多少，反正最少都要间隔4ms才运行里面的回调（当然，浏览器有没有遵守这个规范是另外一回事儿）。而Promise的异步没有这个问题。

从具体实现上来说，这俩的异步队列不一样，Promise所在的那个异步队列优先级要高一些。

```
(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})()

//1,2,3,5,4
```

Promise.then 是异步执行的，而创建Promise实例（ executor ）是同步执行的。
setTimeout 的异步和 Promise.then 的异步看起来 “不太一样” ——至少是不在同一个队列中。

### promise

简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

## JavaScript 的事件流模型都有什么 ???

DOM0级模型:又称为原始事件模型，在该模型中，事件不会传播，即没有事件流的概念。

```
<input type="button" onclick="fun()">

var btn = document.getElementById('.btn');
btn.onclick = fun;
```

IE事件模型:

* 事件处理阶段(target phase)。事件到达目标元素, 触发目标元素的监听函数。
* 事件冒泡阶段(bubbling phase)。事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

DOM2级模型:属于W3C标准模型，现代浏览器(除IE6-8之外的浏览器)都支持该模型。在该事件模型中，一次事件共有三个过程:

* 事件捕获阶段(capturing phase)。事件从document一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。
* 事件处理阶段(target phase)。事件到达目标元素, 触发目标元素的监听函数。
* 事件冒泡阶段(bubbling phase)。事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

## navigator对象

存储了关于浏览器的相关信息

属性 | 说明
---|---
appCodeName | 返回浏览器的代码名
appName | 返回浏览器的名称
appVersion | 返回浏览器的平台和版本信息
cookieEnabled | 返回指明浏览器中是否启用 cookie 的布尔值
platform | 返回运行浏览器的操作系统平台
userAgent | 返回由客户机发送服务器的user-agent 头部的值

等相关信息

## location对象

提供了与当前窗口中加载的文档有关的信息,还提供了导航的功能,location既是window对象的属性,又是document对象的属性,而且location还将URL解析成了独立的片段,从而直接使用.

属性 | 描述
---|---
hash | 设置或返回从井号 (#) 开始的 URL（锚）。
host | 设置或返回主机名和当前 URL 的端口号。
hostname | 设置或返回当前 URL 的主机名。
href | 设置或返回完整的 URL。
pathname | 设置或返回当前 URL 的路径部分。
port | 设置或返回当前 URL 的端口号。
protocol | 设置或返回当前 URL 的协议。
search | 设置或返回从问号 (?) 开始的 URL（查询部分）。

## history对象

保存着历史记录

方法(属性) | 描述
---|---
length | 返回浏览器历史列表中的 URL 数量。
back() | 加载 history 列表中的前一个 URL。
forward() | 加载 history 列表中的下一个 URL。
go() | 加载 history 列表中的某个具体页面。

## js的垃圾回收机制

主要方法有标记清除和引用计数,引用计数会导致循环引用的问题

一旦数据不再有用,最好将其值设置为null来释放引用--解除引用

## js的内存泄漏

1. 全局变量

2. 被遗忘的计时器或回调

3. 闭包

4. 超出DOM引用

## DOM事件中target和currentTarget的区别

target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象(注册该事件的对象)（一般为父级）。this指向永远和currentTarget指向一致（只考虑this的普通函数调用）。

## typeof 和 instanceof 区别

typeof
typeof 是一个一元运算，放在一个运算数之前，运算数可以是任意类型。

instanceof
用于判断一个变量是否是某个对象的实例

## instanceof原理

查看对象B的prototype指向的对象是否在对象A的[[prototype]]链上。如果在，则返回true,如果不在则返回false。不过有一个特殊的情况，当对象B的prototype为null将会报错(类似于空指针异常)

```()
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
     return true;
   L = L.__proto__;
 }
```

## js动画和css动画的区别

Chromium项目里，渲染线程分为main thread和compositor thread。
如果CSS动画只是改变transforms和opacity，这时整个CSS动画得以在compositor thread完成（而JS动画则会在main thread执行，然后触发compositor进行下一步操作）
在JS执行一些昂贵的任务时，main thread繁忙，CSS动画由于使用了compositor thread可以保持流畅

现今CSS动画和JS动画主要的不同点是

* 功能涵盖面，JS比CSS3大
    * 定义动画过程的@keyframes不支持递归定义，如果有多种类似的动画过程，需要调节多个参数来生成的话，将会有很大的冗余（比如jQuery Mobile的动画方案），而JS则天然可以以一套函数实现多个不同的动画过程
    * 时间尺度上，@keyframes的动画粒度粗，而JS的动画粒度控制可以很细
    * CSS3动画里被支持的时间函数非常少，不够灵活
    * 以现有的接口，CSS3动画无法做到支持两个以上的状态转化
* 实现/重构难度不一，CSS3比JS更简单，性能调优方向固定
* 对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码
* CSS动画有天然事件支持（TransitionEnd、AnimationEnd，但是它们都需要针对浏览器加前缀），JS则需要自己写事件
* CSS3有兼容性问题，而JS大多时候没有兼容性问题

## js处理异常

try/catch

Throw

## js设计模式

* 单例模式
* 构造函数模式
* 建造者模式:表相即是回调，也就是说获取数据以后如何显示和处理取决于回调函数
* 工厂模式:需要依赖具体环境创建不同实例;处理大量具有相同属性的小对象
* 装饰者模式:装饰者是一种实现继承的替代方案,动态给函数添加功能,且功能使用单独的function来实现
* 外观模式:通过它封装一些接口用于兼容多浏览器，可以让我们间接调用子系统，从而避免因直接访问子系统而产生不必要的错误
* 代理模式:为其他对象提供一种代理以控制对这个对象的访问
* 观察者模式(发布订阅模式)
* 策略模式
* 命令模式
等

## js实现轮播

首先确认需求,这是一个什么样的轮播器,如果只涉及到图片的轮播,则可以默认处理图片类模板,同时,如果是懒加载的,则需要事先考虑好加载方式,设置data数据源,以及是否自动轮播,延时多少,是否有前进后退,是否有指代器(小白条等).

这里的动画效果,可以使用transition,也可以使用opacity显示隐藏就好.

## websocket的工作原理和机制

WebSocket 协议是一个独立的基于TCP的协议。和HTTP唯一的关系是它的握手被HTTP服务器识别为Upgrade 请求。WebSocket协议让浏览器和web服务器之间实时数据传输成为可能。也为这种标准方式提供了可能，就是服务端在未经客户端请求时给浏览器发送内容，并且当连接没有关闭，信息可以来回传递。用这种方式，在浏览器和服务器之间可以发生一种双向的会话

ajax轮询或者长轮询


## 手指点击可以触控的屏幕时，是什么事件

touch,touchstart,touchend

## 什么是函数柯里化

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术

```
var currying = function (fn) {
    var _args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, [].slice.call(arguments));
        return arguments.callee;
    }
};
```

Function.prototype.bind 方法也是柯里化应用

```
Object.prototype.bind = function(context) {
    var _this = this;
    var args = [].slice.call(arguments, 1);

    return function() {
        return _this.apply(context, args)
    }
}
```

接收单一参数，将更多的参数通过回调函数来搞定？
返回一个新函数，用于处理所有的想要传入的参数；
需要利用call/apply与arguments对象收集参数；
返回的这个函数正是用来处理收集起来的参数。

### 实现一个add方法，使计算结果能够满足如下预期：

```
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```

```
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [].slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function () {
        var _adder = function() {
            // [].push.apply(_args, [].slice.call(arguments));
            _args.push(...arguments);
            return _adder;
        };

        // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder;
    }
    // return adder.apply(null, _args);
    return adder(..._args);
}

var a = add(1)(2)(3)(4);   // f 10
var b = add(1, 2, 3, 4);   // f 10
var c = add(1, 2)(3, 4);   // f 10
var d = add(1, 2, 3)(4);   // f 10

// 可以利用隐式转换的特性参与计算
console.log(a + 10); // 20
console.log(b + 20); // 30
console.log(c + 30); // 40
console.log(d + 40); // 50

// 也可以继续传入参数，得到的结果再次利用隐式转换参与计算
console.log(a(10) + 100);  // 120
console.log(b(10) + 100);  // 120
console.log(c(10) + 100);  // 120
console.log(d(10) + 100);  // 120
```

当我们没有重新定义toString与valueOf时，函数的隐式转换会调用默认的toString方法，它会将函数的定义内容作为字符串返回。而当我们主动定义了toString/vauleOf方法时，那么隐式转换的返回结果则由我们自己控制了。其中valueOf会比toString后执行

## 利用call/apply封数组的map方法

`map()`: 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

```
Array.prototype._map = function(fn, context) {
    var temp = [];
    if(typeof fn == 'function') {
        var k = 0;
        var len = this.length;
        // 封装for循环过程
        for(; k < len; k++) {
            // 将每一项的运算操作丢进fn里，利用call方法指定fn的this指向与具体参数
            temp.push(fn.call(context, this[k], k, this))
        }
    } else {
        console.error('TypeError: '+ fn +' is not a function.');
    }

    // 返回每一项运算结果组成的新数组
    return temp;
}

var newArr = [1, 2, 3, 4]._map(function(item) {
    return item + 1;
})
// [2, 3, 4, 5]
```

## JS代码调试

pc:firebug,chrome控制台
跨平台:fiddler,weinre,Wireshark
手机:chrome和safari自带的开发者工具

## 函数上下文

每次当控制器转到可执行代码的时候，就会进入一个执行上下文。执行上下文可以理解为当前代码的执行环境

JavaScript引擎会以栈的方式来处理它们，这个栈，我们称其为函数调用栈(call stack)。栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文。

比如

```
var color = 'blue';

function changeColor() {
    var anotherColor = 'red';

    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }

    swapColors();
}

changeColor();
```

这段代码,可以发现,虽然是顺序执行的,但是执行时,每个局部作用域内会执行完所有代码,再继续执行上个作用域的可执行代码

一个执行上下文的生命周期可以分为两个阶段。

1. 创建阶段
在这个阶段中，执行上下文会分别创建变量对象，建立作用域链，以及确定this的指向。

2. 代码执行阶段
创建完成之后，就会开始执行代码，这个时候，会完成变量赋值，函数引用，以及执行其他代码。

3. 执行完毕,等待被回收

### 作用域

在JavaScript中，我们可以将作用域定义为一套规则,这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。

JavaScript代码的整个执行过程，分为两个阶段，代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码，这个阶段作用域规则会确定。执行阶段由引擎完成，主要任务是执行可执行代码，执行上下文在这个阶段创建。

因此作用域和执行上下文不是一种东西

### 作用域链

当访问一个变量时,解释器会首先在当前作用域查找标示符, 如果没有找到, 就去父作用域找, 直到找到该变量的标示符或者不在父作用域中,这就是作用域链

当函数调用栈成型时,那么作用域链实际上已经建立,其可以看做是规定了每个作用域内如何访问变量,是一种逻辑上的链关系,可以看做上层默认引用下层的所有变量的地址和定义

作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。

我们可以直接用一个数组来表示作用域链，数组的第一项scopeChain[0]为作用域链的最前端，而数组的最后一项，为作用域链的最末端，所有的最末端都为全局变量对象。

#### 和原型继承查找时的区别

如果去查找一个普通对象的属性.但是在当前对象和其原型中都找不到时,会返回 `undefined`; 但查找的属性在作用域链中不存在的话就会抛出 `ReferenceError`

### 再次理解闭包

闭包是一种特殊的对象。

闭包是一个函数和函数所声明的词法环境的结合.

它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。

当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。

```
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() { 
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2
```

这里将内部引用类型变量地址传递给全局变量fn,因此执行完`foo()`之后,foo不会被回收,因为它的属性正在被其他值所引用.

闭包是指这样的作用域(foo)，它包含有一个函数(fn1)，这个函数(fn1)可以调用被这个作用域所封闭的变量(a)、函数、或者闭包等内容。通常我们通过闭包所对应的函数来获得对闭包的访问。

所以，通过闭包，我们可以在其他的执行上下文中，访问到函数的内部变量。

```
for (var i = 0; i < 5; i++) {
setTimeout(console.log.bind(console,i), 1000 * i)
}
```

### 变量对象和活动对象

```
function foo() { console.log('function foo') }
var foo = 20;

console.log(foo); // 20

// 上栗的执行顺序为

// 首先将所有函数声明放入变量对象中
function foo() { console.log('function foo') }

// 其次将所有变量声明放入变量对象中，但是因为foo已经存在同名函数，因此此时会跳过undefined的赋值
// 不再执行 var foo = undefined;

// 然后开始执行阶段代码的执行
console.log(foo); // function foo
foo = 20;
```

* 建立arguments对象。检查当前上下文中的参数，建立该对象下的属性与属性值。
* 检查当前上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用。如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖。
* 检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。

变量对象和活动对象只是执行上下文的不同生命周期的叫法而已.

同时,this的指向也是在不同的执行上下文中,各不相同

### this绑定规则

总共有以下5种

1. 默认绑定(严格/非严格模式)
2. 隐式绑定
3. 显示绑定
4. new绑定
5. 箭头函数绑定

#### 调用位置

调用位置就是函数在代码中被调用的位置(而不是声明的位置)

查找方法:

- 分析调用栈: 调用位置就是当前正在执行的函数的前一个调用中
- 使用开发者工具得到调用栈: 设置断点或者插入`debugger`语句,运行时调试器会在那个位置暂停,同时展示当前位置的函数调用列表,这就是调用栈.找到栈中的第二个元素,这就是真正的调用位置.

#### 默认绑定

- **独立函数调用**,可以把默认绑定看做是无法应用其他规则时的默认规则,this指向全局对象
- **严格模式下**,不能将全局对象用于默认绑定,this会绑定到 `undefined`.只有函数运行在非严格模式下,默认绑定才能绑定到全局对象.在严格模式下调用函数则不影响默认绑定

#### 隐式绑定

当函数引用有上下文对象时,隐式绑定规则会把函数中的`this`绑定到这个上下文对象,对象属性引用链中只有上一层或者说最后一层在调用中起作用

被隐式绑定的函数特定情况下会丢失绑定对象,应用默认绑定,把`this`绑定到全局对象或者`undefined`上

参数传递就是一种隐式复制,传入函数时也会被隐式赋值.回调函数丢失`this`绑定是非常常见的

#### 显式绑定

通过 `call(..)` 或者 `apply(..)` 方法.第一个参数是一个对象,在调用函数时将这个对象绑定到this.因为直接指定this的绑定对象,称之为**显式绑定**

显式绑定无法解决丢失绑定问题

#### new绑定

- 在JS中,构造函数知识使用 `new` 操作符时被调用的 **普通函数**, 不属于某个类,也不会实例化一个类
- 包括内置对象函数(比如`Number(..)`),在内的所有函数都可以用 `new` 来调用,这种函数调用被称为构造函数调用
- 实际上并不存在所谓的构造函数,只有对于函数的 **构造调用**

##### new实现

首先是new的过程:

1. 创建一个新对象
2. 这个新对象会被执行`[[Prototype]]`连接
3. 这个新对象会绑定到函数调用的`this`
4. 如果函数没有返回其他对象,那么`new`表达式中的函数调用会自动返回这个新对象

```javaScript
function myNew(Constructor, ...args) {
    // 1. 创建一个新的对象
    let obj = {};

    // 2. 将新对象的原型指向构造函数的原型
    obj.__proto__ = Constructor.prototype;

    // 3. 将构造函数的 this 指向新对象，并执行构造函数
    let result = Constructor.apply(obj, args);

    // 4. 如果构造函数返回的是对象，则返回该对象，否则返回新创建的对象
    return result instanceof Object ? result : obj;
}
```

#### 优先级

new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

#### 绑定例外

##### 被忽略的this

把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`,`apply`或者`bind`,这些值在调用时会被忽略,实际应用的是默认规则

### 将类数组对象转换为数组

```()
function exam(a, b, c, d, e) {

    // 先看看函数的自带属性 arguments 什么是样子的
    console.log(arguments);

    // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
    var arg = [].slice.call(arguments);

    console.log(arg);
}

exam(2, 8, 9, 10, 3);
```

## js-微前端实现沙箱的机制

### iframe实现沙箱机制

通过`iframe`对象，把原生浏览器对象通过`contentWindow`取出来，这个对象具有所有的属性，而且与主应用的环境隔离，利用`iframe`沙箱我们可以实现以下特性:

- 全局变量隔离，如setTimeout、location、react不同版本隔离
- 路由隔离，应用可以实现独立路由，也可以共享全局路由
- 多实例，可以同时存在多个独立的微应用同时运行

### 基于diff方式实现沙箱

这里通过保存一个快照window对象，将当前window对象上的全部属性都复制到快照对象上，子应用卸载的时候将window对象修改做个diff，将不同的属性勇哥modify保存起来，再次挂载的时候再加上这些修改的属性。

### 基于proxy实现单实例沙箱

原理与上面的diff一致，只是用Proxy实现对对象的劫持，在沙箱修改时，关联修改window对象上的属性，在卸载时删除这些记录，在应用激活时再恢复这些记录
这里需要注意，劫持的`fakeWindow`实际上没有被修改，只是一个空对象

### 基于proxy实现的多实例沙箱

这里只需要修改，把原来直接设置到window对象上的属性，设置到`fakeWindow`的实例对象上即可，且

```()
const proxy = new Proxy(Object.create({}),{
    set: XXX
    get: (target,name) => {
        // 优先使用共享对象
        if(Object.keys(context).includes(name)){
            return context[name];
        }
        return target[name];
    }
})
```

优先使用共享对象，如果设置共享对象是window，则window修改，两个沙箱也相应可以得到值

## TypeScript

### TypeScript中的interface 与 type 有何异同

#### 相同点

1. 都可以描述一个对象或者函数

    ```()
    // interface
    interface User {
        name: string
        age: number
    }

    interface SetUser {
        (name: string, age: number): void;
    }

    // type
    type User = {
        name: string
        age: number
    };

    type SetUser = (name: string, age: number)=> void;
    ```

2. 都允许拓展（extends）:

    interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

    ```()
    // interface extends interface
    interface Name {
        name: string;
    }
    interface User extends Name {
        age: number;
    }

    // type extends type
    type Name = {
        name: string;
    }
    type User = Name & { age: number  };

    // interface extends type
    type Name = {
        name: string;
    }
    interface User extends Name {
        age: number;
    }

    // type extends interface
    interface Name {
        name: string;
    }
    type User = Name & {
        age: number;
    }

    ```

#### 不同点

1. type 可以而 interface 不行

    type 可以声明基本类型别名，联合类型，元组等类型

    ```()
    // 基本类型别名
    type Name = string

    // 联合类型
    interface Dog {
        wong();
    }
    interface Cat {
        miao();
    }

    type Pet = Dog | Cat

    // 具体定义数组每个位置的类型
    type PetList = [Dog, Pet]

    ```

    type 语句中还可以使用 typeof 获取实例的 类型进行赋值

    ```()
    // 当你想获取一个变量的类型时，使用 typeof
    let div = document.createElement('div');
    type B = typeof div
    ```

    其他操作

    ```()
    type StringOrNumber = string | number;  
    type Text = string | { text: string };  
    type NameLookup = Dictionary<string, Person>;  
    type Callback<T> = (data: T) => void;  
    type Pair<T> = [T, T];  
    type Coordinates = Pair<number>;  
    type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
    ```

2. interface 可以而 type 不行

    interface 能够声明合并

    ```()
    interface User {
        name: string
        age: number
    }

    interface User {
        sex: string
    }

    /*
    User 接口为 {
        name: string
        age: number
        sex: string
    }
    */
    ```

#### 总结

如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type

## React的setState的更新模式

* setState在生命周期函数和合成函数中都是异步更新。
* setState在steTimeout、原生事件和async函数中都是同步更新。每次更新不代表都会触发render，如果render内容与newState有关联，则会触发，否则即便setState多次也不会render
* 如果newState内容与render有依赖关系，就不建议同步更新，因为每次render都会完整的执行一次批量更新流程(只是dirtyComponets长度为1，stateQueue也只有该组件的newState)，调用一次diff算法，这样会影响React性能。
* 如果没有必须同步渲染的理由，不建议使用同步，会影响react渲染性能

链接：<https://zhuanlan.zhihu.com/p/82089614>

## React Hook 和 Vue Hook 对比

其实 React Hook 的限制非常多，比如官方文档中就专门有一个章节介绍它的限制：

不要在循环，条件或嵌套函数中调用

1. Hook确保总是在你的 React 函数的最顶层调用他们。
2. 遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

而 Vue 带来的不同在于：

1. 与 React Hooks 相同级别的逻辑组合功能，但有一些重要的区别。 与 React Hook 不同，setup 函数仅被调用一次，这在性能上比较占优。
2. 对调用顺序没什么要求，每次渲染中不会反复调用 Hook 函数，产生的的 GC 压力较小。 不必考虑几乎总是需要 useCallback 的问题，以防止传递函数prop给子组件的引用变化，导致无必要的重新渲染。
3. React Hook 有臭名昭著的闭包陷阱问题（甚至成了一道热门面试题，omg），如果用户忘记传递正确的依赖项数组，useEffect 和 useMemo 可能会捕获过时的变量，这不受此问题的影响。Vue 的自动依赖关系跟踪确保观察者和计算值始终正确无误。
4. 不得不提一句，React Hook 里的「依赖」是需要你去手动声明的，而且官方提供了一个 eslint 插件，这个插件虽然大部分时候挺有用的，但是有时候也特别烦人，需要你手动加一行丑陋的注释去关闭它。

## Vue2.0和Vue3.0的差异

Vue2.0

1. 基于Object.defineProperty，监听数组性能有问题，需要重新定义数组的原型来达到响应式。
2. Object.defineProperty 无法检测到对象属性的添加和删除。
3. 由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
4. 深度监听需要一次性递归，对性能影响比较大。

```()
function defineReactive(target, key, value) {
   //深度监听
   observer(value);

   Object.defineProperty(target, key, {
     get() {
       return value;
     },
     set(newValue) {
       //深度监听
       observer(value);
       if (newValue !== value) {
         value = newValue;

         updateView();
       }
     }
   });
 }

 function observer(target) {
   if (typeof target !== "object" || target === null) {
     return target;
   }

   if (Array.isArray(target)) {
     target.__proto__ = arrProto;
   }

   for (let key in target) {
     defineReactive(target, key, target[key]);
   }
 }

 // 重新定义数组原型
 const oldAddrayProperty = Array.prototype;
 const arrProto = Object.create(oldAddrayProperty);
 ["push", "pop", "shift", "unshift", "spluce"].forEach(
   methodName =>
     (arrProto[methodName] = function() {
       updateView();
       oldAddrayProperty[methodName].call(this, ...arguments);
     })
 );

 // 视图更新
  function updateView() {
   console.log("视图更新");
 }

 // 声明要响应式的对象
 const data = {
   name: "zhangsan",
   age: 20,
   info: {
     address: "北京" // 需要深度监听
   },
   nums: [10, 20, 30]
 };

 // 执行响应式
 observer(data);
```

Vue3.0

基于Proxy和Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
不需要一次性遍历data的属性，可以显著提高性能。
因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11。

```()
const proxyData = new Proxy(data, {
   get(target,key,receive){
     // 只处理本身(非原型)的属性
     const ownKeys = Reflect.ownKeys(target)
     if(ownKeys.includes(key)){
       console.log('get',key) // 监听
     }
     const result = Reflect.get(target,key,receive)
     return result
   },
   set(target, key, val, reveive){
     // 重复的数据，不处理
     const oldVal = target[key]
     if(val == oldVal){
       return true
     }
     const result = Reflect.set(target, key, val,reveive)
     console.log('set', key, val)
     return result
   },
   deleteProperty(target, key){
     const result = Reflect.deleteProperty(target,key)
     console.log('delete property', key)
     console.log('result',result)
     return result
   }
 })

  // 声明要响应式的对象,Proxy会自动代理
 const data = {
   name: "zhangsan",
   age: 20,
   info: {
     address: "北京" // 需要深度监听
   },
   nums: [10, 20, 30]
 };
```

## amd，cmd，es6 module之间的区别

### AMD

AMD一开始是CommonJS规范中的一个草案，全称是Asynchronous Module Definition，即异步模块加载机制。后来由该草案的作者以RequireJS实现了AMD规范，所以一般说AMD也是指RequireJS。

RequireJS的基本用法
通过define来定义一个模块，使用require可以导入定义的模块。

```()
//a.js
//define可以传入三个参数，分别是字符串-模块名、数组-依赖模块、函数-回调函数
define(function(){
    return 1;
})

// b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
require(['a'], function(a){
    console.log(a);// 1
});
```

### RequireJS的特点

对于依赖的模块，AMD推崇依赖前置，提前执行。也就是说，在define方法里传入的依赖模块(数组)，会在一开始就下载并执行。

### CMD

CMD是SeaJS在推广过程中生产的对模块定义的规范，在Web浏览器端的模块加载器中，SeaJS与RequireJS并称，SeaJS作者为阿里的玉伯。

SeaJS的基本用法

```()
//a.js
/*
* define 接受 factory 参数，factory 可以是一个函数，也可以是一个对象或字符串，
* factory 为对象、字符串时，表示模块的接口就是该对象、字符串。
* define 也可以接受两个以上参数。字符串 id 表示模块标识，数组 deps 是模块依赖.
*/
define(function(require, exports, module) {
  var $ = require('jquery');

  exports.setColor = function() {
    $('body').css('color','#333');
  };
});

//b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
seajs.use(['a'], function(a) {
  $('#el').click(a.setColor);
});
```

SeaJS的特点

对于依赖的模块，CMD推崇依赖就近，延迟执行。也就是说，只有到require时依赖模块才执行。

### CommonJS

CommonJS规范为CommonJS小组所提出，目的是弥补JavaScript在服务器端缺少模块化机制，NodeJS、webpack都是基于该规范来实现的。

CommonJS的基本用法

```()
//a.js
module.exports = function () {
  console.log("hello world")
}

//b.js
var a = require('./a');

a();//"hello world"

//或者

//a2.js
exports.num = 1;
exports.obj = {xx: 2};

//b2.js
var a2 = require('./a2');

console.log(a2);//{ num: 1, obj: { xx: 2 } }
```

CommonJS的特点

* 所有代码都运行在模块作用域，不会污染全局作用域；
* 模块是同步加载的，即只有加载完成，才能执行后面的操作；
* 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
* CommonJS输出是值的拷贝(即，require返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值)。

### ES6 Module

ES6 Module是ES6中规定的模块体系，相比上面提到的规范， ES6 Module有更多的优势，有望成为浏览器和服务器通用的模块解决方案。

```()
//a.js
var name = 'lin';
var age = 13;
var job = 'ninja';

export { name, age, job};

//b.js
import { name, age, job} from './a.js';

console.log(name, age, job);// lin 13 ninja

//或者

//a2.js
export default function () {
  console.log('default ');
}

//b2.js
import customName from './a2.js';
customName(); // 'default'
```

ES6 Module的特点(对比CommonJS)

* CommonJS模块是运行时加载，ES6 Module是编译时输出接口；
* CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
* CommonJS输出是值的拷贝，ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变；
* CommonJS this指向当前模块，ES6 Module this指向undefined;

目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的export/import，会被打包为exports/require。

必须了解 ES6 模块与 CommonJS 模块完全不同。

它们有两个重大差异。

CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

### export default 与 export的区别

1. export与export default均可用于导出常量、函数、文件、模块等，你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入
2. export、import可以有多个，export default仅有一个
3. export导出对象需要用{ }，export default不需要{ }

## 尾语

相关知识点仅供参考，具有一定的时效性，博主比较懒，博客仅做一个记录，更新的内容会在github里<https://github.com/leomYili/my-learning-notes/tree/master/interview>