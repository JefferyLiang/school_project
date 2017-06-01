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
          <transition-group>
            <div class="body-content" v-for="(item,index) in contentList" :key="index">
              <card :imgUrl="item.imgUrl" :text="item.textList" :to="item.to" :tagList="item.tag"></card>
            </div>
          </transition-group>
          <div class="index-read-more">
            <span class="read-more-title">READ MORE</span>
          </div>
        </div>
        <div class="index-footer">
          <detail id="author"></detail>
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
import { mapMutations,mapState } from 'vuex'
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
      cardList: [],
      contentList: [],
      loadding:'',
      loadMessage: 'Jeffery Website'
    }
  },
  created () {
    this.getCardList();
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.commit('initialType');
        this.showList();
      },100);
    });
  },
  methods:{
    getCardList () {
      this.$http.get('http://www.liangscott.com:3010/file/markdown/list').then(response => {
        this.cardList = response.body;
      },response => {
        console.log('failed to get the markdown list!');
      })
    },
    loaddingFinish () {
      this.$store.commit('loaddingFinish');
    },
    showList () {
      this.contentList = [];
      for(let value of this.cardList){
        if(this.filterType === '') this.contentList.push(value)
        if(this.filterType !== '' && value.textList.cardType === this.filterType) this.contentList.push(value);
      }
    }
  },
  computed: {
    loaddingNow: function () {
      if(this.$store.state.from.name === 'welcome') return this.$store.state.loadding;
      return false;
    },
    ...mapState(['filterType'])
  },
  watch:{
    filterType:function(){
      this.showList();
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