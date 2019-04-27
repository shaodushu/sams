const createError = require('http-errors')
const config = require('../../config')
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')
const fly = require('../../libs/fly')
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
            if (err) {
                next(createError(err));
                return;
            }
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
        res.status(403).send({ msg: '访问权限失效' })
        return;
    }


    //查询用户信息
    const result = await operation.asyncHandleDbArgs(commands.user.userinfo, [userinfo.openid])
    if (result.length > 0) {
        userinfo = result[0]
        if (userinfo.role > -1) {
            next(createError({
                msg: '该用户已被绑定'
            }));
            return;
        } else {
            userinfo.role = role
        }
    } else {
        next(createError(500));
        return;
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
        return;
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
        return;
    }
}

const remove = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            sessionStore,
            headers
        } = req, {
            role
        } = param,
            userinfo = {};

        //TODO 找到对应的用户信息
        try {
            userinfo = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
            userinfo = JSON.parse(userinfo)
        } catch (error) {
            res.status(403).send({ msg: '访问权限失效' })
            return;
        }
        //TODO 更新对应角色表UID
        let sql1, params1 = [userinfo.id]
        if (role === '1') {
            // sql1 = commands.admin.updateUidByUid
        } else if (role === '2') {
            sql1 = commands.student.updateUidByUid
        } else if (role === '3') {
            sql1 = commands.repair.updateUidByUid
        } else {
            res.status(500).send({
                msg: '参数错误'
            })
            return;
        }
        //TODO 更新USER表角色
        let updateDate = new Date()
        let sql2 = commands.user.updateUser,
            params2 = [-1, updateDate, userinfo.id]
        //TODO 开始事务操作
        try {
            await operation.asyncHandleDbExecTrans([{
                sql: sql1,
                params: params1
            }, {
                sql: sql2,
                params: params2
            }])
            userinfo.role = -1
            userinfo.updateDate = updateDate
            res.status(200).send(userinfo)
        } catch (error) {
            res.status(500).send({
                msg: error.message
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: error.message
        })
    }
}

module.exports = {
    login,
    bound,
    remove
}