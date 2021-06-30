# 正文

- [正文](#正文)
  - [Typescript 的主要特点是什么?](#typescript-的主要特点是什么)
  - [使用 Typescript 有什么好处](#使用-typescript-有什么好处)
  - [Typescript 的内置类型有哪些](#typescript-的内置类型有哪些)
  - [TypeScript 目前的稳定版本是什么？](#typescript-目前的稳定版本是什么)
  - [TypeScript 中的接口是什么？](#typescript-中的接口是什么)
  - [TypeScript 中的模块是什么？](#typescript-中的模块是什么)
  - [TypeScript 中的类型断言是什么？](#typescript-中的类型断言是什么)
  - [如何在 TypeScript 中创建变量？](#如何在-typescript-中创建变量)
  - [在 TypeScript 中如何从子类调用基类构造函数？](#在-typescript-中如何从子类调用基类构造函数)
  - [TypeScript 中的类是什么？你如何定义它们？](#typescript-中的类是什么你如何定义它们)
  - [TypeScript 与 JavaScript 有什么关系？](#typescript-与-javascript-有什么关系)
  - [TypeScript 支持哪些 JSX 模式？](#typescript-支持哪些-jsx-模式)
  - [如何编译 TypeScript 文件？](#如何编译-typescript-文件)
  - [TypeScript 中有哪些范围可用？这与 JS 相比如何？](#typescript-中有哪些范围可用这与-js-相比如何)
  - [解释 rest 参数和声明 rest 参数的规则](#解释-rest-参数和声明-rest-参数的规则)
  - [什么是三斜线指令？有哪些三斜杠指令？](#什么是三斜线指令有哪些三斜杠指令)
  - [Omit 类型有什么作用？](#omit-类型有什么作用)
  - [TypeScript 中如何实现函数重载？](#typescript-中如何实现函数重载)
  - [如何让接口的所有属性都可选？](#如何让接口的所有属性都可选)
  - [什么是装饰器，它们可以应用于什么？](#什么是装饰器它们可以应用于什么)

> typescript 收集的相关题目

## Typescript 的主要特点是什么?

- 跨平台：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。
- ES6 特性：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。
- 面向对象的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。
- 静态类型检查：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。
- 可选的静态类型：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。
- (DOM 操作：您可以使用 TypeScript 来操作 DOM 以添加或删除客户端网页元素。)?????

## 使用 Typescript 有什么好处

- TypeScript 更具表现力，这意味着它的语法混乱更少。
- 由于高级调试器专注于在编译时之前捕获逻辑错误，因此调试很容易。
- 静态类型使 TypeScript 比 JavaScript 的动态类型更易于阅读和结构化。
- 由于通用的转译，它可以跨平台使用，在客户端和服务器端项目中。

## Typescript 的内置类型有哪些

- 原始数据类型:布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt,枚举类型
- 对象的类型-接口(interface),还有高级类型,包括交叉类型,联合类型等

## TypeScript 目前的稳定版本是什么？

当前的稳定版本是 4.2.3。

## TypeScript 中的接口是什么？

接口为使用该接口的对象进行定义或声明结构。

接口是用关键字定义的 interface，它可以包含使用函数或箭头函数的属性和方法声明。

## TypeScript 中的模块是什么？

TypeScript 中的模块是相关变量、函数、类和接口的集合。

你可以将模块视为包含执行任务所需的一切的容器。可以导入模块以轻松地在项目之间共享代码。

## TypeScript 中的类型断言是什么？

TypeScript 中的类型断言的工作方式类似于其他语言中的类型转换，但没有 C# 和 Java 等语言中可能的类型检查或数据重组。类型断言对运行时没有影响，仅由编译器使用。

类型断言本质上是类型转换的软版本，它建议编译器将变量视为某种类型，但如果它处于不同的形式，则不会强制它进入该模型。

## 如何在 TypeScript 中创建变量？

你可以通过三种方式创建变量：var，let，和 const。
var 是严格范围变量的旧风格。你应该尽可能避免使用，var 因为它会在较大的项目中导致问题。

```()
var num:number = 1;
```

let 是在 TypeScript 中声明变量的默认方式。与 var 相比，let 减少了编译时错误的数量并提高了代码的可读性。

```()
let num:number = 1;
```

const 创建一个其值不能改变的常量变量。它使用相同的范围规则，let 并有助于降低整体程序的复杂性。

```()
const num:number = 100;
```

## 在 TypeScript 中如何从子类调用基类构造函数？

你可以使用该 super()函数来调用基类的构造函数。

```()
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
```

## TypeScript 中的类是什么？你如何定义它们？

类表示一组相关对象的共享行为和属性。

例如，我们的类可能是 Student，其所有对象都具有该 attendClass 方法。另一方面，John 是一个单独的 type 实例，Student 可能有额外的独特行为，比如 attendExtracurricular.

你使用关键字声明类 class：

```()
class Student {
    studCode: number;
    studName: string;
    constructor(code: number, name: string) {
            this.studName = name;
            this.studCode = code;
    }

    ...
}
```

## TypeScript 与 JavaScript 有什么关系？

TypeScript 是 JavaScript 的开源语法超集，可编译为 JavaScript。所有原始 JavaScript 库和语法仍然有效，但 TypeScript 增加了 JavaScript 中没有的额外语法选项和编译器功能。

TypeScript 还可以与大多数与 JavaScript 相同的技术接口，例如 Angular 和 jQuery。

## TypeScript 支持哪些 JSX 模式？

TypeScript 有内置的支持 preserve，react 和 react-native。

- preserve 保持 JSX 完整以用于后续转换。

- react 不经过 JSX 转换，而是 react.createElement 作为.js 文件扩展名发出和输出。

- react-native 结合起来 preserve，react 因为它维护所有 JSX 和输出作为.js 扩展。

## 如何编译 TypeScript 文件？

你需要调用 TypeScript 编译器 tsc 来编译文件。你需要安装 TypeScript 编译器，你可以使用 npm.

```()
npm install -g typescript
tsc <TypeScript File Name>
```

## TypeScript 中有哪些范围可用？这与 JS 相比如何？

- 全局作用域：在任何类之外定义，可以在程序中的任何地方使用。ps: `global`

- 函数/类范围：在函数或类中定义的变量可以在该范围内的任何地方使用。ps: `()=> { ... }`

- 局部作用域/代码块：在局部作用域中定义的变量可以在该块中的任何地方使用。ps:`{ ... }`

## 解释 rest 参数和声明 rest 参数的规则

其余参数允许你将不同数量的参数（零个或多个）传递给函数。当你不确定函数将接收多少参数时，这很有用。其余符号之后的所有参数...都将存储在一个数组中。

rest 参数必须是参数定义的最后一个，并且每个函数只能有一个 rest 参数。

## 什么是三斜线指令？有哪些三斜杠指令？

三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。

## Omit 类型有什么作用？

Omit 是实用程序类型的一种形式，它促进了常见的类型转换。Omit 允许你通过传递电流 Type 并选择 Keys 在新类型中省略来构造类型。

例如：

```()
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type TodoPreview = Omit<Todo, "description">;
```

## TypeScript 中如何实现函数重载？

要在 TypeScript 中重载函数，只需创建两个名称相同但参数/返回类型不同的函数。两个函数必须接受相同数量的参数。这是 TypeScript 中多态性的重要组成部分。

例如，你可以创建一个 add 函数，如果它们是数字，则将两个参数相加，如果它们是字符串，则将它们连接起来。

```()
function add(a:string, b:string):string;
function add(a:number, b:number): number;
function add(a: any, b:any): any {
    return a + b;
}
add("Hello ", "Steve"); // returns "Hello Steve"
add(10, 20); // returns 30
```

## 如何让接口的所有属性都可选？

你可以使用**partial**映射类型轻松地将所有属性设为可选。(高级类型)

```()
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

## 什么是装饰器，它们可以应用于什么？

装饰器是一种特殊的声明，它允许你通过使用`@<name>`注释标记来一次性修改类或类成员。每个装饰器都必须引用一个将在运行时评估的函数。

例如，装饰器`@sealed`将对应于 sealed 函数。任何标有 的`@sealed`都将用于评估 sealed 函数。

```()
function sealed(target) {
  // do something with 'target' ...
}
```

它们可以附加到：

- 类声明
- 方法
- 配件
- 特性
- 参数

注意：默认情况下不启用装饰器。要启用它们，你必须 experimentalDecorators 从 tsconfig.json 文件或命令行编辑编译器选项中的字段。
