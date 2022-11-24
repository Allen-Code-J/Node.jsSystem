//导入验证规则的包
const joi = require('joi')


//定义用户名个密码规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义验证注册登录
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

