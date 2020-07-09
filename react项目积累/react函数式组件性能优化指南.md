# 正文

## React 性能优化思路

我觉得 React 性能优化的理念的主要方向就是这两个：

减少重新 render 的次数。因为在 React 里最重(花时间最长)的一块就是 reconction(简单的可以理解为 diff)，如果不 render，就不会 reconction。

减少计算的量。主要是减少重复计算，对于函数式组件来说，每次 render 都会重新从头开始执行函数调用。

在使用类组件的时候，使用的 React 优化 API 主要是：shouldComponentUpdate和 PureComponent，这两个 API 所提供的解决思路都是为了减少重新 render 的次数，主要是减少父组件更新而子组件也更新的情况，虽然也可以在 state 更新的时候阻止当前组件渲染，如果要这么做的话，证明你这个属性不适合作为 state，而应该作为静态属性或者放在 class 外面作为一个简单的变量 。

但是在函数式组件里面没有声明周期也没有类，那如何来做性能优化呢？

## React.memo

首先要介绍的就是 React.memo，这个 API 可以说是对标类组件里面的 PureComponent，这是可以减少重新 render 的次数的。

### React.memo 的基础用法

把声明的组件通过React.memo包一层就好了，React.memo其实是一个高阶函数，传递一个组件进去，返回一个可以记忆的组件。

```()
function Component(props) {
   /* 使用 props 渲染 */
}

const MyComponent = React.memo(Component);
```

通过 React.memo 包裹的组件在 props 不变的情况下，这个被包裹的组件是不会重新渲染的，也就是说上面那个例子，在我点击改名字之后，仅仅是 title 会变，但是 Child 组件不会重新渲染（表现出来的效果就是 Child 里面的 log 不会在控制台打印出来），会直接复用最近一次渲染的结果。

这个效果基本跟类组件里面的 PureComponent效果极其类似，只是前者用于函数组件，后者用于类组件。

### React.memo 高级用法

默认情况下其只会对 props 的复杂对象做浅层对比(浅层对比就是只会对比前后两次 props 对象引用是否相同，不会对比对象里面的内容是否相同)，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```()
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

如果你有在类组件里面使用过 `shouldComponentUpdate()` 这个方法，你会对 React.memo 的第二个参数非常的熟悉，不过值得注意的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。

## useCallback

如何解决
找到问题的原因了，那么解决办法就是在函数没有改变的时候，重新渲染的时候保持两个函数的引用一致，这个时候就要用到 useCallback 这个 API 了。

useCallback 使用方法

```()
const callback = () => {
  doSomething(a, b);
}
```

const memoizedCallback = useCallback(callback, [a, b])
把函数以及依赖项作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，这个 memoizedCallback 只有在依赖项有变化的时候才会更新。

那么可以将 index.js 修改为这样：

```()
// index.js
import React, { useState, useCallback } from"react";
import ReactDOM from"react-dom";
import Child from"./child";

function App() {
  const [title, setTitle] = useState("这是一个 title");
  const [subtitle, setSubtitle] = useState("我是一个副标题");

  const callback = () => {
    setTitle("标题改变了");
  };

  // 通过 useCallback 进行记忆 callback，并将记忆的 callback 传递给 Child
  const memoizedCallback = useCallback(callback, [])

  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <button onClick={() => setSubtitle("副标题改变了")}>改副标题</button>
      <Child onClick={memoizedCallback} name="桃桃" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## useMemo

在文章的开头就已经介绍了，React 的性能优化方向主要是两个：一个是减少重新 render 的次数(或者说减少不必要的渲染)，另一个是减少计算的量。

前面介绍的 React.memo 和 useCallback 都是为了减少重新 render 的次数。对于如何减少计算的量，就是 useMemo 来做的，接下来我们看例子。

可能产生性能问题
就算是一个看起来很简单的组件，也有可能产生性能问题，通过这个最简单的例子来看看还有什么值得优化的地方。

首先我们把 expensiveFn 函数当做一个计算量很大的函数(比如你可以把 i 换成 10000000)，然后当我们每次点击 +1 按钮的时候，都会重新渲染组件，而且都会调用 expensiveFn 函数并输出 49995000。由于每次调用 expensiveFn 所返回的值都一样，所以我们可以想办法将计算出来的值缓存起来，每次调用函数直接返回缓存的值，这样就可以做一些性能优化。

### useMemo 做计算结果缓存

针对上面产生的问题，就可以用 useMemo 来缓存 expensiveFn 函数执行后的值。

首先介绍一下 useMemo 的基本的使用方法，详细的使用方法可见官网[3]：

function computeExpensiveValue() {
  // 计算量很大的代码
  return xxx
}

const memoizedValue = useMemo(computeExpensiveValue, [a, b]);
useMemo 的第一个参数就是一个函数，这个函数返回的值会被缓存起来，同时这个值会作为 useMemo 的返回值，第二个参数是一个数组依赖，如果数组里面的值有变化，那么就会重新去执行第一个参数里面的函数，并将函数返回的值缓存起来并作为 useMemo 的返回值 。

了解了 useMemo 的使用方法，然后就可以对上面的例子进行优化，优化代码如下：

```()
function App() {
  const [num, setNum] = useState(0);

  function expensiveFn() {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += i;
    }
    console.log(result)
    return result;
  }

  const base = useMemo(expensiveFn, []);

  return (
    <div className="App">
      <h1>count：{num}</h1>
      <button onClick={() => setNum(num + base)}>+1</button>
    </div>
  );
}
```

执行上面的代码，然后现在可以观察无论我们点击 +1多少次，只会输出一次 49995000，这就代表 expensiveFn 只执行了一次，达到了我们想要的效果。

### 小结

useMemo 的使用场景主要是用来缓存计算量比较大的函数结果，可以避免不必要的重复计算，有过 vue 的使用经历同学可能会觉得跟 Vue 里面的计算属性有异曲同工的作用。

> 不过另外提醒两点一、如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值；二、计算量如果很小的计算函数，也可以选择不使用 useMemo，因为这点优化并不会作为性能瓶颈的要点，反而可能使用错误还会引起一些性能问题。

## 总结

对于性能瓶颈可能对于小项目遇到的比较少，毕竟计算量小、业务逻辑也不复杂，但是对于大项目，很可能是会遇到性能瓶颈的，但是对于性能优化有很多方面：网络、关键路径渲染、打包、图片、缓存等等方面，具体应该去优化哪方面还得自己去排查，本文只介绍了性能优化中的冰山一角：运行过程中 React 的优化。

React 的优化方向：减少 render 的次数；减少重复计算。

如何去找到 React 中导致性能问题的方法，见 useCallback 部分。

合理的拆分组件其实也是可以做性能优化的，你这么想，如果你整个页面只有一个大的组件，那么当 props 或者 state 变更之后，需要 reconction 的是整个组件，其实你只是变了一个文字，如果你进行了合理的组件拆分，你就可以控制更小粒度的更新。

合理拆分组件还有很多其他好处，比如好维护，而且这是学习组件化思想的第一步，合理的拆分组件又是一门艺术了，如果拆分得不合理，就有可能导致状态混乱，多敲代码多思考。
