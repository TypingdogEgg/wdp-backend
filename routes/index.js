var express = require('express');
var router = express.Router();
const db = require('../db/index.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 获取新闻数据列表
router.get('/allnews', function(req, res, next) {
  let sql = `SELECT * FROM news`;

  db.getConnection(function(err,connection){
    connection.query(sql, (err, result) => {
      if (!err) {
          res.json({ code: 200, msg: '', data: result });
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取新闻数据失败'
        });
      }
    });
    connection.release()
  })
});
// 根据id获取新闻
router.get('/getnews', function(req, res, next) {
  const id = req.query.id;
  let sql = `SELECT * FROM news WHERE id=${id}`;

  db.getConnection(function(err,connection){
    connection.query(sql, (err, result) => {
      if (!err) {
          res.json({ code: 200, msg: '', data: result[0] });        
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取新闻数据失败'
        });
      }
    });
    connection.release()
  })
});

// 获取嘉宾列表
router.get('/allguests', function (req, res, next) {
  let sql = `SELECT * FROM exhibitionguests`;

  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (!err) {
        res.json({ code: 200, msg: '', data: result });
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取嘉宾数据失败'
        });
      }
    });
    connection.release()
  })
});

// 获取参展展商
router.get('/allexhibitors', function (req, res, next) {
  let sql = `SELECT * FROM exhibitor`;

  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (!err) {
        res.json({ code: 200, msg: '', data: result });
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取展商数据失败'
        });
      }
    });
    connection.release()
  })
});

// 根据展商id获取展品数据(sql有问题 暂存)
router.get('/getproducts', function (req, res, next) {
  const id = req.query.id;
  let sql = `SELECT Exhibitor.* FROM Exhibitor 
               JOIN product ON Exhibitor.id = product.exhibitor_id
               WHERE product.exhibitor_id = ${id}`;


  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (!err) {
        // 将结果转换为展商数组和产品数组
        // const exhibitors = [];
        // for (let i = 0; i < result.length; i++) {
        //   const exhibitor = {
        //     id: result[i].id,
        //     logoUrl: result[i].logoUrl,
        //     name: result[i].name,
        //     introduction: result[i].introduction,
        //     products: []
        //   };
        //   exhibitors.push(exhibitor);
        // }

        // for (let i = 0; i < result.length; i++) {
        //   const product = {
        //     id: result[i].id,
        //     imgUrl: result[i].imgUrl,
        //     name: result[i].name,
        //     introduction: result[i].introduction
        //   };
        //   exhibitors[i].products.push(product);
        // }
        res.json({ code: 200, msg: '', data: result });
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取展品数据失败'
        });
      }
    });
    connection.release()
  })
});

module.exports = router;
