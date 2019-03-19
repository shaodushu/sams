const create = (key) => `INSERT INTO user (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM user WHERE name LIKE "${name}%"`
const list = (name) => `select * from user where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}