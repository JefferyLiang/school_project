# 1.页面加载动画的基本实现思路

***

> 为什么需要网页的加载动画界面
 
```txt
主要目的如下:

1. 网站可能需要长时间去加载某些重要的资源
2. 页面需要请求api，需要时间等待数据的返回
3. 有时候，加载页面能简单的介绍当前网站
```

<br>

> 实现的思路

由于我们在的加载动画多是为了给网站资源加载的事件。

因此我们需要把loadding动画的部分放到我们的页面之内，这样子我们的思路大致上就出来了。

我们能够想到的html代码结构大概如下：

```html
<div>
  <div class="loadding">
    //动画的dom内容
  </div>
  <div class="main">
    //网站的主要内容
  </div>
</div>
```

当我们的网站主要内容需要加载的时候，由于加载大量的内容或者大量cdn请求。

我们可以等待这些东西完成再展示网站。这时候可以把html中main部分隐藏

代码如下:

```css
.main{
  display:none;
}
```

***

> 关于如何检测资源加载情况

到这里遇到的另外一问题，就是如何检测我们的资源是否完成加载。

在这里我介绍一个相对拙劣的检测网站的图片资源的加载方法。

直接上代码:

```js
checkImage () {
  const finish = [];
  let $img = document.getElementsByTagName('img');
  for(let i=0;i<$img.length;i++){
    finish.push(new Promise( resolve => {
      $img[i].onload = () => {
        resolve();
      }
    }))
  }
  Promise.all(finish).then( () => {
    //do something when all image was loaded
  });
}
```

通过上面的代码我们可以检测到当前页面的图片是否加载完毕，其中用到了一些ES6的东西，比如说钩子函数之类的，还有就是Promise对象，为了能够兼容还不支持ES6的浏览器，我们可能需要ES6的垫片来兼容。

当然ES6的兼容是迟早的事，这样做更多事为了兼容一下浏览器版本相对较低的用户。

