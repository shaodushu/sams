const create = (key) => `INSERT INTO repair (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM repair WHERE cancel=0 AND name LIKE "${name}%"`
const list = (name) => `select * from repair where cancel=0 AND name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE repair SET uid=? WHERE tel=?'
const updateUidByUid = 'UPDATE repair SET uid=NULL  WHERE uid=?'
const getRepairByUid = 'SELECT * FROM REPAIR WHERE uid=?'
const standbyRepair = 'SELECT id,tel FROM REPAIR WHERE STATUS=?'
const single = 'SELECT * FROM repair WHERE id=?'
const remove = 'UPDATE repair SET updateDate=?,cancel=1 WHERE id=?'
const update = (key) => `UPDATE repair SET ${key}  WHERE id=?`

module.exports = {
    create,
    total,
    list,
    single,
    updateUidByTel,
    getRepairByUid,
    standbyRepair,
    updateUidByUid,
    remove,
    update
}