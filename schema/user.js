/* const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string()
    .alphanum() // 确保字符串只包含字母和数字
    .min(6)     // 最小长度6个字符
    .max(12)    // 最大长度12个字符
    .required(); // 必填字段
const email = joi.string().email().required();

// 验证规则对象 注册
exports.reg_register_schema = {
    body:{
        username,
        email,
        password
    }
}
// 登录
exports.reg_login_schema = {
    body:{
        email,
        password
    }
} */