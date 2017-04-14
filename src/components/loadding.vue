<template>
  <div class="loadding-view" v-show="show" @:finish="hide">
    <span>
      {{ span_text }}
      <div class="line" :style="lineWidth"></div>
    </span>
  </div>
</template>

<script>
export default {
  props:{
    text: {
      type:String,
      required: true
    }
  },
  data () {
    return {
      show:true,
      imgFinish: false,
      span_text:'',
      loadding:0,
      loaded:0,
    }
  },
  mounted () {
    this.getIamgeLoaded();
    this.loaddingAnimation();
  },
  methods:{
    getIamgeLoaded () {
      const finish = [];
      let $img = document.getElementsByTagName('img');
      this.loadding = $img.length;
      for(let i=0;i<$img.length;i++){
        finish.push(new Promise(resolve => {
          $img[i].onload = () => {
            this.loaded++;
            resolve();
          }
        }));
      };
      Promise.all(finish).then(() => {
        this.imgFinish = true;
      });
    },
    loaddingAnimation () {
      this.stringFlash().then(() => {
        this.tweenString();
      });
    },
    stringFlash () {
      const arr = [];
      for(let i=0;i<6;i++){
        arr.push(new Promise(resolve => {
          setTimeout(() => {
            if(i % 2 == 0){
              this.span_text = '_';
            }else{
              this.span_text = ' ';
            }
            resolve();
          },500*i);
        }))
      }
      return Promise.all(arr);
    },
    tweenString () {
      const arr = [];
      let length = this.text.length;
      for(let i=0;i<length;i++){
        arr.push(new Promise(resolve => {
          setTimeout(() => {
            if(this.randomAscii(i,0)){
              resolve();
            }
          },150*i);
        }));
      }
      Promise.all(arr).then(() => {
        let interval = setInterval(() => {
          if(this.imgFinish){
            this.show = false;
            clearInterval(interval);
            this.$emit('hide');
          }else{
            if(this.loadding != this.loaded){
              this.span_text += ' .';
            }
          }
        },1000);
      });
    },
    randomAscii (index,count) {
      if(count == 2){
        let str = this.text[index];
        this.span_text = this.replaceString(index,str);
        return true;
      }else if(this.text.codePointAt(index) !== this.span_text.codePointAt(index)){
        if(this.span_text[index] !== undefined){
          let number = parseInt(((Math.random()*100)%95) + 32);
          let str = String.fromCodePoint(number);
          this.span_text = this.replaceString(index,str);
          count++;
        }else{
         this.span_text += '_';
        }
        return setTimeout(() => {
          this.randomAscii(index,count);
        },50)
      }else{
        return true;
      }
    },
    replaceString (index,str) {
      let arr = this.span_text.split('');
      arr[index] = str;
      return arr.join('');
    },
    hide () {
      this.show = false;
    }
  },
  computed:{
    lineWidth:function () {
      return {
        width: (parseInt((this.loaded/this.loadding))* 100)+'%!important'
      };
    }
  }
}
</script>

<style lang='scss' scoped>
@import './static/css/public.scss';
.loadding-view{
  @include flex(column);
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  background: #C9CCD3;
  background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
  background-blend-mode: lighten;
  span{
    font-size: 3rem;
    font-family: 'Cormorant Upright',serif;
    margin:0px auto;
  }
}
.line{
  height: 1px;
  margin-top:2rem;
  background-color:black;
}
</style>