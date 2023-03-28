import React, { useEffect, useState, useRef, Fragment } from 'react'
import { MessageTool } from 'Components/MessageTool'
import {
  getOfficialData,
  officialDomain,
  officialDataList1,
  officialDataList2,
} from 'Services/Home'
import { dumpNewPage } from 'Utils'
import { AimOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'

// 引入时间模块
import moment from 'moment'

import './index.less'
import cloudBanner from 'Assets/images/banner/cloud-banner.jpg'

function BriefIndex(props) {
  // 官方的链接（外链数据）
  const [activeLink1, setActiveLink1] = useState([])
  const [activeLink2, setActiveLink2] = useState([])

  // 二、监听数据
  // 初始化加载
  useEffect(() => {
    try {
      setActiveLink1(officialDataList1.join('\n'))
      setActiveLink2(officialDataList2.join('\n'))

      // 加载官方数据
      getOfficialData()
        .then((res) => {
          if (res) {
            document.querySelector('#hidden-sidebar').innerText = res

            // 返回的res数据中，有标签，所以解析会失败
            setTimeout(() => {
              let newPage = document.querySelector('#hidden-sidebar').innerText
              getActivePageData(officialDomain, newPage)
            }, 1000)
          } else {
            return new Promise((resolve, reject) => {
              reject('错误！')
            })
          }
        })
        .catch((err) => {
          console.log(officialDomain, '已经获取失败！使用静态资源', err)

          setActiveLink1(officialDataList1.join('\n'))
          setActiveLink2(officialDataList2.join('\n'))
        })
    } catch (err) {
      console.log('出现异常', err)
      MessageTool('系统出现异常！请刷新重试', 'error')
    }
    return () => {
      window.removeEventListener('message', () => {})
    }
  }, [])

  // 版本更新入口
  const handleVersion = () => {
    props.history.push('/home/statement/useversion')
  }

  // 解析活动页面的数据(外链数据)
  const getActivePageData = (domain, page) => {
    page = `\`${page.toString()}\``
    page = page.replace(/\n|\t/gi, '')
    // 初次遍历获取数据
    let a_str = page.match(/<div class="part_list">.+?<div class="part2_r">/gi)
    if (a_str && a_str.length > 0) {
      // 再次遍历获取a标签的数据
      let a_arr = a_str[0].match(/<a href=".*?".*?>.+?<\/a>/gi)
      if (a_arr && a_arr.length > 0) {
        let arr1 = []
        let arr2 = []
        let flag = 1
        a_arr.forEach((item) => {
          if (item.includes('>水源地保护<')) {
            flag = 2
          } else if (flag == 1) {
            item = item.replace('href="', `href="${domain}`)
            arr1.push(item)
          } else if (flag == 2) {
            item = item.replace('href="', `href="${domain}`)
            arr2.push(item)
          }
        })
        setActiveLink1(arr1.join('\n'))
        setActiveLink2(arr2.join('\n'))
      } else {
        setActiveLink1(officialDataList1.join('\n'))
        setActiveLink2(officialDataList2.join('\n'))
      }
    } else {
      setActiveLink1(officialDataList1.join('\n'))
      setActiveLink2(officialDataList2.join('\n'))
    }
  }

  // 跳转到官方的详情页
  const goToOfficial = () => {
    dumpNewPage(officialDomain)
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
        <Row gutter={24} id="briefindex-div">
          <Col
            className="gutter-row box-scroll"
            lg={18}
            md={12}
            sm={24}
            style={{ height: '100%' }}>
            <div className="gutter-box theme-box" id="main-body">
              <div className="brief-div card-div">
                山口岩水库（又名水利枢纽工程）地处赣江支流袁河上游的萍乡市芦溪县境内，坝址位于芦溪县上埠镇山口岩村上游1km处，距芦溪县城7.6km，距萍乡市约30km，是一座以供水、防洪为主，兼顾发电、灌溉等综合利用的大（Ⅱ）型水库，
                工程大坝为全省首例碾压混凝土双曲拱坝，并采用闸室分层取水设计，更好满足下游生态需要。工程投运后，使下游芦溪县城的防洪能力从原来的不足5年一遇提高到20年一遇，改善下游10.12万亩农田的灌溉，将灌溉保证率提高到90%以上。
                萍乡市山口岩水库管理局是2007年经市政府批准成立的正县级全额拨款公益I类事业单位，全面负责工程建设与运行管理相关工作，今年初按照全市事业单位改革有关要求正式更名为萍乡市山口岩水利枢纽管理中心，业务归口市水利局管理。
              </div>
              <div className="body-div">
                <img src={cloudBanner} alt="" className="theme-box" />
                <span onClick={goToOfficial}>点击进入</span>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" lg={6} md={12} sm={24}>
            <div className="gutter-box" id="right-sidebar">
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} sm={12} xs={24}>
                  <div className="gutter-box theme-box " id="top-div">
                    <div className="title theme-box-txt">工作动态</div>
                    <div
                      className="content theme-box-txt box-scroll-hidden"
                      dangerouslySetInnerHTML={{ __html: activeLink1 }}>
                      {/* 链接内容1 */}
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row " lg={24} md={24} sm={12} xs={24}>
                  <div className="gutter-box theme-box" id="bottom-div">
                    <div className="title  theme-box-txt">水源地保护</div>
                    <div
                      className="content theme-box-txt box-scroll-hidden"
                      dangerouslySetInnerHTML={{ __html: activeLink2 }}>
                      {/* 链接内容2 */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div id="hidden-sidebar" style={{ display: 'none' }}></div>
        <div id="fix-version" title="版本更新" onClick={() => handleVersion()}>
          <AimOutlined />
        </div>
      </div>
    </div>
  )
}

export default BriefIndex
