const node_xlsx = require('node-xlsx')
/**
 * 判断对象是否为空
 * @param {Object} obj 
 */
const judgeObj = (obj) => {
    if (Object.keys(obj).length !== 0) return obj;
    else return false;
}
/**
 * 对excel文件进行解析，读取数据
 * @param {String} newPath 
 * @returns {Array} excelList
 */
const ExcelParse = (newPath) => {
    const obj = node_xlsx.parse(newPath),
        excelObj = obj[0].data; //取得第一个excel表的数据
    return excelObj.filter(item => (typeof item[0] === 'number'))
};
module.exports = {
    judgeObj,
    ExcelParse
}