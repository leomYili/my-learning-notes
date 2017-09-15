# 设计模式之迭代器模式

> 迭代器模式：提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象内部表示。
几个特点是：
* 访问一个聚合对象的内容而无须暴露它的内部表示。
* 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。
* 遍历的同时更改迭代器所在的集合结构可能会导致问题。

## 正文
一般的迭代，我们至少要有2个方法，hasNext(),Next()；
```
var agg = (function(){
  var index = 0,
  data = [1,2,3,4,5];
  length = data.length;

  return {
    next: function(){
      var element;
      if(!this.hasNext()){
        return null;
      }
      element = data[index];
      index = index +2;
      return element;
    },
    hasNext: function(){
      return index<length;
    },
    rewind: function(){
      index = 0;
    },
    current: function(){
      return data[index];
    }
  }
})();

while(agg.hasNext()){
  console.log(agg.Next());
}

//重置
agg.rewind();
console.log(agg.current());
```
而在jquery中，迭代器是**$.each**。
迭代器的使用场景是：对于集合内部结果常常变化各异，我们不想暴露其内部结构的话，但又想让客户代码透明的访问其中的元素。
