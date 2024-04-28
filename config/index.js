// 配置token
module.exports = {
    // 加密和解密 Token 的秘钥
    secretKey: "token",
    // token 的有效期
    expiresIn: "2h",
    algorithms: ["HS256"],
};