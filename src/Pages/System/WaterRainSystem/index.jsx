import React,{useEffect,useState,useRef, Fragment} from 'react' ; 
import { MessageTool } from 'Components/MessageTool';  
import { waterRainSystemDomain } from 'Config';  
import { checkLoginAuth } from 'Utils';  
import { getLogout } from 'Services/User';  
 
 
// 引入时间模块
import moment from 'moment';
  
import './index.less';
  

function BriefIndex(props){     
    const [activeOpacity,setActiveOpacity] = useState(0)
    // 二、监听数据


    // 初始化加载
    useEffect(()=>{
        // 1.如果没有token， 或者过期，则跳转登录页
        if(!checkLoginAuth()) {
            // props.history.push('/login') // 可能会出现问题
            getLogout();
            MessageTool("当前的登录已过期！请重新登录",'warning') 
            setTimeout(()=>{ 
                window.location.href = "/login"
            },1000)
        } 
        let token = localStorage.getItem("water_token")
        let water_userinfo = localStorage.getItem("water_userinfo")
        setActiveOpacity(1);    // 显示页面 
        // 2.向child的iframe传递token(延迟1.5s);
        setTimeout(()=>{ 
            let iframeNode = document.querySelector("#iframe-inner");
            // 传递token
            if(iframeNode)  iframeNode.contentWindow.postMessage(token,'*')  
            // 传递是否是管理员, 传递pid信息(0为管理员,1为普通用户)
            let pid = 1; 
            water_userinfo = water_userinfo ? JSON.parse(water_userinfo) : {}
            water_userinfo.data = water_userinfo.data ? water_userinfo.data : {}
            pid = water_userinfo.data.pid; 
            if(iframeNode)  iframeNode.contentWindow.postMessage(pid,'*') 
        },1500) 

        // 3.监听child的iframe传递的数据(随时跳转登录页)
        window.addEventListener('message', function(e) { 
            if(e.data.length && e.data == 'token失效'){
                // 清空当前域的token
                getLogout(); 
                MessageTool("当前的登录已失效！请重新登录",'warning') 
                setTimeout(()=>{ 
                    window.location.href = "/login"
                },1000)
            }
        }, false);

        // 方法二：监听到后退，跳转到百度首页。
        window.addEventListener("popstate", (e) => {  //这个可以监听到返回事件  
            window.location.href = "http://www.baidu.com"
        },false);

        return ()=>{ 
            window.removeEventListener('message',()=>{}) 
            window.removeEventListener("popstate",()=>{});  
        }
    },[])  

     
  

    return (
        <div id='iframe-body' style={{'opacity':activeOpacity}} >     
            <iframe id="iframe-inner" src={waterRainSystemDomain} frameBorder="no" border="0" marginWidth="0" marginHeight="0" scrolling="no" allowtransparency="yes"></iframe>
        </div>
    )
}

export default BriefIndex;