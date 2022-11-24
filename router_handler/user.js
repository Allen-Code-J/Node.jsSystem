//导入数据库操作模块
const db = require('../db/index')

//导入
const bcrypt = require('bcryptjs')


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
    res.send('login OK')
}