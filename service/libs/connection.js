const mysql = require('mysql')
const config = require('../config')
const pool = mysql.createPool(config.mysql);

/**
 * 对query执行的结果自定义返回JSON结果
 * @param {*} res 
 * @param {String} result 
 * @param {*} resultJSON 
 */
const queryReturn = (res, result, resultJSON) => {
    if (typeof result === 'undefined') {
        res.json({
            code: '201',
            msg: 'failed to do'
        });
    } else res.json(result);
}
/**
 * 封装query之sql带不占位符func
 * @param {*} sql 
 * @param {*} callback 
 */
const query = (sql, callback) => {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}
/**
 * 封装query之sql带占位符func
 * @param {*} sql 
 * @param {*} args 
 * @param {*} callback 
 */
const queryArgs = (sql, args, callback) => {
    pool.getConnection(function (err, connection) {
        connection.query(sql, args, function (err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}
module.exports = {
    queryReturn,
    query,
    queryArgs
}