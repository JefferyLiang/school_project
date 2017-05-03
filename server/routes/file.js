var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var link = require('../public/javascripts/mysqlLink.js');

router.get('/',function (req,res,next) {
  res.send('fileList');
});
//resolve
router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});
//get markdown file list
router.get('/getMarkDownList',(req,res,next) => {
  let list = [];
  let this_promise = new Promise( resolve => {
    fs.readdir('./static/markdown', (err,files) => {
      if(err){
        resolve(false);
        return;
      }
      files.forEach((item,index) => {
        if(item.endsWith('.md')) list.push(item);
      });
      resolve(true);
    });
  });
  this_promise.then(value => {
    if(value){
      res.status(200).send(list);
    }else{
      res.status(400).send("can't read the markdown list");
    }
  })
});
//create the file list
router.post('/createMarkdown',(req,res,next) => {
  let name = req.body.name;
  let text = req.body.text;
  let this_path = path.join(__dirname,'../../static/markdown');
  let pathStr = this_path + '/' + name + '.md';
  fs.open(pathStr,"w",function(err,fd){
    console.log(fd.length);
    var c = fs.writeFile(fd,text,'utf8',err => {
      if(err) console.log(err);
      fs.close(fd,err => {
        if(err) res.send(false);
          res.send(true);
      })
    })
  })
});
//get markdown list
router.get('/markdown/list',(req,res,next) => {
  let query = link.queryAllmdList(req,res,next);
  query.then( results => {
    res.status(200).send(results);
  });
  query.catch( err => {
    res.status(400).send(err);
  })
});
//find markdown item
router.get('/markdown/findById/:id',(req,res,next) => {
  let id = req.params.id;
  if(id === undefined){
    res.states(400);
    return;
  }
  link.queryOnemdList(req,res,next,id);
});
//insert new list in markdown
router.post('/markdown/insert',(req,res,next) => {
  let params = req.body;
  let [id,filename,imgUrl,title,to,textList,tag] = [
    params.id?params.id:null,
    params.filename?params.filename:null,
    params.imgUrl?params.imgUrl:null,
    params.title?params.title:null,
    params.to?params.to:null,
    params.textList?params.textList:null,
    params.tag?params.tag:null
  ];
  textList = JSON.stringify(textList);
  tag = JSON.stringify(tag);
  let head = "INSERT INTO `website`.`mdList`";
  let key = "( `id`,`filename`,`imgUrl`,`title`,`to`,`textList`,`tag` )";
  let value = "("+id+",'"+filename+"','"+imgUrl+"','"+title+"','"+to+"','"+textList+"','"+tag+"')";
  let sql = head + " " + key + " VALUES "+ value;
  link.insertOneList(req,res,next,sql);
});
//delete one list by filename
router.post('/markdown/deleteByFilename/:filename',(req,res,next) => {
  let filename = req.params.filename;
  if(filename === undefined){
    res.send(400);
    return;
  }
  let results = link.deleteByFilename(req,res,next,filename);
  results.then( value => {
    res.status(200).send(value);
  });
  results.catch( err => {
    res.status(400).send(err);
  } )
})

module.exports = router;