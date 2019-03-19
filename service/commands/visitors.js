const create = (key) => `INSERT INTO visitors (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM visitors WHERE name LIKE "${name}%"`
const list = (name) => `select * from visitors where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}