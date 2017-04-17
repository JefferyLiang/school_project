<template>
  <div id="index" >
    <transition name="fade">
      <loadding :text.String='loadMessage' @hide="loaddingFinish" :run="loaddingNow" v-show="loaddingNow"></loadding>
    </transition>
    <transition name="fade">
      <div v-show="!loaddingNow" style="position:relative;z-index:4">
        <div class="index-header">
          <img :src="top_image" style="width:100%;">
          <span class="title">Jeffery Animation Web</span>
        </div>
        <div class="index-body">
          <navbar :follow="true"></navbar>
          <div class="body-content" v-for="item in contetnList">
            <card :imgUrl="item.imgUrl" :text="item.textList" :to="item.to"></card>
          </div>
          <div class="index-read-more">
            <span class="read-more-title">READ MORE</span>
          </div>
        </div>
        <div class="index-footer">
          <detail></detail>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import card from '@/components/messageCard.vue'
import detail from '@/components/author.vue'
import loadding from '@/components/loadding.vue'
import { mapMutations } from 'vuex'
export default {
  components:{
    navbar:navbar,
    card:card,
    detail:detail,
    loadding:loadding
  },
  data() {
    return {
      top_image: require('@/assets/img/top_image.jpg'),
      contetnList: [{
        imgUrl: require('@/assets/img/index/de5d3b47-d980-46d0-af7e-aacb5332812e.jpg'),
        textList: {
          cardType: 'INTRODUCTION', title: '网站加载动画效果',date: '2017.04.10',
          mainText: '介绍制作网站页面加载动画效果的思路方法，与基于Vue.js如何实现一个伪命令行输入效果的页面加载动画。通过该动画让网站加载资源有更多的时间，如加载字体、图片等。'
        },
        to:'/page/1'
      }],
      loadding:'',
      loadMessage: 'Jeffery Website'
    }
  },
  methods:{
    loaddingFinish () {
      this.$store.commit('loaddingFinish');
    }
  },
  computed: {
    loaddingNow: function () {
      if(this.$store.state.from.name === 'welcome') return this.$store.state.loadding;
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/public.scss';
$background-color: rgba(232, 238, 238,1);
@mixin flex($direction){
  display: flex;
  display: -webkit-flex;
  flex-direction: $direction;
}
#index{
  position:relative;
  height: 100%;
}
.loading-view{
  width:100%;
  height: 100%;
  @include flex(column);
  justify-content: center;
  
}
.index-header{
  position: fixed;
  top:-200px;
  z-index: 2;
  .title{
    position:absolute;
    color:#6b6b71;
    font-weight: 700;
    top:35%;
    left: 0px;
    width:100%;
    text-align: center;
    font-size: 5rem;
    font-family: "Cormorant Upright",sans-serif
  }
}
.index-body{
  position:relative;
  margin-top:400px;
  width:100%;
  background-color:$background-color;
  z-index: 3;
  @include flex(column);
}
.index-read-more{
  position: relative;
  padding:70px 15%;
  z-index: 3;
  .read-more-title{
    position:relative;
    font-size: 4rem;
    color:#808085;
    font-family: "Cormorant Upright",serif;
    &:before{
      content: "";
      position:absolute;
      left: 0px;
      top:0px;
      width:0px;
      height: 0px;
      border:{
        top:1px solid #808085;
        left:1px solid #808085;
      }
      transition: all .3s;
    }
    &:after{
      content: "";
      position: absolute;
      right: 0px;
      bottom: 0px;
      width:0px;
      height: 0px;
      border:{
        bottom: 1px solid #808085;
        right: 1px solid #808085;
      }
      transition: all .3s;
    }
    &:hover{
      &:before,&:after{
        width: calc(100% - 10px);
        height: calc(100% - 10px);
      }
    }
  }
}
.index-footer{
  position:relative;
  width:100%;
  background-color:#e3dfdb;
  padding:5rem 15% 4rem 15%;
  z-index: 3;
}
.body-content{
  width:70%;
  margin:{
    top:100px;
    left: 15%;
    right: 15%;
    bottom:0px;
  }
}
</style>