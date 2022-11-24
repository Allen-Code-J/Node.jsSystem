const express = require('express')
const router = express.Router()

//导入用路由处理函数
const user_handler = require('../router_handler/user')


//1.导入验证数据的中间件
const expressjoi = require('@escook/express-joi')
//2.导入需要验证的规则对象
const { reg_login_schema } = require('../schema/user')



//注册
router.post('/reguser',expressjoi(reg_login_schema) ,user_handler.regUser)

//登录
router.post('/login', user_handler.login)

module.exports = router