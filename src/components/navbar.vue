<template>
  <div class="self-navbar">
    <span class="flex"></span>
    <ul class="navbar-items">
      <li v-for="item in items"><a href="#">{{ item.name }}</a></li>
    </ul>
    <div class="input-icon-group">
      <input class="inputStyle" type="text" v-model="search" placeholder="Search">
      <icon class="iconStyle" name="search" scale="1.5"></icon>
    </div>
  </div>
</template>

<script>
export default {
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
      search: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
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
.self-navbar{
  @include flex(row);
  height: 72px;
  background-color:transparent;
  padding:0px 20px;
  font-family: "Cormorant Upright",serif;
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