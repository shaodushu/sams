const createError = require('http-errors')
const QRCode = require('qrcode');
const operation = require('../libs/operation')
const tools = require('../libs/tool')
const commands = require('../commands')

const queryQrCode = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
        sessionStore,
        headers
    } = req,
        userinfo = {}, imgUrl;
    //TODO  获取微信用户信息
    try {
        session = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
        userinfo = JSON.parse(session)

    } catch (error) {
        next(createError(403));
    }
    //TODO 获取二维码信息
    try {
        imgUrl = await operation.asyncHandleGetSession(sessionStore, userinfo.openid)
        res.status(200).send({
            imgUrl
        })
    } catch (error) {
        res.status(200).send({
            imgUrl: null
        })
    }
}
const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            sessionStore,
            headers
        } = req,
            userinfo = {}, imgUrl;
        //TODO  获取微信用户信息
        try {
            session = await operation.asyncHandleGetSession(sessionStore, headers.cookie)
            userinfo = JSON.parse(session)
        } catch (error) {
            next(createError(403));
        }

        //TODO 设置二维码
        try {
            imgUrl = await QRCode.toDataURL(JSON.stringify(param))
        } catch (err) {
            next(createError(err))
        }
        //TODO 将访客信息存入session
        sessionStore.set(userinfo.openid, imgUrl)
        //TODO 创建访客记录
        param.createDate = new Date()
        param.updateDate = new Date()
        param.status = 2
        param.uid = userinfo.id
        const result = await operation.asyncHandleDbArgs(commands.visitors.create(Object.keys(param)), [Object.values(param)])
        if (result.affectedRows === 1) {
            res.send(200, {
                imgUrl
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
        let total = await operation.asyncHandleDb(commands.admin.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.admin.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        res.send(200, {
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    create,
    list,
    queryQrCode
}