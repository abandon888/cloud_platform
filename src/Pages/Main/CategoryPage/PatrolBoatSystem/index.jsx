import React,{useEffect,useState,useRef, Fragment} from 'react' ; 
import { MessageTool } from 'Components/MessageTool';  
import { patrolBoatSystemDomain } from 'Config';  
 
 
// 引入时间模块
import moment from 'moment';
  
import './index.less';
  

function BriefIndex(){     
    // 二、监听数据
    // 初始化加载
    useEffect(()=>{
        try{  
             // ....
 
        }catch(err){
            console.log("出现异常",err)
            // MessageTool('系统出现异常！请刷新重试','error')
        }  
        return ()=>{ 

        }
    },[])  
  

    return (
        <div id='platform-body'  >  
            <div className='platform-inner-body'>  
               <a href={patrolBoatSystemDomain} target="_blank">水库无人智能巡逻艇系统</a>
            </div>
        </div>
    )
}

export default BriefIndex;