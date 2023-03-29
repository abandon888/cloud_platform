import React,{useEffect,useState,useRef, Fragment} from 'react' ; 
import { MessageTool } from 'Components/MessageTool';  
 
 
// 引入时间模块
import moment from 'moment';
  
import './index.css';
  

function BriefIndex(){     
    // 二、监听数据
    // 初始化加载
    useEffect(()=>{
        try{  
             // ....
 
        }catch(err){
            console.log("出现异常",err)
            MessageTool('系统出现异常！请刷新重试','error')
        }  
        return ()=>{ 

        }
    },[])  
  

    return (
        <div id='platform-body'  >  
            <div className='platform-inner-body'> 
                <div id='usehelp-div' className='theme-box'> 
                    <h1 align="center" className='user-title theme-box-txt'>使用帮助</h1>
                    <div className='mybody-div'> 
                        <blockquote>
                            <p>
                            物联网云平台是实现多设备、多硬件、多子系统智能物联、集中管控的关键一环，因此生产一款安全性高，智能化，性能稳定的物联网云平台，也变得越来越迫切 。经过山口岩水利枢纽中心的努力，
                            成功研发了一款集成的智慧水库云平台，管理局可以有效地管控水库各项设施的正常运行，提高水库安全的同时，也大幅度减少管理成本，移动智能化办公。
                            </p>
                        </blockquote> 
                        <blockquote>
                            <p>
                            (1)、硬件打通：当前平台已经打通对接物联网设备，实现包括协议兼容、通信稳定、接口适配等问题，计划最优的开发成本。
                            (2)、应用扩展：针对具体项目的需求，宬成科技公司支持定制开发山口岩智慧水库云平台，适用于山口岩的水雨状况自动测报、大坝安全监测、水库坝顶气象监测、水质自动监测等场景的物联网管理应用。
                            </p>
                        </blockquote>
                    </div>
                </div>
               

            </div>
        </div>
    )
}

export default BriefIndex;