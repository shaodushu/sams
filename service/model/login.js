const createError = require('http-errors')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')

const authLogin = async (req, res, next) => {
    try {
        const param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        const result = await operation.asyncHandleDbArgs(commands.login.authLogin, [param.account, param.password])
        if (result.length > 0) {
            res.send(200, {
                token: 'super_admin'
            })
        } else {
            res.send(500, {
                msg: '账户密码错误'
            })
        }
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    authLogin
}