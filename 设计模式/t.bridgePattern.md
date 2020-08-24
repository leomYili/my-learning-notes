# 设计模式之桥接模式

> 桥接模式将抽象部分与它的实现部分分离，使它们都可以独立地变化。

## 正文
桥接模式最常用在事件监控上：
```
function getBeerById(id,callback){
  //通过ID发送请求，然后返回数据
  asyncRequest('GET','beer.url?id='+id,function(resp){
    callback(resp.responseText);
  });
}

function getBeerByIdBridge(e){
  getBeerById(this.id,function(beer){
    console.log('Requested Beer:'+beer);
  });
}

addEvent(element,'click',getBeerByIdBridge);
```
这里的getBeerByIdBridge就是定义的桥。用于将抽象的click事件和getBeerById连接起来。

桥接模式的优点也很明显，我们只列举几个：
* 分离接口和实现部分，一个实现未必不变地绑定在一个接口上，抽象类的实现可以在运行时刻进行配置，一个对象甚至可以在运行时刻改变它的实现，同将抽象和实现也进行了充分的解耦。
* 提高可扩充性
* 实现细节对客户透明，可以对客户隐藏实现细节。

同时桥接也有缺点：
大量的类将导致开发成本的增加，同时在性能方面可能也会有所减少。
