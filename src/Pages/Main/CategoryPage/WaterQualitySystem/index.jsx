import React, { useEffect, useState, useRef, Fragment } from 'react'
import { MessageTool } from 'Components/MessageTool'
import { waterQualitySystemDomain } from 'Config'
import { Button, Modal, Form, Input, Select, DatePicker, message } from 'antd'

// 引入时间模块
import moment from 'moment'

import './index.css'

function BriefIndex() {
  // 二、监听数据
  // 初始化加载
  useEffect(() => {
    try {
      // ....
    } catch (err) {
      console.log('出现异常', err)
      MessageTool('系统出现异常！请刷新重试', 'error')
    }
    return () => {}
  }, [])

  return (
    <div id="platform-body">
      <div className="platform-inner-body">
        <div style={{ width: '80%', height: '80%' }} className="bodyLeft">
          <div className="theme-box">
            <div
              style={{
                width: '100%',
                paddingBottom: '56.25%',
                position: 'relative',
              }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                <iframe
                  src="https://app.modaiyun.com/embedded/1638806643092013056?viewport=false&autoplay=false&autorotate=false&hideTools=false&showBIM=false&showBBoxSize=false&showKooRender=false&showSettings=false"
                  style={{ width: '100%', height: '100%' }}
                  frameBorder="0"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="bodyRight">
          <Input></Input>
        </div>
        <div className="content">
          <Input></Input>
        </div>
      </div>
    </div>
  )
}

export default BriefIndex
