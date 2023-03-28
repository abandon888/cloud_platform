import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Form, Input, Button, Checkbox, Spin } from 'antd'
import { MessageTool } from 'Components/MessageTool'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'
import { getLogin, getLogout, getUserDetail } from 'Services/User'
import Captcha from 'react-captcha-code'
import qs from 'querystring'
import moment from 'moment'
import fgLogo from '../../Assets/images/home/fg-logo2.png'
import './index.less'

function Login(props) {
  const remainTime = 5 // 下一次登录的信息
  const tokenMinLen = 80 // token的最小长度
  const platformRouter = '/home/index' // 大厅的路由

  let opcaity = 0 // 初始时设置隐藏，数据加载后再显示
  let initValues = null // 初始化的数据
  const [form] = Form.useForm() // 表单的实例

  const [realCaptcha, setRealCaptcha] = useState('') // 验证码
  const [activeSubmit, setActiveSubmit] = useState(false) // 活动提交

  // 页面没有编译完成
  // 注意点：不要在模板编译前，使用异步赋值setState,useState,否则会出现无限循环渲染。
  // 1.如果5天内，浏览器有token直接跳转云平台管理页面，
  // 2.如果超过5天，则显示帐号密码，需要手动点击登录
  // 帐号，密码，记住密码，token， 下一次登录时间
  const setInitData = () => {
    // 1.获取缓存的信息
    let water_account_str = localStorage.getItem('water_account')
    let water_account_obj = qs.parse(water_account_str)
    let isOk = 'init'
    if (water_account_obj) {
      let next_login_time = water_account_obj.next_login_time
      let now_login_time = moment().format('YYYY-MM-DD HH:mm:ss')
      let water_token = localStorage.getItem('water_token')
      let water_userinfo = localStorage.getItem('water_userinfo')
      if (
        water_account_obj &&
        next_login_time &&
        water_userinfo &&
        water_token &&
        next_login_time > now_login_time &&
        water_token.length > tokenMinLen
      ) {
        // (1.判断是否还没到达登录时间，并且内存中有token,userinfo如果有，则直接跳转。
        isOk = 'dump'
        window.location.href = platformRouter
      } else if (
        water_account_obj != null &&
        water_account_obj.remember != 'false'
      ) {
        // (2.如果没有，则判断帐号是否缓存。
        let remember = true
        let username = water_account_obj.username
        let password = water_account_obj.password
        isOk = 'set'
        // 加载缓存的帐号和密码信息
        initValues = {
          username,
          password,
          remember,
        }
      }
    }

    // 如果没有任何缓存信息，则开始默认的初始化
    if (isOk == 'init') {
      // 执行默认的初始化
      initValues = {
        username: '',
        password: '',
        remember: true,
      }
      // form表单的设置操作需要在页面加载完成后才能执行。
      // // form表单不能被setState动态更新
      // // form.resetFields();
      // // form.setFieldsValue(initValues)
    }

    // 把隐藏的页面，显示出来
    if (isOk != 'dump') opcaity = 1
  }
  setInitData()

  const resetFormPos = () => {
    // 兼容性考虑，不使用outerWidth
    //    let width = window.outerWidth;
    let width = document.documentElement.clientWidth
    let node = document.querySelector('.box-div')
    if (width > 769) {
      let nodeWidth = node.clientWidth
      let offset = width / 4
      node.style.transform = `translateX(${offset}px)`
    } else {
      node.style.transform = ``
    }
  }

  // 模板编译完成后执行(略)
  useEffect(() => {
    resetFormPos()

    // 方法二：监听到后退，跳转到百度首页。
    window.addEventListener('popstate', (e) => {
      //这个可以监听到返回事件
      window.location.href = 'http://www.baidu.com'
    })
    // 监听页面尺寸变化
    window.addEventListener('resize', () => {
      resetFormPos()
    })
    return () => {
      window.removeEventListener('popstate', () => {})
      window.removeEventListener('resize', () => {})
    }
  }, [])

  //  设置匹配规则
  const [usernameRule, setUsernameRule] = useState([
    {
      required: true,
      message: '请输入帐号!',
    },
  ])
  const [passwordRule, setPasswordRule] = useState([
    {
      required: true,
      message: '请输入密码!',
    },
  ])
  const [captchaRule, setCaptchaRule] = useState([
    {
      required: true,
      message: '请输入验证码!',
    },
  ])

  // 提交登录信息
  const onFinish = (values) => {
    const { username, password, remember } = values

  // Directly redirect to platformRouter route
  window.location.href = platformRouter
  }

  // 监听验证码
  const handleClick = useCallback((captcha) => {
    setRealCaptcha(captcha)
  }, [])

  return (
    <div className="login-div" style={{ opacity: opcaity }}>
      <div className="box-div">
        <div className="mylogo-div">
          <img src={fgLogo} className="fg-logo" />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={initValues}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item name="username" rules={usernameRule}>
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  autoComplete="new-password"
                />
              }
              placeholder="Username"
              autoComplete="new-password"
              maxLength="30"
            />
          </Form.Item>
          <Form.Item name="password" rules={passwordRule}>
            <Input.Password
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  autoComplete="new-password"
                />
              }
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              maxLength="30"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="captcha" noStyle>
              <Input placeholder="验证码" maxLength={4} />
            </Form.Item>
            <Captcha charNum={4} onChange={handleClick} />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="theme-txt">记住密码</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#">
              {' '}
              忘记密码{' '}
            </a>
          </Form.Item>

          <Form.Item className="submit-div">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={activeSubmit}>
              登录
              {activeSubmit ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                ''
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
