# 正文

## React 渲染性能优化的三个方向

其实也适用于其他软件开发领域，这三个方向分别是:

* 减少计算的量。 -> 对应到 React 中就是减少渲染的节点 或者 降低组件渲染的复杂度
* 利用缓存。-> 对应到 React 中就是如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染
* 精确重新计算的范围。 对应到 React 中就是绑定组件和状态关系, 精确判断更新的'时机'和'范围'. 只重新渲染'脏'的组件，或者说降低渲染范围
<https://juejin.im/post/5d045350f265da1b695d5bf2>

## 1. 使用纯组件

对于像 this 的类组件来说，React 提供了 PureComponent 基类。扩展 React.PureComponent 类的类组件被视为纯组件。

它与普通组件是一样的，只是 PureComponents 负责 shouldComponentUpdate——它对状态和 props 数据进行浅层比较（shallow comparison）。

如果先前的状态和 props 数据与下一个 props 或状态相同，则组件不会重新渲染。

## 2. 使用 React.memo 进行组件记忆

React.memo 是一个高阶组件。

它很像 PureComponent，但 PureComponent 属于 Component 的类实现，而“memo”则用于创建函数组件。

这里与纯组件类似，如果输入 props 相同则跳过组件渲染，从而提升组件性能。

它会记忆上次某个输入 prop 的执行输出并提升应用性能。即使在这些组件中比较也是浅层的。

你还可以为这个组件传递自定义比较逻辑。

用户可以用自定义逻辑深度对比（deep comparison）对象。如果比较函数返回 false 则重新渲染组件，否则就不会重新渲染。

## 3. 使用 shouldComponentUpdate 生命周期事件

这是在重新渲染组件之前触发的其中一个生命周期事件。

可以利用此事件来决定何时需要重新渲染组件。如果组件 props 更改或调用 setState，则此函数返回一个 Boolean 值。

在这两种情况下组件都会重新渲染。我们可以在这个生命周期事件中放置一个自定义逻辑，以决定是否调用组件的 render 函数。

这个函数将 nextState 和 nextProps 作为输入，并可将其与当前 props 和状态做对比，以决定是否需要重新渲染。

## 4. 懒加载组件

导入多个文件合并到一个文件中的过程叫打包，使应用不必导入大量外部文件。

所有主要组件和外部依赖项都合并为一个文件，通过网络传送出去以启动并运行 Web 应用。

这样可以节省大量网络调用，但这个文件会变得很大，消耗大量网络带宽。

应用需要等待这个文件的加载和执行，所以传输延迟会带来严重的影响。

为了解决这个问题，我们引入代码拆分的概念。

像 webpack 这样的打包器支持就支持代码拆分，它可以为应用创建多个包，并在运行时动态加载，减少初始包的大小。

```()
import React, { lazy, Suspense } from "react";

export default class CallingLazyComponents extends React.Component {
  render() {

    var ComponentToLazyLoad = null;

    if(this.props.name == "Mayank") { 
      ComponentToLazyLoad = lazy(() => import("./mayankComponent"));
    } else if(this.props.name == "Anshul") {
      ComponentToLazyLoad = lazy(() => import("./anshulComponent"));
    }
    return (
        <div>
            <h1>This is the Base User: {this.state.name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ComponentToLazyLoad />
            </Suspense>
        </div>
    )
  }
}
```

上面的代码中有一个条件语句，它查找 props 值，并根据指定的条件加载主组件中的两个组件。

我们可以按需懒惰加载这些拆分出来的组件，增强应用的整体性能。

假设有两个组件 WelcomeComponent 或 GuestComponents，我们根据用户是否登录而渲染其中一个。

我们可以根据具体的条件延迟组件加载，无需一开始就加载两个组件。

```()
import React, { lazy, Suspense } from "react";

export default class UserSalutation extends React.Component {

    render() {
        if(this.props.username !== "") {
          const WelcomeComponent = lazy(() => import("./welcomeComponent"));
          return (
              <div>
                  <Suspense fallback={<div>Loading...</div>}>
                      <WelcomeComponent />
                  </Suspense>
              </div>
          )
        } else {
            const GuestComponent = lazy(() => import("./guestComponent"));
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GuestComponent />
                    </Suspense>
                </div>
            )
        }
    }
}
```

### 这个方法的好处

主包体积变小，消耗的网络传输时间更少。

动态单独加载的包比较小，可以迅速加载完成。

我们可以分析应用来决定懒加载哪些组件，从而减少应用的初始加载时间。

## 5. 使用 React Fragments 避免额外标记

使用 Fragments 减少了包含的额外标记数量，这些标记只是为了满足在 React 组件中具有公共父级的要求。

在上面指定的组件中，我们需要一个额外的标签为要渲染的组件提供公共父级。

除了充当组件的父标签之外，这个额外的 div 没有其他用途。

要解决此问题，我们可以将元素包含在片段（fragement）中。

片段不会向组件引入任何额外标记，但它仍然为两个相邻标记提供父级，因此满足在组件顶级具有单个父级的条件。

