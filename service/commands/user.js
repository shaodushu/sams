const create = (key) => `INSERT INTO USER (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM USER WHERE name LIKE "${name}%"`
const list = (name) => `select * from USER where name LIKE "${name}%" limit ?,?`
const isExist = `SELECT COUNT(id) FROM USER WHERE openid=?`
const userinfo = `SELECT * FROM USER WHERE openid=?`

module.exports = {
    create,
    total,
    list,
    isExist,
    userinfo
}