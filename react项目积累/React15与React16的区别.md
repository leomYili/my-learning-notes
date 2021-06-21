# 正文

## portal

首先API中,常用的portal在15时,官方提供的是 

```()
unstable_renderSubtreeIntoContainer
unmountComponentAtNode
```

两个特别特殊的api

而到了React 16, 官方支持了 `ReactDom.createPortal(child,container)`;

## 思考

首先可以看到的是react15与react16之间生命周期函数发生了很多改变,这主要是因为到了react16之后,底层框架发生了很大的改变-从diff迁移到fiber

在 Fiber 机制下，render 阶段是允许暂停、终止和重启的。当一个任务执行到一半被打断后，下一次渲染线程抢回主动权时，这个任务被重启的形式是“重复执行一遍整个任务”而非“接着上次执行到的那行代码往下走”。这就导致 render 阶段的生命周期都是有可能被重复执行的。

React 16 打算废弃的是哪些生命周期：
componentWillMount；
componentWillUpdate；
componentWillReceiveProps。
这些生命周期的共性，就是它们都处于 render 阶段，都可能重复被执行，而且由于这些 API 常年被滥用，它们在重复执行的过程中都存在着不可小觑的风险(比如无限循环)。

> 说回 getDerivedStateFromProps 这个 API，它相对于早期的 componentWillReceiveProps 来说，正是做了“合理的减法”。而做这个减法的决心之强烈，从 getDerivedStateFromProps 直接被定义为 static 方法这件事上就可见一斑—— static 方法内部拿不到组件实例的 this，这就导致你无法在 getDerivedStateFromProps 里面做任何类似于 this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作。
> 因此，getDerivedStateFromProps 生命周期替代 componentWillReceiveProps 的背后，是 React 16 在强制推行“只用 getDerivedStateFromProps 来完成 props 到 state 的映射”这一最佳实践。意在确保生命周期函数的行为更加可控可预测，从根源上帮开发者避免不合理的编程方式，避免生命周期的滥用；同时，也是在为新的 Fiber 架构铺路。

所以最大的改变仍然是底层框架的改变,在这之上的各种新api的扩展更多可以看成之前功能的语法糖.

