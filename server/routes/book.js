let express = require('express')
let router = express.Router()

let link = require('../public/javascripts/mysqlLink.js')

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

router.post('/createOneReply', (req, res, next) => {
  let reply = {}
  console.log('body',req.body)
  reply.name = req.body.name
  reply.joinStatus = req.body.joinStatus
  reply.date = req.body.date
  console.log(reply)
  let createReply = link.createReply(reply)
  createReply.then(result => {
    res.status(200).send(true)
    next()
  }).catch(err => {
    res.status(400).send(false)
  })
})

module.exports = router;