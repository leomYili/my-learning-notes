# 设计模式之原型模式

> 原型模式是指用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象。

## 正文
对于原型模式，我们可以利用JavaScript特有的原型继承特性去创建对象的方式，也就是创建的一个对象作为另外一个对象的prototype属性值。原型对象本身就是有效地利用了每个构造器创建的对象。
而在ECMAScript5中，使用Object.create方法可以创建类，该方法创建指定的对象，其对象的prototype有指定的对象，也可以包含其他可选的指定属性，例如Object.create(prototype,optionalDescriptorObjects)。
自己实现：
```
var vehiclePrototype = {
  init:function(carModel){
    this.model = carModel;
  },
  getModel: function(){
    console.log('车辆模具是：'+this.model);
  }
};

function vehicle(model){
  function F(){};
  F.prototype = vehiclePrototype;

  var f= new F();

  f.init(model);
  return f;
};

var car = vehicle('福特');
car.getModel();
```
当然原型模式主要就是深复制和浅复制的问题。
