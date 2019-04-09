const createError = require('http-errors')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')

const batchCreate = async (req, res, next, extra = {}) => {
    try {
        const {
            list
        } = extra
        const result = await operation.asyncHandleDbArgs(commands.water.batchCreate(list.length), list)
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
        let total = await operation.asyncHandleDb(commands.water.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.water.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(*)'],
            msg: '查询成功'
        })
    } catch (err) {
        next(createError(err))
    }
}

const listByOpenid = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params),
        {
            sessionStore,
            headers
        } = req,
        userinfo = {},
        {
            role,
            tel
        } = param,
        session;

    //找到对应的用户信息
    try {
        session = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
        userinfo = JSON.parse(session)
    } catch (error) {
        next(createError(403));
    }
    //依据用户openid查询用水数据
    try {
        let result = await operation.asyncHandleDbArgs(commands.water.listByOpenid, [userinfo.openid])
        res.send(200, result)
    } catch (error) {
        next(createError(error))
    }
}
module.exports = {
    batchCreate,
    list,
    listByOpenid
}