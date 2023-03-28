
// 引入时间模块
import moment from 'moment';
// 引入qs模块
import qs from 'querystring'

// （0.修改fixed处理后的数据（对5进行特殊化处理）
export const dealToFixedData = (data, fixNum)=>{
    data = data.toString()
    let data_arr = data.split(".")
    let len = data_arr.length
     
    let lastNum = data_arr[len-1].slice(fixNum,fixNum+1)
    if(lastNum == 5){ 
        let step = 0.1;
        let amount = 0.1;
        let i = fixNum;
        while(i -- ){
            amount *= step
        }
        data = parseFloat(data) + amount 
    }
    data = parseFloat(data).toFixed(fixNum)
    return data;
} 
// （1.时间计时器
export const changeIntervalTime = ()=>{
    const today = new Date();
    const nowDate = today.toLocaleDateString().replace(/[\/]/gi,"-")
    let nowTime = today.toLocaleTimeString().slice(4)
        let pre_data_prefix =  today.toLocaleTimeString().slice(0,2);
        let pre_data = parseInt(today.toLocaleTimeString().match(/(\d+):/gi));
        if(pre_data_prefix == "下午"){
            nowTime = (pre_data + 12) +":"+ nowTime;
        }else{
            if(pre_data < 10)
                nowTime = "0"+pre_data  +":" + nowTime;
            else
                nowTime = pre_data  +":" + nowTime;
        }
    return nowDate  + " " + nowTime
}
// （2.格式化日期数据
export const formatDate = (date,fmt)=>{ 
    // var dateTime = Date.now();//获取日期时间的date类型
    // dateTime = dateTime.setDate(dateTime.getDate()-1);//传入时间的前一天
    // var time = new Date(dateTime).Format("yyyy-MM-dd HH:mm:ss");//按照格式编译转换
    // yyyy MM dd  HH mm ss
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}   
// （7.修改Momment的数据类型(当前日期的指定日期格式)
export const changeMomentType = (moment,formatStr)=>{
    return moment(moment().format(formatStr),formatStr)
}  
// （8.检测登录身份
export const checkLoginAuth = ()=>{
    const tokenMinLen = 80

    // 1.获取缓存的信息
    let water_account_str = localStorage.getItem("water_account")
    let water_account_obj = qs.parse(water_account_str);
    let isOk = 'init'; 
    if(water_account_obj){ 
        let next_login_time = water_account_obj.next_login_time 
        let now_login_time = moment().format('YYYY-MM-DD HH:mm:ss')
        let water_token = localStorage.getItem("water_token")  
        let water_userinfo = localStorage.getItem("water_userinfo")  
        if(water_account_obj && next_login_time && water_userinfo && water_token && 
                next_login_time > now_login_time && water_token.length > tokenMinLen){ 
            // (1.判断是否还没到达登录时间，并且内存中有token,userinfo如果有，则直接跳转。 
            isOk = 'dump'; 
        }
    }
    return isOk == 'init' ? false : true
}
// （9.检测是否记住密码
export const checkRememberPwd = ()=>{ 
    let water_account_str = localStorage.getItem("water_account")
    let water_account_obj = qs.parse(water_account_str); 
    if(water_account_obj != null && water_account_obj.remember != 'false'){
        return true
    }else{
        return false
    }
}
// （10.跳转到新页面（跨越页面限制）
export const dumpNewPage = (url)=>{
    // 检查页面中有没有这个节点
    let testNode = document.querySelector("#dumpLink")
    if(!testNode){ 
        // （1.向页面中添加a标签
        let a = document.createElement('a');
        a.href = url;
        a.id = 'dumpLink';
        a.target = "_blank";
        document.body.appendChild(a);
    }else{
        // （2.修改a标签的url
        testNode.href = url
    } 
    // 再点击a标签 （注意时间）
    document.querySelector("#dumpLink").click();  
}

export default {
    changeIntervalTime,
    changeMomentType,
    checkLoginAuth
}
