const create = (key) => `INSERT INTO water (${key}) VALUES (?)`
const batchCreate = (length) => {
    let values = ''
    for (let index = 0; index < length; index++) {
        if (index === length - 1) {
            values = values + '(?)';
        } else {
            values = values + '(?),';
        }
    }
    return `INSERT INTO water (aid,dnum,consume,date,createDate) VALUES ${values}`
}
const total = (name) => `SELECT COUNT(*) FROM water LEFT JOIN apartment ON apartment.id=water.aid WHERE water.cancel=0 AND name LIKE "${name}%"`
const list = (name) => `SELECT apartment.name,water.* FROM water LEFT JOIN apartment ON apartment.id=water.aid where water.cancel=0 AND name LIKE "${name}%" limit ?,?`
const listByOpenid = `SELECT a.name AS aname,s.aid,s.dnum,w.consume,w.date FROM USER u LEFT JOIN student s ON s.uid=u.id LEFT JOIN apartment a ON a.id=s.aid LEFT JOIN water w ON w.dnum=s.dnum WHERE w.cancel=0 AND openid=?`
const remove = 'UPDATE water SET updateDate=?,cancel=1 WHERE id=?'
const single = 'SELECT * FROM water WHERE id=?'
const update = (key) => `UPDATE water SET ${key}  WHERE id=?`

module.exports = {
    create,
    batchCreate,
    total,
    list,
    listByOpenid,
    remove,
    single,
    update
}