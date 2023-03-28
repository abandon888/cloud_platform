import React, { useState } from 'react'
import { Form, Input, Select, Modal, Button, AutoComplete } from 'antd'
import './index.less'
import { addUserMsg } from 'Services/User'
import { MessageTool, MessageToolClear } from 'Components/MessageTool'

const { Option } = Select

function RegistrationForm() {
  const [form] = Form.useForm()
  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  // 弹层 是否显示
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [midValue, setMidValue] = useState(null)

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  )
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }))

  // 判断当前密码的复杂度
  const getVerifyCount = (value) => {
    let res1 = /[^\d^\s^\w]+/.test(value) // 特殊字符 (@#@##)
    let res2 = /[\d]+/.test(value) // 数字字符
    let res3 = /[a-zA-Z]+/.test(value) // 英文字符
    let verifyCount = 0
    if (res1) verifyCount += 1
    if (res2) verifyCount += 1
    if (res3) verifyCount += 1
    return verifyCount
  }
  // 验证字符串中是否含有中文
  const getVerifyChinese = (value) => {
    return /[\u4E00-\u9FA5]+/.test(value)
  }

  //  确认提交
  const onFinish = (values) => {
    // 1.表单验证
    // 验证帐号长度
    let nickname = values.nickname
    if (!nickname || nickname.length < 4) {
      MessageTool('帐号长度不少于4个字符，请重新设置！', 'warning')
      return
    }
    // 验证密码长度
    let password = values.password
    if (!password || password.length < 6) {
      MessageTool('帐号长度不少于6个字符，请重新设置！', 'warning')
      return
    }
    // 验证用户名是否含有中文
    let res1 = getVerifyChinese(nickname)
    if (res1) {
      MessageTool('用户名不能包含中文字符，请重新设置！', 'warning')
      return
    }
    // 先验证密码是否是过于简单
    let count = getVerifyCount(password)
    if (count < 2) {
      MessageTool('输入的密码过于简单，请重新设置！', 'warning')
      return
    }
    // 验证密码是否含有中文
    let res2 = getVerifyChinese(password)
    if (res2) {
      MessageTool('密码不能包含中文字符，请重新设置！', 'warning')
      return
    }

    // 2.安全验证
    if (values.gender == 'vip') {
      // 如果当前需要添加管理员，则会有安全认证

      // 需要正确输入管理员密码，才允许添加管理员
      setIsModalVisible(true)

      // 先保存进中间变量中
      setMidValue(values)
    } else {
      // 如果是普通用户，则可以直接添加
      continueAdd(values)
    }
  }
  // 确认输入管理员密码
  const handleOk = () => {
    let confirmPassword = document.querySelector('#password').value
    let water_userinfo = localStorage.getItem('water_userinfo')
    water_userinfo = water_userinfo != null ? JSON.parse(water_userinfo) : null
    let lastPassword = water_userinfo != null ? water_userinfo.password : ''

    console.log('lastpassword', lastPassword)
    if (
      confirmPassword.length &&
      lastPassword.length &&
      confirmPassword == lastPassword
    ) {
      MessageTool('认证成功！允许添加新管理员', 'success')
      // 验证输入的管理员密码和保存的进行匹配，如果相同，则允许修改
      continueAdd(midValue)
      // 关闭弹层
      setIsModalVisible(false)
    } else {
      MessageTool('输入的管理员密码错误！', 'error')
    }
  }
  // 取消输入管理员密码
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // 继续执行添加操作
  const continueAdd = (values) => {
    let params = {
      email: values.email,
      nickname: values.nickname,
      pswd: values.password,
      pid: values.gender == 'vip' ? 0 : 1,
    }
    addUserMsg(params)
      .then((res) => {
        if ((res && res.code == 1) || res.msg == '添加成功') {
          MessageTool('添加新用户成功!', 'success')
          form.resetFields()
        } else {
          MessageTool('添加新用户失败!', 'success')
        }
      })
      .catch((err) => {
        console.log('添加新用户出现异常:', err)
        MessageTool('添加新用户出现异常!', 'error')
      })
  }

  return (
    <div id="platform-body">
      <div className="platform-inner-body box-scroll">
        <Form
          id="add-div"
          {...formItemLayout}
          form={form}
          className="theme-box"
          name="register"
          onFinish={onFinish}
          scrollToFirstError>
          <h1 align="center" className="theme-box-txt">
            添加用户
          </h1>

          <Form.Item
            name="nickname"
            label="用户昵称"
            labelCol={{ span: 3 }}
            placeholder=" "
            rules={[
              {
                required: true,
                message: '请输入用户昵称!',
                whitespace: true,
              },
            ]}>
            <Input
              autoComplete="new-password"
              maxLength="30"
              placeholder="请输入用户昵称"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="登录密码"
            labelCol={{ span: 3 }}
            help="密码必须包含数字，英文字母，符号其中的两种字符"
            rules={[
              {
                required: true,
                message: '请输入登录密码!',
              },
            ]}>
            <Input.Password
              autoComplete="new-password"
              maxLength="30"
              placeholder="请输入登录密码"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            labelCol={{ span: 3 }}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请输入确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(new Error('两次输入的密码不一致!'))
                },
              }),
            ]}>
            <Input.Password
              autoComplete="new-password"
              maxLength="30"
              placeholder="请输入确认密码"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="用户邮箱"
            labelCol={{ span: 3 }}
            rules={[
              {
                type: 'email',
                message: '当前邮箱不合法！',
              },
              {
                required: true,
                message: '请输入用户邮箱!',
              },
            ]}>
            <Input
              autoComplete="new-password"
              labelCol={{ span: 3 }}
              maxLength="40"
              placeholder="请输入用户邮箱"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="用户类型"
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: '请选择用户类型!',
              },
            ]}>
            <Select placeholder="选择用户类型">
              <Option value="usual">普通用户</Option>
              <Option value="vip">管理员用户</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout} className="submitBtn">
            <Button type="primary" htmlType="submit">
              {' '}
              点击提交{' '}
            </Button>
          </Form.Item>
        </Form>

        <Modal
          centered
          title="提示框"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form>
            <Form.Item
              label="管理员密码"
              name="password"
              placeholder="请输入管理员密码"
              rules={[{ message: '请输入管理员密码!' }]}>
              <Input.Password />
            </Form.Item>
          </Form>
          <span style={{ color: 'red' }}>
            注意：添加新管理员必须输入当前帐号的密码进行确认！如果多次出现认证异常，请尝试重新登录!
          </span>
        </Modal>
      </div>
    </div>
  )
}
export default RegistrationForm
