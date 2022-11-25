//导入验证规则的包
const joi = require('joi')


//定义用户名个密码规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


//定义id nickname email验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义头像验证规则
const avatar = joi.string().dataUri().required()

//定义验证注册登录
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

//验证规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}

exports.update_password_schema = {
    body : {
        oldPwd:  password,
        newPwd:  joi.not(joi.ref('oldPwd')).concat(password),
    },
}

//验证头像
exports.update_avatar_schema = {
    body: {
        avatar
    },
}