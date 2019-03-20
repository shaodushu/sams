const createError = require('http-errors')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        let time = new Date()
        param.createDate = time
        param.updateDate = time
        const result = await operation.asyncHandleDbArgs(commands.student.create(Object.keys(param)), [Object.values(param)])
        if (result.affectedRows === 1) {
            res.send(200, {
                msg: '创建成功'
            })
        } else {
            res.send(500, {
                msg: '创建失败'
            })
        }
    } catch (err) {
        next(createError(err))
    }
}
const list = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        let total = await operation.asyncHandleDb(commands.student.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.student.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    create,
    list
}