<template>
  <div class="self-navbar">
    <transition name='fade'>
      <router-link tag="span" to="/index" v-show="shouldFollow || top == 0" class="title">Jeffery Website</router-link>
    </transition>
    <span class="flex"></span>
    <ul class="navbar-items">
      <li v-for="item in items">
        <a @click="changefilterType(item.name)" style="cursor:pointer;">{{ item.name }}</a>
      </li>
      <li><router-link tag="a" to="/edit" v-show="islogin">EDIT</router-link></li>
    </ul>
    <div class="input-icon-group">
      <input class="inputStyle" type="text" v-model="search" placeholder="Search">
      <icon class="iconStyle" name="search" scale="1.5"></icon>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  props:{
    follow:{
      type:Boolean,
      default: false
    },
    background:{
      type:String,
      default: '#e8eeee'
    }
  },
  data () {
    return {
      items:[{
        name: 'INTRODUCTION'
      },{
        name: 'ANIMATION'
      },{
        name: 'AUTHOR'
      },{
        name: 'FOLLOW'
      }],
      search: '',
      width: 0,
      top: 0,
      shouldFollow: false
    }
  },
  mounted () {
    this.getMessage();
  },
  created () {
    if(this.follow){
      window.addEventListener('scroll',() => {
        let number = (window.scrollY - this.top) > 0;
        if(number === this.shouldFollow) return;
        if(number !== this.shouldFollow){
          this.shouldFollow = number;
          this.setFollow();
        }
      })
    }
  },
  methods: {
    getMessage () {
      let that = $(this.$el);
      if(that[0].clientHeight == 0) return setTimeout(this.getMessage,500);
      this.width = that[0].clientWidth;
      this.getTop(that);
    },
    getTop(item) {
      this.top += item[0].offsetTop;
      if(item[0].offsetParent){
        return this.getTop($(item[0].offsetParent));
      }else{
        return true;
      }
    },
    setFollow () {
      let that = $(this.$el);
      if(this.shouldFollow){
        that.css({'width':this.width+'px','position':'fixed','top':'0','left':'0','z-index':'10','background-color':this.background});
      }else{
        that.css({'width':'100%','position':'static','background-color':'transparent'});
      }
    },
    changefilterType (typeName) {
      if(typeName === 'AUTHOR'){
        window.location.hash = '#author';
        return;
      }
      this.$store.commit('changeType',{typeName: typeName});
    },
    ...mapMutations(['changeType'])
  },
  computed:{
    islogin () {
      if(this.$store.state.currentUser===null) return false;
      return true;
    },
    ...mapState(['currentUser','filterType'])
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/public.scss';
$fontColor:#6b6b71;
ul,li{
  list-style: none;
  margin:0;
}
@mixin flex($direction){
  display: flex;
  display: -webkit-flex;
  flex-direction: $direction;
  align-items: center;
}
.title{
  font-size:2rem;
  font-weight: bold;
  margin-left:2rem;
  cursor:pointer;
  //opacity: 1;
}
.self-navbar{
  @include flex(row);
  height: 72px;
  background-color:transparent;
  padding:0px 20px;
  font-family: "Cormorant Upright",serif;
  transition:background-color .5s;
}
.flex{
  flex:99;
}
.navbar-items{
  @include flex(row);
  li{
    padding:0px 20px;
    a{
      font-size:1.8rem;
      color:$fontColor;
      text-decoration: none;
      transition: color .5s;
      position:relative;
      &:focus{
        outline: none;
      }
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #171717;
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
        color:#000;
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
  }
}
.input-icon-group{
  @include flex(row);
  margin:0px 10px;
}
.iconStyle{
  color:$fontColor;
  margin: 0px 5px;
}
.inputStyle{
  background-color:transparent;
  border:{
    top:none;
    left:none;
    right:none;
    bottom:1px solid #bbc1c2;
  }
  &:focus{
    outline: none;
  }
}
</style>