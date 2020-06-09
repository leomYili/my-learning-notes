# 知识点汇总

<!-- TOC -->

- [知识点汇总](#知识点汇总)
  - [盒模型](#盒模型)
    - [css 外边距合并（叠加）](#css-外边距合并叠加)
    - [box-sizing](#box-sizing)
  - [css3新特性](#css3新特性)
  - [css3的伪元素](#css3的伪元素)
    - [::befor,::after](#beforafter)
  - [css3的伪类](#css3的伪类)
  - [css3的锚伪类](#css3的锚伪类)
  - [css隐藏元素](#css隐藏元素)
  - [css 如何实现水平居中和垂直居中](#css-如何实现水平居中和垂直居中)
  - [css3的flex相关介绍](#css3的flex相关介绍)
    - [flex-item的属性](#flex-item的属性)
    - [兼容性](#兼容性)
  - [css的position](#css的position)
  - [绝对定位和相对定位，元素浮动后的display值](#绝对定位和相对定位元素浮动后的display值)
  - [浮动元素引起的问题和解决办法](#浮动元素引起的问题和解决办法)
    - [clear清除浮动](#clear清除浮动)
    - [BFC清除浮动](#bfc清除浮动)
    - [BFC清除浮动的后果](#bfc清除浮动的后果)
    - [IE上的BFC](#ie上的bfc)
    - [清除浮动的原理](#清除浮动的原理)
  - [BFC](#bfc)
    - [定义](#定义)
    - [BFC的生成](#bfc的生成)
    - [BFC的约束规则](#bfc的约束规则)
    - [BFC在布局中的应用](#bfc在布局中的应用)
    - [总结](#总结)
  - [css link和@import区别用法](#css-link和import区别用法)
  - [css选择器的优先级](#css选择器的优先级)
  - [table布局的作用](#table布局的作用)
  - [实现两栏布局](#实现两栏布局)
  - [css dpi](#css-dpi)
    - [HTML 标准属性](#html-标准属性)
    - [自定义属性](#自定义属性)
    - [boolean attribute](#boolean-attribute)
  - [流式布局](#流式布局)
  - [响应式布局](#响应式布局)
    - [CSS3中的Media Query（媒介查询）](#css3中的media-query媒介查询)
  - [移动端布局方案](#移动端布局方案)
    - [视口](#视口)
    - [viewport](#viewport)
    - [设备](#设备)
    - [使用rem等流式单位布局](#使用rem等流式单位布局)
    - [移动设备1px解决方案](#移动设备1px解决方案)
    - [overflow:hidden](#overflowhidden)
  - [css的百分比是相对于其包含块的](#css的百分比是相对于其包含块的)
  - [css3动画，transition和animation的区别](#css3动画transition和animation的区别)
    - [transition](#transition)
    - [animation](#animation)
    - [区别](#区别)
    - [CSS 3 如何实现旋转图片（transform: rotate）](#css-3-如何实现旋转图片transform-rotate)
    - [CSS雪碧图](#css雪碧图)

<!-- /TOC -->

## 盒模型

css盒子模型 又称框模型 (Box Model) ，包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素.

最内部的框是元素的实际内容，也就是元素框，紧挨着元素框外部的是内边距padding，其次是边框（border），然后最外层是外边距（margin），整个构成了框模型。通常我们设置的背景显示区域，就是内容、内边距、边框这一块范围。而外边距margin是透明的，不会遮挡周边的其他元素。

元素框的总宽度 = 元素（element）的width + padding的左边距和右边距的值 + margin的左边距和右边距的值 + border的左右宽度；

元素框的总高度 = 元素（element）的height + padding的上下边距的值 + margin的上下边距的值 ＋ border的上下宽度。

display各种样式<a href="http://sandbox.runjs.cn/show/xs0o6pun">案例</a>

### css 外边距合并（叠加）

两个上下方向相邻的元素框垂直相遇时，外边距会合并，合并后的外边距的高度等于两个发生合并的外边距中较高的那个边距值
<a href="http://sandbox.runjs.cn/show/3n4vjfjv">案例:</a>

该demo使用jquery计算了不同的box-sizing时,元素的宽高.

需要注意的是：只有普通文档流中块框的垂直外边距才会发生外边距合并。行内框、浮动框或绝对定位之间的外边距不会合并。

### box-sizing

box-sizing属性是用户界面属性里的一种，之所以介绍它，是因为这个属性跟盒子模型有关，而且在css reset中有可能会用到它。

box-sizing : content-box|border-box|inherit;

(1) content-box ,默认值，可以使设置的宽度和高度值应用到元素的内容框。盒子的width只包含内容。

　　即总宽度=margin+border+padding+width

(2) border-box , 设置的width值其实是除margin外的border+padding+element的总宽度。盒子的width包含border+padding+内容

　　　　即总宽度=margin+width

很多CSS框架，都会对盒子模型的计算方法进行简化。

(3) inherit , 规定应从父元素继承 box-sizing 属性的值

## css3新特性

* 选择器 :nth-child()
* RGBA和透明度,除了支持RGB颜色外，还支持HSL（色相、饱和度、亮度）
* 多栏布局
* 多背景图
* Word Wrap
* 文字阴影,text-shadow:
* @font-face属性
* 圆角(边框半径) border-radius 6,7,8不支持
* 边框图片
* 盒阴影
* 盒子大小
* 媒体查询
* 语音

最常用,flexbox

## css3的伪元素

伪元素是对元素中的特定内容进行操作，选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素.

* ::before 在元素内容之前插入额外生成的内容
* ::after 在元素内容之后插入额外生成的内容
* ::first–letter 选取元素的首个字符
* ::first–line 选取元素的第一行
* ::selection 对用鼠标键盘等已选取的文字部分应用样式等

### ::befor,::after

相比于其他伪元素大都是对文档中已有部分的选择，::before 和 ::after 则是向文档树中加入内容，这些内容并不存在于HTML源代码中，但确是可见的，并且可以当作元素的子对象对待(正常的样式继承等);

深度顺序：元素 < ::before < 内容 < ::after

## css3的伪类

由于元素状态是动态变化的，所以一个元素特定状态改变时，它可能得到或失去某个样式。因为功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类

* :target
* :link
* :hover
* :active
* :visited
* :focus
* :not
* :lang
* :enabled
* :disabled
* :required
* :optional
* :checked
* :in-range
* :out-of-range
* :valid
* :invalid
* :first-child
* :last-child
* :only-child
* :nth-child()
* :nth-last-child()
* :empty
* :first-of-type
* :last-of-type
* :only-of-type
* :nth-of-type()
* :nth-last-of-type()

CSS3为了区分伪类和伪元素，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。但因为兼容性的问题，所以现在大部分还是统一的单冒号，但是抛开兼容性的问题，我们在书写时应该尽可能养成好习惯，区分两者。

## css3的锚伪类

锚伪类：
a:link{color:#ff00ff} 表示未访问的链接
a:visited{color:#00ff00} 表示已访问的链接
a:hover{color:#ff00ff} 鼠标移动到链接上的情况
a:active{colot:#0000ff} 表示选定的链接

## css隐藏元素

首先是display:none,元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘。

然后是visibility:hidden,和display:none的区别在于，元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会重排。

opacity:0,将元素的透明度调成0后,因为已经全透明,所以也可以隐藏元素

设置height，width等盒模型属性为0,同时overflow:hidden;

如果是定位元素,则可以使用z-index,将其z轴调成最小,即可被其他元素遮盖

transform,使用动画缩放元素,但元素空间仍然存在.

```
transform: scale(0,0)/* 占据空间，无法点击 */
```

## css 如何实现水平居中和垂直居中

display:table;display:table-cell;vertical-align:middle;

position:relative; position:absolute;left:50%;top:50%;margin-left:-width/2;margin-top:-height/2;overflow:hidden;

line-height:height; text-align:center; display:inline;

display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
-webkit-align-items: center;align-items: center;
-webkit-justify-content: center;justify-content: center;

## css3的flex相关介绍

Flex 是 Flexible Box 的缩写，意为"弹性布局"

有`display:flex`与`display:inline-flex`之分.
注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

* flex-direction:属性决定主轴的方向（即项目的排列方向）。eg:row | row-reverse | column | column-reverse;
* flex-wrap:属性定义，如果一条轴线排不下，如何换行。eg:nowrap | wrap | wrap-reverse;
* flex-flow:属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap.eg: `<flex-direction> || <flex-wrap>`;
* justify-content:属性定义了项目在主轴上的对齐方式。eg:flex-start | flex-end | center | space-between | space-around;
* align-items:属性定义项目在交叉轴上如何对齐。eg:flex-start | flex-end | center | baseline | stretch;
* align-content:属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用;eg:flex-start | flex-end | center | space-between | space-around | stretch;

### flex-item的属性

* order:属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
* flex-grow:属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
* flex-shrink:属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
* flex-basis:属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
* flex:属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
* align-self:属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。eg:auto | flex-start | flex-end | center | baseline | stretch;

### 兼容性

```
.flex-container{
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6*/
  display: -moz-box;         /* OLD - Firefox 22- */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome 20-,Android 2.1-4.3 */
  display: flex;             /* NEW */
}
.flex-item{
  -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;         /* OLD - Firefox 22- */
  width: 20%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;                  /* NEW*/
}
/*不同情况下需要添加显性的宽度，才能防止老语法下的浏览器崩溃。*/
```

## css的position

初始值 static
适用元素 all elements
是否是继承属性 否

定位元素（positioned element）是其计算后位置属性为 relative, absolute, fixed 或 sticky 的一个元素。

1. 相对定位元素（relatively positioned element）是计算后位置属性为 relative 的元素。
元素设置了relative后，可以通过“T-R-B-L”改变元素当前所在的位置，但元素移位后，同样点有当初的物理空间位；

2. 绝对定位元素（absolutely positioned element）是计算后位置属性为 absolute 或 fixed 的元素。
绝对定位元素的任何祖先元素没有进行任何的“relative”或者“absolute”设置，那么绝对定位的元素的参考物就是html

3. 粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。

top, right, bottom, 和 left属性确定定位元素的位置。

## 绝对定位和相对定位，元素浮动后的display值

转换对应表：

设定值 | 计算值
----|----
inline-table | table
inline, run-in, table-row-group, table-column, table-column-group, table-header-group, 
table-footer-group, table-row, table-cell, table-caption, inline-block | block
其他 | 同设定值

"position:absolute" 和 "position:fixed" 优先级最高，有它存在的时候，浮动不起作用，'display' 的值也需要调整； 其次，元素的 'float' 特性的值不是 "none" 的时候或者它是根元素的时候，调整 'display' 的值； 
最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display' 特性值同设置值。

这从另一个侧面说明了一个问题：浮动或绝对定位的元素，会被转换成块级元素。

## 浮动元素引起的问题和解决办法

浮动会导致父元素高度坍塌

清除浮动主要有两种方式，分别是clear清除浮动和BFC清除浮动

### clear清除浮动

clear属性不允许被清除浮动的元素的左边/右边挨着浮动元素，底层原理是在被清除浮动的元素上边或者下边添加足够的清除空间。
要注意了，我们是通过在别的元素上清除浮动来实现撑开高度的， 而不是在浮动元素上。

```
// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```

### BFC清除浮动

BFC全称是块状格式化上下文，它是按照块级盒子布局的。

BFC的主要特征

* BFC会阻止垂直外边距（margin-top、margin-bottom）折叠:按照BFC的定义，只有同属于一个BFC时，两个元素才有可能发生垂直Margin的重叠，这个包括相邻元素，嵌套元素，只要他们之间没有阻挡(例如边框，非空内容，padding等)就会发生margin重叠。因此要解决margin重叠问题，只要让它们不在同一个BFC就行了，但是对于两个相邻元素来说，意义不大，没有必要给它们加个外壳，但是对于嵌套元素来说就很有必要了，只要把父元素设为BFC就可以了。这样子元素的margin就不会和父元素的margin发生重叠了。
* BFC不会重叠浮动元素

* BFC可以包含浮动

* BFC的触发方式

我们可以给父元素添加以下属性来触发BFC：
✦ float 为 left | right
✦ overflow 为 hidden | auto | scorll
✦ display 为 table-cell | table-caption | inline-block | flex | inline-flex
✦ position 为 absolute | fixed

### BFC清除浮动的后果

* 利用float来使父容器形成BFC,父容器高度没有塌陷，但是长度变短了，因为div应用float后会根据内容来改变长度

* overflow属性会影响滚动条

* position会改变元素的定位方式，这是我们不希望的

* display这几种方式依然没有解决低版本IE问题

### IE上的BFC

在IE6、7内有个hasLayout的概念，很多bug正式由hasLayout导致的，当元素的hasLayout属性值为false的时候，元素的尺寸和位置由最近拥有布局的祖先元素控制。当元素的hasLayout属性值为true的时候会达到和BFC类似的效果，元素负责本身及其子元素的尺寸设置和定位。

怎么使元素hasLayout为true

* position: absolute
* float: left|right
* display: inline-block
* width: 除 “auto” 外的任意值
* height: 除 “auto” 外的任意值
* zoom: 除 “normal” 外的任意值
* writing-mode: tb-rl

在IE7中使用overflow: hidden|scroll|auto 也可以使hasLayout为true

### 清除浮动的原理

元素浮动之前，也就是在标准流中，是竖向排列的，而浮动之后可以理解为横向排列。清除浮动可以理解为打破横向排列
本质上应该是清除浮动所带来的影响.所以能够解决浮动的影响的,就能清除浮动

对于CSS的清除浮动(clear)，一定要牢记：这个规则只能影响使用清除的元素本身，不能影响其他元素。

## BFC

block fomatting context = block-level box + Formatting Context;即BFC

Box即盒子模型；

1. block-level box即块级元素
display属性为block, list-item, table的元素，会生成block-level box；并且参与 block fomatting context；

2. inline-level box即行内元素
display 属性为 inline, inline-block, inline-table的元素，会生成inline-level box。并且参与 inline formatting context；

Formatting context是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系、相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context(简称IFC)。

CSS2.1 中只有BFC和IFC, CSS3中还增加了G（grid）FC和F(flex)FC。

### 定义

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

### BFC的生成

上文提到BFC是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，这些由生成BFC的元素决定，CSS2.1中规定满足下列CSS声明之一的元素便会生成BFC。

* 根元素
* float的值不为none
* overflow的值不为visible
* display的值为inline-block、table-cell、table-caption
* position的值为absolute或fixed

display：table也认为可以生成BFC，其实这里的主要原因在于Table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC

### BFC的约束规则

内部的Box会在垂直方向上一个接一个的放置
垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关。）
每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
BFC的区域不会与float的元素区域重叠
计算BFC的高度时，浮动子元素也参与计算
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

### BFC在布局中的应用

1. 防止margin重叠（塌陷）：两个相邻Box垂直方向margin重叠,所以我们如果不想使其重叠,只要将两个box,使其变为不是同一个BFC中的相邻元素,就可以了

2. 清除内部浮动

3. 自适应多栏布局

### 总结

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
因为BFC内部的元素和外部的元素绝对不会互相影响，因此，

当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。 同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。 避免margin重叠也是这样的一个道理。

## css link和@import区别用法

区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。

区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

## css选择器的优先级

特指度表示一个css选择器表达式的重要程度，可以通过一个公式来计算出一个数值，数越大，越重要。

这个计算叫做“I-C-E”计算公式

即，针对一个css选择器表达式，遇到一个id就往特指度数值中加100，遇到一个class就往特指度数值中加10，遇到一个element就往特指度数值中加1。!important优先级最高，高于上面一切。* 选择器最低，低于一切。

## table布局的作用

table布局有两个特性：

同行等高
宽度自动调节

## 实现两栏布局

两栏布局是主内容区为主，左（右）侧有一栏

1. 通过BFC特性,实现两栏布局

2. 使用负边距:元素content添加父元素，设置左浮动，宽度为100%；content 设置右边距，宽度为aside的宽度（留出aside浮上来的空间）；aside左浮动，并设置负边距，等于自身宽度。

3. position实现两栏布局,content使用margin留出位置

4. flex box实现两栏布局

5. display:grid 实现两栏布局

## css dpi

每英寸包含点的数量（dots per inch）
普通屏幕通常包含96dpi，一般将2倍于此的屏幕称之为高分屏，即大于等于192dpi的屏幕，比如Mac视网膜屏就达到了192dpi（即2dppx），打印时一般会需要更大的dpi;

1dppx = 96dpi
1dpi ≈ 0.39dpcm
1dpcm ≈ 2.54dpi
1in = 2.54cm = 25.4 mm = 101.6q = 72pt = 6pc = 96px

### HTML 标准属性

对于标准属性，无论是改变 attribute 还是改变 property，对应的另一个值也会改变。

### 自定义属性

对于自定义属性，改变 attribute 或是 property，对应的另一个值不受影响（IE6、7 不区分 attribute 和 property，改变一个，对应的另一个值也会改变）。

### boolean attribute

boolean attribute 不同于上面两种，这种属性有特殊的处理方式。例如 checked，只要存在 attribute，不论值是什么（checked="", checked, checked="false"），对应的 property 都是 true。

checked attribute 并不对应 checked property，而是对应 defaultChecked property。这是一个初始值，checked property 变化后它并不会改变（所以 checked attribute 也不变）。根据 jQuery 的文档，selected 与 value 也是如此。

## 流式布局

不同于固定布局,页面所有元素的位置和大小,会自动根据屏幕和设备的尺寸,进行变化的布局,百分比是一个特点,但不是全部

## 响应式布局

就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本;

### CSS3中的Media Query（媒介查询）

通过不同的媒介类型和条件定义样式表规则。媒介查询让CSS可以更精确作用于不同的媒介类型和同一媒介的不同条件。媒介查询的大部分媒介特性都接受min和max用于表达”大于或等于”和”小于或等于”。如：width会有min-width和max-width媒介查询可以被用在CSS中的@media和@import规则上，也可以被用在HTML和XML中。通过这个标签属性，我们可以很方便的在不同的设备下实现丰富的界面，特别是移动设备，将会运用更加的广泛。

## 移动端布局方案

### 视口

1. 布局视口（layout viewport）可以看作是html元素的上一级容器即顶级容器，默认情况或者将html元素的width属性设为100%时，会占满这个顶级容器，此时用`document.documentElement.clientWidth `获取到html元素的布局宽度也就是布局视口的宽度，使用媒体查询时 max-width 和 min-width 的值指的也是布局视口的宽

2. 布局视口的宽度和高度单位是像素px，这个单位是CSS和JS中使用的抽象单位，为了便于区分称作CSS像素。布局视口的宽度有一个默认值，一般在 768px ~ 1024px 之间，最常见的宽度是 980px，在这个默认值下进行布局得到的页面比较接近PC端布局的效果

3. 可视视口（visual viewport）是指用户可见页面区域，其宽度值为横向可见CSS像素数，从另一个角度理解，可视视口的宽度决定了将屏幕横向分为多少份，每份对应一个CSS像素，使用`window.innerWidth`可以获取到可视视口的宽度

4. 理想视口（ideal viewport）是一个比较适合页面布局使用的视口尺寸，作为计算布局视口和可视视口尺寸时的一个基准值，下面代码中 device-width 的值就是理想视口的宽度`<meta name="viewport" content="width=device-width">`使用`screen.width`也可以获取到理想视口的宽度

5. 三个视口中只有理想视口的尺寸是不能改变的，由设备和浏览器决定，与设备的物理像素数存在着比例关系，这个比例就是设备像素比（device pixel ratio， dpr），即有 设备像素比 = 物理像素数 / 理想视口尺寸，举例iphone5屏幕横向有640个物理像素，其理想视口宽为320，则 dpr=2，可以使用`window.devicePixelRatio`获得dpr，但在安卓系统下这个值可能不符合预期

6. 可视视口的尺寸收到缩放比例的影响，因此用户手动缩放和在 meta 标签中设置 initial-scale 的值都会改变可视视口的尺寸，可视视口的尺寸越小即显示的CSS像素数越少，则单位CSS像素对应的可使区域越大，对应的缩放比也就越大。缩放比例是相对于理想视口而言的，即有 缩放比例 = 理想视口尺寸 / 可视视口尺寸。缩放比例也有默认的值，没有设置 initial-scale 时，浏览器会取适当的缩放比例使 布局视口正好铺满屏幕即有 布局视口尺寸 = 可视视口尺寸

7. 布局视口的宽度受到 meta 标签中的 width 和 initial-scale 的影响仅设置 width 的值时，这个值就是布局视口的宽度，width的值可以为正整数或特殊值 device-width,此时由于没有禁用缩放，一般可以通过双击屏幕对页面进行缩放，但手动缩放不会影响布局适口的尺寸，只会影响到可视视口的尺寸，而且可能导致布局视口小于可视视口设置 initial-scale 的值时，布局视口的尺寸与可视视口的计算方式相同，但不受手动缩放的影响同时设置 width 和 intial-scale 的值时，布局视口的宽取上述两个值中较大的一个

8. 布局视口宽 = 可视视口宽时 html 元素正好横向铺满窗口（但其后代元素若有横向 overflow 的情况，仍然会出现滚动条），布局视口宽 > 可视视口宽时，出现横向滚动条

### viewport

viewport content 参数：

* width viewport 宽度(数值/device-width)
* height viewport 高度(数值/device-height)
* initial-scale 初始缩放比例
* maximum-scale 最大缩放比例
* minimum-scale 最小缩放比例
* user-scalable 是否允许用户缩放(yes/no)

### 设备

* PPI: 可以理解为屏幕的显示密度
* DPR: 设备物理像素和逻辑像素的对应关系，即物理像素/逻辑像素
* Resolution: 就是我们常说的分辨率

### 使用rem等流式单位布局

通常与font-size进行换算,然后通过媒体查询,进行赋值就可以控制页面大小

使用相对单位 rem 并将设备的可视视口宽度乘以一个系数得到 html 元素的 font-size，元素布局时不超出可视视口宽度即可

淘宝的方案,动态计算dpr:

就是取 dpr 的倒数作为缩放比例，对 iOS 设备 dpr = window.devicePixelRatio ，其他设备认为 dpr 为 1
对 iOS 设备，令上面提到的公式 缩放比例 = 理想视口尺寸 / 可视视口尺寸，设备像素比 = 物理像素数 / 理想视口尺寸 中 设备缩放比 = 1 / 缩放比例 可以推出 可视视口尺寸 = 物理像素数,同时由于没有设置 meta 标签的 width 值，有 布局视口尺寸 = 可视视口尺寸 = 物理像素数，这意味着布局视口中的像素单位是和物理像素一一对应的，css单位中1px严格等于一个物理像素。这就是淘宝方案的巧妙之处了，对于 iOS 下高分辨率的设备，提供了更好的支持，解决了 1px border 问题和高清图片的问题，对非 iOS 设备，将 dpr 设为 1，缩放比例也为 1，和网易新闻的方案相同。

### 移动设备1px解决方案

1. 通过dpr参数,设置缩放尺寸,从而使物理像素等同于布局视口中的像素

2. 通过缩放scale属性进行缩放
```
.scale{
    position: relative;
}
.scale:after{
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-bottom:1px solid #ddd;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
}
```

### overflow:hidden

一个绝对定位的后代块元素，部分位于容器之外。这样的元素是否剪裁并不总是取决于定义了overflow属性的祖先容器；尤其是不会被位于他们自身和他们的包含块之间的祖先容器的overflow属性剪裁。

首先，我们知道overflow:hidden并不是万能的，要想彻底剪裁它的所有子元素，它不但要有overflow:hidden，而且还要作为所有子元素的包含块。这样万一某一天你看到overflow:hidden里面的东东居然被显示出来了，你才知道是为什么。

## css的百分比是相对于其包含块的

行高相对于自身font-size

## css3动画，transition和animation的区别

### transition

中文释义："过渡"。最基本的场景在于 :hover 的过渡中:
```
.box {
  width: 100px;
  height: 200px;
  background: red;
  transition: all 1s ease;
}
.box:hover {
  width: 200px;
  height: 100px;
  background: yellow;
}
```

transition 这个属性有四个参数： property duration timing-function delay;。分别代码过渡属性，延时时间，过渡方法函数，过渡延迟。

### animation

用上面所说的 transition 来实现动画无疑是非常优雅的，但是实现动画的种类貌似还是有限制的，那么如何去实现比较随心所欲的动画呢？ 这个时候可能就需要 animation 的出场了。

animation 依旧非常简单，它需要你申明动画执行的时间和动画执行的函数即可：

```
.box {
   width: 100px;
   height: 200px;
   background: red;
 }
 .box:hover {
   animation: 1s rainbow forwards;
 }

@keyframes rainbow {
  50% { 
    width: 200px;
    background: yellow;
  }
  100% { 
    height: 100px;
    background: green;
  }
}
```

### 区别

1. 触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则和gif动态图差不多，立即播放。

2. 循环。 animation可以设定循环次数。

3. 精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。

4. 与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。

### CSS 3 如何实现旋转图片（transform: rotate）

### CSS雪碧图

即CSS Sprite，也有人叫它CSS精灵，是一种CSS图像合并技术，该方法是将小图标和背景图像合并到一张图片上，然后利用css的背景定位来显示需要显示的图片部分。