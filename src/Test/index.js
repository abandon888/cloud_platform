let a = '12/#你'

function isChinese(value){
    return /[\u4E00-\u9FA5]+/.test(value)
}
let res = isChinese(a)
console.log(res)