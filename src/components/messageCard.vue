<template>
  <div class='card'>
    <router-link class="card-image" :to="to" tag="div">
      <img class="image-style" :src="imgUrl" :data-src="imgUrl" style="width:100%;">
    </router-link>
    <div class="card-text">
      <router-link tag="div" :to="to" class="text-link">
        <span class="card-type">{{ text.cardType }}</span>
        <span class="title">{{ text.title }}</span>
        <span class="date">{{ text.date }}</span>
        <span class="text">{{ text.mainText }}</span>
      </router-link>
      <div class="tag-list">
        <span class="title">Tag:</span>
        <ul class="tag-list">
          <li v-for="(item,index) in tagList" class="tag-list-item"><a href="#">{{ item }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    imgUrl:String,
    text:Object,
    to:String,
    tagList:Array
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "./static/css/public.scss";
@mixin flex($direction){
  display: flex;
  display: -webkit-flex;
  flex-direction: $direction;
}
.card{
  position:relative;
  width:100%;
  padding:20px;
  @include flex(row);
  &:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color:rgba(255,255,255,.3);
    -webkit-transform: scale(0,1);
    -ms-transform: scale(0,1);
    transform: scale(0,1);
    -webkit-transform-origin: 100% 50% 0;
    -ms-transform-origin: 100% 50% 0;
    transform-origin: 100% 50% 0;
    -webkit-transition: -webkit-transform .25s cubic-bezier(.215,.61,.355,1) 0s;
    transition: transform .25s cubic-bezier(.215,.61,.355,1) 0s;
    transition: transform .25s cubic-bezier(.215,.61,.355,1) 0s,-webkit-transform .25s cubic-bezier(.215,.61,.355,1) 0s;
  }
  &:hover{
    &:after{
      -webkit-transform-origin: 0 50% 0;
      -ms-transform-origin: 0 50% 0;
      transform-origin: 0 50% 0;
      -webkit-transform: scale(1,1);
      -ms-transform: scale(1,1);
      transform: scale(1,1);
      -webkit-transition: -webkit-transform .45s cubic-bezier(.23,1,.32,1) 0s;
      transition: transform .45s cubic-bezier(.23,1,.32,1) 0s;
      transition: transform .45s cubic-bezier(.23,1,.32,1) 0s,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0s;
    }
  }
}
.card-image{
  width:55%;
  z-index: 2;
  cursor:pointer;
}
.card-text{
  z-index: 2;
  width: 45%;
  margin-left: 5%;
  text-align: left;
  @include flex(column);
  justify-content: space-between;
  .title{
    font-size:2rem;
    font-weight: 700;
    line-height: 1.6;
  }
  .date{
    font-size:1.1rem;
    margin-top: 1rem;
    color: #2e2e2e;
  }
  .text{
    font-size: 1.4rem;
    color: #808085;
    line-height: 1.5;
    margin-top:1.4rem;
  }
}
.card-type{
  position:absolute;
  color:#808085;
  left: 20px;
  top: -1.5rem;
  font-size: 4rem;
  font-family: "Cormorant Upright",serif;
}
.image-style{
  width:100%;
  height: 300px;
}
.text-link{
  @include flex(column);
  cursor: pointer;
  width:100%;
}
.tag-list{
  @include flex(row);
  flex-wrap: wrap;
  .title{
    width:100%;
    font-family: "Cormorant Upright",serif;
    font-size: 3rem;
    font-weight: normal;
    user-select: none;
    cursor: default;
  }
  .item{
    // @include link-KH;
    font-family: "Cormorant Upright",serif;
    margin:{
      bottom:.5rem;
      right:1.5rem;
    }
    font-size:2rem;
  }
}
.tag-list{
  @include tag-list;
}
</style>