# 正文

## 介绍

在详细介绍 Fiber 之前，先了解一下 Fiber 是什么，以及为什么 React 团队要话两年时间重构协调算法。

React 的核心思想
内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中。

### React 16 之前的不足

首先我们了解一下 React 的工作过程，当我们通过render()和 setState() 进行组件渲染和更新的时候，React 主要有两个阶段：

![4](./img/4.png)

```()
调和阶段(Reconciler)：官方解释。React 会自顶向下通过递归，遍历新数据生成新的 Virtual DOM，然后通过 Diff 算法，找到需要变更的元素(Patch)，放到更新队列里面去。

渲染阶段(Renderer)：遍历更新队列，通过调用宿主环境的API，实际更新渲染对应元素。宿主环境，比如 DOM、Native、WebGL 等。

在协调阶段阶段，由于是采用的递归的遍历方式，这种也被成为 Stack Reconciler，主要是为了区别 Fiber Reconciler 取的一个名字。这种方式有一个特点：一旦任务开始进行，就无法中断，那么 js 将一直占用主线程， 一直要等到整棵 Virtual DOM 树计算完成之后，才能把执行权交给渲染引擎，那么这就会导致一些用户交互、动画等任务无法立即得到处理，就会有卡顿，非常的影响用户体验。
```

### 如何解决之前的不足

> 之前的问题主要的问题是任务一旦执行，就无法中断，js 线程一直占用主线程，导致卡顿。

浏览器每一帧都需要完成哪些工作？
页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿。

1s 60 帧，所以每一帧分到的时间是 1000/60 ≈ 16 ms。所以我们书写代码时力求不让一帧的工作量超过 16ms。

一帧内需要完成如下六个步骤的任务：

1. 处理用户的交互

2. JS 解析执行

3. 帧开始。窗口尺寸变更，页面滚去等的处理

4. rAF(requestAnimationFrame)

5. 布局

6. 绘制

如果这六个步骤中，任意一个步骤所占用的时间过长，总时间超过 16ms 了之后，用户也许就能看到卡顿。

### 解决方案

把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候在继续执行。这种策略叫做 Cooperative Scheduling（合作式调度），操作系统常用任务调度策略之一。

> 补充知识，操作系统常用任务调度策略：先来先服务（FCFS）调度算法、短作业（进程）优先调度算法（SJ/PF）、最高优先权优先调度算法（FPF）、高响应比优先调度算法（HRN）、时间片轮转法（RR）、多级队列反馈法。

合作式调度主要就是用来分配任务的，当有更新任务来的时候，不会马上去做 Diff 操作，而是先把当前的更新送入一个 Update Queue 中，然后交给 Scheduler 去处理，Scheduler 会根据当前主线程的使用情况去处理这次 Update。为了实现这种特性，使用了requestIdelCallbackAPI。对于不支持这个API 的浏览器，React 会加上 pollyfill。

在上面我们已经知道浏览器是一帧一帧执行的，在两个执行帧之间，主线程通常会有一小段空闲时间，requestIdleCallback可以在这个空闲期（Idle Period）调用空闲期回调（Idle Callback），执行一些任务。

![5](./img/5.png)

* 低优先级任务由requestIdleCallback处理；

* 高优先级任务，如动画相关的由requestAnimationFrame处理；

* requestIdleCallback可以在多个空闲期调用空闲期回调，执行任务；

* requestIdleCallback方法提供 deadline，即任务执行限制时间，以切分任务，避免长时间执行，阻塞UI渲染而导致掉帧；

## 什么是 Fiber

为了解决之前提到解决方案遇到的问题，提出了以下几个目标：

暂停工作，稍后再回来。

为不同类型的工作分配优先权。

重用以前完成的工作。

如果不再需要，则中止工作。

为了做到这些，我们首先需要一种方法将任务分解为单元。从某种意义上说，这就是 Fiber，Fiber 代表一种工作单元。

但是仅仅是分解为单元也无法做到中断任务，因为函数调用栈就是这样，每个函数为一个工作，每个工作被称为堆栈帧，它会一直工作，直到堆栈为空，无法中断。

