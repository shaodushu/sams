const create = (key) => `INSERT INTO water (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM water WHERE name LIKE "${name}%"`
const list = (name) => `select * from water where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}