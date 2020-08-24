# 设计模式之职责链模式

> 职责链模式是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。

## 正文

对于javaScript,我们可以利用其原型特性来实现职责链模式。
```
var NO_TPOIC = -1;
var Topic;

function Handler(s,t){
  this.successor = s || null;
  this.tppic = t || 0;
}

Handler.prototype = {
  handle: function(){
    if(this.successor){
      this.successor.handle()
    }
  },
  has: function(){
    return this.topic != NO_TPOIC;
  }
}
```
Handler只是接受2个参数，第一个是继任者（用于将处理请求传下去），第二个是传递层级（可以用于控制在某个层级下是否执行某个操作，也可以不用），Handler原型暴露了一个handle方法，这是实现该模式的重点：
```
var app = new Handler({
  handle:function(){
    console.log('app handle');
  }
},3);

var dialog = new Handler(app,1);

var button = new Handler(dialog,2);

button.handle();
```
该代码通过原型特性，调用代码从button.handle()->dialog.handle()->app.handle()->参数里的handle()，前三个都是调用原型的handle,最后才查找到传入的参数里的handle，然后输出结果，也就是说其实只有最后一层才处理。
如果要做到调用的时候，只让dialog的这个对象进行处理，则：
```
var dialog = new Handler(app,1);
dialog.handle = function(){
  console.log('dialog before...');
  //这里做具体的处理操作
  console.log('dialog after');
}
```
如果需要在dialog处理完之后，让继任者继续处理，则：
```
var dialog = new Handler(app,1);
dialog.handle = function(){
  console.log('dialog before');
  //这里做具体的处理操作
  Handler.prototype.handle.call(this);//this其实就是app
  console.log('dialog after');
};
```
职责链模式经常和组合模式一起使用，这样一个构件的父构件可以作为其继任者。
该模式与DOM的事件冒泡类似。
