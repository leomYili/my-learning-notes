# 设计模式之享元模式

> 享元模式，运行共享技术有效地支持大量细粒度的对象，避免大量拥有相同内容的小类的开销，使大家共享一个类。
享元模式可以避免大量非常相似类的开销，在程序设计中，有时需要生产大量细粒度的类实例来表示数据，如果能发现这些实例除了几个参数以外，开销基本相同的话，就可以大幅度减少需要实例化的类的数量。如果能把那些参数移动到类实例的外面，在方法调用的时候将他们传递进来，就可以通过共享大幅度的减少单个实例的数目。
flyweight中有两个重要概念--内部状态intrinsic和外部状态extrinsic之分，内部状态就是在对象里通过内部方法管理，而外部信息可以在通过外部删除或者保存。
就是先建立一个原始模型，然后随着不同场合和环境，再产生各具特征的具体模型，常会出现工厂模式，享元模式内部状态是共享的，而flyweight factory负责维护一个flyweight pool来存放内部状态的对象。

## 正文
* 事件集中管理
如果我们有很多相似类型的元素或者结构都需要监控他的click事件的话，那就需要对每个元素进行绑定，结合冒泡，我们可以使用享元模式，我们可以对这些相似元素的父级元素进行事件监控，然后再判断里面哪个子元素有事件触发了：
```
var stateManager = {
  fly: function(){
    var self = this;
    $("#container").unbind().bind("click",function(e){
      var target = $(e.originalTarget || e.srcElement);
      //判断是哪一个子元素
      if(target.is("div.toggle")){
        self.handleClick(target);
      }
    });
  },

  handleClick: function(elem){
    elem.find('span').toggle('slow');
  }
}
```

* 应用享元模式提升性能
一般我们在事件的回调函数里使用元素对象后，经常会用到$(this)这种形式，其实它重复创建了新对象，因为本身回调函数里的this已经是DOM元素本身了：
```
//这里可以直接使用DOM元素自身
$('div').bind('click',function(){
  console.log('You clicked:' + this.id);
});

//自实现$(this);
jQuery.single = (function(o){
  var collection = jQuery([1]);
  return function(element){
    //将元素放到集合里
    collection[0] = element;

    //返回集合
    return collection;
  };
});

//use
$('div').bind('click',function(){
  var html = jQuery.single(this).next().html();
  console.log(html);
});
```

flyweight模式是一个提高程序效率和性能的模式，会大大加快程序的运行速度，应用场合很多：比如你要从一个数据库中读取一系列字符串，这些字符串中有许多是重复的，那么我们可以将这些字符串储存在flyweight池中。
如果一个应用程序使用了大量的对象，而这些大量的对象造成了很大的存储开销时，就应该考虑使用享元模式；还有就是对象的大多数状态可以外部状态，如果删除对象的外部状态，那么就可以用相对较少的共享对象取代很多组对象，此时可以考虑享元模式。
