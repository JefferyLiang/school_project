<template>
  <div class="edit">
    <navbar class="navbar-style"></navbar>
    <div class="page">
      <div class="type-list">
      <div class="item">
        <span class="title">Type:</span>
        <select class="select-style" v-model="selected">
          <option v-for="(item,index) in selectList" value="item">{{ item }}</option>
        </select>
      </div>
      <div class="item">
        <span class="title">Min-Title:</span>
        <input v-model="minTitle">
      </div>
      <div class="item area">
        <span class="title">Min-Description</span>
        <textarea v-model="minDescription" class="textarea-style" rows="5"></textarea>
      </div>
      <div class="item area">
        <span class="title">markDownName:</span>
        <input v-model="mdName" type="text">
      </div>
      </div>
      <div class="layout-row">
        <div class="layout-column" style="flex:1.5">
          <span class="input-span">input you text</span>
          <textarea class="textarea-style" v-model="text" cols="30" rows="10"></textarea>
          <button @click="createMarkDown()">发布</button>
        </div>
        <div class="layout-column left-line" style="flex:2">
          <span class="result-span">Result</span>
          <span class="mark-down-style" v-html="markdown"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import navbar from '@/components/navbar.vue';
export default {
  components:{
    navbar:navbar
  },
  data () {
    return {
      text: '',
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
  width: 60%;
  margin:2rem 20%;
  flex:1;
}
.mark-down-style{
  margin:1rem 2rem;
  background-color:transparent;
  flex:2;
  //box-shadow: 0px 0px 5px rgba(0,0,0,.2);
  text-align: left;
}
.type-list{
  @include flex(column);
  position: fixed;
  left: 0;
  top: calc(2rem + 100px);
  width:15%;
}
.textarea-style{
  margin:1rem 0px;
  flex:2;
  max-height: 400px!important;
  border:none;
  border-radius: 10px;
}
.select-style{
  border:0;
  flex:1;
  border-radius: 0px;
  margin:0rem 5px;
}
.title{
  margin:auto 2px;
}
.item{
  @include flex(row);
  width:90%;
  margin:.5rem auto;
  justify-content: center;
}
.area{
  @include flex(column);
  width:90%;
  margin:.5rem auto;
  text-align: left;
  .textarea-style{
    width:100%;
    margin:.5rem 0px;
    background-color:rgb(248,248,248);
  }
}
input{
  border:0;
  background-color:rgb(248,248,248);
  border-radius: 10px;
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
.left-line{
  position:relative;
}
</style>