const createError = require('http-errors')
const config = require('../config')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')
const fly = require('../libs/fly')
const sha1 = require('sha1');

/**
 * 微信用户登录
 */
const login = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        // 向微信服务器请求sesion_key
        const {
            session_key,
            openid
        } = await fly({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            json: true,
            qs: {
                grant_type: 'authorization_code',
                appid: config.wx.appid,
                secret: config.wx.secret,
                js_code: param.code
            }
        }, 'get')
        let sessionKey = session_key;
        let openId = openid;
        //查询用户是否存在
        const isExist = await operation.asyncHandleDbArgs(commands.user.isExist, [openId])
        if (isExist[0]['COUNT(id)'] === 0) {
            let {
                userinfo
            } = param
            let time = new Date()
            userinfo.createDate = time
            userinfo.updateDate = time
            userinfo.openid = openId
            //创建用户
            await operation.asyncHandleDbArgs(commands.user.create(Object.keys(userinfo)), [Object.values(userinfo)])
        }
        //查询用户
        const result = await operation.asyncHandleDbArgs(commands.user.userinfo, [openId])
        //自定义的加密，作为session_id
        let skey = sha1(sessionKey);
        req.sessionStore.set(skey, JSON.stringify(result[0]), function (err) {
            if (err) next(createError(err))
        })
        res.cookie('token', skey);
        res.send(200, result[0])
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    create,
    list,
    login
}