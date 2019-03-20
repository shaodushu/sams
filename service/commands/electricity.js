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
const total = (name) => `SELECT COUNT(*) FROM electricity LEFT JOIN apartment ON apartment.id=electricity.aid WHERE name LIKE "${name}%"`
const list = (name) => `SELECT apartment.name,electricity.* FROM electricity LEFT JOIN apartment ON apartment.id=electricity.aid where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    batchCreate,
    total,
    list
}