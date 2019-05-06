const request = require("request");

const fly = (options = {}, methods = 'get') => {
    return new Promise((resolve, reject) => {
        request[methods](options, (err, res, data) => {
            if (err) {
                reject(err)
            } else {
                if (res.statusCode == 200) {
                    resolve(data)
                } else {
                    reject(err)
                }
            }

        })
    })
}
module.exports = fly