<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
@import './static/css/font.scss';
@import './static/css/markDown.scss';
@import './static/css/public.scss';
@font-face {font-family: 'Source Hans';
  src: url('//at.alicdn.com/t/1rb4ktc44jwcdi.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/1rb4ktc44jwcdi.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/1rb4ktc44jwcdi.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/1rb4ktc44jwcdi.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/1rb4ktc44jwcdi.svg#NotoSansHans-DemiLight') format('svg'); /* iOS 4.1- */
}
#app {
  font-family: 'Source Hans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
  height: 100%;
}
</style>
