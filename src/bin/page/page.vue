<template>
  <div class="page">
    <navbar :follow="true" :background="'rgba(232, 238, 233,.9)'" class="navbar-style"></navbar>
    <div class="introduct-detail">
      <img class="image-style" :src="imgUrl" alt="">
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
      imgList: [require('@/assets/img/page/123039ca-b687-4275-85f5-57d3a4e185f7.jpg'),require('@/assets/img/page/58373aae-8de4-4b32-95dc-8b2f8ebb91e6.jpg'),require('@/assets/img/page/c4b8fad2-1621-4f8e-92b8-477f0fbfd29c.jpg')],
      tagList:[],
      title: '',
      date: '',
      text: '',
      list:{}
    }
  },
  created () {
    this.getFileName();
  },
  methods: {
    getFileName () {
      let key = parseInt(this.$route.params.id);
      this.$http.get('http://www.liangscott.com:3010/file/markdown/findById/'+ key).then(response => {
        this.list = response.body[0];
        this.tagList = this.list.tag;
        this.title = this.list.title;
        this.date = this.list.date;
        this.getMarkDown(this.list.fileName);
      },response => {
        console.log('failed to get markdown message');
      });
    },
    getMarkDown (fileName) {
      this.$http.get('/static/markdown/' + fileName).then(response => {
       this.text = response.body;
      },response => {
        console.log('Error')
      })
    },
    getPreList () {
      let $code = document.getElementsByTagName('code');
      console.log($code);
      for(let value of $code){
        console.log(value.classList);
      }
      // $Codes.forEach((index,item) => {
      //   console.log();
      // })
    }
  },
  computed: {
    markdown_text () {
      return marked(this.text);
    },
    imgUrl () {
      return this.imgList[(this.$route.params.id%3)];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./static/css/public.scss";
@import "./static/css/markDown.scss";
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