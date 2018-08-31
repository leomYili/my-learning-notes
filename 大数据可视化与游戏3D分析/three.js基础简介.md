# 知识点记录

> 首先要了解webGL:WebGL（全写Web Graphics Library）是一种3D绘图协议，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化

## webGL作用

可以不借助任何浏览器插件,通过脚本自身实现3D动画效果,且跨平台,兼容性好,而webGL毕竟十分底层,直接用于开发难免效率低下,因此我们需要借助社区中强大的力量来跳过实现的步骤,而直接进行开发.

## three.js

顾名思义,其就是用javaScript实现的浏览器端的3D绘图工具库.
要通过 three.js 显示物体，我们需要三个东西：scene（场景），camera（相机）和 renderer（渲染器），通过相机渲染场景。

## 创建场景

在Threejs中场景就只有一种，用THREE.Scene来表示，要构件一个场景也很简单，只要new一个对象就可以了，代码如下：

```
var scene = new THREE.Scene();
```

## 创建相机

另一个组建是相机，相机决定了场景中那个角度的景色会显示出来。相机就像人的眼睛一样，人站在不同位置，抬头或者低头都能够看到不同的景色。

场景只有一种，但是相机却又很多种。和现实中一样，不同的相机确定了呈相的各个方面。比如有的相机适合人像，有的相机适合风景，专业的摄影师根据实际用途不一样，选择不同的相机。对程序员来说，只要设置不同的相机参数，就能够让相机产生不一样的效果。下面的是透视相机

```
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
```

第一个属性是 field of view（视场）。FOV 是指在任意时刻显示器的场景的范围。以角度为单位。
第二个是 aspect ratio（长宽比）。一般使用元素的长宽比，否则你会发现结果如同在宽屏电视上放老电影 —— 图像看起来像被挤压过。
接下来的两个属性是 near（近面） 和 far（远面）。即，与相机的距离值大于 far 值或小于 near 值的物体不会被渲染。

## 创建渲染器

最后一步就是设置渲染器，渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制。这里我们定义了一个WebRenderer渲染器

```
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

注意，渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。

## 线条的深入理解

在Threejs中，一条线由点，材质和颜色组成。

点由THREE.Vector3表示，Threejs中没有提供单独画点的函数，它必须被放到一个THREE.Geometry形状中，这个结构中包含一个数组vertices，这个vertices就是存放无数的点（THREE.Vector3）的数组。