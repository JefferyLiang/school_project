# 1.网站超链接标签动画效果

***

```
优秀的超链接提示动画能够对于网站有什么帮助:

1.让用户知道那是一个超链接，连接到别的地方，而不是一段普通的问题。
2.告诉用户，当前选中的地方是一个可以点击的地方，并提示已经选中了。
3.突出当前的链接已经被用户选中。
```

<br>

> 超链接动画涉及到的内容

1.基础的HTML和CSS知识。

2.新的CSS3属性`transition`。

3.CSS中的伪元素`before`和`after`的使用。

4.基础的CSS布局知识，主要是`position`布局。

***

<br>

> 下划线上升的超链接效果:

我准备了一个展示的代码:

[Demo](http://jsfiddle.net/JefferyLiang/rptdxhd3/)

你也可以直接把鼠标移动到一下的文字上面看看有什么效果

<br>

<div>
  <a class="a-style" href="#">Try to hover here!</a>
</div>
<style>
.a-style{
  position:relative;
  font-family: 'Cormorant Upright',serif;
  font-size:20px;
  color:#2c3e50;
  transition: all .3s;
}
.a-style:after{
  content: '';
  position: absolute;
  display:block;
  width:100%;
  height:1px;
  left:0px;
  bottom: -10px;
  opacity: 0;
  background-color:#2c3e50;
  transition: all .3s;
}
.a-style:hover{
  text-decoration:none;
  color:#008;
}
.a-style:hover.a-style:after{
  background-color:#008;
  opacity: 1;
  bottom: -5px;
}
</style>

<br>

该动画相对比较简单，完全没使用到javascript代码。主要用到的是CSS3的`transition`

先上代码

```html
<div>
  <a class="a-style" href="#">Try to hover here!</a>
</div>
```

<br>

在html代码中只是写了一个简单的`<div>`标签包裹着`<a>`标签,其中`<a>`标签的类为a-style。

```scss 
.a-style{
  position:relative;
  font-size: 20px;
  font-family: 'Cormorant Upright',serif;
  color:#2c3e50;
  transition: all .3s;
  &:after{
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    background-color:#2c3e50;
    left:0;
    bottom:-10px;
    opacity: 0;
    transition: all .3s;
  }
  &:hover{
    text-decoration: none;
    color:#008;
    &:after{
      color:#008;
      bottom:-5px;
      opacity: 1;
    }
  }
}
```

<br>

只需要上面简单的html代码和css代码则可以完成该动画。我们来看一下用到的一些相对关键的属性

> CSS3中的属性`transition`

CSS transitions 提供了一种在更改CSS属性时控制动画速度的方法。 其可以让属性变化成为一个持续一段时间的过程，而不是立即生效的。

`transition`除了能够简单的使用如`transition: all .3s`以外还能够分别设置它的子属性:

<br>

1.transition-property

用于指定哪些CSS属性需要过度，只有在该属性内的CSS属性才会发生过度动画，其他属性依旧是立即变化。

2.transition-duration

用于指定过度动画的时间长度，可以设定为一个值，则所有属性都根据该值变化，也可以为不同的属性设定不同的值。

3.transition-timing-function

指定一个函数，定义属性值的怎么变化。缓动函数Timing-function定义属性将如何进行变化。

4.transition-delay

用于指定延时，设置属性开始变化和开始过度之间的时间长度。

简写语法如下

```css
div{
  transition: <property> <duration> <timing-function> <delay>;
}
```

<br>

> javascript监听`transition`动画事件

没错，我们还能够通过javascript代码对CSS的过度动画是否完成进行跟踪。

在符合标准的浏览器中，该事件名为`transitionend`,而在webkiy为内核的浏览器之中则是`webkitTransitionEnd`。

该事件提供两个字段:

1.propertyName

字符串类型，存放已经完成过度的CSS属性

2.elapsedTime

浮点类型,存放该过度事件到当前为止已经运行了多少秒。注意，transition-dealy的延时不算在过度时间之内。

<br>

我们可以通过`element.addEventListener()`方法对事件进行监听

```javascript
el.addEventListener("transitionend", updateTransition, true);
```