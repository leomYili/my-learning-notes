# 正文

> 对于SVG的学习过程的查漏补缺

## 在html页面输出
```
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
  // do something
</svg>
```

这是可以直接在页面上输出的svg标签，html也支持。

## SVG构成

SVG中也有很多元素

### SVG形状

#### <reat> 矩形
可用来创建矩形，以及矩形的变种
直接画个矩形：
```
<rect x="20" y="20" width="100%" height="50%" style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)" />
```
这里使用的样式有
1. width(宽)；height(高);
2. style属性来定义CSS属性;
3. CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
4. CSS 的 stroke-width 属性定义矩形边框的宽度
5. CSS 的 stroke 属性定义矩形边框的颜色
6. x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
7. y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
8. CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
9. CSS 的 stroke-opacity 属性定义边框颜色的透明度（合法的范围是：0 - 1）
10. CSS 的 opacity 属性定义整个元素的透明值（合法的范围是：0 - 1）
11. rx 和 ry 属性可使矩形产生圆角，当一者为0时，另一值无效，与border-radius不同，而border-radius在rect中无法使用；rx表示水平方向产生圆角；ry表示垂直方向产生圆角，当两者相同，实现的是一个正圆弧。

```
<rect x="20" y="20" rx="50" ry="50" width="50px" height="50px" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9;opacity: 0.5;border-radius: 42px;"></rect>
```

#### <circle> 圆形

```
<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
```
这里使用的样式有：
1. cx 和 cy 属性定义圆点的 x 和 y 坐标。
2. 如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)
3. r是半径
说明圆形是以中心为开始展示数据

```
<circle cx="50%" cy="50%" r="50" stroke="black"
stroke-width="2" fill="red"/>
```
这样就可以在整个页面的中点画出一个圆形。

#### <ellipse> 椭圆

```
<ellipse cx="50%" cy="30%" rx="200" ry="50" style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2"/>
```
1. cx 属性定义圆点的 x 坐标
2. cy 属性定义圆点的 y 坐标
3. rx 属性定义水平半径
4. ry 属性定义垂直半径
也就意味着当rx=ry时，展示出来就会是一个圆形

```
<ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple" />
<ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime" />
<ellipse cx="210" cy="45" rx="170" ry="15" style="fill:yellow" />
```
创建的堆叠图形，实质上通过cx和cy的定位来将三个椭圆堆叠在一起，SVG与css的z-index不同，是写在之前的元素先渲染，写在后面的元素后渲染

```
<ellipse cx="220" cy="70" rx="220" ry="30" style="fill:purple" />
<ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime" />
<ellipse cx="220" cy="70" rx="170" ry="15" style="fill:yellow" />
```
这样就可以写一个有层次的椭圆。

#### <line> 线条

```
<line x1="0" y1="0" x2="300" y2="300" style="stroke:rgb(99,99,99);stroke-width:2"/>
```
1. x1 属性在 x 轴定义线条的开始
2. y1 属性在 y 轴定义线条的开始
3. x2 属性在 x 轴定义线条的结束
4. y2 属性在 y 轴定义线条的结束

在线条的部分，会发现其实互相表示的是偏移值，而且分别代表了在x和y上的距离。比较绕。
