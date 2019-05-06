const createError = require('http-errors')
const sd = require("silly-datetime");
const operation = require('../../libs/operation')
const tools = require('../../libs/tool')
const commands = require('../../commands')

const single = async (req, res, next) => {
    let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), {
        userinfo
    } = req;
    try {
        //找到对应学生
        let student = (await operation.asyncHandleDbArgs(commands.student.singleByUid, [userinfo.id]))[0]
        //找到对应公寓
        const result = await operation.asyncHandleDbArgs(commands.apartment.single, [student.aid])
        if (result.length === 1) {
            let apartment = result[0]
            if (apartment.aid) {
                apartment.admin = (await operation.asyncHandleDbArgs(commands.admin.single, [apartment.aid]))[0]
            }
            res.status(200).send({ msg: '查询成功', data: apartment })
        } else {
            res.status(500).send({ msg: '查询失败' })
        }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports = {
    single
}