const create = (key) => `INSERT INTO visitors (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM visitors WHERE cancel=0 AND name LIKE "${name}%"`
const list = (name) => `select * from visitors where cancel=0 AND name LIKE "${name}%" limit ?,?`
const remove = 'UPDATE visitors SET updateDate=?,cancel=1 WHERE id=?'
const removeByUid = 'UPDATE visitors SET updateDate=?,cancel=1 WHERE uid=?'
const single = 'SELECT * FROM visitors WHERE id=?'
const update = (key) => `UPDATE visitors SET ${key}  WHERE id=?`

module.exports = {
    create,
    total,
    list,
    remove,
    single,
    update,
    removeByUid
}