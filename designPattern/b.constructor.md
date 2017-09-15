# 设计模式之构造函数模式

> 对于构造函数而言，首先了解ECMAScript中的函数没有重载的定义，如果两个函数同名，则后面的覆盖前面的，还有就是给函数传递的参数其实质是个数组，在函数体内可以通过arguments来获取传入的参数；这里的函数实质上是对象，而函数名则是个指针，在函数内部可以通过arguments.callee来指向拥有这个arguments对象的函数。还有一点就是this，指代函数的环境对象；另外就是每个函数都会有两个方法：apply(),call().其实际上等于设置函数内this,也就是上下文环境的值，这两个不同点在于，apply()的第二个参数是个数组，而call()从第二个参数开始需要枚举参数。这样就可以使之和原函数解耦。该篇主要介绍构造函数模式

***

## 文章

1. 基本用法
在JavaScript中，构造函数通常是认为用来实现实例的,JavaScript没有类的概念，但是有特殊的构造函数，通过new关键字来调用定义好的构造函数，可以创建一个新**对象**，且对象的成员声明都是构造函数定义的，在构造函数内部，this关键字引用的是新创建的对象。*注：按照惯例，OO语言的构造函数实质是个类，所以以大写字母开头，而非构造函数则应以一个小写字母开头，区分，增强代码可读性*。
```
  function Iphone(man,brand,year){
    this.man = man;
    this.brand = brand;
    this.year = year;
    this.output = function(){
      return this.man + "使用" + this.brand + "已经" + this.year + "年"
    }
  }
  var leo = new Iphone("leo","iphone 6s",1);
  var test = new Iphone("test","test",1);
  console.log(leo.output());
  console.log(test.output());
```
其实构造函数和普通函数的唯一区别就在于调用他们的方式不同，任何函数，只要通过new操作符来调用，那它就可以作为构造函数，而如果不使用new操作符来调用，则就是普通函数，当然，因为每次在创建对象时output方法都会重新定义，所以该方法可以拿出去，解耦。不过有更好的方法，那就是使用原型(prototype);

2. 构造函数与原型
我们创建的每个函数都有一个原型(prototype)属性，该属性为指针，指向一个对象，而这个对象的用途就是包含可以由特定类型的所有实例共享的属性和方法。如果按字面意思来理解，那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型的好处是可以让所有对象实例共享它所包含的属性和方法。
```
function Iphone(man,brand,year){
  this.man = man;
  this.brand = brand;
  this.year = year;
}

Iphone.prototype.output = function(){
  return this.man + "使用" + this.brand + "已经" + this.year + "年"
}

var leo = new Iphone("leo","iphone 6s",1);
var test = new Iphone("test","test",1);
console.log(leo.output());
console.log(test.output());
```
因为原型中所有属性是被实例所共享的，所以对于包含引用类型值的属性来说，这点变成了缺点。
```
Iphone.prototype.app = ["qq","music"];

var leo = new Iphone("leo","iphone 6s",1);
leo.app.push("keep");
var test = new Iphone("test","test",1);
console.log(leo.app);//"qq,music,keep"
console.log(test.app);//"qq,music,keep"
```
因此，这里可以使用构造函数和原型模式混合使用模式
```
function Iphone(man,brand,year){
  this.man = man;
  this.brand = brand;
  this.year = year;
  this.app = ["qq","music"]
}

Iphone.prototype.output = function(){
  return this.man + "使用" + this.brand + "已经" + this.year + "年"
}

var leo = new Iphone("leo","iphone 6s",1);
leo.app.push("keep");
var test = new Iphone("test","test",1);
console.log(leo.app);//"qq,music,keep"
console.log(test.app);//"qq.music"
```
而动态原型模式则可以通过检测某个应该存在的方法是否有效，来决定是否需要初始化原型
```
if(typeof this.output != "function"){
  Iphone.prototype.output = function(){
    return this.man + "使用" + this.brand + "已经" + this.year + "年"
  }
}
```

3. 除new之外的其它方式创建对象
```
function Iphone(man,brand,year){
  this.man = man;
  this.brand = brand;
  this.year = year;
  this.output = function(){
    return this.man + "使用" + this.brand + "已经" + this.year + "年"
  }
}

//方法1，作为普通函数调用
Iphone("leo","iphone 6s",1);//添加到window对象上
console.log(window.output());

//方法2，在另外一个对象的作用域内调用
var o = new Object();
Iphone.call(o,"test","test","test");
console.log(o.output());
```
在方法1中this指向的是全局对象window。

4. 强制使用new
```
function Iphone(man,brand,year){
  if(!(this instanceof Iphone)){
    return new Iphone(man,brand,year);
  };
  this.man = man;
  this.brand = brand;
  this.year = year;
  this.output = function(){
    return this.man + "使用" + this.brand + "已经" + this.year + "年"
  }
}
```
