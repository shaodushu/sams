const create = (key) => `INSERT INTO maintain (${key}) VALUES (?)`
const total = (rtel) => `SELECT COUNT(id) FROM maintain WHERE cancel=0 AND rtel LIKE "${rtel}%"`
const totalById = `SELECT COUNT(id) FROM maintain WHERE cancel=0 AND uid=? OR rid=?`
const list = (rtel) => `SELECT * FROM maintain WHERE cancel=0 AND rtel LIKE "${rtel}%" limit ?,?`
const listById = `SELECT * FROM maintain WHERE cancel=0 AND uid=? OR rid=? limit ?,?`
const unprocessedTask = 'SELECT aid FROM maintain WHERE STATUS=?'
const updateById = 'UPDATE maintain SET result=? , updateDate=?,status=? WHERE id=?'
const remove = 'UPDATE maintain SET updateDate=?,cancel=1 WHERE id=?'
const single = 'SELECT * FROM maintain WHERE id=?'
const update = (key) => `UPDATE maintain SET ${key}  WHERE id=?`

module.exports = {
    create,
    total,
    totalById,
    list,
    listById,
    unprocessedTask,
    updateById,
    remove,
    single,
    update
}