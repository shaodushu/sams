const createError = require('http-errors')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')

const batchCreate = async (req, res, next, extra = {}) => {
    try {
        const {
            list
        } = extra
        const result = await operation.asyncHandleDbArgs(commands.electricity.batchCreate(list.length), list)
        if (result.affectedRows >= 1) {
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
        let total = await operation.asyncHandleDb(commands.electricity.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.electricity.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(*)'],
            msg: '查询成功'
        })
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    batchCreate,
    list
}