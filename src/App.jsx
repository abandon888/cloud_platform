import {Route,useLocation} from 'react-router-dom' 
import React,{Suspense,useState,useEffect} from 'react';
import  DocumentTitle from 'react-document-title' 
import {routerMap,systemMap} from './Router/index'
import {Spin} from 'antd'

// AnimatedRouter组件, 替换Switch组件
// import AnimatedRouter from 'react-animated-router'; 
// 引入nanoid随机值模块 
import {nanoid} from 'nanoid'

function App() {  
  // 当前路由
  const location = useLocation(); 
  // 监听当前的路由变化(改变标题)
 const [activeTitle,setActiveTitle] = useState(null) 
 const defaultTitle = '山口岩智能水库云平台'
 useEffect(()=>{ 
       let route = window.location.href;
       // 改变标题
       routerMap.some((item,index)=>{
           if(route.endsWith(item.path)){  
               setActiveTitle(item.title)
               return false;
           }
       }) 
       // 改变系统图标
       // (因为是跳转到新页面，所以是修改新页面的图标)
       systemMap.some((item,index)=>{
        if(route.endsWith(item.path)){  
            let iconNode = document.querySelector("head link[rel^=icon]")
            if(iconNode) iconNode.href = item.icon;
            return false;
        }
    }) 
 },[location])  

  return ( 
    <DocumentTitle title={activeTitle ? activeTitle : defaultTitle} >
      <div className="App">    
         <Suspense fallback={<Spin className='mask-spin'/>}>
           {
             routerMap.map((item,index)=>{
               return ( 
                  <Route path={item.path} component={item.component} exact={item.exact}  key={index}></Route> 
               )
             })
           }
           </Suspense> 
      </div> 
    </DocumentTitle>
  );
}

export default App;
