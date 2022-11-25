//导入数据库操作模块
const db = require('../db/index')

//导入
const bcrypt = require('bcryptjs')

//导入token
const jwt = require('jsonwebtoken')
//导入全局配置文件
const config = require('../config')


//注册新用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    //校验
    // if(!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或者密码不合法' })
    // }
    //定义sql语句查询用户名是否占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        //执行mysql语句失败
        if(err) {
            //return res.send({ status: 1, message: err.message})
            return res.cc(err)
        }

        //判断用户名是否被占用
        if(results.length > 0) {
            //return res.send({ status: 1, message: '用户名被占用请更新'})
            return res.cc('用户名被占用请更新')
        }
        //TODO：用户名可以使用
        //调用加密方法
        
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        
        //定义插入新用户的sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, {username: userinfo.username, password:userinfo.password }, (err, results) => {
            if(err) {
                //return res.send({status:1, message: err.message})
                return res.cc(err)
            }
            if(results.affectedRows != 1) {
                //return res.send({status:1, message: '注册用户失败'})
                return res.cc('注册用户失败')
            }
            //注册成功
            //res.send({status:0, message: '注册用户成功'})
            return res.cc('注册成功', 0)
        })
    })
    
}

exports.login = (req, res) => {
    //接受表单数据
    const userinfo = req.body
    //定义sql语句
    const sql = `select * from ev_users where username=?`
    //执行sql语句,查询
    db.query(sql, userinfo.username, (err, results) => {
        //执行失败
        if(err) return res.cc(err)
        //成功
        if(results.length != 1) return res.cc('登录失败')
        //TODO : 核对密码
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(compareResult == false) {
            return res.cc('登录失败')
        }

        //在服务器端生成字符串
        const user = {...results[0], password: '', user_pic: ''}
        //生成token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
        //调用res.send将token响应给客户端
        res.send({ 
            status: 0,
            message: '登录成功',
            token: 'Bearer '+tokenStr,
        })
        
    })
    
}