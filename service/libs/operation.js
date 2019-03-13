//异步数据库操作
const connection = require('./connection')

/**
 * Promise 有参数
 * @param {String} sql 
 * @param {*} args 
 */
const asyncHandleDbArgs = (sql, args) => {
    return new Promise((resolve, reject) => {
        connection.queryArgs(sql, args, (err, result) => {
            if (!err) {
                resolve(result);
            } else reject(new Error(err));
        });
    })
}
/**
 * Promise 无参数
 * @param {String} sql 
 */
const asyncHandleDb = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (!err) {
                resolve(result);
            } else reject(new Error(err));
        });
    })
}
module.exports = {
    asyncHandleDbArgs,
    asyncHandleDb
}