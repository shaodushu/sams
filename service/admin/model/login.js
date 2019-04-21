const createError = require('http-errors')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const authLogin = async (req, res, next) => {
    try {
        const param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        const result = await operation.asyncHandleDbArgs(commands.login.authLogin, [param.account, param.password])
        if (result.length > 0) {
            res.send(200, {
                id: result[0].id,
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
const userInfo = async (req, res, next) => {
    try {
        const param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        if(!param.id){
            next(createError())
        }
        const userinfo = (await operation.asyncHandleDbArgs(commands.login.userInfo, [param.id]))[0]
        if (userinfo) {
            if (userinfo.access === 0) {
                res.send(200, {
                    name: userinfo.name,
                    access: ['super_admin'],
                    token: 'super_admin',
                    avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
                })
            } else {
                res.send(200, {
                    name: userinfo.name,
                    access: ['admin'],
                    token: 'admin',
                    avatar: userinfo.avatar
                })
            }
        }
    } catch (error) {
        next(createError(err))
    }
}
module.exports = {
    authLogin,
    userInfo
}