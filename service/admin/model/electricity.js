const createError = require('http-errors')
const sd = require("silly-datetime");
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

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

const remove = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { id } = param;
        const result = await operation.asyncHandleDbArgs(commands.electricity.remove, [new Date(), parseInt(id)])
        if (result.affectedRows === 1) {
            res.status(200).send({ msg: '删除成功' })
        } else {
            res.status(500).send({ msg: '删除失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const single = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { id } = param;
        const result = await operation.asyncHandleDbArgs(commands.electricity.single, [parseInt(id)])
        if (result.length === 1) {
            res.status(200).send({ msg: '查询成功', data: { ...result[0] } })
        } else {
            res.status(500).send({ msg: '查询失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const update = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        let key = []
        param.createDate = sd.format(param.createDate)
        param.updateDate = sd.format(new Date())
        for (const i in param) {
            if (param.hasOwnProperty(i)) {
                let _typeof = typeof param[i]
                if (_typeof === 'string') {
                    key.push(`${i}='${param[i]}'`)
                } else if (_typeof === 'number' || _typeof === 'boolean') {
                    key.push(`${i}=${param[i]}`)
                }

            }
        }
        const result = await operation.asyncHandleDbArgs(commands.electricity.update(key), [param.id])
        if (result.affectedRows === 1) {
            res.status(200).send({ msg: '更新成功' })
        } else {
            res.status(500).send({ msg: '更新失败' })
        }
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports = {
    batchCreate,
    list,
    remove,
    single,
    update
}