<template>
  <div class="edit">
    <navbar class="navbar-style"></navbar>
    <div class="page">
      <leftMenu class="left-menu"></leftMenu>
      <div class="layout-row">
        <div class="layout-column" style="flex:1.5">
          <span class="input-span">input you text</span>
          <textarea class="textarea-style" :value="text" @input="update" cols="30" rows="10"></textarea>
          <button @click="createMarkDown()">发布</button>
        </div>
        <div class="layout-column left-line" style="flex:2">
          <span class="result-span">Result</span>
          <div class="mark-down-style" v-html="markdown" v-highlight></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import navbar from '@/components/navbar.vue'
import leftMenu from '@/components/left_menu.vue'
export default {
  components:{
    navbar:navbar,
    leftMenu:leftMenu
  },
  data () {
    return {
      text: '123',
      selected: '',
      selectList:[],
      minTitle: '',
      minDescription: '',
      mdName: '',
      mdList: [],
      text: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.getTypeList();
      this.getFileList();
    });
  },
  computed:{
    markdown(){
      return marked(this.text);
    }
  },
  methods:{
    getTypeList () {
      this.$http.get('/static/json/type.json').then(response => {
        this.selectList = response.body.list;
      },response => {
        console.log('failed to get type list！')
      })
    },
    getFileList () {
      this.$http.get('http://localhost:3010/file/getMarkDownList').then(response => {
        this.mdList = response.body;
      },response => {
        console.log('failed to get file lists!');
      })
    },
    createMarkDown () {
      let params = {
        "name": this.mdName,
        "text": this.text
      }
      this.$http.post('http://localhost:3010/file/createMarkdown',params).then(response => {},response => {
        console.log('create a new markdown file failed');
      })
    },
    update (e) {
      this.text = e.target.value
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./static/css/public.scss";
@import "./static/css/markDown.scss";
.edit{
  @include flex(column);
  position: relative;
  width:100%;
  min-height: 100%;
}
.navbar-style{
  position: absolute;
  width:100%;
  top: 0;
  left:0;
  z-index: 2;
}
.page{
  @include flex(column);
  position: relative;
  width:100%;
  background-color:#e8eee9;
  flex:1;
  padding-top:100px;
}
.layout-row{
  @include flex(row);
  width: 50%;
  margin:2rem 20% 0px 25%;
  flex:1;
}
.mark-down-style{
  margin:1rem 2rem;
  background-color:transparent;
  flex:2;
  //box-shadow: 0px 0px 5px rgba(0,0,0,.2);
  text-align: left;
}
.textarea-style{
  margin:1rem 0px;
  flex:2;
  max-height: 400px!important;
  border:none;
  border-radius: 10px;
}
.title{
  margin:auto 2px;
}
.layout-column{
  @include flex(column);
  text-align: left;
}
.input-span{
  font-size:2rem;
  font-family: "Cormorant Upright",serif;
}
.result-span{
  margin-left: 2rem;
  font-size:2rem;
  font-family: "Cormorant Upright",serif;
}
.left-menu{
  width:20%!important;
  height: 100px!important;
  //background-color:white;
  position:fixed!important;
  top:150px;
}
</style>