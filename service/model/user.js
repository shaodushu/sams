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
/**
 * 用户绑定
 */
const bound = async (req, res, next) => {
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

    
    //查询用户信息
    const result = await operation.asyncHandleDbArgs(commands.user.userinfo, [userinfo.openid])
    if (result.length > 0) {
        userinfo = result[0]
        if (userinfo.role > -1) {
            next(createError('该用户已被绑定'));
        } else {
            userinfo.role = role
        }
    } else {
        next(createError(500));
    }
    //更新对应角色表UID
    let sql1, params1 = [userinfo.id, tel]
    if (role === 1) {
        sql1 = commands.admin.updateUidByTel
    } else if (role === 2) {
        sql1 = commands.student.updateUidByTel
    } else if (role === 3) {
        sql1 = commands.repair.updateUidByTel
    } else {
        next(createError('Params error'))
    }
    //更新USER表角色
    let sql2 = commands.user.updateUser,
        params2 = [role, new Date(), userinfo.id]
    //开始事务操作
    try {
        await operation.asyncHandleDbExecTrans([{
            sql: sql1,
            params: params1
        }, {
            sql: sql2,
            params: params2
        }])
        res.send(200, userinfo)
    } catch (error) {
        res.send(500, {
            msg: '手机填写是否正确'
        })
    }
    //查询
    
}

module.exports = {
    login,
    bound
}