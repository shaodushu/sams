const create = (key) => `INSERT INTO electricity (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM electricity WHERE name LIKE "${name}%"`
const list = (name) => `select * from electricity where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}