const cheerio = require('cheerio')

/**
 * 新闻列表
 * @param {*} body 
 */
const newsList = function (body) {
    let $ = cheerio.load(body),
        list = [];
    $('#NewsListContent li').find('a').each(function (i, e) {
        list.push({
            // title: Trim($(e).text(), 'g'),
            url: $(e).attr('href')
        })
    });
    return list
}
const newsDetail = function (body) {
    let $ = cheerio.load(body), NewsAuthor = '',
        title = '', author = '', newsUrl = '', source = '', audit = '', date = '', hits = '';
    //新闻标题
    title = $('#NewsTitle').text()
    //新闻作者
    NewsAuthor = $('#NewsAuthor').text()
    NewsAuthor.replace(/\s/g, ",").split(',').filter(item => item !== '').forEach(item => {
        let ary = item.split('：')
        if (ary[0] === '来源') {
            source = ary[1]
        } else if (ary[0] === '作者') {
            author = ary[1]
        } else if (ary[0] === '审核') {
            audit = ary[1]
        } else if (ary[0] === '日期') {
            date = ary[1]
        } else if (ary[0] === '点击数') {
            hits = ary[1]
        }
    })
    //新闻文本链接
    newsUrl = $('#NewsContent').attr('src')

    return {
        title,
        author,
        newsUrl,
        source,
        audit,
        date,
        hits
    }
}

const newsContent = function (body) {
    let $ = cheerio.load(body);
    return {
        html: $('body').html(),
        text: Trim($('body').text(), 'g')
    }
}
/**
 * 
 * 去除所有空格
 * @param {any} str 
 * @param {any} is_global 
 * @returns 
 */
const Trim = function (str, is_global) {

    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

module.exports = {
    newsList,
    newsDetail,
    newsContent
}