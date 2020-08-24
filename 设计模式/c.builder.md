# 设计模式之建造者模式

> 在软件系统中，有时会有*一个复杂对象*的创建工作，其通畅由各个部分的字对象用一定的算法构成；由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法确相对稳定。
建造者模式可以将一个复杂对象的构建与其表示相分离，使得同样的构建过程可以创建不同的表示

## 正文
实例：
```
function getBeerById(id,callback){
  //使用ID来请求数据，然后返回数据
  $.ajax({
    url:"test.php",
    data:{
      id:id
    },
    success:function(data){
      callback(data)
    }
  })
}
var el = document.querySelector('#test');
el.addEventListener('click',getBeerByIdBridge,false);

function getBeerByIdBridge(e){
  getBeerById(this.id,function(beer){
    console.log('Requested Beer:' + beer);
  });
}
```

根据建造者的定义，表相即是回调，也就是说获取数据以后如何显示和处理取决于回调函数，相应地回调函数在处理数据的时候不需要关注是如何获取数据的，主要目的就是职责分离。想要真正使用到建造者模式，我觉得需要从大局考虑，一个复杂应用的运行顺序，并且各部分可更换性强。
