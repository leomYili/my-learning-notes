# 正文

> 收集整理React18的新特性,为之后的学习打下基础

## 3大新特性

> 想尝鲜可以将 ReactDOM.render 替换为 ReactDOM.createRoot 调用方式。就可以体验到最新特性

升级方式很简单：

```()
const container = document.getElementById("app");

// 旧 render API
ReactDOM.render(<App tab="home" />, container);

// 新 createRoot API
const root = ReactDOM.createRoot(container);
root.render(<App tab="home" />);
```

API 修改的主要原因还是语义化，即当我们多次调用 render 时，不再需要重复传入 container 参数，因为在新的 API 中，container 已经提前绑定到 root 了。

ReactDOM.hydrate 也被 ReactDOM.hydrateRoot 代替：

```()
const root = ReactDOM.hydrateRoot(container, <App tab="home" />);
// 注意这里不用调用 root.render()
```

这样的好处是，后续如果再调用 `root.render(<Appx />)` 进行重渲染，我们不用关心这个 `root` 来自 `createRoot` 或者 `hydrateRoot`，因为后续 `API` 行为表现都一样，减少了理解成本。

### Automatic batching

也就是合并渲染,react18之前 `setState` 函数由于是一个延时任务,所以如果放在了异步调用中,则无法做合并处理,但现在可以合并渲染了,即使在 `promise`,`timeout`或者`event`回调中调用多次 `setState`,也都会合并为一次渲染.

当然如果想要恢复到之前的强制重渲染也行:

```()
function handleClick() {
  // React 18+
  fetch(/*...*/).then(() => {
    ReactDOM.flushSync(() => {
      setCount((c) => c + 1); // 立刻重渲染
      setFlag((f) => !f); // 立刻重渲染
    });
  });
}
```

### Concurrent APIS

简单来说,这就是一种可以随时中断渲染的设计架构,当有更高优先级的任务到来时,通过放弃当前的渲染,立即执行更高优先级的渲染,换来视觉上更快的响应速度.

React 18 提供了三个新的 API 支持这一模式,分别是:

- startTransition
- useDeferredValue
- `<SuspenseList>`

目前只能使用第一个,用法为:

```()
import { startTransition } from "react";

// 紧急更新：
setInputValue(input);

// 标记回调函数内的更新为非紧急更新：
startTransition(() => {
  setSearchQuery(input);
});
```

### SSR for Suspense

完整名称是: Streaming SSR with selective hydration.

即像水流一样,打造一个从服务端到客户端持续不断的渲染管线,而不是 `renderToString` 那样一次性渲染机制.

所以这个特性其实是为 `SSR` 场景准备的,而功能载体就是 `Suspense`.

主要解决三个问题:

- `SSR` 模式下,如果不同模块取数效率不同,会因为最慢的一个模块拖慢整体 HTML 吞吐时间,这可能导致体验还不如非 `SSR` 来的好
- 即便 `SSR` 内容输出到了页面上,由于js没有加载完毕,所以根本无法进行交互
- 即便 JS 加载完了,由于 React 18 之前只能进行整体 hydration(一整套渲染策略),可能导致卡顿,导致首次交互响应不及时

在 React 18 的 server render 中，只要使用 pipeToNodeWritable 代替 renderToString 并配合 Suspense 就能解决上面三个问题。

总结一下，新版 SSR 性能提高的秘诀在于两个字：按需。