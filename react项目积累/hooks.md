# 正文

- [正文](#正文)
  - [React为什么要搞一个hooks](#react为什么要搞一个hooks)
    - [渲染属性](#渲染属性)
    - [高阶组件](#高阶组件)
    - [生命周期钩子函数里的逻辑太乱了吧](#生命周期钩子函数里的逻辑太乱了吧)
    - [classes真的太让人困惑了](#classes真的太让人困惑了)
  - [什么是State Hooks](#什么是state-hooks)
    - [声明一个状态变量](#声明一个状态变量)
    - [读取状态值](#读取状态值)
    - [更新状态](#更新状态)
    - [假如一个组件有多个状态值怎么办](#假如一个组件有多个状态值怎么办)
    - [react是怎么保证多个useState的相互独立的](#react是怎么保证多个usestate的相互独立的)
    - [什么是Effect Hooks](#什么是effect-hooks)
      - [useEffect做了什么](#useeffect做了什么)
      - [useEffect怎么解绑一些副作用](#useeffect怎么解绑一些副作用)
      - [为什么要让副作用函数每次组件更新都执行一遍](#为什么要让副作用函数每次组件更新都执行一遍)
      - [怎么跳过一些不必要的副作用函数](#怎么跳过一些不必要的副作用函数)
      - [useEffect的优势](#useeffect的优势)
      - [Capture props](#capture-props)
        - [如何绕过Capture Value](#如何绕过capture-value)
      - [不要对 Dependencies 撒谎](#不要对-dependencies-撒谎)
      - [将function挪到effect里](#将function挪到effect里)
      - [替代shouldComponentUpdate](#替代shouldcomponentupdate)
      - [替代componentDidMount](#替代componentdidmount)
      - [替代componentDidUpdate](#替代componentdidupdate)
      - [替代forceUpdate](#替代forceupdate)
    - [还有哪些自带的Effect Hooks](#还有哪些自带的effect-hooks)
    - [怎么写自定义的Effect Hooks](#怎么写自定义的effect-hooks)
  - [Hook的执行机制](#hook的执行机制)
    - [第一个：函数调用完之后会把函数中的变量清除，但ReactHook是怎么复用状态呢](#第一个函数调用完之后会把函数中的变量清除但reacthook是怎么复用状态呢)
    - [React是怎么区分多次调用的hooks的呢，怎么知道这个hook就是这个作用呢](#react是怎么区分多次调用的hooks的呢怎么知道这个hook就是这个作用呢)
    - [自定义Hook](#自定义hook)
  - [自定义Hooks](#自定义hooks)
    - [如何将函数抽到 useEffect 外部？](#如何将函数抽到-useeffect-外部)
    - [为什么 useCallback 比 componentDidUpdate 更好用](#为什么-usecallback-比-componentdidupdate-更好用)

## React为什么要搞一个hooks

想要复用一个有状态的组件太麻烦了！

我们都知道react都核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。但假如你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长且难以复用。尤其是那些写成class的组件，它们本身包含了状态（state），所以复用这类组件就变得很麻烦。

那之前，官方推荐怎么解决这个问题呢？答案是：渲染属性（Render Props）和高阶组件（Higher-Order Components）。

React Hooks 要解决的问题是状态共享,是继 render-props 和 higher-order components 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。

### 渲染属性

渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或组件。如下面的代码可以看到我们的DataProvider组件包含了所有跟状态相关的代码，而Cat组件则可以是一个单纯的展示型组件，这样一来DataProvider就可以单独复用了。

```()
import Cat from 'components/cat'
class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: 'Zac' };
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={data => (
  <Cat target={data.target} />
)}/>
```

虽然这个模式叫Render Props，但不是说非用一个叫render的props不可，习惯上大家更常写成下面这种：

```()
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>
```

### 高阶组件

高阶组件这个概念就更好理解了，说白了就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。

```()
const withUser = WrappedComponent => {
  const user = sessionStorage.getItem("user");
  return props => <WrappedComponent user={user} {...props} />;
};

const UserPage = props => (
  <div class="user-container">
    <p>My name is {props.user}!</p>
  </div>
);

export default withUser(UserPage);
```

以上这两种模式看上去都挺不错的，很多库也运用了这种模式，比如我们常用的React Router。但我们仔细看这两种模式，会发现它们会增加我们代码的层级关系。最直观的体现，打开devtool看看你的组件层级嵌套是不是很夸张吧。这时候再回过头看我们上一节给出的hooks例子，是不是简洁多了，没有多余的层级嵌套。把各种想要的功能写成一个一个可复用的自定义hook，当你的组件想用什么功能时，直接在组件里调用这个hook即可。

### 生命周期钩子函数里的逻辑太乱了吧

我们通常希望一个函数只做一件事情，但我们的生命周期钩子函数里通常同时做了很多事情。比如我们需要在componentDidMount中发起ajax请求获取数据，绑定一些事件监听等等。同时，有时候我们还需要在componentDidUpdate做一遍同样的事情。当项目变复杂后，这一块的代码也变得不那么直观。

### classes真的太让人困惑了

我们用class来创建react组件时，还有一件很麻烦的事情，就是this的指向问题。为了保证this的指向正确，我们要经常写这样的代码：`this.handleClick = this.handleClick.bind(this)`，或者是这样的代码：`<button onClick={() => this.handleClick(e)}>`。一旦我们不小心忘了绑定this，各种bug就随之而来，很麻烦。

## 什么是State Hooks

```()
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 声明一个状态变量

```()
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
}
```

useState是react自带的一个hook函数，它的作用就是用来声明状态变量。useState这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第[0]项是当前当前的状态值，第[1]项是可以改变状态值的方法函数。

如果不用数组解构的话，可以写成下面这样。实际上数组解构是一件开销很大的事情，用下面这种写法，或者改用对象解构，性能会有很大的提升。

```()
let _useState = useState(0);
let count = _useState[0];
let setCount = _useState[1];
```

### 读取状态值

```()
<p>You clicked {count} times</p>
```

是不是超简单？因为我们的状态count就是一个单纯的变量而已，我们再也不需要写成{this.state.count}这样了。

### 更新状态

```()
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

react如何帮我们记住state中的值;

### 假如一个组件有多个状态值怎么办

useState是可以多次调用的，所以我们完全可以这样写：

```()
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

```

其次，useState接收的初始值没有规定一定要是string/number/boolean这种简单数据类型，它完全可以接收对象或者数组作为参数。唯一需要注意的点是，之前我们的this.setState做的是合并状态后返回一个新状态，而useState是直接替换老状态后返回新状态。最后，react也给我们提供了一个useReducer的hook，如果你更喜欢redux式的状态管理方案的话。

从ExampleWithManyStates函数我们可以看到，useState无论调用多少次，相互之间是独立的。这一点至关重要。为什么这么说呢？
其实我们看hook的“形态”，有点类似之前被官方否定掉的Mixins这种方案，都是提供一种“插拔式的功能注入”的能力。而mixins之所以被否定，是因为Mixins机制是让多个Mixins共享一个对象的数据空间，这样就很难确保不同Mixins依赖的状态不发生冲突。
而现在我们的hook，一方面它是直接用在function当中，而不是class；另一方面每一个hook都是相互独立的，不同组件调用同一个hook也能保证各自状态的独立性。这就是两者的本质区别了。

### react是怎么保证多个useState的相互独立的

还是看上面给出的ExampleWithManyStates例子，我们调用了三次useState，每次我们传的参数只是一个值（如42，‘banana’），我们根本没有告诉react这些值对应的key是哪个，那react是怎么保证这三个useState找到它对应的state呢？

答案是，react是根据useState出现的顺序来定的。我们具体来看一下：

```()
  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  useState('banana');  //读取状态变量fruit的值（这时候传的参数banana直接被忽略）
  useState([{ text: 'Learn Hooks' }]); //...
```

假如我们改一下代码：

```()
let showFruit = true;
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  
  if(showFruit) {
    const [fruit, setFruit] = useState('banana');
    showFruit = false;
  }

  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

```（）
  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  // useState('banana');  
  useState([{ text: 'Learn Hooks' }]); //读取到的却是状态变量fruit的值，导致报错
```

鉴于此，react规定我们必须把hooks写在函数的最外层，不能写在**ifelse**等条件语句当中，来确保hooks的执行顺序一致。

### 什么是Effect Hooks

```()
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 更新文档的标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

我们写的有状态组件，通常会产生很多的副作用（side effect），比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等。我们之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。它以一抵三。

同时，由于前文所说hooks可以反复多次使用，相互独立。所以我们合理的做法是，给每一个副作用一个单独的useEffect钩子。这样一来，这些副作用不再一股脑堆在生命周期钩子里，代码变得更加清晰。

#### useEffect做了什么

```()
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

首先，我们声明了一个状态变量count，将它的初始值设为0。然后我们告诉react，我们的这个组件有一个副作用。我们给useEffecthook传了一个匿名函数，这个匿名函数就是我们的副作用。在这个例子里，我们的副作用是调用browser API来修改文档标题。当react要渲染我们的组件时，它会先记住我们用到的副作用。等react更新了DOM之后，它再依次执行我们定义的副作用函数。

这里要注意几点：

第一，react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数。而之前我们要用两个声明周期函数来分别表示首次渲染（componentDidMount），和之后的更新导致的重新渲染（componentDidUpdate）。
第二，useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的，而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。这种安排对大多数副作用说都是合理的，但有的情况除外，比如我们有时候需要先根据DOM计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生。

#### useEffect怎么解绑一些副作用

这种场景很常见，当我们在componentDidMount里添加了一个注册，我们得马上在componentWillUnmount中，也就是组件被注销之前清除掉我们添加的注册，否则内存泄漏的问题就出现了。

怎么清除呢？让我们传给useEffect的副作用函数返回一个新的函数即可。这个新的函数将会在组件下一次重新渲染之后执行。这种模式在一些pubsub模式的实现中很常见。看下面的例子：

```()
import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

这里有一个点需要重视！这种解绑的模式跟componentWillUnmount不一样。componentWillUnmount只会在组件被销毁前执行一次而已，而useEffect里的函数，每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍。所以我们一起来看一下下面这个问题。

#### 为什么要让副作用函数每次组件更新都执行一遍

但useEffect则没这个问题，因为它在每次组件更新后都会重新执行一遍。所以代码的执行顺序是这样的：

```()
1.页面首次渲染
2.替friend.id=1的朋友注册

3.突然friend.id变成了2
4.页面重新渲染
5.清除friend.id=1的绑定
6.替friend.id=2的朋友注册
```

#### 怎么跳过一些不必要的副作用函数

每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。怎么跳过一些不必要的计算呢？我们只需要给useEffect传第二个参数即可。用第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。

```()
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句
```

当我们第二个参数传一个空数组[]时，其实就相当于只在首次渲染的时候执行。也就是componentDidMount加componentWillUnmount的模式。不过这种用法可能带来bug，少用。

#### useEffect的优势

- `useEffect`在渲染结束时执行,所以不会阻塞浏览器渲染进程,所以使用 `Function Component` 写的项目一般都拥有更好的性能.
- 自然符合 React Fiber 的理念，因为 Fiber 会根据情况暂停或插队执行不同组件的 Render，如果代码遵循了 Capture Value 的特性，在 Fiber 环境下会保证值的安全访问，同时弱化生命周期也能解决中断执行时带来的问题。
- useEffect 不会在服务端渲染时执行。
- 由于在 DOM 执行完毕后才执行，所以能保证拿到状态生效后的 DOM 属性。

#### Capture props

对比下面两段代码

**class Component:**

```jsx
class ProfilePage extends React.Component {
  render() {
    setTimeout(() => {
      // 如果父组件 reRender，this.props 拿到的永远是最新的。
      // 并不是 props 变了，而是 this.props 指向了新的 props，旧的 props 找不到了
      console.log(this.props);
    }, 3000);
  }
}
```

如果希望在 Class Component 捕获瞬时 Props，可以： const props = this.props;，但这样的代码很蹩脚，所以如果希望拿到稳定的 props，使用 Function Component 是更好的选择。

**function Component:**

```jsx
function ProfilePage(props) {
  setTimeout(() => {
    // 就算父组件 reRender，这里拿到的 props 也是初始的
    console.log(props);
  }, 3000);
}
```

React 文档中描述的 props 不是不可变（Immutable） 数据吗？为啥在运行时还会发生变化呢？

原因在于，虽然 props 不可变，是 this 在 Class Component 中是可变的，因此 this.props 的调用会导致每次都访问最新的 props。

而 Function Component 不存在 this.props 的语法，因此 props 总是不可变的。

##### 如何绕过Capture Value

利用 `useRef` 就可以绕过特性,可以认为 `ref` 在所有Render过程中保持着唯一引用,因此所有对 `ref` 的赋值或取值,拿到的都只有一个最终状态,而不会在每个Render间存在隔离

#### 不要对 Dependencies 撒谎

如果明明使用了某个变量,却没有声明在依赖中,等于向react撒谎,后果就是,当依赖的变量改变时,`useEffect`也不会再次执行:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这里的count永远是初始化的0
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

由于 useEffect 符合 Capture Value 的特性，拿到的 count 值永远是初始化的 0。相当于 setInterval 永远在 count 为 0 的 Scope 中执行，你后续的 setCount 操作并不会产生任何作用。

#### 将function挪到effect里

> 如果函数定义不在`useEffect`函数体内,可能会遗漏依赖

可以使用useCallback来实现

```jsx
function Parent() {
  const [query, setQuery] = useState("react");

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + query;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

由于函数也具有 Capture Value 特性，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖。useCallback 做的事情，就是在其依赖变化时，返回一个新的函数引用，触发 useEffect 的依赖变化，并激活其重新执行

Function Component 中利用 useCallback 封装的取数函数，可以直接作为依赖传入 useEffect，useEffect 只要关心取数函数是否变化，而取数参数的变化在 useCallback 时关心。


#### 替代shouldComponentUpdate

可以是:

```jsx
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

或者通用方法:

```jsx
const Button = React.memo(props => {
  // your component
});
```

#### 替代componentDidMount

```jsx
useEffect(() => void fn(),[]);
```

#### 替代componentDidUpdate

除了初始化第一次不执行,后续每次都执行,所以跳过第一次即可

```jsx
const mounting = useRef(true);
useEffect(() => {
  if (mounting.current) {
    mounting.current = false;
  } else {
    fn();
  }
});
```

#### 替代forceUpdate

```jsx
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

function handleClick() {
  forceUpdate();
}
```

### 还有哪些自带的Effect Hooks

除了上文重点介绍的useState和useEffect，react还给我们提供来很多有用的hooks：

* useContext
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeMethods
* useMutationEffect
* useLayoutEffect

### 怎么写自定义的Effect Hooks

比如我们可以把上面写的FriendStatus组件中判断朋友是否在线的功能抽出来，新建一个useFriendStatus的hook专门用来判断某个id是否在线。

```()
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

这时候FriendStatus组件就可以简写为：

```()
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

假如这个时候我们又有一个朋友列表也需要显示是否在线的信息：

```()
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

## Hook的执行机制

### 第一个：函数调用完之后会把函数中的变量清除，但ReactHook是怎么复用状态呢

React 保持对当先渲染中的组件的追踪，每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个Hook的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。

之所以不叫createState，而是叫useState，因为 state 只在组件首次渲染的时候被创建。在下一次重新渲染时，useState 返回给我们当前的 state。

```()
    const [count, setCount] = useState(1);
    setCount(2);
    //第一次渲染
        //创建state，
        //设置count的值为2
    //第二次渲染
        //useState(1)中的参数忽略，并把count赋予2
```

### React是怎么区分多次调用的hooks的呢，怎么知道这个hook就是这个作用呢

React 靠的是 Hook 调用的顺序。在一个函数组件中每次调用Hooks的顺序是相同。借助官网的一个例子：

```()
// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm)     // 2. 替换保存 form 的 effect
useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle)     // 4. 替换更新标题的 effect

// ...

```

在上面hook规则的时候提到Hook一定要写在函数组件的对外层，不要写在判断、循环中，正是因为要保证Hook的调用顺序相同。

### 自定义Hook

自定义hooks可以说成是一种约定而不是功能。当一个函数以use开头并且在函数内部调用其他hooks，那么这个函数就可以成为自定义hooks，比如说useSomething。
自定义Hooks可以封装状态，能够更好的实现状态共享。
我们来封装一个数字加减的Hook

```()
const useCount = (num) => {
    let [count, setCount] = useState(num);
    return [count,()=>setCount(count + 1), () => setCount(count - 1)]
};

```

这个自定义Hook内部使用useState定义一个状态，返回一个数组，数组中有状态的值、状态++的函数，状态--的函数。

```()
const CustomComp = () => {
    let [count, addCount, redCount] = useCount(1);

    return (
        <>
            <h1>{count}</h1>
            <button onClick={addCount}> + </button>
            <button onClick={redCount}> - </button>
        </>
    )
}
```

## 自定义Hooks

自定义 Hooks 允许创建自定义 Hook，只要函数名遵循以 use 开头，且返回非 JSX 元素，就是 Hooks 啦！**自定义 Hooks 内还可以调用包括内置 Hooks 在内的所有自定义 Hooks**

也就是我们可以将 useEffect 写到自定义 Hook 里：

```()
function useCurrentValue(value) {
  const ref = useRef(0);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
```

这里又引出一个新的概念，就是 useEffect 的第二个参数，dependences。dependences 这个参数定义了 useEffect 的依赖，在新的渲染中，只要所有依赖项的引用都不发生变化，useEffect 就不会被执行，且当依赖项为 [] 时，useEffect 仅在初始化执行一次，后续的 Rerender 永远也不会被执行。

### 如何将函数抽到 useEffect 外部？

为了解决这个问题，我们要引入一个新的 Hook：useCallback，它就是解决将函数抽到 useEffect 外部的问题。

我们先看 useCallback 的用法：

```()
function Counter() {
  const [count, setCount] = useState(0);

  const getFetchUrl = useCallback(() => {
    return "https://v?query=" + count;
  }, [count]);

  useEffect(() => {
    getFetchUrl();
  }, [getFetchUrl]);

  return <h1>{count}</h1>;
}
```

可以看到，useCallback 也有第二个参数 - 依赖项，我们将 getFetchUrl 函数的依赖项通过 useCallback 打包到新的 getFetchUrl 函数中，那么 useEffect 就只需要依赖 getFetchUrl 这个函数，就实现了对 count 的间接依赖。

换句话说，我们利用了 useCallback 将 getFetchUrl 函数抽到了 useEffect 外部。

### 为什么 useCallback 比 componentDidUpdate 更好用

因为依赖的是一个函数,而不是某些参数,这样可以更好的做到分离

