const create = (key) => `INSERT INTO student (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM student WHERE name LIKE "${name}%"`
const list = (name) => `SELECT a.name AS aname,s.* FROM student s LEFT JOIN apartment a ON a.id=s.aid where s.name LIKE "${name}%" limit ?,?`
const updateUidByTel = 'UPDATE student SET uid=? WHERE tel=?'
const updateUidByUid = 'UPDATE student SET uid=NULL  WHERE uid=?'
module.exports = {
    create,
    total,
    list,
    updateUidByTel,
    updateUidByUid
}