因此 Fiber 就是重新实现的堆栈帧，本质上 Fiber 也可以理解为是一个虚拟的堆栈帧，将可中断的任务拆分成多个子任务，通过按照优先级来自由调度子任务，分段更新，从而将之前的同步渲染改为异步渲染。

所以我们可以说 Fiber 是一种数据结构(堆栈帧)，也可以说是一种解决可中断的调用任务的一种解决方案，它的特性就是时间分片(time slicing)和暂停(supense)。

> 如果了解协程的可能会觉得 Fiber 的这种解决方案，跟协程有点像(区别还是很大的)，是可以中断的，可以控制执行顺序。在 JS 里的 generator 其实就是一种协程的使用方式，不过颗粒度更小，可以控制函数里面的代码调用的顺序，也可以中断。

## Fiber 是如何工作的

1. ReactDOM.render() 和 setState 的时候开始创建更新。

2. 将创建的更新加入任务队列，等待调度。

3. 在 requestIdleCallback 空闲时执行任务。

4. 从根节点开始遍历 Fiber Node，并且构建 WokeInProgress Tree。

5. 生成 effectList。

6. 根据 EffectList 更新 DOM。

![6](./img/6.png)

1. 第一部分从 ReactDOM.render() 方法开始，把接收的 React Element 转换为 Fiber 节点，并为其设置优先级，创建 Update，加入到更新队列，这部分主要是做一些初始数据的准备。

2. 第二部分主要是三个函数：scheduleWork、requestWork、performWork，即安排工作、申请工作、正式工作三部曲，React 16 新增的异步调用的功能则在这部分实现，这部分就是 Schedule 阶段，前面介绍的 Cooperative Scheduling 就是在这个阶段，只有在这个解决获取到可执行的时间片，第三部分才会继续执行。具体是如何调度的，后面文章再介绍，这是 React 调度的关键过程。

3. 第三部分是一个大循环，遍历所有的 Fiber 节点，通过 Diff 算法计算所有更新工作，产出 EffectList 给到 commit 阶段使用，这部分的核心是 beginWork 函数，这部分基本就是 Fiber Reconciler ，包括 reconciliation 和 commit 阶段。

### Fiber Node

FIber Node，承载了非常关键的上下文信息，可以说是贯彻整个创建和更新的流程，下来分组列了一些重要的 Fiber 字段。

```()
{
  ...
  // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
  stateNode: any,

    // 单链表树结构
  return: Fiber | null,// 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  child: Fiber | null,// 指向自己的第一个子节点
  sibling: Fiber | null,  // 指向自己的兄弟结构，兄弟节点的return指向同一个父节点

  // 更新相关
  pendingProps: any,  // 新的变动带来的新的props
  memoizedProps: any,  // 上一次渲染完成之后的props
  updateQueue: UpdateQueue<any> | null,  // 该Fiber对应的组件产生的Update会存放在这个队列里面
  memoizedState: any, // 上一次渲染的时候的state

  // Scheduler 相关
  expirationTime: ExpirationTime,  // 代表任务在未来的哪个时间点应该被完成，不包括他的子树产生的任务
  // 快速确定子树中是否有不在等待的变化
  childExpirationTime: ExpirationTime,

 // 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber
  // 我们称他为`current <==> workInProgress`
  // 在渲染完成之后他们会交换位置
  alternate: Fiber | null,

  // Effect 相关的
  effectTag: SideEffectTag, // 用来记录Side Effect
  nextEffect: Fiber | null, // 单链表用来快速查找下一个side effect
  firstEffect: Fiber | null,  // 子树中第一个side effect
  lastEffect: Fiber | null, // 子树中最后一个side effect
  ....
};
```

### Fiber Reconciler

在第二部分，进行 Schedule 完，获取到时间片之后，就开始进行 reconcile。

Fiber Reconciler 是 React 里的调和器，这也是任务调度完成之后，如何去执行每个任务，如何去更新每一个节点的过程，对应上面的第三部分。

reconcile 过程分为2个阶段（phase）：

1. （可中断）render/reconciliation 通过构造 WorkInProgress Tree 得出 Change。

2. （不可中断）commit 应用这些DOM change。

### reconciliation 阶段

