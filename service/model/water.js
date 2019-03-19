const createError = require('http-errors')
const operation = require('../libs/operation')
const formidable = require('formidable');
const tools = require('../libs/tool')
const commands = require('../commands')

const importWater = async (req, res, next) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log(err, fields.aid, files)
        })
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
    importWater,
    list
}