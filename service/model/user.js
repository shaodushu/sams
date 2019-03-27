const createError = require('http-errors')
const config = require('../config')
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')
const fly = require('../libs/fly')
//session
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = mysql.createConnection(config.mysql);

const sessionStore = new MySQLStore({
    key: 'shaodushu', //自行设置密钥
    secret: '123456', //私钥
    cookie: {
        maxAge: 60000 //最大生命期
    },
    resave: false,
    saveUninitialized: false
}, connection);

const request = require("request");
const sha1 = require('sha1');

const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        param.createDate = new Date()
        param.access = 1;
        const result = await operation.asyncHandleDbArgs(commands.user.create(Object.keys(param)), [Object.values(param)])
        if (result.affectedRows === 1) {
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
        let total = await operation.asyncHandleDb(commands.user.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.user.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (err) {
        next(createError(err))
    }
}
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
        sessionStore.set(skey, JSON.stringify(result[0]), function (err) {
            if (err) next(createError(err))
        })
        res.cookie('token', skey);
        res.send(200, result[0])
        // request.get({
        //     url: "https://api.weixin.qq.com/sns/jscode2session",
        //     json: true,
        //     qs: {
        //         grant_type: 'authorization_code',
        //         appid: config.wx.appid,
        //         secret: config.wx.secret,
        //         js_code: param.code
        //     }
        // }, (err, resp, wxData) => {
        //     const {
        //         session_key,
        //         openid
        //     } = wxData
        //     if (resp.statusCode == 200) {
        //         let sessionKey = session_key;
        //         let openId = openid;
        //         //自定义的加密，作为session_id
        //         let skey = sha1(sessionKey);
        //         sessionStore.set(skey, JSON.stringify(param.userinfo), function (err) {
        //             if (err) next(createError(err))
        //         })
        //         res.cookie('token', skey);
        //         res.send(200, param.userinfo)
        //     } else {
        //         next(createError(err))
        //     }
        // })
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    create,
    list,
    login
}