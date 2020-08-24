# 设计模式之组合模式

> 组合模式将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。所以说组合模式的关键是要有有一个抽象类，它既可以表示子元素，又可以表示父元素。

## 正文
以餐厅中的菜单为例。
第一步，先实现抽象类MenuComponent:
```
var MenuComponent = function(){};

//获取名称
MenuComponent.prototype.getName = function(){
  throw new Error("该方法必须重写");
}

//获取信息
MenuComponent.prototype.getDesciption = function(){
  throw new Error("该方法必须重写");
}

//获取价格
MenuComponent.prototype.getPrice = function(){
  throw new Error("该方法必须重写");
}

//是否是素食者
MenuComponent.prototype.isVegetarian = function(){
  throw new Error("该方法必须重写");
}

//打印
MenuComponent.prototype.print = function(){
  throw new Error("该方法必须重写");
}

//添加
MenuComponent.prototype.add = function(){
  throw new Error("该方法必须重写");
}

//删除
MenuComponent.prototype.remove = function(){
  throw new Error("该方法必须重写");
}

//获取子菜单
MenuComponent.prototype.getChild = function(){
  throw new Error("该方法必须重写");
}
```
第二步，创建基本的菜品项
```
var MenuItem = function(sName,sDescription,bVegetarian,nPrice){
  MenuComponent.call(this);
  this.sName = sName;
  this.sDescription = sDesciption;
  this.bVegetarian = bVegetarian;
  this.nPrice = nPrice;
}
MenuItem.prototype = new MenuComponent();
MenuItem.prototype.getName = function(){
  return this.sName;
};
MenuItem.prototype.getDescription = function(){
  return this.sDesciption;
};
MenuItem.prototype.getPrice = function(){
  return this.nPrice;
};
MenuItem.prototype.isVegetarian = function(){
  return this.bVegetarian;
};
MenuItem.prototype.print = function(){
  console.log(this.getName()+": "+ this.getDescription()+ ","+this.getPrice() + "euros");
};
可以看出基本菜品不包括添加，删除，获取子菜品的方式
```
第三步，创建菜品
```
var Menu = function(sName,sDesciption) {
  MenuComponent.call(this);
  this.aMenuComponents = [];
  this.sName= sName;
  this.sDesciption = sDesciption;
  this.createIterator = function(){
    throw new Error("This method must be overwritten");
  }
}
Menu.prototype = new MenuComponent;
Menu.prototype.add =function(oMenuComponent){
  this.aMenuComponents.push(oMenuComponent);
};
Menu.prototype.remove = function(oMenuComponent){
  var aMenuItems = [];
  var nMenuItem = 0;
  var nLenMenuItems = this.aMenuComponents.length;
  var oItem = null;

  for(; nMenuItem<nLenMenuItems;){
    oItem = this.aMenuComponents[nMenuItem];
    if(oItem !== oMenuComponent){
      aMenuItems.push(oItem);
    }
    nMenuItem = nMenuItem + 1;
  }
  this.aMenuComponents = aMenuItems;
};
Menu.prototype.getChild = function(nIndex){
  return this.aMenuComponents[nIndex];
};
Menu.prototype.getName = function(){
  return this.sName;
};
Menu.prototype.getDescription = function() {
  return this.sDescription;
};
Menu.prototype.print = function(){
  console.log(this.getName() + ": " + this.getDescription());
  console.log("--------------------------------------");

  var nMenuComponent = 0;
  var nLenMenuComponents = this.aMenuComponents.length;
  var oMenuComponent = null;

  for(;nMenuComponent < nLenMenuComponents;){
    oMenuComponent = this.aMenuComponents[nMenuComponent];
    oMenuComponent.print();
    nMenuComponent = nMenuComponent + 1;
  }
};
```
菜品的打印方法是首先打印当前菜品信息，然后循环遍历打印所有子菜品信息。
第四步，创建指定的菜品：
```
var DinnerMenu = function(){
  Menu.apply(this);
};
DinnerMenu.prototype = new Menu();

var CafeMenu = function(){
  Menu.apply(this);
};

CafeMenu.prototype = new Menu();
var PancakeHouseMenu = function(){
  Menu.apply(this);
};
PancakeHouseMenu.prototype = new Menu();
```

第五步，创建最顶级的菜单容器--菜单本
```
var Mattress = function(aMenus){
  this.aMenus = aMenus;
};
Mattress.prototype.printMenu = function(){
  this.aMenus.print();
};
```
该函数接收一个菜单数组作为参数，并且值提供了printMenu方法用于打印所有的菜单内容。
第六步，调用方式
```
var oPanCakeHouseMenu = new Menu("Pancake House Menu","Breakfast");
var oDinnerMenu = new Menu("Dinner Menu","Lunch");
var oCoffeeMenu = new Menu("Cafe Menu","Dinner");
var oAllMenus = new Menu("ALL MENUS","All menus combined");

oAllMenus.add(oPanCakeHouseMenu);
oAllMenus.add(oDinnerMenu);

oDinnerMenu.add(new MenuItem("Pasta","Spaghetti with Marinara Sauce,and a slice of sourdough bread",tree,3.89));
oDinnerMenu.add(oCoffeeMenu);

oCoffeeMenu.add(new MenuItem("Express","Coffee from machine",false,0.39));
var oMattress = new Mattress(oAllMenus);
console.log("--------------------------------------");
oMattress.printMenu();
console.log("--------------------------------------");
```

组合模式的使用场景：
* 你想表示对象的部分-整体层次结构时；
* 你希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象。
