const createError = require('http-errors')
const operation = require('../../libs/operation')
const formidable = require('formidable');
const tools = require('../../libs/tool')
const path = require("path");
const sd = require("silly-datetime");
const fs = require('fs');

const uploadImg = async (req, res, next) => {
    try {
        //Creates a new incoming form.
        const form = new formidable.IncomingForm();
        //服务器地址
        const baseUrl = req.headers.host;
        const protocol = req.protocol
        form.uploadDir = path.normalize(__dirname + '/../../public/custom/pic');
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(createError(err))
                return;
            }
            const t = sd.format(new Date(), 'YYYYMMDDHHmmss');
            const ran = parseInt(Math.random() * 8999 + 10000);
            const extname = path.extname(files.file.name);
            const oldpath = files.file.path;
            const newpath = __dirname + '/../../public/custom/pic/' + t + ran + extname;
            fs.rename(oldpath, newpath, err => {
                if (err) {
                    next(createError(err))
                    return;
                } else {
                    let imgUrl = protocol + '://' + baseUrl + '/custom/pic/' + t + ran + extname
                    res.status(200).send({ imgUrl });
                }
            });
        });
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    uploadImg
}