import React,{useEffect,useState,useRef, Fragment} from 'react' ; 
import { MessageTool } from 'Components/MessageTool';  
import { towerVideoSystemDomain } from 'Config';  
 
 
// 引入时间模块
import moment from 'moment';
  
import './index.less';
  

function BriefIndex(){   
    // 跳转页面
    const dumpPage = ()=>{
        window.location.href = towerVideoSystemDomain;
    }
    dumpPage();
    
    // 二、监听数据
    // 初始化加载
    useEffect(()=>{
       
        // 方法二：监听到后退，跳转到百度首页。
        window.addEventListener("popstate", (e) => {  //这个可以监听到返回事件  
            window.location.href = "http://www.baidu.com"
        });

        return ()=>{  
            window.removeEventListener("popstate",()=>{}); 
        }
    },[])  
  

    return (
        <div id='iframe-body'  >     
            {/* <iframe id="iframe-inner" src={towerVideoSystemDomain} frameBorder="no" border="0" marginWidth="0" marginHeight="0" scrolling="no" allowtransparency="yes"></iframe> */}
        </div>
    )
}

export default BriefIndex;