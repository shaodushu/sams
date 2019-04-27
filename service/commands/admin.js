const create = (key) => `INSERT INTO admin (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM admin WHERE cancel=0 AND name LIKE "${name}%"`
const list = (name) => `select * from admin where access=1 AND cancel=0 AND name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE admin SET uid=? WHERE tel=?'
const remove = 'UPDATE admin SET updateDate=?,cancel=1 WHERE id=?'
const single = 'SELECT * FROM admin WHERE id=?'
const update = (key) => `UPDATE admin SET ${key}  WHERE id=?`

module.exports = {
    create,
    total,
    list,
    updateUidByTel,
    remove,
    single,
    update
}