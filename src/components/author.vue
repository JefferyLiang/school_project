<template>
  <div class="detail-by">
    <div class="left">
      <span class="title">DETAIL BY</span>
      <div class="image-div">
        <!-- <img src=""> -->
      </div>
      <div class="author-text">
        <div>
          <span class="author-name">梁 志豪</span>
          <span class="english-name">(Jeffery Liang)</span>
        </div>
        <div class="author-experience">
          2017年毕业于中山大学新华学院，软件工程专业。立志成为一名优秀的网页全栈工程师，并有意向网站设计与平面设计方向发展。初步涉猎了一些前端技术，比如angularJS、Vue.js、webpack和一些前端UI框架。也懂的如何编写自动化的Karma+Jasmine搭建的自动模块测试代码。有良好的技术自驱能力。正在学习ES6与一些设计方向的知识...
        </div>
        <div class="follow">
          <social class="follow-style" v-for="(item,index) in socialList" :iconName="item.iconName" :textName="item.textName" :link="item.link" :key="index"></social>
        </div>
      </div>
      <span class="title" style="margin-top:2rem;">LINK</span>
      <div class="detail-link">
        <social class="link-style" v-for="(item,index) in projectList" :iconName="item.iconName" :textName="item.textName" :link="item.link" :key="index"></social>
      </div>
    </div>
    <div class="right">
      <span class="title" style="margin-bottom:3rem;">CONTACT</span>
      <div class="contact">
        <span>若有网站相关的问题或者工作机会</span>
        <span>可以通过以下邮箱来联系我</span>
        <social :textName="email"></social>
        <span>乐于学习新技术与面对挑战</span>
        <span></span>
      </div>
      <span class="title" style="margin-bottom:3rem;">TAG</span>
      <ul class="tag-list">
        <li class="tag-list-item" v-for="(item,index) in tagList" :key="index">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import social from '@/components/SocialNetworking.vue'
export default {
  components:{
    social:social
  },
  data () {
    return {
      socialList:[{
        iconName: 'instagram',
        textName: 'instagram',
        link: 'https://www.instagram.com/lzh.jeffery/'
      },{
        iconName: 'facebook',
        textName: 'facebook',
        link: 'https://www.facebook.com/profile.php?id=100007912098363'
      },{
        iconName: 'weibo',
        textName: 'Sina Weibo',
        link: 'http://weibo.com/q693197859'
      }],
      projectList:[{
        iconName: 'github',
        textName: 'min blog project',
        link: 'https://github.com/JefferyLiang/min-blog'
      },{
        iconName: 'github',
        textName: 'school-project',
        link: 'https://github.com/JefferyLiang/school_project'
      }],
      tagList:[{
        name: 'Vue.js',link: 'https://cn.vuejs.org'
      },{
        name: 'angularJS',link: 'https://angularjs.org'
      },{
        name: 'express',link: 'expressjs.com/zh-cn/'
      },{
        name: 'node.js',link: 'https://nodejs.org/zh-cn'
      },{
        name: 'ES6',link: 'http://es6.ruanyifeng.com/'
      },{
        name: 'mySQL',link: 'https://www.mysql.com/'
      },{
        name: 'CSS3',link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3'
      },{
        name: 'angular-material',link: 'https://material.angularjs.org/'
      },{
        name: 'Semantic UI',link: 'https://semantic-ui.com/'
      },{
        name: 'Bootstrap',link: 'www.bootcss.com/'
      }],
      email: 'lzh.jeffery@gmail.com'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@mixin flex($direction){
  display: flex;
  display: -webkit-flex;
  flex-direction: $direction;
}
.detail-by{
  width: 100%;
  @include flex(row);
}
.left,.right{
  @include flex(column);
  position:relative;
  .title{
    text-align: left;
    font-size:5rem;
    letter-spacing: .08em;
    font-family: 'Cormorant Upright',serif;
    color:#6d5c5a;
    line-height: 1.1;
  }
}
.left{
  border-right: 1px solid #acacac;
  padding-right: 5%;
  flex:2;
}
.right{
  flex:1;
  margin-left: 5%;
  text-align: left;
}
.author-text{
  margin-top:2rem;
  padding-bottom:2rem;
  text-align: left;
  border-bottom: 1px solid #acacac;
  .author-name{
    font-size:1.8rem;
    line-height: 1.4;
  }
  .english-name{
    margin-left:1rem;
    font-size:1.3rem;
    line-height: 1.4;
  }
  .author-experience{
    margin-top:1rem;
    font-size:1.4rem;
    line-height: 1.6;
  }
}
.follow{
  margin-top:4rem;
  @include flex(row);
  flex-wrap: wrap;
}
.detail-link{
  width:100%;
  @include flex(row);
  flex-wrap: wrap;
  margin:{
    top:2rem;
    bottom:2rem;
  }
}
.follow-style,.link-style{
  width:50%!important;
  margin:{
    top:1rem;
    bottom:1rem;
  }
}
.contact{
  @include flex(column);
  padding-bottom:2rem;
  margin-bottom:2rem;
  border-bottom: 1px solid #acacac;
  span{
    font-size: 1.3rem;
    line-height: 1.8;
    margin:{
      top:.5rem;
      bottom:.5rem;
    }
  }
}
.tag-list{
  list-style: none;
  margin-right:5%;
  padding:0px;
  font-size:2rem;
  font-weight: normal;
  line-height: 1.1;
  font-family: "Cormorant Upright",serif;
  @include flex(row);
  flex-wrap: wrap;
  .tag-list-item{
    @include flex(row);
    position: relative;
    list-style: none;
    margin:0;
    padding:0;
    border:0;
    outline: 0;
    margin-bottom:2rem;
    color:#6d5c5a;
    &:last-child{
      &:after{
        content:none;
      }
    }
    &:after{
      content:'/';
      padding:0 1rem;
      color:#6d5c5a;
    }
    a{
      position:relative;
      color:#6d5c5a;
      cursor:pointer;
      &:before{
        content: '[';
        left: -10px;
      }
      &:after{
        content: ']';
        right: -10px;
      }
      &:after,&:before{
        position: absolute;
        bottom:0px;
        opacity: 0;
        transition: all .3s;
      }
      &:hover{
        &:before{
          left: -5px;
          opacity: 1;
        }
        &:after{
          right: -5px;
          opacity: 1;
        }
      }
      &:hover,&:focus{
        text-decoration: none;
        outline: none;
      }
    }
  }
}
</style>