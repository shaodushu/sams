// MySQL数据库配置信息
const mysql = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qQW3A0f(s!Cf",
    database: "sams",
    clearExpired: true,//是否自动检查和清除过期的会话
    checkExpirationInterval: 60000, //一分钟检查一次
    expiration: 3600000, //最大的生命期
    createDatabaseTable: true,
    connectionLimit: 1,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions', //表名
        columnNames: { //列
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
//微信参数配置
const wx = {
    appid: "wxde57f96494c9231d",
    secret: "53944f5fd0aa035089730d227087295d"
}
module.exports = {
    mysql,
    wx
}