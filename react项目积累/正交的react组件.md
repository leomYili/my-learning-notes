# 正文

> 所谓正交,即模块之间不会相互影响.在前端场景中,UI与数据处理逻辑分离就是一种符合正交原则的设计,这样有利于长期代码质量维护

## 概述

一个拥有良好正交性的`React app`会按照如下模块分离设计

1. UI 元素(展示型组件)。
2. 取数逻辑(fetch library, REST or GraphQL)。
3. 全局状态管理(redux)。
4. 持久化（local storage, cookies）。

### 示例: 让组件与滚动监听正交

比如一个滚动到一定距离就出现 "jump to top" 的组件 <ScrollToTop>，可能会这么实现：

```jsx
import React, { useState, useEffect } from "react";

const DISTANCE = 500;

function ScrollToTop() {
  const [crossed, setCrossed] = useState(false);

  useEffect(function() {
    const handler = () => setCrossed(window.scrollY > DISTANCE);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function onClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  if (!crossed) {
    return null;
  }
  return <button onClick={onClick}>Jump to top</button>;
}
```

可以看到这里把逻辑和ui全部糅合到了一起

如何进行拆分呢?

```jsx
import { useState, useEffect } from "react";

function useScrollDistance(distance) {
  const [crossed, setCrossed] = useState(false);

  useEffect(
    function() {
      const handler = () => setCrossed(window.scrollY > distance);
      handler();
      window.addEventListener("scroll", handler);
      return () => window.removeEventListener("scroll", handler);
    },
    [distance]
  );

  return crossed;
}

function IfScrollCrossed({ children, distance }) {
  const isBottom = useScrollDistance(distance);
  return isBottom ? children : null;
}
```

通过hooks的能力以及function component,进行了合理的拆分,进行解耦

最后可以任意维度进行封装

```jsx
import React from "react";

// ...

const DISTANCE = 500;

function MyComponent() {
  // ...
  return (
    <IfScrollCrossed distance={DISTANCE}>
      <JumpToTop />
    </IfScrollCrossed>
  );
}

// or

const DISTANCE_NEWSLETTER = 300;

function OtherComponent() {
  // ...
  return (
    <IfScrollCrossed distance={DISTANCE_NEWSLETTER}>
      <SubscribeToNewsletterForm />
    </IfScrollCrossed>
  );
}
```

### 正交设计的好处

- **容易维护：** 正交组件逻辑相互隔离，不用担心连带影响，因此可以放心大胆的维护单个组件。
- **易读：** 由于逻辑分离导致了抽象，因此每个模块做的事情都相对单一，很容易猜测一个组件做的事情。
- **可测试：** 由于逻辑分离，可以采取逐个击破的思路进行单测。

## 精读

> 正交设计一定程度可以理解为合理抽象，完全不抽象与过度抽象都是不可取的，因此列举了四块需要抽象的要点：UI 元素、取数逻辑、全局状态管理、持久化。

从正交设计角度来看，Hooks 解决了状态管理与 UI 分离的问题，Suspense 解决了取数状态与 UI 分离的问题，ErrorBoundary 解决了异常与 UI 分离的问题。

实际上概念不难理解,但现实中如何去做才重要,最佳实践只是规范,但实现却是需要依赖人的主观能动性