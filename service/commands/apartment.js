const create = (key) => `INSERT INTO apartment (${key}) VALUES (?)`
const update = (key) => `UPDATE apartment SET ${key}  WHERE id=?`
const total = (name) => `SELECT COUNT(id) FROM apartment WHERE name LIKE "${name}%"`
const list = (name) => `select * from apartment where name LIKE "${name}%" limit ?,?`
module.exports = {
    create,
    update,
    total,
    list
}