//导数据库操作模块
const db = require('../db/index')

//导入处理密码模块
const bcrypt = require('bcryptjs')

//获取用户解基本信息处理函数
exports.getUserInfo = (req, res) => {
    //查
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    //调用执行
    db.query(sql, req.user.id ,(err, results) => {
        if(err) return res.cc(err)
        if(results.length != 1) return res.cc('获取用户信息失败')


        //成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    //定义待执行的SQL语句
    const sql = 'update ev_users set ? where id=?'
    //执行
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if(err) return res.cc(err)
        //成功，影响行数
        if(results.affectedRows != 1) return res.cc('更新失败')
        //彻底成功
        res.cc('更新用户信息成功', 0)
    })
}

//更新密码
exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在')

        //判断用户输入的旧密码对错
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(compareResult === false) return res.cc('旧密码错误')
        
        //更新密码sql
        const sql = 'update ev_users set password=? where id=?'
        //新密码 处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows != 1) return res.cc('更新密码失败')
            return res.cc('更新密码成功',0)
        })
    })
}

//更新头像
exports.updateAvatar = (req, res) => {
    //定义更新头像sql
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows != 1) return req.cc('修改头像失败')
        return res.cc('更换头像成功', 0)
    })
}