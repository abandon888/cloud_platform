import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router  } from 'react-router-dom'; 
import {ConfigProvider} from 'antd'
// 引入antd组件库
import 'antd/dist/antd.min.css'; 
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';  
// 引入animate组件
import './Assets/css/animate.css';
// 以下数据会应用于所有的组件中
import './Assets/css/default.css'; 
import './Assets/css/index.css';
import './Assets/css/theme.css';
  
import App from './App'; 

ReactDOM.render( 
    <Router> 
       <ConfigProvider locale={locale}>
          <App /> 
      </ConfigProvider>
    </Router>  ,
  document.getElementById('root')
);
 