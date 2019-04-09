const create = (key) => `INSERT INTO USER (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM USER WHERE name LIKE "${name}%"`
const list = (name) => `select * from USER where name LIKE "${name}%" limit ?,?`
const isExist = `SELECT COUNT(id) FROM USER WHERE openid=?`
const userinfo = `SELECT * FROM USER WHERE openid=?`
const updateUser = `UPDATE USER SET ROLE=? , updateDate=? WHERE id=?`

module.exports = {
    create,
    total,
    list,
    isExist,
    userinfo,
    updateUser
}