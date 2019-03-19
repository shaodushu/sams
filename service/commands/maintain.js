const create = (key) => `INSERT INTO maintain (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM maintain WHERE name LIKE "${name}%"`
const list = (name) => `select * from maintain where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}