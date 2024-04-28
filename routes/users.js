var express = require('express');
var router = express.Router();
const db = require('../db/index.js');
// 导入验证规则对象
// const { reg_register_schema, reg_login_schema } = require('../schema/user.js')
// 导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
// 导入bcrypt 对密码加密
const bcrypt = require('bcryptjs')

// 导入 jwt 生成 token 包
const jwt = require("jsonwebtoken");
// 密钥和token生效时间
const { secretKey, expiresIn } = require("../config");

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 注册请求
router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  db.getConnection(function (err, connection) {
    // 先查询是否有此人
    const sql1 = `SELECT * FROM users WHERE email = '${email}'`
    connection.query(sql1, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          return res.status(400).send({ code: 400, msg: "用户已注册！" });
        } else {
          // 调用 bcrypt.hashSync() 对密码进行加密
          // password = bcrypt.hashSync(password,10);
          // 定义插入新用户的 SQL 语句
          const sql = `INSERT INTO users (email, username, password) VALUES ('${email}','${username}','${password}')`;
          connection.query(sql, (err, result) => {
            // 执行 SQL 语句失败
            if (err) res.status(500).send({ code: 500, msg: err.message });
            // 判断影响行数是否为 1
            if (result.affectedRows !== 1) {
              res.status(500).send({ code: 500, msg: "注册用户失败，请联系管理员！" });
            }
            res.json({ code: 200, msg: "用户注册成功！" });
          });
        }
      } else {
        res.status(500).send({
          code: 500,
          msg: '注册失败！'
        });
      }
      connection.release(); // 释放连接池，等待别的连接池使用
    })
  })
})

// 登录请求
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email='${email}'`;

  db.getConnection(function (err, connection) {
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({
          code: 500,
          msg: '登录失败'
        });
      } else {
        if (result.length != 1) {
          res.status(400).send({
            code: 400,
            msg: '账号或密码错误！'
          });
        } else {
          const flag = password == result[0].password
          // 密码匹配
          if (flag){
            // 对用户信息进行加密，生成Token字符串
            const token = jwt.sign({ email: email }, secretKey, {
              expiresIn: expiresIn,
            });
            res.json({
              code: 200,
              msg: "登陆成功！",
              data:{
                username:result.username,
                email:result.email
              },
              token: "Bearer " + token,
            });
          } else{
            res.send({ code: 403, msg: "登录失败，密码错误！" });
          }
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
