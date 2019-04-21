/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const add0 = num => {
    return num < 10 ? '0' + num : num
}

/**
 * 
 * @param timestamp 
 */
export const formatTime = (timestamp: string, isFull = false) => {
    if (timestamp) {
        const time = new Date(timestamp)
        let year = time.getFullYear();
        let month = add0(time.getMonth() + 1);
        if (isFull) {
            let day = add0(time.getDate())
            let hours = add0(time.getHours())
            let minutes = add0(time.getMinutes())
            let seconds = add0(time.getSeconds())
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
        }
        return year + '-' + month
    } else
        return ''

}