上面的代码没有额外的标记，因此节省了渲染器渲染额外元素的工作量。

## 6. 不要使用内联函数定义

如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例。

当 React 进行虚拟 DOM diffing 时，它每次都会找到一个新的函数实例；因此在渲染阶段它会会绑定新函数并将旧实例扔给垃圾回收。

因此直接绑定内联函数就需要额外做垃圾回收和绑定到 DOM 的新函数的工作。

```()
import React from "react";

export default class InlineFunctionComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome Guest</h1>
        <input type="button" onClick={(e) => { this.setState({inputValue: e.target.value}) }} value="Click For Inline Function" />
      </div>
    )
  }
}
```

如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例。

当 React 进行虚拟 DOM diffing 时，它每次都会找到一个新的函数实例；因此在渲染阶段它会会绑定新函数并将旧实例扔给垃圾回收。

因此直接绑定内联函数就需要额外做垃圾回收和绑定到 DOM 的新函数的工作。

所以不要用内联函数，而是在组件内部创建一个函数，并将事件绑定到该函数本身。这样每次调用 render 时就不会创建单独的函数实例了，参考组件如下。

```()
import React from "react";

export default class InlineFunctionComponent extends React.Component {
  
  setNewStateData = (event) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1>Welcome Guest</h1>
        <input type="button" onClick={this.setNewStateData} value="Click For Inline Function" />
      </div>
    )
  }
}
```

## 7. 避免 componentWillMount() 中的异步请求

componentWillMount 是在渲染组件之前调用的。

这个函数用的不多，可用来配置组件的初始配置，但使用 constructor 方法自己也能做到。

该方法无法访问 DOM 元素，因为组件还没挂载上来。

一些开发人员认为这个函数可以用来做异步数据 API 调用，但其实这没什么好处。

由于 API 调用是异步的，因此组件在调用 render 函数之前不会等待 API 返回数据。于是在初始渲染中渲染组件时没有任何数据。

## 8. 在 Constructor 的早期绑定函数

当我们在 React 中创建函数时，我们需要使用 bind 关键字将函数绑定到当前上下文。

绑定可以在构造函数中完成，也可以在我们将函数绑定到 DOM 元素的位置上完成。

```()
import React from "react";

export default class DelayedBinding extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
}
```

## 9. 箭头函数与构造函数中的绑定

处理类时的标准做法就是使用箭头函数。使用箭头函数时会保留执行的上下文。

我们调用它时不需要将函数绑定到上下文。

箭头函数好处多多，但也有缺点。

当我们添加箭头函数时，该函数被添加为对象实例，而不是类的原型属性。这意味着如果我们多次复用组件，那么在组件外创建的每个对象中都会有这些函数的多个实例。

每个组件都会有这些函数的一份实例，影响了可复用性。此外因为它是对象属性而不是原型属性，所以这些函数在继承链中不可用。

因此箭头函数确实有其缺点。实现这些函数的最佳方法是在构造函数中绑定函数，如上所述(第8点)

## 10. 避免使用内联样式属性

使用内联样式时浏览器需要花费更多时间来处理脚本和渲染，因为它必须映射传递给实际 CSS 属性的所有样式规则。

更好的办法是将 CSS 文件导入组件。

## 11. 优化 React 中的条件渲染

安装和卸载 React 组件是昂贵的操作。为了提升性能，我们需要减少安装和卸载的操作。

很多情况下在我们可能会渲染或不渲染特定元素，这时可以用条件渲染。

```()
import React from "react";

import AdminHeaderComponent from "./AdminHeaderComponent";
import HeaderComponent from "./HeaderComponent";
import ContentComponent from "./ContentComponent"

export default class ConditionalRendering extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
  }
  
  render() {
    return (
      <>
        { this.state.name == "Mayank" && <AdminHeaderComponent></AdminHeaderComponent> }
        <HeaderComponent></HeaderComponent>
        <ContentComponent></ContentComponent>
      </>
    )
  }
}

```

## 12. 不要在 render 方法中导出数据

纯函数对 render 方法意味着什么？

纯函数意味着我们应该确保 setState 和查询原生 DOM 元素等任何可以修改应用状态的东西不会被调用。

该函数永远不该更新应用的状态。

更新组件状态的问题在于，当状态更新时会触发另一个 render 循环，后者在内部会再触发一个 render 循环，以此类推。

```()
import React from "react";

export default class RenderFunctionOptimization extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
  }
  
  render() {
    this.setState({
      name: this.state.name + "_"
    });

    return (
      <div>
        <b>User Name: {this.state.name}</b>
      </div>
    );
  }
}
```

在上面的代码中，每次调用 render 函数时都会更新状态。状态更新后组件将立即重新渲染。因此更新状态会导致 render 函数的递归调用。

render 函数应保持纯净，以确保组件以一致的方式运行和渲染。

## 13. 为组件创建错误边界

错误边界是一个 React 组件，可以捕获子组件中的 JavaScript 错误。我们可以包含错误、记录错误消息，并为 UI 组件故障提供回退机制。

错误边界涉及一个高阶组件，包含以下方法：static getDerivedStateFromError() 和 componentDidCatch()。

