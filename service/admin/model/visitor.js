const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const list = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params);
        let total = await operation.asyncHandleDb(commands.visitors.total(param.name || ''))
        let list = await operation.asyncHandleDbArgs(commands.visitors.list(param.name || ''), [(param.page - 1) * param.size, param.page * param.size])
        for (let i = 0; i < list.length; i++) {
            let { aid } = list[i]
            if (aid) {
                list[i].apartment = (await operation.asyncHandleDbArgs(commands.apartment.single, [aid]))[0]
            }
        }
        res.status(200).send({
            list,
            total: total[0]['COUNT(id)'],
            msg: '查询成功'
        })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    list
}