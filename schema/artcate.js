//导入定义规则的模块
const joi =require('joi')

//2.定义Name和alias的验证规则
const name = joi.string().required()
const alias =joi.string().alphanum().required()

//id校验规则
const id = joi.number().integer().min(1).required()

exports.add_cate_schema={
    body: {
        name,
        alias,
    },
}

//验证规则对象
exports.delete_cate_schema = {
    params: {
        id,
    },
}

//验证规则对象-根据id获取文章
exports.get_cate_schema = {
    params: {
        id,
    },
}

//验证规则对象-更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}


