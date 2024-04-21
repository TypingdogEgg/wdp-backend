const mysql = require("mysql");
// 配置
const config = {
    host: "127.0.0.1", //服务地址
    port: 3306, // MySQL数据库端口号
    database: "smartchina", //数据库名
    user: "root", //连接数据库的用户名
    password: "654008", //连接数据库的密码
};

const pool = mysql.createPool(config);
// const pool = mysql.createConnection(config)

module.exports = pool;