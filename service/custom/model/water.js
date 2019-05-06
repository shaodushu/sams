const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            userinfo
        } = req, { date, consume } = param, time = new Date();
        //找到对应学生
        let { aid, dnum } = (await operation.asyncHandleDbArgs(commands.student.singleByUid, [userinfo.id]))[0]
        let createObj = {
            date: new Date(date),
            consume,
            aid,
            dnum,
            createDate: time,
            updateDate: time
        }
        //创建用水数据
        const result = await operation.asyncHandleDbArgs(commands.water.create(Object.keys(createObj)), [Object.values(createObj)])
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
const listByOpenid = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params),
        {
            userinfo
        } = req;

    //依据用户openid查询用水数据
    try {
        let result = await operation.asyncHandleDbArgs(commands.water.listByOpenid, [userinfo.openid])
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports = {
    listByOpenid,
    create
}