这里给各位提供[ES6](http://es6.ruanyifeng.com/)的在线版的介绍，有兴趣可以进去看看。

<br>

# 2.加载动画效果的实现

***

在这里我使用的是`vue.js`这样的一个javascript库实现整个效果，其实该动画的实现主体部分跟vue.js没有太大关系，只是使用到了里面的一些小功能比如说数据双向绑定和已经定义好的指令如:v-show

<br>

下面我们来看一下html部分的代码

```html
<template>
  <div class="loadding-view" v-show="show" @:finish="hide">
    <span>Loadding the image resource,please wait...</span>
    <span>
      {{ span_text }}
      <!-- <div class="line" :style="lineWidth"></div> -->
    </span>
  </div>
</template>
```

在代码之中v-show是一个vue自带的指令，通过判断里面的变量‘show’来决定当前的dom是否渲染，而finish则是我自己定义一个事件。

如果不使用vue、angular等javascript库来实现，我们可以通过JQuery来控制，v-show的本质只是给dom加上了`display:none`这样的样式。如果你不想使用这些javascript，觉得学习成本高，可以去看一个watch.js的插件，可以实现数据双向绑定。

在这里我还定义了一个事件`@finish`，用于通知夫控件加载已经完成。也可以通过JQuery或者原生的javascript来完成相同的效果。

<br>

下面是我们javascript代码，由于代码量可能比较大，所以我们就一个个函数来看。

第一个看的是当前控件我们需要的数据如下:

```js
let datas = data();
data () {
  return {
    show:true,//loadding页面是否展示
    imgFinish: false,//图片加载是否已经结束
    span_text:' ',//动画效果的span标签的内容的字符串
    loadding:0,//需要加载的图片的数量
    loaded:0,//已经完成加载的图片的数量
  }
},
```

<br>

然后我们需要检测当前图片是否加载完成，函数如下:

```js
getIamgeLoaded () {
  const finish = [];
  let $img = document.getElementsByTagName('img');
  this.loadding = $img.length;
  for(let i=0;i<$img.length;i++){
    finish.push(new Promise(resolve => {
      $img[i].onload = () => {
        this.loaded++;//加载完成后，让loaded进行一次自增
        resolve();//promise进行resolve操作，表示成功完成
      }
    }));
  };
  Promise.all(finish).then(() => {
    this.imgFinish = true;//当所有promise都resolve以后表示所有图片都已经加载完毕
  });
}
```

<br>

后面就到了我们的动画效果了，这里我写的是一个伪命令行的输入效果的动画。

首先我们需要模拟命令行的下标闪烁，代码如下：

```js
stringFlash () {
  const arr = [];
  for(let i=0;i<6;i++){
    arr.push(new Promise(resolve => {
      setTimeout(() => {
        if(i % 2 == 0){
          this.span_text = '_';
        }else{
          this.span_text = ' ';
        }
        resolve();
      },500*i);
    }))
  }
  return Promise.all(arr);
}
```

该代码实现了命令行下表三次的闪烁效果，全部闪烁效果完成后，Proimse就会resolve，我们可以通过调用`then()`方法进行接下去的效果。

<br>

之后就是伪输入效果的现实，我们直接上代码:

```js
tweenString () {
  const arr = [];
  let length = this.text.length;
  for(let i=0;i<length;i++){
    arr.push(new Promise(resolve => {
      setTimeout(() => {
        if(this.randomAscii(i,0)){
          resolve();
        }
      },150*i);
    }));
  }
  Promise.all(arr).then(() => {
    let interval = setInterval(() => {
      if(this.imgFinish){
        this.show = false;
        clearInterval(interval);//清理计时器
        this.$emit('hide');//触发自定义的hide事件，该事件我们用于触发夫控件的改变，如果不是使用vue，可以省略掉这里
      }else{
        this.span_text += ' .';
      }
    },1000);
  });
}
```

在代码里面我们能够关注到的几个函数一个是`randomAscii(i,0)`,然后就是当我们的效果效果完成后，通过计时器来监控imgFinish变量，该变量我们在检测图片加载时候，如果完成就会变成true。然后去触发我们自定义的hide事件。

<br>

下面是`randomAscii(index,count)`函数和`replaceString(index,str)`函数

```js
//用于模拟输入效果通过双向绑定，实时改变dom的内容
//this.span_text用于显示的字符串变量
//this.text目标字符窜
randomAscii (index,count) {
  if(count == 2){
    let str = this.text[index];
    this.span_text = this.replaceString(index,str);
    return true;
  }else if(this.text.codePointAt(index) !== this.span_text.codePointAt(index)){
    if(this.span_text[index] !== undefined){
      let number = parseInt(((Math.random()*100)%95) + 32);
      let str = String.fromCodePoint(number);
      this.span_text = this.replaceString(index,str);
      count++;
    }else{
     this.span_text += '_';
    }
    //递归，最多递归三次。
    return setTimeout(() => {
      this.randomAscii(index,count);
    },50)
  }else{
    return true;
  }
}
//用于替换当前字符串的指定位置的字母
//由于无法直接替换，需要把字符串切成数组，改变后拼接成字符串并返回。
replaceString (index,str) {
  let arr = this.span_text.split('');
  arr[index] = str;
  return arr.join('');
}
```

最后实现效果合并到一个函数,通过调用该函数使用动画。
```js
loaddingAnimation () {
  this.stringFlash().then(() => {
    this.tweenString();
  });
}
```

***

# Vue代码块展示

> Vue.js 组件html代码部分

```html
<template>
  <div class="loadding-view" v-show="show" @:finish="hide">
    <span>Loadding the image resource,please wait...</span>
    <span>
      {{ span_text }}
      <!-- <div class="line" :style="lineWidth"></div> -->
    </span>
  </div>
</template>
```

<br>

> Vue.js 组件javascript代码部分

```js
export default {
  props:{
    text: {
      type:String,
      required: true
    },
    run: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show:true,
      imgFinish: false,
      span_text:' ',
      loadding:0,
      loaded:0,
    }
  },
  mounted () {
    if(this.run){
      this.getIamgeLoaded();
      this.loaddingAnimation();
    }
  },
  methods:{
    getIamgeLoaded () {
      const finish = [];
      let $img = document.getElementsByTagName('img');
      this.loadding = $img.length;
      for(let i=0;i<$img.length;i++){
        finish.push(new Promise(resolve => {
          $img[i].onload = () => {
            this.loaded++;
            resolve();
          }
        }));
      };
      Promise.all(finish).then(() => {
        this.imgFinish = true;
      });
    },
    loaddingAnimation () {
      this.stringFlash().then(() => {
        this.tweenString();
      });
    },
    stringFlash () {
      const arr = [];
      for(let i=0;i<6;i++){
        arr.push(new Promise(resolve => {
          setTimeout(() => {
            if(i % 2 == 0){
              this.span_text = '_';
            }else{
              this.span_text = ' ';
            }
            resolve();
          },500*i);
        }))
      }
      return Promise.all(arr);
    },
    tweenString () {
      const arr = [];
      let length = this.text.length;
      for(let i=0;i<length;i++){
        arr.push(new Promise(resolve => {
          setTimeout(() => {
            if(this.randomAscii(i,0)){
              resolve();
            }
          },150*i);
        }));
      }
      Promise.all(arr).then(() => {
        let interval = setInterval(() => {
          if(this.imgFinish){
            this.show = false;
            clearInterval(interval);
            this.$emit('hide');
          }else{
            this.span_text += ' .';
          }
        },1000);
      });
    },
    randomAscii (index,count) {
      if(count == 2){
        let str = this.text[index];
        this.span_text = this.replaceString(index,str);
        return true;
      }else if(this.text.codePointAt(index) !== this.span_text.codePointAt(index)){
        if(this.span_text[index] !== undefined){
          let number = parseInt(((Math.random()*100)%95) + 32);
          let str = String.fromCodePoint(number);
          this.span_text = this.replaceString(index,str);
          count++;
        }else{
         this.span_text += '_';
        }
        return setTimeout(() => {
          this.randomAscii(index,count);
        },50)
      }else{
        return true;
      }
    },
    replaceString (index,str) {
      let arr = this.span_text.split('');
      arr[index] = str;
      return arr.join('');
    },
    hide () {
      this.show = false;
    }
  },
  computed:{
    lineWidth:function () {
      return {
        width: (parseInt((this.loaded/this.loadding))* 100)+'%!important'
      };
    }
  }
}
```

***

# 总结

双向绑定、数据触发dom更新让很多动画执行起来更加舒服。当然这些效果其实都可以通过自己的原生代码实现，不过使用javascript库能够大大的加快编码速度，同时封装成一个组件也方便复用。

模拟输入变化效果用的是随机一个ascii码，并转换成字符。通过这个样的方法来实现伪随机输入效果。

这边文章的主要是抛出了这样的一个思路，如果您有更好或者更有意思的想法或者更好的思路，可以在网站的评论功能开发完成后，留下你的评论一起讨论。

最后如果你想转载我的文章，希望能通过邮箱通知我并且注明出处。