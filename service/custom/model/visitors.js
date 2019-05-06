const createError = require('http-errors')
const QRCode = require('qrcode');
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const queryQrCode = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
        sessionStore,
        userinfo
    } = req, imgUrl;
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
const remove = async (req, res, next) => {
    try {
        let {
            sessionStore,
            userinfo
        } = req
        //TODO 暂时不采用事务操作
        //删除sessions中对应二维码信息
        await operation.asyncHandleDelSession(sessionStore, userinfo.openid)
        //删除访客信息
        const result = await operation.asyncHandleDbArgs(commands.visitors.removeByUid, [new Date(), userinfo.id])
        if (result.affectedRows === 1) {
            res.status(200).send({
                msg: 'success'
            })
        } else {
            res.status(500).send({
                msg: 'error'
            })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
const create = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
            sessionStore,
            userinfo
        } = req, imgUrl;
        //TODO 设置二维码
        imgUrl = await QRCode.toDataURL(JSON.stringify(param))
        //TODO 将访客信息存入session
        await operation.asyncHandleSetSession(sessionStore, userinfo.openid, imgUrl)
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
            res.status(500).send({
                msg: '创建失败'
            })
        }
    } catch (err) {
        res.status(500).send({ msg: err.message })
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
    queryQrCode,
    remove
}