import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

const tag = ['html','javascript','sass','scss','css','markdown']

Vue.directive('highlight',el => {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach( block => {
    hljs.highlightBlock(block);
  })
  let codes = el.querySelectorAll('code');
  if(codes.length != 0){
    for(let value of codes){
      let item = value.classList.value;
      for(let tagName of tag){
        if(item.includes(tagName)){
          let this_span = document.createElement('span');
          this_span.innerHTML = tagName;
          this_span.style.position = 'absolute';
          this_span.style.top = '0px';
          this_span.style.right = '.5rem';
          this_span.style.fontFamily = '"Cormorant Upright",serif';
          this_span.style.fontSize = "2rem";
          this_span.style.color = "#2c3e50";
          this_span.style.cursor = "default";
          this_span.style.userSelect = 'none';
          value.appendChild(this_span);
        }
      }
    }
  }
  $('pre code').each(function() {
    var lines = $(this).text().split('\n').length - 1;
    if (lines < 4) return;  // 当行数小于4时不显示行号
    var $numbering = $('<ol/>').addClass('pre-numbering');
    $(this)
        .addClass('has-numbering')
        .parent()
        .append($numbering);
    for(let i=1;i<=lines;i++) {
        $numbering.append($('<li/>').text(i));
    }
  });
})