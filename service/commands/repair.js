const create = (key) => `INSERT INTO repair (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM repair WHERE name LIKE "${name}%"`
const list = (name) => `select * from repair where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}