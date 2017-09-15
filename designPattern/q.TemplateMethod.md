# 设计模式之模版方法

> 模版方法定义了一个操作中的算法，而将一些步骤延迟到子类中。模版方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤，模版方法是一种代码复用的基本技术，在类库中尤为重要，因为他们提取了类库中的公共行为。模版方法导致一种反向的控制结构。具体体现是面向对象编程语言里的抽象类（以及其中的抽象方法），以及继承该抽象类的子类。

## 正文
实例：
```
var CaffeineBeverage = function(){};

CaffeineBeverage.prototype.prepareRecipe = function(){
  this.boilWater();
  this.brew();
  this.pourOnCup();
  if(this.customerWantsCondiments()){
    this.addCondiments();
  }
};
CaffeineBeverage.prototype.boilWater = function(){
  console.log("将水烧开");
};
CaffeineBeverage.prototype.pourOnCup = function(){
  console.log("将饮料倒在杯子里");
};
CaffeineBeverage.prototype.brew = function(){
  throw new Error("必须重写");
};
CaffeineBeverage.prototype.addCondiments = function(){
  throw new Error("必须重写");
};
CaffeineBeverage.prototype.customerWantsCondiments = function(){
  return true;
}
```
该函数已扩展好基础步骤。

```
//冲咖啡
var Coffee = function(){
  CaffeineBeverage.apply(this);
};
Coffee.prototype = new CaffeineBeverage();
Coffee.prototype.brew = function(){
  console.log("从咖啡机加咖啡倒进去");
};
Coffee.prototype = new CaffeineBeverage();
Coffee.prototype.addCondiments = function(){
  console.log("添加糖和牛奶");
};
Coffee.prototype.customerWantsCondiments = function(){
  return confirm("你想添加糖和牛奶吗？");
};
```
函数中的confirm，可以让用户自己选择加不加小料。

模版方法应用于：
* 一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现
* 各子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复，不同之处分离为新的操作，最后，用一个钓鱼这些新操作的模版方法来替换这些不同的代码。
* 控制子类扩展，模版方法只在特定点调用 “hook”操作，这样就允许在这些点进行扩展。
