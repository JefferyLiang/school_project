var mysql = require('mysql');
var config = {
  host : 'localhost',
  user: 'root',
  password: 'root123',
  database: 'website',
  port: 3306
};

module.exports = {
  link () {
    var connection = mysql.createConnection(config);
    connection.connect();
    return connection;
  },
  queryAllmdList (req,res,next) {
    let self = this;
    let connection = self.link();
    return new Promise((resolve,reject) => {
      connection.query('SELECT * FROM website.mdList;',(err,results,fields) => {
        connection.end();
        if(err){
          rejcet(err);
          return;
        }
        if(results){
          results.forEach((item,index) => {
            let tagList = [];
            item.tag = JSON.parse(item.tag);
            item.textList = JSON.parse(item.textList);
            for(let value in item.tag){
              tagList.push(item.tag[value]);
            }
            item.tag = tagList;
          });
          resolve(results);
        }
      })
    });
  },
  queryOnemdList (req,res,next,id) {
    let self = this;
    let connection = self.link();
    connection.query('SELECT * FROM website.mdList WHERE id ='+ id + ';',(err,results,fields) => {
      if(err){
        res.status(400)
        return;
      }
      if(results){
        results = this.formatResult(results);
        res.status(200).send(results);
      }
      connection.end();
    });
  },
  insertOneList (req,res,next,sql) {
    let self = this;
    let connection = self.link();
    connection.query(sql,(err,results,fields) => {
      if(err){
        res.status(400);
        return;
      }
      if(results){
        res.status(200).send(results);
      }
      connection.end();
    });
  },
  deleteByFilename (req,res,next,filename) {
    var self = this;
    let connection = self.link();
    let queryStr = "DELETE FROM `website`.'mdList' WHERE `filename` = "+filename;
    return new Promise( (resolve,rejcet) => {
      connection.query(queryStr,(err,results,fields) => {
        connection.end();
        if(err){
          reject(err);
        }
        if(results){
          resolve(results);
        }
      });
    })
  },
  formatResult (results) {
    let tagList = [];
    if(results){
      results.forEach((item,index) => {
        item.tag = JSON.parse(item.tag);
        item.textList = JSON.parse(item.textList);
        for(let value in item.tag){
          tagList.push(item.tag[value]);
        }
        item.tag = tagList;
      });
    }
    return results;
  },
  createReply (reply) {
    let self = this
    let connection = self.link()
    let querystr = 'INSERT INTO `website`.`replayList` (`name`,`joinStatus`,`date`)' + `VALUES('${reply.name}',${reply.joinStatus},'${reply.date}');`
    console.log(querystr)
    return new Promise((resolve, reject) => {
      connection.query(querystr, (err, results, fields) => {
        connection.end()
        if (err) reject(err)
        if (results) resolve(results)
      })
    })
  }
}