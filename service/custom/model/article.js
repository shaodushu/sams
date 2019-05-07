

const fly = require('../../libs/fly')
const tools = require('../../libs/tool')
const util = require('../../libs/util')
const config = require('../../config')

const newsList = async (req, res, next) => {
    try {
        let param = tools.judgeObj(req.body) || tools.judgeObj(req.query) || tools.judgeObj(req.params), { page } = param;


        //TODO 获取分页的文章列表
        //@id 1.综合新闻;2.信息公告;3.热点关注;4.学术动态;5.工作交流;
        const result = await fly({
            url: config.cuit.url + 'NewsList?id=2'
        })
        const { curPage, pageSize, totalSize } = util.newsParams(result)
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
            if (htmlDetail.indexOf('<img') > -1) {
                html = html.replace(
                    /<img.+?src="/g,
                    `<img style='object-fit: scale-down;height: 100%;width: 100%;margin:0 auto;' src="${config.cuit.url}`
                )
            }

            list[i] = Object.assign({}, { title, author, html, text, source, audit, date, hits })
        }
        //TODO 获取分页的文章详情
        res.status(200).send({
            page: curPage,
            pageSize,
            totalSize,
            list
        })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    newsList
}