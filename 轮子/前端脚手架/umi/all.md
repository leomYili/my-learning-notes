# 正文

> [UmiJS文档](https://umijs.org/zh-CN/docs)

## 插件和插件集

好处是由于新版的Umi3.x已经全部是插件的形式了,方便自定义集成.

## 路由

因为Umi的路由内部也是react-router,但不是很方便的可以自定义.

目前有两种方式:

### 使用 plugin-layout

当然这种方案也需要对原本的插件做一些修改,实际上仍然是使用 [@ant-design/pro-layout](https://www.npmjs.com/package/@ant-design/pro-layout)

### 完全自定义

可以用根路由展示根页面,再在该页面组件中编写自定义react-router或是其他路由解决方案,之后完全不使用Umi的配置来配置路由.
