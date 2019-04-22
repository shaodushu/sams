const create = (key) => `INSERT INTO student (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM student WHERE cancel=0 AND name LIKE "${name}%"`
const list = (name) => `SELECT a.name AS aname,s.* FROM student s LEFT JOIN apartment a ON a.id=s.aid where s.cancel=0 AND s.name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE student SET uid=? WHERE tel=?'
const updateUidByUid = 'UPDATE student SET uid=NULL  WHERE uid=?'
const remove = 'UPDATE student SET updateDate=?,cancel=1 WHERE id=?'
const single = 'SELECT * FROM student WHERE id=?'
const update = (key) => `UPDATE student SET ${key}  WHERE id=?`

module.exports = {
    create,
    total,
    list,
    updateUidByTel,
    updateUidByUid,
    remove,
    single,
    update
}