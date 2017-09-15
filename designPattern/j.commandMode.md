# 设计模式之命令模式

> 命令模式的定义是：用于将一个请求封装成一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或者记录请求日志，以及执行可撤销的操作，此外，可以通过调用实现具体函数的对象来解耦命令对象与接收对象。

## 正文
实例：
```
var CarManager = {
  //请求信息
  requestInfo: function(model,id){
    return 'The information for' + model + 'with id' + id + 'is foobar';
  },
  //购买汽车
  buyVehicle: function(model,id){
    return 'You have successfully purchased Item' + id +',a'+model;
  },
  //组织view
  arrangeViewing: function(model,id){
    return 'You have successfully booked a viewing of' + model + '('+id+')';
  }
}
CarManager.execte = function (command) {
  return CarManager[command.request](command.model,command.carID);
}

//use
CarManager.execute({request:"arrangeViewing",model:'Ferrari',carID:'145532'});
```
命令模式比较容易设计一个命令队列，在需求的情况下比较容易将命令计入日志，并且允许接受请求的一方决定是否需要调用，而且可以实现对请求的撤销和重设，而且由于新增的具体类不影响其它的类，所以很容易实现。
