<template>
  <div class="social-networking">
    <icon v-if="iconName" :name="iconName" scale="3"></icon>
    <a :target="link?'_blank':'_self'" class="a-style" :class="{'a-margin': iconName}" :href="link?link:'#'">{{ textName }}</a>
  </div>
</template>

<script>
export default {
  props:{
    iconName:String,
    textName:String,
    link:String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #6d5c5a;
@mixin flex($direction){
  display: flex;
  display: -webkit-flex;
  flex-direction: $direction;
}
.social-networking{
  width:100%;
  @include flex(row);
}
.a-margin{
  margin-left: 10px;
}
.a-style{
  position:relative;
  color:#6d5c5a;
  font-size: 2rem;
  font-family: "Cormorant Upright",serif;
  &:after{
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0px;
    width:100%;
    height: 1px;
    opacity: 0;
    background-color: $font-color;
    transition: all .3s;
  }
  &:hover{
    text-decoration: none;
    &:after{
      bottom:0px;
      opacity: 1;
    }
  }
  &:focus{
    text-decoration: none;
  }
}
</style>