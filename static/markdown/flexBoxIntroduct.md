# 使用Flexbox进行网页布局

***

参考的文章:

1.[Div into Flexbox](https://bocoup.com/blog/dive-into-flexbox/)

2.[理解Flexbox：你需要知道的一切](http://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)

<br>

> 什么是HTML布局

一般情况情况下我们通过简单DIV+CSS对网站的块级内容进行定位，这种工作就是我们所说的布局。

传统的HTML布局方式有一般都是使用`inline-block`、`float`、`table`等其他一些CSS属性进行布局。

但不得不说的一点就是`float`不是一个好用的属性，它会引出很多意想不到的问题。还有`display:table`也是一样，这些我都亲身经历过，不过庆幸的是新的布局方式出现了。

在我刚接触网页开发时候被这些属性坑了很多次。但是，这些都不是为了复杂的网页布局而设计的，因此需要一个进行复杂的网页布局的工具。flexbox就这样应运而生。

<br>

#### 现在我们可以放下以前处理那些布局问题的‘黑魔法’了，一起去拥抱Flexbox吧。

<br>

> Flexbox布局的特性

根据规范中的描述可知道，Flexbox模块提供了一个有效的布局方式，即使不知道视窗大小或者未知元素情况之下都可以智能的，灵活的调整和分配元素和空间两者之关的关系。简单的理解，就是可以自动调整，计算元素在容器空间中的大小。

意思就是如果我们能够运用flexbox进行布局，很大程度上可以减少一下这种代码的使用量

```css
@media screen and (min-width:768px){
  ........
}
```

当然其实还是会要使用的，不过我们可以不用经常去纠结那些宽度的和内容溢出的问题。

<br>

> 开始使用Flexbox

***

开始使用Flexbox的第一步就是声明一个Flex容器。

比如下面这样的一段代码父容器为`<div>`子容器为`<span>`

```html
<div>
  <span></span>
  <span></span>
  <span></span>
</div>  
```

给上面的这段代码使用Flexbox布局，需要给它定义如下样式

```scss
div{
  display:flex;/*或者inline-flex*/
  display:-webkit-flex;
  >span{
    width: 100px;
    height: 100px;
    background-color:#8cacea;
    margin:1em;
  }
}
```

<br>

就能够看到下面这样子的效果

<br>

<div class="flex">
  <span></span>
  <span></span>
  <span></span>
</div>

<style>
.flex{
  display:flex;
  display:-webkit-flex;
  background: white;
}
.flex >span{
  width: 100px;
  height: 100px;
  background-color:#8cacea;
  margin:1em;
}
</style>

<br>

到这里其实Flexbox已经跑起来了，因为div默认是竖直向下的堆栈。但现在已经是水平的堆栈了。

我们只是在CSS代码中添加了`display:flex`和`display：-webkit-flex`。

Flexbox的开始，就是在任何的父元素上使用`display:flex`

一旦你设置了`display`属性为`flex`之后，那么容器本身就会变成一个Flex容器，而它的子元素则会变成Flex项目。

这里有两个关键字: 

**1.Flex容器**:元素设置了属性`display:flex`的元素

**2.Flex项目**:Flex容器内的子元素

<br>

今天就写到这，以后会继续写关于flexbox基础的内容，有空就更新。