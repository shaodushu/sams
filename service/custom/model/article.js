

const fly = require('../../libs/fly')
const tools = require('../../libs/tool')
const util = require('../../libs/util')
const config = require('../../config')

const newsList = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { page } = param;


        //TODO 获取分页的文章列表
        const result = await fly({
            url: config.cuit.url + 'NewsList?id=' + page
        })
        const list = util.newsList(result);
        for (let i = 0; i < list.length; i++) {
            let detail = await fly({
                url: config.cuit.url + list[i].url
            })
            let { title, author, newsUrl, source, audit, date, hits } = util.newsDetail(detail)
            let htmlDetail = await fly({
                url: config.cuit.url + newsUrl.substring(1)
            })
            let { html, text } = util.newsContent(htmlDetail)
            list[i] = Object.assign({}, { title, author, html, text, source, audit, date, hits })
        }
        //TODO 获取分页的文章详情
        res.status(200).send(list)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    newsList
}