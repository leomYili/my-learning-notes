# 设计模式之代理模式

> 代理模式，为其他对象提供一种代理以控制对这个对象的访问。代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西

## 正文
实例：
```
var platform1 = function(name){
  this.name = name;
}

var user = function(platform){
  this.platform = platform;
  this.sendInfo = function(info){
    console.log(platform.name+",该条信息是"+info);
  }
}

var proxyLeo = function(platform){
  this.platform = platform;
  this.sendInfo = function(info){
    (new user(platform)).sendInfo(platform);
  }
}

var proxy = new proxyLeo(new platform1("微信"));
proxy.sendInfo("111");
```
代理模式适用于：
* 远程代理，也就是为了一个对象在不同的地址空间提供局部代表，这样可以隐藏一个对象存在于不同地址空间的事实
* 虚拟代理，根据需要创建开销很大的对象，通过它来存放实例化需要很长时间的真实对象，比如浏览器的渲染的时候先显示问题，而图片可以慢慢显示？
* 安全代理，用来控制真实对象访问时的权限，一般用于对象应该有不同的访问权限
* 智能指引，只当调用真实对象时，代理处理另外一些事情。
