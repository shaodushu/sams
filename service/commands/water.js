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
const total = (name) => `SELECT COUNT(*) FROM water LEFT JOIN apartment ON apartment.id=water.aid WHERE name LIKE "${name}%"`
const list = (name) => `SELECT apartment.name,water.* FROM water LEFT JOIN apartment ON apartment.id=water.aid where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    batchCreate,
    total,
    list
}