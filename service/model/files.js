const createError = require('http-errors')
const operation = require('../libs/operation')
const formidable = require('formidable');
const tools = require('../libs/tool')
const path = require("path");
const sd = require("silly-datetime");
const fs = require('fs');
const MODEL_WATER = require('./water')
const MODEL_ELECTRICITY = require('./electricity')

const uploadImg = async (req, res, next) => {
    try {
        //Creates a new incoming form.
        const form = new formidable.IncomingForm();
        //服务器地址
        const baseUrl = req.headers.host;
        const protocol = req.protocol
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
                    url: protocol + '://' + baseUrl + '/pic/' + t + ran + extname,
                    msg: '上传成功'
                });
            });
        });
    } catch (error) {

    }
}
const importWater = (req, res, next) => {
    try {
        const form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname, '../public/upload/');
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, (err, fields, files) => {
            let filename = files.file.name;

            // 对文件名进行处理，以应对上传同名文件的情况
            let nameArray = filename.split('.'),
                type = nameArray[nameArray.length - 1],
                name = '';
            for (let i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            let nowTime = new Date(),
                newPath = form.uploadDir + name + sd.format(nowTime, 'YYYYMMDDHHmmss') + '.' + type;
            fs.renameSync(files.file.path, newPath); //重命名
            MODEL_WATER.batchCreate(req, res, next, {
                list: tools.ExcelParse(newPath).map(item => {
                    return [
                        parseInt(fields.aid),
                        item[0],
                        item[1],
                        new Date(item[2]),
                        nowTime
                    ]
                })
            })
        })
    } catch (err) {
        next(createError(err))
    }
}
const importElectricity = (req, res, next) => {
    try {
        const form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname, '../public/upload/');
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, (err, fields, files) => {
            let filename = files.file.name;

            // 对文件名进行处理，以应对上传同名文件的情况
            let nameArray = filename.split('.'),
                type = nameArray[nameArray.length - 1],
                name = '';
            for (let i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            let nowTime = new Date(),
                newPath = form.uploadDir + name + sd.format(nowTime, 'YYYYMMDDHHmmss') + '.' + type;
            fs.renameSync(files.file.path, newPath); //重命名
            MODEL_ELECTRICITY.batchCreate(req, res, next, {
                list: tools.ExcelParse(newPath).map(item => {
                    return [
                        parseInt(fields.aid),
                        item[0],
                        item[1],
                        new Date(item[2]),
                        nowTime
                    ]
                })
            })
        })
    } catch (err) {
        next(createError(err))
    }
}
module.exports = {
    uploadImg,
    importWater,
    importElectricity
}