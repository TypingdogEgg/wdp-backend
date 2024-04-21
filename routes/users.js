var express = require('express');
var router = express.Router();
const db = require('../db/index.js');


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 注册请求
router.post('/register', (req, res) => {
  const { email, username, password, role } = req.body;
  const sql = `INSERT INTO users (username, password, role) VALUES ('${email}',${username}', '${password}', '${role}')`;
  // 连接数据库
  db.getConnection(function (err, connection) {
    connection.connect(function (err) {
      connection.query(sql, function (err, result) {
        if (!err) {
          // res.json(result);
          res.status(200).send({
            code: 200,
            msg: '注册成功'
          });
        } else {
          res.status(500).send({
            code: 500,
            msg: '登录失败'
          });
        }
      });
      connection.release(); // 释放连接池，等待别的连接池使用
    });
  });
});

// 登录请求
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({
          code: 500,
          msg: '登录失败'
        });
      } else {
        if (result.length > 0) {
          res.status(200).send({
            code: 200,
            msg: '登录成功'
          });
        } else {
          res.status(401).send({
            code: 401,
            msg: '用户名或密码错误'
          });
        }
      }
    });
    connection.release();
  })

});

// 查询用户数据信息
router.get('/getusers', (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'user'"

  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (!err) {
        res.json({ code: 200, msg: '', data: result });
      } else {
        res.status(500).send({
          code: 500,
          msg: '获取用户数据失败'
        });
      }
    });
    connection.release();
  })
})

module.exports = router;