static 函数用于指定回退机制，并从收到的错误中获取组件的新状态。

componentDidCatch 函数用来将错误信息记录到应用中。

## 14. 组件的不可变数据结构

React 的灵魂是函数式编程。如果我们希望组件能一致工作，则 React 组件中的状态和 props 数据应该是不可变的。

## 15. 使用唯一键迭代

当我们需要渲染项目列表时应该为项目添加一个键。

键可以用来识别已更改、添加或删除的项目。键为元素提供了稳定的标识。一个键应该对应列表中的唯一一个元素。

如果开发人员没有为元素提供键，则它将 index 作为默认键。在下面的代码中我们默认不添加任何键，因此 index 将用作列表的默认键。

使用 index 作为键就不会出现标识不唯一的问题了，因为 index 只会标识所渲染的组件。

我们可以在以下场景中使用 index 作为键：

1. 列表项是静态的，项目不随时间变化。

2. Items 没有唯一 ID。

3. List 永远不会重新排序或过滤。

4. 不会从顶部或中间添加或删除项目。

### 在列表中添加项目

使用 index 作为键会加大错误率并降低应用的性能。

每当新元素添加到列表时，默认情况下 React 会同时遍历新创建的列表和旧列表，并在需要时进行突变。

在列表顶部添加一个新元素（包含 index 作为键）时，全部已有组件的索引都会更新。

索引更新后，之前键值为 1 的元素现在的键值变成了 2。更新所有组件会拖累性能。

上面的代码允许用户在列表顶部添加新项目。但在顶部插入元素后果最严重。因为顶部元素一变，后面所有的元素都得跟着改键值，从而导致性能下降。

因此，我们应该确保键值和元素一一对应不会变化。

## 16. 事件节流和防抖

节流（throttling）和防抖（debouncing）可用来限制在指定时间内调用的事件处理程序的数量。

事件处理程序是响应不同事件（如鼠标单击和页面滚动）而调用的函数。事件触发事件处理程序的速率是不一样的。

## 17. 使用 CDN

谷歌、亚马逊和微软等公司提供了许多内容分发网络。

这些 CDN 是可在你的应用中使用的外部资源。我们甚至可以创建私有 CDN 并托管我们的文件和资源。

使用 CDN 有以下好处：

* 不同的域名。浏览器限制了单个域名的并发连接数量，具体取决于浏览器设置。假设允许的并发连接数为 10。如果要从单个域名中检索 11 个资源，那么同时完成的只有 10 个，还有 1 个需要再等一会儿。CDN 托管在不同的域名 / 服务器上。因此资源文件可以分布在不同的域名中，提升了并发能力。

* 文件可能已被缓存。有很多网站使用这些 CDN，因此你尝试访问的资源很可能已在浏览器中缓存好了。这时应用将访问文件的已缓存版本，从而减少脚本和文件执行的网络调用和延迟，提升应用性能。

* 高容量基础设施。这些 CDN 由大公司托管，因此可用的基础设施非常庞大。他们的数据中心遍布全球。向 CDN 发出请求时，它们将通过最近的数据中心提供服务，从而减少延迟。这些公司会对服务器做负载平衡，以确保请求到达最近的服务器并减少网络延迟，提升应用性能。

## 18. 用 CSS 动画代替 JavaScript 动画

在 HTML 5 和 CSS 3 出现之前，动画曾经是 JavaScript 的专属，但随着 HTML 5 和 CSS 3 的引入情况开始变化。现在动画甚至可以由 CSS 3 来处理了。

## 19. 在 Web 服务器上启用 gzip 压缩

压缩是节省网络带宽和加速应用的最简单方法。

我们可以把网络资源压缩到更小的尺寸。Gzip 是一种能够快速压缩和解压缩文件的数据压缩算法。

当 Web 服务器收到请求时，它会提取文件数据并查找 Accept-Encoding 标头以确定如何压缩应用。

如果服务器支持 gzip 压缩，资源会被压缩后通过网络发送。每份资源的压缩副本（添加了 Content-Encoding 标头）指定使用 gzip 解压。

然后，浏览器将内容解压缩原始版本在渲染给用户。

## 20. 使用 Web Workers 处理 CPU 密集任务

JavaScript 是一个单线程应用，但在渲染网页时需要执行多个任务：

处理 UI 交互、处理响应数据、操纵 DOM 元素、启用动画等。所有这些任务都由单个线程处理。

可以使用 worker 来分担主线程的负载。

Worker 线程在后台运行，可以在不中断主线程的情况下执行多个脚本和 JavaScript 任务。

每当需要执行长时间的 CPU 密集任务时，可以使用 worker 在单独的线程上执行这些逻辑块。

## 21. React 组件的服务端渲染

服务端渲染可以减少初始页面加载延迟。

我们可以让网页从服务端加载初始页面，而不是在客户端上渲染。这样对 SEO 非常有利。

服务端渲染是指第一个组件显示的内容是从服务器本身发送的，而不是在浏览器级别操作。之后的页面直接从客户端加载。
