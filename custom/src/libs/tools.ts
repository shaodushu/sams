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
 * @param isAdd0 是否加0
 */

export const formatTime = (timestamp: string, isAdd0: boolean = true) => {
    if (timestamp) {
        const time = new Date(timestamp)
        let year = time.getFullYear(), month;
        if (isAdd0) {
            month = add0(time.getMonth() + 1);
        } else {
            month = time.getMonth() + 1;
        }

        return year + '-' + month
    } else
        return false
}