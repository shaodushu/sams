const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            userinfo
        } = req;
        //TODO 先获取用户信息
        param.uid = userinfo.id
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
            return;
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
            userinfo
        } = req, userId = null, repairId = null;
        //TODO 判断角色是维修人员or学生
        if (role === 2) {
            userId = userinfo.id
        } else if (role === 3) {
            const result = await operation.asyncHandleDbArgs(commands.repair.getRepairByUid, [userinfo.id])
            if (result.length === 1) {
                repairId = result[0].id
            } else {
                res.status(500).send({ msg: '服务器异常' })
                return;
            }
        }
        let total = await operation.asyncHandleDbArgs(commands.maintain.totalById, [userId, repairId])
        let list = await operation.asyncHandleDbArgs(commands.maintain.listById, [userId, repairId, (param.page - 1) * param.size, param.page * param.size])
        for (let i = 0; i < list.length; i++) {
            let { aid, rid } = list[i]
            if (aid) {
                list[i].apartment = (await operation.asyncHandleDbArgs(commands.apartment.single, [aid]))[0]
            }
            if (rid) {
                list[i].repair = (await operation.asyncHandleDbArgs(commands.repair.single, [rid]))[0]
            }
        }
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
        const data = await operation.asyncHandleDbArgs(commands.maintain.updateById, [result, updateDate, status, id])
        if (data.affectedRows >= 1) {
            res.status(200).send({ msg: '创建成功' })
        } else {
            res.status(500).send({ msg: '创建失败' })
            return;
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