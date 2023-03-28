import React, { useEffect, useState, useRef, Fragment } from 'react'
import { MessageTool } from 'Components/MessageTool'
import { dumpNewPage } from 'Utils'
import { Row, Col } from 'antd'

// 引入时间模块
import moment from 'moment'

import './index.less'
import waterRainAvatar from 'Assets/images/avatar/water-rain-avatar.jpg'
import waterRainBanner from 'Assets/images/banner/water-rain-banner.jpg'

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

  // 跳转到系统
  const goToSystem = () => {
    dumpNewPage('/waterrainsystem')
  }

  return (
    <div id="platform-body">
      <div
        className="platform-inner-body"
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'auto',
          padding: '0',
          background: 'transparent',
        }}>
        <div id="waterRainSystem-div">
          <div className="head-div  theme-box">
            <div className="head-top">山口岩水利枢纽中心</div>
            <div className="head-bottom">
              <div className="head-left">
                <img src={waterRainAvatar} alt="" />
              </div>
              <div className="head-right">
                <div className="first">水雨情自动测报系统</div>
                <div className="second  theme-box-txt">
                  实时监测，远程控制，水量雨量实时变化。
                </div>
              </div>
            </div>
          </div>
          <div className="main-div">
            <Row gutter={24}>
              <Col
                className="gutter-row box-scroll"
                lg={18}
                md={12}
                sm={24}
                style={{ height: '100%' }}>
                <div className="gutter-box  theme-box" id="main-body">
                  <h1 align="center" className=" theme-box-txt">
                    发展历程
                  </h1>
                  <div className="brief-div">
                    水雨情测报系统适用于水利管理部门远程监测水库的水位、降雨量和大坝的位移、渗压等实时数据，同时支持远程视频监控，为保障水库的适度蓄水和安全度汛提供了准确、及时的现场信息。
                    水雨情测报系统实现了水雨情的实时监测、水库的信息化管理，在保护人民生命、财产安全方面发挥了重大作用。
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" lg={6} md={12} sm={24}>
                <div className="gutter-box" id="right-sidebar">
                  <Row gutter={24}>
                    <Col className="gutter-row" span={24}>
                      <div className="gutter-box  theme-box" id="top-div">
                        <div className="title">系统入口</div>
                        <div
                          className="content content-btn"
                          onClick={goToSystem}>
                          <span>快速进入</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="gutter-row " span={24}>
                      <div className="gutter-box  theme-box" id="bottom-div">
                        <div className="title">系统展示</div>
                        <div className="content ">
                          <img src={waterRainBanner} alt="" />
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

export default BriefIndex
