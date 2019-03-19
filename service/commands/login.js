const authLogin = 'select * from admin WHERE account=? AND password=?'
const userInfo='select * from admin WHERE id=?'
module.exports={
    authLogin,
    userInfo
}