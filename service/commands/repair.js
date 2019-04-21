const create = (key) => `INSERT INTO repair (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM repair WHERE name LIKE "${name}%"`
const list = (name) => `select * from repair where name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE repair SET uid=? WHERE tel=?'
const updateUidByUid = 'UPDATE repair SET uid=NULL  WHERE uid=?'
const getRepairByUid = 'SELECT * FROM REPAIR WHERE uid=?'
const standbyRepair = 'SELECT id,tel FROM REPAIR WHERE STATUS=?'

module.exports = {
    create,
    total,
    list,
    updateUidByTel,
    getRepairByUid,
    standbyRepair,
    updateUidByUid
}