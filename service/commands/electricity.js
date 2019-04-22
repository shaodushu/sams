const create = (key) => `INSERT INTO electricity (${key}) VALUES (?)`
const batchCreate = (length) => {
    let values = ''
    for (let index = 0; index < length; index++) {
        if (index === length - 1) {
            values = values + '(?)';
        } else {
            values = values + '(?),';
        }
    }
    return `INSERT INTO electricity (aid,dnum,consume,date,createDate) VALUES ${values}`
}
const total = (name) => `SELECT COUNT(*) FROM electricity LEFT JOIN apartment ON apartment.id=electricity.aid WHERE electricity.cancel=0 AND name LIKE "${name}%"`
const list = (name) => `SELECT apartment.name,electricity.* FROM electricity LEFT JOIN apartment ON apartment.id=electricity.aid where electricity.cancel=0 AND name LIKE "${name}%" limit ?,?`
const listByOpenid = `SELECT a.name AS aname,s.aid,s.dnum,e.consume,e.date FROM USER u LEFT JOIN student s ON s.uid=u.id LEFT JOIN apartment a ON a.id=s.aid LEFT JOIN electricity e ON e.dnum=s.dnum WHERE e.cancel=0 AND openid=?`
const remove = 'UPDATE electricity SET updateDate=?,cancel=1 WHERE id=?'
const single = 'SELECT * FROM electricity WHERE id=?'
const update = (key) => `UPDATE electricity SET ${key}  WHERE id=?`

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