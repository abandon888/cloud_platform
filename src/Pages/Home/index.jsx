import React, { useEffect, useState, Suspense } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { checkLoginAuth, checkRememberPwd } from 'Utils'
import { getLogout } from 'Services/User'

import { Menu, Button, Dropdown, Image, Avatar } from 'antd'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import './index.less'
import { subRouterMap } from 'Router/index'
import { MessageTool } from 'Components/MessageTool'
import IconFont from 'Assets/fonts'

import fgLogo1 from 'Assets/images/home/fg-logo.png'
import userImg from 'Assets/images/pic/avatar.png'

function Home(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTitle, setActiveTitle] = useState(null)
  const [activeOpacity, setActiveOpacity] = useState(0)
  let tTimer = null
  let username = 'Admin'
  let defaultTitle = '山口岩智能水库云平台'
  let isLogin = true

  // 页面定时器
  let TTimer = null
  // 当前路由
  const location = useLocation()
  // 显示用户管理权限
  const [isHaveAuth, setIsHaveAuth] = useState(
    localStorage.getItem('water_isHaveAuth') == 'true' ? true : false
  )

  // 检测访问权限
  function judgeLogin() {
    // 1.如果没有token， 或者过期，则跳转登录页
    if (!checkLoginAuth()) {
      // props.history.push('/login') // 可能会出现问题

      // 如果记住密码，则不删除帐号部分
      let res = checkRememberPwd()
      getLogout(res)

      // 清除定时器
      // if(tTimer) clearInterval(tTimer);
      // MessageTool("当前的登录已过期！请重新登录",'warning')
      // setTimeout(()=>{
      //     window.location.href = "/login"
      // },2000);
    } else {
      isLogin = true
    }
  }
  judgeLogin()
  // 获取当前帐号用户名
  function getUsername() {
    let water_userinfo = localStorage.getItem('water_userinfo')
    water_userinfo = water_userinfo ? JSON.parse(water_userinfo) : {}
    username = water_userinfo.username
  }
  getUsername()

  // 页面加载
  useEffect(() => {
    // 显示页面
    if (isLogin) setActiveOpacity(1)
    // 改变折叠
    if (document.documentElement.clientWidth < 1080) setCollapsed(true)

    // 监听到后退，跳转到百度首页。
    window.addEventListener('popstate', (e) => {
      //这个可以监听到返回事件
      // // 如果当前的站点是云平台首页, 最多再次跳转到云平台主页,否则就跳转到云平台首页
      let current = window.location.href

      // 通过session进行计数
      if (current.includes('/home/index')) {
        let pre = sessionStorage.getItem('water_times')
        let pre_number = 0
        if (!pre) {
          sessionStorage.setItem('water_times', 0)
          pre_number = 0
        } else {
          pre_number = parseInt(pre) + 1
          sessionStorage.setItem('water_times', pre_number)
        }
        // 首次访问，退回访问，当前访问
        if (pre_number == 2) {
          sessionStorage.removeItem('water_times')
          window.location.href = 'http://www.baidu.com'
        }
      }
    })
    //  监听页面的尺寸变化
    window.addEventListener('resize', function () {
      if (document.documentElement.clientWidth < 1080) {
        setCollapsed(true)
      } else {
        // setCollapsed(false);
      }
    })
    // 轮训监听页面的登录权限,5秒判断一次
    tTimer = setInterval(() => {
      judgeLogin()
    }, 5)

    return () => {
      window.removeEventListener('popstate', () => {})
      window.removeEventListener('resize', () => {})
      // 清除定时器
      if (tTimer) clearInterval(tTimer)
    }
  }, [])

  // 监听侧边栏的折叠变化
  useEffect(() => {
    // 动态改变主体内容的宽度
    let platform_body = document.querySelector('.content-div')
    // 动态改变最小宽度值
    let homeNode = document.querySelector('.home-div')
    if (platform_body && homeNode) {
      if (collapsed) {
        platform_body.style.cssText = `width:calc(100vw - 6rem)!important; 
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;`
        homeNode.style.cssText = `min-width:calc(767px + 6rem)!important;display:flex`
      } else {
        platform_body.style.cssText = `width:calc(100vw - 6rem)!important; 
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;`
        homeNode.style.cssText = `min-width:calc(767px + 18rem)!important;display:flex`
      }
    }
  }, [collapsed])
  // 监听当前的路由变化(改变标题)
  useEffect(() => {
    let route = window.location.href
    subRouterMap.some((item, index) => {
      if (route.endsWith(item.path)) {
        setActiveTitle(item.title)
        return false
      }
    })
  }, [location])

  // 重置部分样式
  const resetDom = (index, ignore = true) => {
    // 设置当前活动项
    setActiveIndex(index)
    // 关闭左侧活动项
    let node = document.querySelector('.ant-menu-item.ant-menu-item-selected')
    if (node && ignore) node.classList.remove('ant-menu-item-selected')
  }

  // 1.云平台主页
  const handleIndex = () => {
    window.location.href = '/home/index'
    resetDom(0)
  }

  // 2.使用帮助
  const handleHelp = () => {
    props.history.push('/home/statement/usehelp')
    resetDom(1)
  }

  // 3.用户管理
  const onHeaderClick1 = ({ key }) => {
    if (key == 'userList') {
      props.history.push('/home/manage/userlist')
    } else {
      props.history.push('/home/manage/adduser')
    }
    resetDom(2)
  }

  // 4.个人详情
  const onHeaderClick2 = ({ key }) => {
    if (key == 'userDetail') {
      props.history.push('/home/person/userdetail')
    } else {
      // 如果记住密码，则不删除帐号部分
      let res = checkRememberPwd()
      getLogout(res)

      MessageTool('退出登录成功', 'success')
      setTimeout(() => {
        props.history.push('/login')
      }, 1000)
    }
    resetDom(3)
  }

  // 5.选择指定的系统
  const onSelectMenu = (e) => {
    props.history.push(e.key)
    resetDom(4, false)
  }

  return (
    <DocumentTitle title={activeTitle ? activeTitle : defaultTitle}>
      {/* 整体页面 */}
      <div
        className="home-div"
        style={{
          display: 'flex',
        }}>
        {/* 顶部 */}
        <div className={'left-div box-scroll '}>
          <div className={'logo-div ' + (collapsed ? ' hidden' : '')}>
            <img src={fgLogo1} className="fg-logo1" />
          </div>
          {/* 侧边栏 */}
          <Menu
            onSelect={onSelectMenu}
            className="theme-box"
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}>
            <Menu.Item
              key="/home/category/towervideo"
              icon={<IconFont type="icon-video" />}>
              B视联库面视频监控
            </Menu.Item>
            <Menu.Item
              key="/home/category/waterrain"
              icon={<IconFont type="icon-xiayu" />}>
              水雨情自动测报
            </Menu.Item>
            <Menu.Item
              key="/home/category/damsecure"
              icon={<IconFont type="icon-secure-number" />}>
              大坝安全监测
            </Menu.Item>
            <Menu.Item
              key="/home/category/damweather"
              icon={<IconFont type="icon-WeatherFog" />}>
              水库坝顶气象监测
            </Menu.Item>
            <Menu.Item
              key="/home/category/waterquality"
              icon={<IconFont type="icon-securityscan" />}>
              水质自动监测
            </Menu.Item>
            <Menu.Item
              key="/home/category/watersuply"
              icon={<IconFont type="icon-rxa-water-filled" />}>
              水库供水状况监测
            </Menu.Item>
            <Menu.Item
              key="/home/category/machinework"
              icon={<IconFont type="icon-machine" />}>
              水库机电设备工作监测
            </Menu.Item>
            <Menu.Item
              key="/home/category/patrolboat"
              icon={<IconFont type="icon-boat-outline" />}>
              水库无人智能巡逻艇
            </Menu.Item>
          </Menu>
        </div>
        {/* 内容页面 */}
        <div className="content-div ">
          <div className="header-div" style={{display: 'flex',}}>
            <div className="header-left" style={{display: 'flex',}}>
              <Button type="default" onClick={() => setCollapsed(!collapsed)}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
              </Button>
              <div
                className={'useable-div ' + (activeIndex == 0 ? 'active' : '')}
                onClick={handleIndex}>
                <IconFont type="icon-home" />
                <span>云平台</span>
              </div>
              <div
                className={'useable-div ' + (activeIndex == 1 ? 'active' : '')}
                onClick={handleHelp}>
                <IconFont type="icon-help" />
                <span>使用帮助</span>
              </div>

              {/* 管理员的功能 */}
              {isHaveAuth ? (
                <div
                  className={
                    'useable-div ' + (activeIndex == 2 ? 'active' : '')
                  }>
                  <Dropdown
                    overlay={
                      <Menu onClick={onHeaderClick1}>
                        <Menu.Item key="userList">用户列表</Menu.Item>
                        <Menu.Item key="addUser">添加用户</Menu.Item>
                      </Menu>
                    }>
                    <div>
                      <IconFont type="icon-manage" />
                      <span>用户管理</span>
                    </div>
                  </Dropdown>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="header-right" style={{display: 'flex',justifyContent: 'flex-end',alignItems:'center',marginRight:'1rem',width:'280px',height:'100%'}}>';
              <Dropdown
                overlay={
                  <Menu onClick={onHeaderClick2}>
                    <Menu.Item key="userDetail">修改信息</Menu.Item>
                    <Menu.Item key="quitLogin">退出登录</Menu.Item>
                  </Menu>
                }>
                <a
                  className={
                    'ant-dropdown-link ' + (activeIndex === 3 ? 'active' : '')
                  }
                  style={{display: 'flex',alignItems:'center',justifyContent:'flex-end',width:'100%',height:'100%'}}
                  onClick={(e) => e.preventDefault()}>
                  <div className="user-name">欢迎您，{username}</div>
                  <Avatar src={userImg} alt="用户" className="user-img" style={{height:'30px'}} />
                </a>
              </Dropdown>
            </div>
          </div>
          <div className="body-div">
            <Suspense fallback={<></>}>
              {subRouterMap.map((item, index) => {
                return (
                  <Route
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    key={index}
                  />
                )
              })}
            </Suspense>

            {/* 刷新，空都重定向到主页 */}
            <Redirect to="/home/index" />
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Home
