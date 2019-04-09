const create = (key) => `INSERT INTO admin (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM admin WHERE name LIKE "${name}%"`
const list = (name) => `select * from admin where name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE admin SET uid=? WHERE tel=?'

module.exports = {
    create,
    total,
    list,
    updateUidByTel
}