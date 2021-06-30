# 正文

> 前言:这道题实际上问的是 webpack 是怎么实现的,只是挑了其中最重要的编译流程来展开而已,不阅读源码是没办法回答的

## 详细答案

> [webpack 的编译流程是啥?](https://juejin.cn/post/6972378623281987621)

## 精简之后

1. step1:实例化`compiler`

   1. 实例化`compiler`对象
   2. 初始化`NodeEnvironmentPlugin`,让`compiler`具有文件读写能力
   3. 挂载所有`plugins`插件至`compiler`对象身上
   4. 挂载所有`webpack`内置的插件(入口)

2. step2:compiler.run

   1. `this.hooks.beforeRun.callAsync` -> `this.hooks.run.callAsync` -> `this.compile`
      - `this.compile` 接收 `onCompiled`
      - `onCompiled` 内容是:最终在这里将处理好的 chunk 写入到指定的文件然后输出至 dist(文件输出路径,不一定是 dist)

3. step3:compiler 方法做的事情

   1. newCompilationParams,实例化 Compilation 对象之前先初始化其所需参数
   2. 调用 this.hooks.beforeRun.callAsync
      - this.newCompilation(params)实例化 Compilation 对象
      - this.hooks.make.callAsync 触发 make 钩子监听
      - compilation.seal 开始处理 chunk
        - this.hooks.afterCompile.callAsync(compilation,...)
        - 流程进入 compilation 了...

4. step4:完成模块编译操作
   1. addEntry
      - \_addModuleChain
        - createModule:定义一个创建模块的方法,达到复用的目的
          - module = normalModuleFactory.create(data):创建普通模块,目的是用来加载 js 模块
        - afterBuild
          - this.processDependencies: 找到模块与模块之间的依赖关系
          - this.buildModule(module,afterBuild)
            - module.build: 到这里就意味着当前 Module 的编译完成了
   2. seal:生成代码内容,输出文件

## QA:webpack 编译流程中的 hook 节点有哪些?

答:

- compiler.hooks.environment
- compiler.hooks.afterEnvironment
- compiler.hooks.failed
- compiler.hooks.shouldEmit
- compilation.hooks.needAdditionalPass
- compiler.hooks.beforeRun
- compiler.hooks.run
- compiler.hooks.beforeCompile
- compiler.hooks.compile
- compiler.hooks.thisCompilation
- compiler.hooks.compilation
- compiler.hooks.make
- compiler.hooks.afterCompile
- compiler.hooks.entryOption
- compilation.hooks.seal
- compilation.hooks.beforeChunks
- compilation.hooks.afterChunks
- compilation.createChunkAssets
