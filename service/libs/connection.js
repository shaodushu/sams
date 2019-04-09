const mysql = require('mysql')
const async = require('async');
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
/**
 * 事务操作
 * @param {*} sqlparamsEntities 
 * @param {*} callback 
 */
const execTrans = (sqlparamsEntities, callback) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                connection.release()
                callback(err, null);
            }
            console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            let funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                let temp = function (cb) {
                    let sql = sql_param.sql;
                    let param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，" + JSON.parse(JSON.stringify(sql_param)) + "，ERROR：" + tErr);
                                throw tErr;
                            });
                        } else if (rows.affectedRows == 0) {
                            cb(rows, null);
                        } else {
                            cb(null, rows);
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (error, result) {
                console.log("transaction error: " + error);
                if (error) {
                    connection.rollback(function (err) {
                        console.log("transaction error: " + err);
                        connection.release();
                        callback(error.message, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                callback(err, null);
                            });
                        } else {
                            connection.release();
                            callback(null, result);
                        }
                    })
                }
            })
        });
    });
}
module.exports = {
    queryReturn,
    query,
    queryArgs,
    execTrans
}