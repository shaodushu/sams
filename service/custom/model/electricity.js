const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

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
        res.status(403).send({ msg: '访问权限失效'})
        return;
    }
    //依据用户openid查询用电数据
    try {
        let result = await operation.asyncHandleDbArgs(commands.electricity.listByOpenid, [userinfo.openid])
        res.send(200, result)
    } catch (error) {
        next(createError(error))
    }
}
module.exports = {
    listByOpenid
}