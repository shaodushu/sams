const create = (key) => `INSERT INTO apartment (${key}) VALUES (?)`
const update = (key) => `UPDATE apartment SET ${key}  WHERE id=?`
const total = (name) => `SELECT COUNT(id) FROM apartment WHERE cancel=0 AND name LIKE "${name}%"`
const list = (name) => `select * from apartment where cancel=0 AND name LIKE "${name}%" limit ?,?`
const single = 'SELECT * FROM apartment WHERE id=?'
const remove = 'UPDATE apartment SET updateDate=?,cancel=1 WHERE id=?'
module.exports = {
    create,
    update,
    total,
    list,
    single,
    remove
}