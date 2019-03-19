const createError = require('http-errors')
const operation = require('../libs/operation')
const formidable = require('formidable');
const tools = require('../libs/tool')
const path = require("path");
const sd = require("silly-datetime");
const fs = require('fs');
const commands = require('../commands')

const uploadImg = async (req, res, next) => {
    try {
        //Creates a new incoming form.
        const form = new formidable.IncomingForm();
        //服务器地址
        const baseUrl = req.headers.host;
        const protocol=req.protocol
        form.uploadDir = path.normalize(__dirname + '/../public/pic');
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, (err, fields, files) => {
            const t = sd.format(new Date(), 'YYYYMMDDHHmmss');
            const ran = parseInt(Math.random() * 8999 + 10000);
            const extname = path.extname(files.file.name);
            const oldpath = files.file.path;
            const newpath = __dirname + '/../public/pic/' + t + ran + extname;
            fs.rename(oldpath, newpath, err => {
                if (err) {
                    res.send({
                        status: 0,
                        msg: '上传失败'
                    })
                } else res.send({
                    status: 1,
                    url: protocol+'://'+baseUrl+'/pic/' + t + ran + extname,
                    msg: '上传成功'
                });
            });
        });
    } catch (error) {

    }
}
module.exports = {
    uploadImg
}