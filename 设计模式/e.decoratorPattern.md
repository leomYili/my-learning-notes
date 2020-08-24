# 设计模式之装饰者模式

> 装饰者模式提供比继承更有弹性的替代方案，用于包装同接口的对象，不仅允许你向方法添加行为，而且还可以将方法设置成原始对象调用（例如装饰者的构造函数）。装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰者前面或者后面加上自己的行为以达到特定的目的。

## 正文
在继承式方法中修改子类的行为会影响原有类所有的实例，而装饰者则能给不同对象各自添加新行为。
```
//需要装饰的类（函数）
function Macbook(){
  this.cost = function(){
    return 1000;
  }
}

function Memory(macbook){
  this.cost = function(){
    return macbook.cost() + 75;
  }
}

function BlurayDrive(macbook) {
  this.cost = function(){
    return macbook.cost() + 300;
  }
}

function Insurance(macbook) {
  this.cost = function(){
    return macbook.cost() + 250;
  };
}

//用法
var myMacbook = new Insurance(new BlurayDrive(new Memory(new Macbook())));
console.log(myMacbook.cost());
```
实例2:
<a href="http://runjs.cn/detail/i8wbyuy7">例2</a>
