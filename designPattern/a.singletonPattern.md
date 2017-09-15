# 设计模式之单例模式

> 单例简单来说就是保证一个类只有一个实例，实现的方式一般是先判断实例存在否，如果存在直接返回，如果不存在就创建了返回，这就确保了一个类只有一个实例对象。在javaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

***

## 文章
在javaScript中，实现单例的方式有很多种，首先是对象字面量：
```
var mySingleton = {
  property1: "something",
  property2: "something else",
  method1: function(){
    //do something
  }
}
```

当然，也可以声明字面量函数
```
var mySingleton = function(){
  var privateVariable = 'something private';
  function showPrivate() {
    //do something
  };
  return {
    publicMethod:function(){
      showPrivate();
    },
    publicVar:'the public can see this!'
  }
};
```

如果想做到只有在使用的时候才初始化，则可以在字面量匿名函数里面再封入一个构造函数来判断什么时候是使用期。
```
var Singleton = (function(){
  var instantiated;
  function init(){
    return {
      publicMethod:function(){
        console.log('hello world');
      },
      publicProperty:'test'
    }
  }
  return {
    getInstance: function(){
      if(!instantiated){
        instantiated = init();
      }
      return instantiated;
    }
  }
})();
```

单例一般用在各种模式的通信协调上
<a href="http://runjs.cn/detail/ivse0xku">singletonPatten1</a>
因为只有一个实例才可称为单例模式，当有多个实例同时运行时，最后的操作会改变所有实例的。