在 reconciliation 阶段的每个工作循环中，每次处理一个 Fiber，处理完可以中断/挂起整个工作循环。通过每个节点更新结束时向上归并 Effect List 来收集任务结果，reconciliation 结束后，根节点的 Effect List里记录了包括 DOM change 在内的所有 Side Effect。

render 阶段可以理解为就是 Diff 的过程，得出 Change(Effect List)，会执行声明如下的声明周期方法：

* [UNSAFE_]componentWillMount（弃用）

* [UNSAFE_]componentWillReceiveProps（弃用）

* getDerivedStateFromProps

* shouldComponentUpdate

* [UNSAFE_]componentWillUpdate（弃用）

* render

由于 reconciliation 阶段是可中断的，一旦中断之后恢复的时候又会重新执行，所以很可能 reconciliation 阶段的生命周期方法会被多次调用，所以在 reconciliation 阶段的生命周期的方法是不稳定的，我想这也是 React 为什么要废弃 componentWillMount 和 componentWillReceiveProps方法而改为静态方法 getDerivedStateFromProps 的原因吧。

### commit 阶段

commit 阶段可以理解为就是将 Diff 的结果反映到真实 DOM 的过程。

在 commit 阶段，在 commitRoot 里会根据 effect的 effectTag，具体 effectTag 见源码 ，进行对应的插入、更新、删除操作，根据 tag 不同，调用不同的更新方法。

commit 阶段会执行如下的声明周期方法：

* getSnapshotBeforeUpdate

* componentDidMount

* componentDidUpdate

* componentWillUnmount

> P.S：注意区别 reconciler、reconcile 和 reconciliation，reconciler 是调和器，是一个名词，可以说是 React 工作的一个模块，协调模块；reconcile 是调和器调和的动作，是一个动词；而 reconciliation 只是 reconcile 过程的第一个阶段。

### Fiber Tree 和 WorkInProgress Tree

React 在 render 第一次渲染时，会通过 React.createElement 创建一颗 Element 树，可以称之为 Virtual DOM Tree，由于要记录上下文信息，加入了 Fiber，每一个 Element 会对应一个 Fiber Node，将 Fiber Node 链接起来的结构成为 Fiber Tree。它反映了用于渲染 UI 的应用程序的状态。这棵树通常被称为 current 树（当前树，记录当前页面的状态）。

Fiber Tree 一个重要的特点是链表结构，将递归遍历编程循环遍历，然后配合 requestIdleCallback API, 实现任务拆分、中断与恢复。

这个链接的结构是怎么构成的呢，这就要主要到之前 Fiber Node 的节点的这几个字段：

```()
// 单链表树结构
{
   return: Fiber | null, // 指向父节点
   child: Fiber | null,// 指向自己的第一个子节点
   sibling: Fiber | null,// 指向自己的兄弟结构，兄弟节点的return指向同一个父节点
}
```

每一个 Fiber Node 节点与 Virtual Dom 一一对应，所有 Fiber Node 连接起来形成 Fiber tree, 是个单链表树结构，如下图所示：

![7](./img/7.png)

对照图来看，是不是可以知道 Fiber Node 是如何联系起来的呢，Fiber Tree 就是这样一个单链表。

当 render 的时候有了这么一条单链表，当调用 setState 的时候又是如何 Diff 得到 change 的呢？

采用的是一种叫双缓冲技术（double buffering），这个时候就需要另外一颗树：WorkInProgress Tree，它反映了要刷新到屏幕的未来状态。

WorkInProgress Tree 构造完毕，得到的就是新的 Fiber Tree，然后喜新厌旧（把 current 指针指向WorkInProgress Tree，丢掉旧的 Fiber Tree）就好了。

这样做的好处：

* 能够复用内部对象（fiber）

* 节省内存分配、GC的时间开销

* 就算运行中有错误，也不会影响 View 上的数据

每个 Fiber上都有个alternate属性，也指向一个 Fiber，创建 WorkInProgress 节点时优先取alternate，没有的话就创建一个。

创建 WorkInProgress Tree 的过程也是一个 Diff 的过程，Diff 完成之后会生成一个 Effect List，这个 Effect List 就是最终 Commit 阶段用来处理副作用的阶段。

