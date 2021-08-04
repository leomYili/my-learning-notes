# 正文

> 要求实现一个compose,并返回正确的结果:1,3,5,6,4,2

## 代码以及解析

这里千万不要想复杂,这里的next实际上指的是回调函数而已,
函数按照数组的顺序执行,每执行到next,往下执行,所以需要等next执行完毕才会执行后面的语句,
也不是generator函数

而redux中的compose是从右到左依次执行的,连回调都不一样


```()
var app = {
  middlewares: [],
  use: (fn) => {
    app.middlewares.push(fn);
  },
  compose: () => {
    /* if(app.middlewares.length === 0) return null;

    app.middlewares.reduce((a,b) => (...args) => a(b(...args))); */

    function next1(){
      let fn = app.middlewares.shift();

      if(fn){
        fn(next1);
      }
    }

    next1();
  },
};

app.use((next) => {
  console.log(1);
  next();
  console.log(2);
});

app.use((next) => {
  console.log(3);
  next();
  console.log(4);
});

app.use((next) => {
  console.log(5);
  next();
  console.log(6);
});

app.compose();
```