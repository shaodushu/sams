// 服务器地址
const DEV_URL = 'http://127.0.0.1:3000'
const ALPHA_URL = ''
const PRO_URL = ''

let BASE_URL
switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = DEV_URL
    break
  case 'alpha':
    BASE_URL = ALPHA_URL
    break
  case 'production':
    BASE_URL = PRO_URL
    break
}
export default {
  host: BASE_URL
}
