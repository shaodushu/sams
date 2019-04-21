const create = (key) => `INSERT INTO maintain (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM maintain WHERE name LIKE "${name}%"`
const totalById = `SELECT COUNT(id) FROM maintain WHERE uid=? OR rid=?`
const list = (name) => `SELECT * FROM maintain WHERE name LIKE "${name}%" limit ?,?`
const listById = `SELECT * FROM maintain WHERE uid=? OR rid=? limit ?,?`
const unprocessedTask = 'SELECT aid FROM maintain WHERE STATUS=?'
const updateById = 'UPDATE maintain SET result=? , updateDate=?,status=? WHERE id=?'
module.exports = {
    create,
    total,
    totalById,
    list,
    listById,
    unprocessedTask,
    updateById
}