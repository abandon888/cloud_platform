import React,{useEffect,useState,useRef, Fragment} from 'react' ; 
import { MessageTool } from 'Components/MessageTool';    
import { dumpNewPage} from 'Utils';  
import { Row, Col } from 'antd';
 
 
// 引入时间模块
import moment from 'moment';
  
import './index.less';
import towerVideoAvatar from 'Assets/images/avatar/tower-video-avatar.jpg'
import towerVideoBanner from 'Assets/images/banner/tower-video-banner.jpg'
  

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
        return ()=>{     }
    },[])  
  
    // 跳转到系统
    const goToSystem = ()=>{ 
        dumpNewPage('/towervideosystem')
    }


    return (
        <div id='platform-body'  >  
            <div className='platform-inner-body'  style={{'alignItems':'flex-start','justifyContent':'flex-start','overflow':'auto','padding':'0','background':'transparent'}}>  
                <div id='towerVideoSystem-div'> 
                    <div className='head-div theme-box'> 
                        <div className='head-top theme-box-txt'>
                            中国铁塔
                        </div>
                        <div className='head-bottom '>
                            <div className='head-left'>
                                <img src={towerVideoAvatar} alt="" />
                            </div>
                            <div className='head-right'>
                                <div className='first'>B视联库面视频监控系统</div> 
                                <div className='second theme-box-txt'>看得清，看得远，看得全，平台定义摄像机</div> 
                            </div>
                        </div>
                    </div>
                    <div className='main-div'>  

                        <Row gutter={24}>
                            <Col className="gutter-row box-scroll" lg={18} md={12} sm={24} style={{'height':"100%"}}>
                                <div className="gutter-box theme-box" id='main-body'> 
                                    <h1 align="center" className='theme-box-txt'>发展历程</h1>
                                    <div className='brief-div theme-box-txt'>
                                    中国铁塔将全国200多万座传统通信塔升级为数字塔，建立视联算法仓，打造全国统一的视联平台，实现视联全国一张网。基于华为云构建的视联平台解决方案，采用典型的云-边-端架构，通过华为云智能边缘平台IEF实现分布全国的边缘设备和应用统一管理和运维，边缘业务安全接入，超万路视频流就近处理，中心算法仓的算法秒级分发，
                                    满足客户对视频的低延时接入、高可靠存储和全国算法统一调度的要求。该方案可以充分发挥其“点多面广、站高望远”的资源优势，依托无处不在的电信基础网络，围绕视觉感知、数据采集、图像分析、信息处理等，广泛服务环保、国土、林草、应急、地震，以及铁路、电网、油气等重点领域，可更好的服务国计民生和社会信息化。
                                    </div>
                                </div> 
                            </Col>
                            <Col className="gutter-row" lg={6} md={12} sm={24}>
                                <div className="gutter-box" id='right-sidebar'> 
                                    <Row gutter={24}> 
                                        <Col className="gutter-row" span={24}  > 
                                            <div className="gutter-box theme-box" id='top-div'> 
                                                <div className='title'>系统入口</div>
                                                <div className='content content-btn' onClick={goToSystem}>   
                                                    <span>快速进入</span> 
                                                </div>
                                            </div>
                                        </Col>    
                                        <Col className="gutter-row " span={24} >
                                            <div className="gutter-box theme-box" id='bottom-div'> 
                                                <div className='title'>系统展示</div>
                                                <div className='content '>  
                                                    <img src={towerVideoBanner} alt="" />  
                                                </div>
                                            </div>
                                        </Col>    
                                    </Row>
                                </div>
                            </Col> 
                        </Row> 
                    </div> 
                
                </div>
            </div>
        </div>
    )
}

export default BriefIndex;