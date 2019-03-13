/**
 * 判断对象是否为空
 * @param {Object} obj 
 */
const judgeObj = (obj) => {
    if (Object.keys(obj).length !== 0) return obj;
    else return false;
}
module.exports = {
    judgeObj
}