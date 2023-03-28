import axios from 'axios';  
import {cloudPlatformApi} from 'Config'
import { getLogout } from 'Services/User'; 
import  {MessageTool} from  'Components/MessageTool'
 
// 从config/index.js中引入常量
const baseURL1 = cloudPlatformApi;


// 设置超时时间 
const timeout1 = 5*60*1000; 
//  设置headers
const headers = {
  'Content-Type': 'application/json',

  // 因为后端的没有制作完整的jwt方案，因此用不上
  'token':localStorage.getItem("water_token1") ? localStorage.getItem("water_token1") :''
}

// 没有设置拦截器， 可以直接使用axios的请求方法
// export const api = (data={})=>{
//   return axios.create({
//       baseURL ,
//       timeout , 
//       headers ,
//       data,
//       responseType: 'json', 
//   });
// }  

// 设置拦截器，在请求前将config添加headers
export const request = (config,baseURL=baseURL1,timeout=timeout1)=>{
   const instance = axios.create({
     baseURL,
     timeout
   })

   // 请求拦截器
   instance.interceptors.request.use(config=>{
      const water_token1 = window.localStorage.getItem("water_token")
      if(water_token1){
        config.headers.token = water_token1; 
      }
       
      return config
   },err=>{
       console.log("请求出错啦！",err)
   })

    // 响应拦截器
    instance.interceptors.response.use(res=>{ 

      let pre_data = res.data ? res.data : res;
      if(pre_data.state != undefined &&  pre_data.state == false){ 
         getLogout();
         setTimeout(()=>{
            window.location.href = "/login"
         },500)
      }

      return res.data ? res.data : res;
    },err=>{
      console.log("接口响应出错啦！",err)  
      if(err.toString() == 'Error: Network Error'){ 
         MessageTool('网络错误！请检查接口和网络是否畅通','error')
         console.log("网络错误异常！")
         // 手动 抛出异常
         return {'msg':'网络错误！请检查接口和网络是否畅通'}
      }else{ 
         console.log("接口正常")
      } 
    })

    return instance(config)
}
 
// 封装axios,添加原生的axios请求
// 可以直接使用默认的方法，一般用于传递列表使用
export const http = (options,baseURL = baseURL1)=>{
  const url = options.url ? options.url : ''
  const data = options.data ? options.data : {}
  let method = options.method ? options.method : 'post'
  method = method.toLowerCase()
  let axiosObj = null
  if(method == 'post'){
     axiosObj = axios.post(baseURL + url,headers,data) 
  }else if(method == 'post'){
  axiosObj = axios.post(baseURL + url,headers,data) 
  }else if(method == 'get'){
     axiosObj = axios.post(baseURL + url,headers,data) 
  }else if(method == 'put'){
     axiosObj = axios.post(baseURL + url,headers,data) 
  }else if(method == 'putch'){
      axiosObj = axios.post(baseURL + url,headers,data) 
  }else if(method == 'delete'){
      axiosObj = axios.post(baseURL + url,headers,data) 
  }else  {
      console.log("http出错")
  }
  return axiosObj;
}
