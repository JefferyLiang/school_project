<template>
  <div class="page">
    <navbar :follow="true" :background="'rgba(232, 238, 233,0)'" class="navbar-style"></navbar>
    <div class="introduct-detail">
      <img class="image-style" :src="img" alt="">
      <div class="introduct-message">
        <div class="tag-list">
          <span v-for="(item,index) in tagList">{{item}}</span>
        </div>
        <span class="title">{{ title }}</span>
        <span class="date">{{ date }}</span>
      </div>
    </div>
    <div class="page-body">
      <div class="mark-down" v-html="markdown_text" v-highlight></div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import marked from 'marked'
export default {
  components:{
    navbar:navbar
  },
  data () {
    return {
      img: require('@/assets/img/page/123039ca-b687-4275-85f5-57d3a4e185f7.jpg'),
      tagList:["CSS","Javascript","JQuery"],
      title: '实现等待页面图片资源加载的Loading动画制作思路与代码实现',
      date: '2017.04.15',
      text: ''
    }
  },
  filters:{
    marked: marked
  },
  created () {
    this.getMarkDown();
  },
  methods: {
    getMarkDown () {
      this.$http.get('/static/markdown/text.md').then(response => {
       this.text = response.body;
      },response => {
        console.log('Error')
      })
    }
  },
  computed: {
    markdown_text () {
      return marked(this.text);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./static/css/public.scss";
$background-color:rgb(232, 238, 233);
.navbar-style{
  z-index:10!important;
  position:fixed!important;
  width:100%!important;
}
.page{
  width:100%;
  min-height: 100%;
  @include flex(column);
  background-color:$background-color;
  >div{
    position:relative;
  }
}
.introduct-detail{
  position:relative;
  width:100%;
  height:450px;
  @include flex(column);
  justify-content: center;
  align-items:center;
}
.image-style{
  position:absolute;
  top:-200px;
  left: 0px;
  width:100%;
}
.introduct-message{
  @include flex(column);
  justify-content: center;
  align-items: center;
  position:relative;
  width:100%;
}
.tag-list{
  @include flex(row);
  width:100%;
  font-weight: bold;
  justify-content: center;
  font-family: "Cormorant Upright",serif;
  span{
    position:relative;
    font-size: 2rem;
    padding:0px 1rem;
    height: 2.5rem;
    transition:font-size .3s;
    cursor: pointer;
    &:after{
      content:'/';
      position:absolute;
      font-size:2rem!important;
      right:0px;
    }
    &:hover{
      font-size:2.5rem;
    }
    &:last-child{
      &:after{
        display: none;
      }
    }
  }
}
.title{
  font-size:3rem;
  margin:1rem 0px;
  line-height:1.1;
  max-width:60%;
}
.date{
  font-size: 1.5rem;
  margin:.5rem 0px;
}
.page-body{
  width:100%;
  padding: 2rem 20%;
  background-color:$background-color;
  .mark-down{
    text-align: left;
  }
}
</style>