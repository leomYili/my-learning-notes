# 设计模式之工厂模式

> 与创建型模式类似，工厂模式创建对象时无需指定创建对象的具体类，
工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型

## 正文
实例：
```
function Iphone(man,brand,year){
  var o = new object();
  o.man = man;
  o.brand = brand;
  o.year = year;
  o.output = function(){
    return this.man + "使用" + this.brand + "已经" + this.year + "年"
  }
  return o;
}

var leo = Iphone("leo","iphone 6s",1);
```

实例2:
```
var productManager = {};
productManager.createProductA = function(){
  console.log('ProductA');
}
productManager.createProductB = function(){
  console.log('ProductB');
}

productManager.factory = function(type){
  return new productManager[type]
}

productManager.factory("createProductA");
```

以下几种情景工厂模式很有用：
* 对象的构建十分复杂
* 需要依赖具体环境创建不同实例
* 处理大量具有相同属性的小对象
