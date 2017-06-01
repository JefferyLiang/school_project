# angularJS V4.0 入坑指南:这次从cli开始

***

> 概述

在开始先说一下，如果你对angularJS的运行机制和cli脚手架工具和打包工具完全没有概念和相关的知识支持。那么你还是需要先去了解一些哪方面的基础。因为如果你完全没有基础那么，面对通过cli构建出来的项目会一脸懵逼。不过我尽量讲个明白吧。(不过我也是个新手，试一下吧)

然后这文章只是初步的讲一下怎么去使用angualr-cli去快速搭建自己的angularV4.0的项目，因为刚毕业比较忙，所以没有太多时间写成一篇很旺正的，不过有空就会持续更新下去。好了废话到这里吧。

<br>

> 准备工作

首先，想用angular的cli工具，得确保自己有node的环境和npm包管理工具

```
版本要求:
node.js: 6.9.x
npm: 3.x.x

可以通过命令行的npm -v和node -v查看自己的版本
``` 

> 来我们开始看看怎么用cli

环境配置好之后，需要用npm全局安装angular-cli

```
npm install -g angular/cli
```

使用cli创建一个项目的骨架代码，在构建项目构架时候需要一些时间去安装npm包。

```
ng new my-app
```

最后我们需要移动到项目的根目录下并通过命令让项目跑起来

其中我们可以使用`ng serve`去启动项目，`--open`或`-o`可以默认打开`localhost:4100`

```
cd my-app
ng serve --open
```

这样子我们就能够得到一个angularJS2的骨架项目了。

接下来我们来看一下骨架项目的项目结构。

<br>

## 项目结构

```
·
|--- e2e    //e2e的测试的文件目录
|
|--- node_modules   //npm包模块安装文件（这个一般不用去搞它）
|
|--- src    //项目代码存放的地方
|
|--- angular-cli.json   //angularJS2的CLI配置文件
|
|--- .editorconfig
|
|--- .gitgnore
|
|--- karam.conf.js  //karam的配置文件（至于karam是什么我只能说用来管理自动测试工具的，详细是什么，可以自己去百度/google）
|
|--- package.json   //项目的package文件，一个正常的node项目都应该有的
|
|--- protractor.conf.js
|
|--- README.md
|
|--- tsconfig.json
|
|--- tslint.json    //ts lint的配置文件，需要改可以在这改。
```

项目的主体结构就想上面一样，我们重点关注的src文件夹下面的东西，至于自动化测试，估计用过vue、angular等以这一类的框架的大概都知道怎么写。

<br>

> src/main.ts

该文件相对稳定，基本上可以说是是不用去修改它。

<br>

> src/app 该文件夹存放着整个当页面应用的主要代码

### app.module.ts文件

该文件用于注册我们写的Component和注册我们引入的服务

<br>

### app.component.ts文件

是本项目的入口模版，通过该模版引导index.html到angular项目之中。

<br>

### app.component.html文件

app.component入口模版的html文件。

<br>

### app.component.css文件

app.component.html的样式文件。

<br>

---

## 小结

简单的介绍了一下通过cli生成的angular项目骨架是什么样的架构，下章我们就跟着官方的一些例子来，开始了解angular2有什么变化。