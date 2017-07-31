<template>
  <div class="left-menu" :style="{right: right}">
    <button class="show-btn" @click="toggle()">
      <icon class="icon-style" name="right" scale="1.5"></icon>
    </button>
    <div class="item-list">
      <div class="item" v-show="index === 0">
        <div class="item-row">
          <span>Type:</span>
          <select v-model="type">
            <option value="INTRODUCTION">INTRODUCTION</option>
            <option value="ANIMATION">ANIMATION</option>
            <option value="FOLLOW">FOLLOW</option>
          </select>
        </div>
      </div>
      <div class="item" v-show="index === 1">
        <span>2</span>
      </div>
      <div class="item" v-show="index === 2">
        <span>3</span>
      </div>
    </div>
    <ul class="item-btn-list">
      <li :class="{'select-active': index === 0}"><a href="#" @click="selected(0)">添加</a></li>
      <li :class="{'select-active': index === 1}"><a href="#" @click="selected(1)">删除</a></li>
      <li :class="{'select-active': index === 2}"><a href="#" @click="selected(2)">编辑</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      right: '100%',
      width: 0,
      index: 0
    }
  },
  created () {
    this.$nextTick(() => {
      let $that = $('.left-menu');
      this.width = $that[0].clientWidth;
    })
  },
  methods:{
    toggle () {
      let $icon = $('.icon-style');
      if(this.right === '100%'){
        this.right = 'calc( 100% - '+ this.width +'px )'
        $icon.addClass('rotate-180');
      }else{
        this.right = '100%';
        $icon.removeClass('rotate-180');
      }
    },
    selected (i) {
      this.index = i;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./static/css/public.scss";
ul,li{
  list-style: none;
  margin:0;
  padding:0;
}
.left-menu{
  @include flex(row);
  position:relative;
  width:100%;
  right:100%;
  height: 100%;
  transition: right .5s;
}
.item-btn-list{
  @include flex(column);
  justify-content: flex-start;
  position:relative;
  li{ 
    padding:.5rem .75rem;
    a{
      margin:0 auto;
    }
  }
}
.item-list{
  @include flex(column);
  flex:1;
}
.item{
  @include flex(column);
  width:100%;
  background-color:rgba(0,0,0,.7);
  height: 100%;
  padding:1rem 1rem;
}
.show-btn{
  position: absolute;
  height:100%;
  top:0px;
  left:100%;
  background-color:transparent;
  border:none;
  background: linear-gradient(to right,rgba(0,0,0,.1),rgba(0,0,0,0));
  &:focus{
    outline: none;
  }
}
.icon-style{
  transform: rotate(0deg);
  transition: transform .5s;
}
.rotate-180{
  transform: rotate(180deg)!important;
}
.select-active{
  // border:{
  //   top:1px solid black;
  //   bottom:1px solid black;
  //   right:1px solid black;
  // }
  background-color:rgba(0,0,0,.7);
  a{
    color:white;
  }
}
.item-row{
  @include flex(row);
  span{
    color:white;
    flex:1;
  }
  select{
    padding:0px 1rem;
    flex:2;
  }
}
</style>