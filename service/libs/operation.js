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

/**
 * Promise 事务操作
 * @param {*} sqlparamsEntities 
 */
const asyncHandleDbExecTrans = (sqlparamsEntities) => {
    return new Promise((resolve, reject) => {
        connection.execTrans(sqlparamsEntities, (err, result) => {
            if (!err) {
                resolve(result);
            } else reject(err);
        })
    })
}

/**
 * Promise GetSession handle
 * @param {*} store 
 * @param {*} key 
 */
const asyncHandleGetSession = (store, key) => {
    return new Promise((resolve, reject) => {
        store.get(key, (error, session) => {
            if (session) {
                resolve(session);
            } else reject(error);
        })
    })
}

/**
 * Promise SetSession handle
 * @param {*} store 
 * @param {*} key 
 * @param {*} data 
 */
const asyncHandleSetSession = (store, key, data) => {
    return new Promise((resolve, reject) => {
        store.set(key, data, (error) => {
            if (error) {
                reject(error);
            } else resolve();
        })
    })
}

const asyncHandleDelSession = (store, key) => {
    return new Promise((resolve, reject) => {
        store.destroy(key, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    asyncHandleDbArgs,
    asyncHandleDb,
    asyncHandleDbExecTrans,
    asyncHandleGetSession,
    asyncHandleSetSession,
    asyncHandleDelSession
}