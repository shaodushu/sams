const createError = require('http-errors')
const sd = require("silly-datetime");
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        param.createDate = new Date()
        param.access = 1;
        const result = await operation.asyncHandleDbArgs(commands.admin.create(Object.keys(param)), [Object.values(param)])
        if (result.affectedRows === 1) {
            res.status(200).send({ msg: '创建成功' })
        } else {
            res.status(500).send({ msg: '创建失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
const list = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        let total = await operation.asyncHandleDb(commands.admin.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.admin.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.status(200).send({
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
const remove = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { id } = param;
        const result = await operation.asyncHandleDbArgs(commands.admin.remove, [new Date(), parseInt(id)])
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
        const result = await operation.asyncHandleDbArgs(commands.admin.single, [parseInt(id)])
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
        const result = await operation.asyncHandleDbArgs(commands.admin.update(key), [param.id])
        if (result.affectedRows === 1) {
            res.status(200).send({ msg: '更新成功' })
        } else {
            res.status(500).send({ msg: '更新失败' })
        }
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const apartmentBind = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { id, aid, type } = param;
        if (type === 'bind') {
            if (!aid) {
                res.status(500).send({ msg: 'aid不能为空' })
                return;
            }
        } else {
            aid = null
        }

        const result = await operation.asyncHandleDbArgs(commands.apartment.bindAdmin, [new Date(), aid, id])
        if (result.affectedRows === 1) {
            res.status(200).send({ msg: '绑定成功' })
        } else {
            res.status(500).send({ msg: '绑定失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports = {
    create,
    list,
    remove,
    single,
    update,
    apartmentBind
}