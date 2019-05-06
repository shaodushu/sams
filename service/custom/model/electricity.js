const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const listByOpenid = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params),
        {
            userinfo
        } = req;
    //依据用户openid查询用电数据
    try {
        let result = await operation.asyncHandleDbArgs(commands.electricity.listByOpenid, [userinfo.openid])
        res.send(200, result)
    } catch (error) {
        next(createError(error))
    }
}

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            userinfo
        } = req, { date, consume } = param, time = new Date();
        //找到对应学生
        let { aid, dnum } = (await operation.asyncHandleDbArgs(commands.student.singleByUid, [userinfo.id]))[0]
        let createObj = {
            date,
            consume,
            aid,
            dnum,
            createDate: time,
            updateDate: time
        }
        //创建用电数据
        const result = await operation.asyncHandleDbArgs(commands.electricity.create(Object.keys(createObj)), [Object.values(createObj)])
        if (result.affectedRows === 1) {
            res.status(200).send({
                msg: '创建成功'
            })
        } else {
            res.status(200).send({
                msg: '创建失败'
            })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports = {
    listByOpenid,
    create
}