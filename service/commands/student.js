const create = (key) => `INSERT INTO student (${key}) VALUES (?)`
const total = (name) => `SELECT COUNT(id) FROM student WHERE name LIKE "${name}%"`
const list = (name) => `select * from student where name LIKE "${name}%" limit ?,?`

module.exports = {
    create,
    total,
    list
}