import React, { useEffect, useState, useRef, Fragment } from 'react'
import { MessageTool } from 'Components/MessageTool'
import { Steps } from 'antd'

// 引入时间模块
import moment from 'moment'

import './index.css'

const { Step } = Steps

function BriefIndex() {
  // 二、监听数据
  // 初始化加载
  useEffect(() => {
    try {
      // 重置默认的序号
      let liArr = document.querySelectorAll(
        '.ant-steps .ant-steps-item .ant-steps-icon'
      )
      let len = liArr.length
      liArr.forEach((item, index) => {
        item.innerText = len - index
      })
      // 重置高度
      let liArr2 = document.querySelectorAll('.ant-steps .ant-steps-item')
      liArr2.forEach((item, index) => {
        let t = item.dataset.height
        if (t) item.style.height = t + 'px'
      })
    } catch (err) {
      console.log('出现异常', err)
      MessageTool('系统出现异常！请刷新重试', 'error')
    }
    return () => {}
  }, [])

  return (
    <div id="platform-body">
      <div className="platform-inner-body">
        <div id="useversion-div" className="theme-box">
          <h1 align="center" className="user-title theme-box-txt">
            {' '}
            <span>版本更新</span>{' '}
          </h1>
          <div className="mybody-div">
            <Steps direction="vertical">
              <Step
                title="版本1.1.1"
                description={
                  <ul>
                    <li>1.解决云平台删除普通用户的异常</li>
                    <li>
                      2.完善管理员添加功能，需要输入密码验证，有强密码注册限制
                    </li>
                    <li>3.完善普通用户不能修改水雨情数据的需求</li>
                  </ul>
                }
              />
              <Step
                title="版本1.1.0"
                description={
                  <ul>
                    <li>1.完成水雨情系统历史搜索</li>
                    <li>2.完成水雨情系统出库流量修改</li>
                    <li>3.基本完成项目的业务需求</li>
                  </ul>
                }
              />
              <Step
                title="版本1.0.5"
                data-height="200"
                description={
                  <ul>
                    <li>1.优化登录面板</li>
                    <li>2.修改密码添加安全认证</li>
                    <li>3.更好适应移动端的高度</li>
                    <li>4.新增版本更新页面</li>
                    <li>5.优化用户管理时遗留的缓存问题</li>
                  </ul>
                }
              />
              <Step
                title="版本1.0.4"
                description={
                  <ul>
                    <li>1.新添加登录页的验证码</li>
                    <li>2.优化加载页面的旋转器</li>
                    <li>3.优化后退设置，更加清晰的后退逻辑</li>
                  </ul>
                }
              />
              <Step
                title="版本1.0.3"
                description={
                  <ul>
                    <li>1.新添加登录页的验证码</li>
                    <li>2.优化加载页面的旋转器</li>
                    <li>3.优化后退设置，更加清晰的后退逻辑</li>
                  </ul>
                }
              />
              <Step
                title="版本1.0.2"
                description={
                  <ul>
                    <li>1.优化移动端退出问题</li>
                    <li>2.解决主页云平台，对官网数据获取的问题</li>
                  </ul>
                }
              />
              <Step
                title="版本1.0.1"
                description={
                  <ul>
                    <li>1.风格改版，云平台替换成星空背景，荧光色彩</li>
                    <li>
                      2.水雨情添加未完成的数据处理模块（暂未对应接口数据）
                    </li>
                  </ul>
                }
              />

              <Step
                title="版本1.0.0"
                description={
                  <ul>
                    <li>1.建立白色背景的云平台网站</li>
                    <li>2.全面将水雨情系统等子系统嵌入到云平台</li>
                    <li>3.去除水雨情系统等子系统的登录模块和用户操作模块</li>
                  </ul>
                }
              />
            </Steps>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BriefIndex
