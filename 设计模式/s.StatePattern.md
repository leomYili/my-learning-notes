# 设计模式之状态模式

> 状态模式允许一个对象在其内部状态改变的时候改变它的行为。

## 正文
举例，比如在日常的下载中，就会有好几个状态，比如准备状态（ReadyState）,下载状态（DownloadingState）,暂停状态(DownloadPausedState)等。也就是说在每个状态都只可以做当前状态才可以做的事情，而不能做其他状态能做的事。
这一模式的关键思想就是引入一个叫做State的抽象类（或js里的函数）来表示当前状态，state函数（作为原型）为每个状态的子类（继承函数）声明了一些公共接口，其每个继承函数实现与特定状态相关的行为。
实例，首先定义作为洽谈基础函数的原型的State函数：
```
var State = function(){};
State.prototype.download = function(){
  throw new Error("该方法必须被重载");
};
State.prototype.pause = function(){
  throw new Error("该方法必须被重载");
}
State.prototype.fail = function(){
  throw new Error("该方法必须被重载");
}
State.prototype.finish = function(){
  throw new Error("该方法必须被重载");
}
```
我们为State的原型定义了4个方法接口，分别对应着下载（download），暂停（pause），失败（fail），结束（finish）以便子函数可以重写。
然后编写一个ReadyState函数，以便可以将状态传递给第一个download状态：
```
var ReadyState =function(oDownload) {
  State.apply(this);
  this.oDownload = oDownload;
};

ReadyState.prototype.download =function(){
  this.oDownload.setState(this.oDownload.getDownloadingState());
  console.log("Start Download!");
};

ReadyState.prototype.pause = function(){
  throw new Error("还没开始下载，不能暂停");
};

ReadyState.prototype.fail = function(){
  throw new Error("文件还没开始下载，不会失败");
};
ReadyState.prototype.finish = function(){
  throw new Error("文件还没开始下载，不会结束");
};

var Download = function(){
  this.oState = new ReadyState(this);
};

Download.prototype.setState = function(oState){
  this.oState = oState;
};

//对外暴露的四个公共方法，以便外部调用
Download.prototype.download = function(){
  this.oState.download();
};

Download.prototype.pause = function(){
  this.oState.pause();
};

Download.prototype.fail = function(){
  this.oState.fail();
};

Download.prototype.finish = function(){
  this.oState.finish();
};

//获取各种状态，传入当前this对象
Download.prototype.getReadyState =function(){
  return new ReadyState(this);
};
Download.prototype.getDownloadingState = function(){
  return new DownloadingState(this);
};
Download.prototype.getDownloadPausedState = function(){
  return new DownloadPausedState(this);
};
Download.prototype.getDownloadedState = function(){
  return new DownloadedState(this);
};
Download.prototype.getDownloadedFailedState = function(){
  return new DownloadFailedState(this);
};
```
Download函数的原型提供了8种方法，4个是对用于下载状态的操作行为，另外4个是用于获取当前四个不同的状态，这4个方法都接收this作为参数，也就是将Download实例自身作为一个参数传递给处理该请求的状态对象（ReadyState以及后面要实现的继承函数），这使得状态对象必要的时候可以访问oDownload。

```
//loadingState
var DownloadingState =function(oDownload){
  State.apply(this);
};

DownloadingState.prototype = new State();

DownloadingState.prototype.download = function(){
  throw new Error("文件已经正在下载中了");
};
DownloadingState.prototype.pause = function(){
  this.oDownload.setState(this.oDownload.getDownloadPausedState());
  console.log("暂停下载");
};
DownloadingState.prototype.fail = function(){
  this.oDownload.setState(this.oDownload.ghetDownloadedFailedState());
  console.log("下载失败");
};
DownloadingState.prototype.finish = function(){
  this.oDownload.setState(this.oDownload.getDownloadedState());
  console.log("下载完毕！");
};
```
剩下三个状态略写；

状态模式的使用场景也特别明确：
1. 一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为。
2. 一个操作中含有大量的分支语句，而且这些分支语句依赖于该对象的状态。状态通常为一个或多个枚举常量的表示。
