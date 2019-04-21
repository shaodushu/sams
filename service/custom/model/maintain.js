const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            sessionStore,
            headers
        } = req, userinfo = {};
        //TODO 先获取用户信息
        try {
            userinfo = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
            userinfo = JSON.parse(userinfo)
            param.uid = userinfo.id
        } catch (error) {
            next(createError(403));
        }
        //TODO 任务分配
        //1.找出(repair)无任务(s=0)的维修人员ID
        let standbyRepair = await operation.asyncHandleDbArgs(commands.repair.standbyRepair, [0])
        //2.排除任务最多（m=2）的维修人员，已处理或已驳回（s=0）
        // let unprocessedTask = await operation.asyncHandleDbArgs(commands.maintain.unprocessedTask, [0])
        //3.从剩余维修人员随机一位处理当前任务
        if (standbyRepair.length === 0) {
            next(createError({
                msg: '当前暂无空闲人员'
            }))
        } else {
            let _index = Math.round(Math.random() * (standbyRepair.length - 1))
            param.rid = standbyRepair[_index].id
            param.rtel = standbyRepair[_index].tel
        }
        let time = new Date()
        param.createDate = time
        param.updateDate = time
        const result = await operation.asyncHandleDbArgs(commands.maintain.create(Object.keys(param)), [Object.values(param)])
        if (result.affectedRows === 1) {
            res.status(200).send({
                msg: '创建成功'
            })
        } else {
            res.status(500).send({
                msg: '创建失败'
            })
        }
    } catch (err) {
        next(createError({
            msg: err
        }))
    }
}
const list = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { role } = param, {
            sessionStore,
            headers
        } = req, userinfo = {}, uid = null, rid = null;
        //TODO 先获取用户信息
        try {
            userinfo = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
            userinfo = JSON.parse(userinfo)
        } catch (error) {
            next(createError(403));
        }
        //TODO 判断角色是维修人员or学生
        if (role === 2) {
            uid = userinfo.id
        } else if (role === 3) {
            try {
                const result = await operation.asyncHandleDbArgs(commands.repair.getRepairByUid, [userinfo.id])
                if (result.length === 1) {
                    rid = result[0].id
                } else {
                    res.status(500).send({ msg: '服务器异常' })
                }
            } catch (error) {
                next(createError(error))
            }
        }
        let total = await operation.asyncHandleDbArgs(commands.maintain.totalById, [uid, rid])
        let list = await operation.asyncHandleDbArgs(commands.maintain.listById, [uid, rid, (param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const update = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { result, status, id } = param;
        let updateDate = new Date()
        const data= await operation.asyncHandleDbArgs(commands.maintain.updateById, [result, updateDate, status, id])
        if (data.affectedRows >= 1) {
            res.status(200).send({ msg: '创建成功' })
        } else {
            res.status(500).send({ msg: '创建失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports = {
    create,
    list,
    update
}