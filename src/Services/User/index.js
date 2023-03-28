import { request } from "Services/request";
import qs from 'querystring'; 

// 处理params函数
const operateParams = (params)=>{
    const paramsList = Object.keys(params);
    if(paramsList && paramsList.length){
         return '?'+qs.stringify(params)
    }
    return ''
} 
  
// 登录帐号
export const getLogin = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/login'+operateParams(params),
        method:'post',
        data:data
    })  
    // return new Promise(resolve=>{
    //     resolve({
    //         "msg": "登陆成功",
    //         "code": 1,
    //         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImFkbWluIiwic3ViIjoid2lzZG9tX3Jlc2Vydm9pciIsImV4cCI6MTY1MDI4ODk5MSwianRpIjoiZjE0NTg0NGQtOTY5MS00NzZiLWI0YWQtYTM5NTUyYzY4NjJlIn0.xwPA_tcj25VH0pSwqMZmoYsl69ZdV2aHJnoPlnnp39A"
    //     })
    // })
}
 
// 退出登录
export const getLogout = (isRemenber=false)=>{
    // 清空部分数据
    localStorage.removeItem("water_userinfo") // 用户信息
    localStorage.removeItem("water_isHaveAuth") // 是否有权限管理用户信息  pid = 0 
    localStorage.removeItem("water_token")   // 传递的token 
    sessionStorage.removeItem("ITimerResponse")     // 页面刷新定时器 
    sessionStorage.removeItem("water_userlist")     // 用户信息列表 (存储大小安全隐患)

    // 如果记住密码，则不删除帐号记录
    if(!isRemenber) localStorage.removeItem("water_account")    // 本地保存的密码 
}

// 用户详情
export const getUserDetail = () => {
  // Always return a resolved promise with a dummy user object
  return Promise.resolve({
    username: 'dummy',
    role: 'user',
  })
}

// 修改用户信息（email）
export const getUserUpdate = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/updateUser'+operateParams(params),
        method:'post',
        data:params
    })
    // return new Promise(resolve=>{
    //     resolve({
    //         code:1,
    //         msg:'更改成功'
    //     })
    // })
} 
// 修改用户信息（password）
export const getUserPassword = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/changePassword'+operateParams(params),
        method:'post',
        data:params
    }) 
    // return new Promise(resolve=>{
    //     resolve({
    //         code:1,
    //         msg:'更改成功'
    //     })
    // })
}



// 管理员功能 
// 用户列表
export const getUserMsg = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/useralllist'+operateParams(params),
        method:'post',
        data:params
    })
    // return new Promise(resolve=>{
    //     resolve({
    //         "code": 1,
    //         "data": [
    //             {
    //                 "id": 11,
    //                 "nickname": "admin1",
    //                 "email": "adddsd22min@qq.com",
    //                 "pswd": "c5833cfad830db4350cc48af3e503db4",
    //                 "pid": 0
    //             },
    //             {
    //                 "id": 11,
    //                 "nickname": "admin2",
    //                 "email": "addddd11n1@qq.com",
    //                 "pswd": "c5833cfad830db4350cc48af3e503db4",
    //                 "pid": 1
    //             },
    //             {
    //                 "id": 11,
    //                 "nickname": "admin3",
    //                 "email": "adddddmin@qq.com",
    //                 "pswd": "c5833cfad830db4350cc48af3e503db4",
    //                 "pid": 1
    //             }
    //         ]
    //     } )
    // })
}
// 添加新用户
export const addUserMsg = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/addUser'+operateParams(params),
        method:'post',
        data:params
    })
    
    // return new Promise(resolve=>{
    //     resolve({
    //         "code": 1,
    //         'msg':'添加成功！'
    //     })
    // })
}
// 删除用户
export const delUserMsg = (params={},data={},method='get')=>{
    return request({
        url:'/QS_AP/sys/deleteUser'+operateParams(params),
        method:'post',
        data:params
    })

    // return new Promise(resolve=>{
    //     resolve({
    //         "code": 1,
    //         'msg':'删除成功！'
    //     })
    // })
}