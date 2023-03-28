import React,{useEffect,useState} from 'react' ; 
import { Table, Input, InputNumber,Button, Popconfirm, Form, Typography, Modal  } from 'antd';
import { MessageTool,MessageToolClear } from 'Components/MessageTool';
import {getLogout,getLogin,getUserDetail,getUserPassword,getUserUpdate } from 'Services/User'; 
import qs from 'querystring'
import './index.less'; 


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `请输入 ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};


function WhouseChange(props){ 
    // 用户信息 
    const [data, setData] = useState([]);
    // 是否显示表格信息
    const [isShowTable,setIsShowTable] = useState(false);
    // 表单信息
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
     // 是否编辑
    const isEditing = (record) => record.key === editingKey;
    // 弹层 是否显示
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [midRecord, setMidRecord] = useState(false);


    // 切换数据
    const transTitle = {
      'id':'用户ID',
      'nickname':'用户昵称',
      'email':'用户邮箱',
      'pswd':'登录密码',
      'pid':'用户等级',
   } 
   const reverseTransTitle = {
    '用户ID':'id',
    '用户昵称':'nickname',
    '用户邮箱':'email',
    '登录密码':'pswd',
    '用户等级':'pid',
   }
   // 隐藏字段
   const hiddenTitle = ['id','pid','nickname']
    // 列数据
   const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          width: '25%',
          editable: false,
        }, 
        {
          title: '数据',
          dataIndex: 'data',
          width: '40%',
          editable: true,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link style={{  marginRight: 8, }} >
                  <Button type="primary" danger onClick={() => save(record.key)}>保存</Button>
                </Typography.Link>
                <Popconfirm title="请确认是否取消保存?"  onConfirm={cancel}> 
                  <Button type="primary" danger>取消</Button>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} >
                <Button type="primary" danger onClick={() => edit(record)}>修改</Button>
              </Typography.Link>
            );
          },
        },
   ];

    // 监听页面加载 
    useEffect(()=>{
        getUserDetail().then(res=>{ 

            if(res.code == 1){ 
                let keys = Object.keys(res.data);
                let t_originData = []
                keys.forEach((item,index)=>{  
                  if(!hiddenTitle.includes(item)){ 
                    t_originData.push({
                        key: index, 
                        name: transTitle[item],
                        data:item  == "pswd" ?  '******' : res.data[item], 
                    });
                  }
                }) 
                setData(t_originData)  
            }
            setTimeout(()=>{
              setIsShowTable(true)
            },500)
        }).catch(err=>{
            MessageTool('获取用户详情出现异常！')
            console.log("出现异常！",err)
        })
    },[])

  
    // 编辑信息
    const edit = (record) => { 
      // 需要正确输入原密码，才允许修改
      setIsModalVisible(true)

      // 先保存进中间变量中
      setMidRecord(record)
    };
  
   // 取消编辑
    const cancel = () => {
      setEditingKey('');
    };
  
    // 保存信息
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];  
          newData.splice(index, 1, { ...item, ...row });

          let selectKey = reverseTransTitle[item.name];
          let newData1 = '';
          newData.forEach(subItem=>{
             if(subItem.name == item.name){
                newData1 = subItem.data
             }
          })
 
          if(item.name == '用户邮箱'){
              let userinfo = JSON.parse(localStorage.getItem("water_userinfo" )) 
              let params  = {
                   email:newData1,
                   nickname:userinfo.username,
                   pswd:userinfo.pswd,
                   pid:userinfo.data.pid
              }
              getUserUpdate(params).then(res=>{
                if(res && res.code == 1 || res.msg == '更改成功'){ 
                    MessageTool('修改邮箱成功!','success');
                    let new_userinfo  = {
                       ...userinfo,
                       data:{
                         ...userinfo.data,
                         email:newData1
                       }
                    }
                    localStorage.setItem("water_userinfo",JSON.stringify(new_userinfo)) 
                }else{ 
                    MessageTool('修改邮箱失败!','success');
                    return;
                }
              }).catch(err=>{ 
                 console.log('修改邮箱出现异常:', err);
                 MessageTool('修改邮箱出现异常!','error');
                 return;
              })
          }else if(item.name == '登录密码'){
              // 检测是否还存在*号
              if(newData1.includes('*')){ 
                MessageTool('修改密码失败!不允许出现*号','error');
                return
              }

              let userinfo = JSON.parse(localStorage.getItem("water_userinfo" ))
              let params  = {
                oldPassword:userinfo.password,
                newPwdOne:newData1,
                newPwdTwo:newData1,
              }  
              getUserPassword(params).then(res=>{ 
                if(res && res.code == 1 || res && res.msg == '更改成功'){ 
                  MessageTool('修改密码成功!请重新登录','success');
                  // 即将进行重新登录
                  getLogout();
                  setTimeout(()=>{
                      props.history.push("/login")
                  },1000)
                }else{ 
                  MessageTool('修改密码失败!','success');
                  return;
                }
              }).catch(err=>{ 
                  console.log('修改密码出现异常:', err);
                  MessageTool('修改密码出现异常!','error');
                  return;
              })
          }

          setData(newData);
          setEditingKey(''); 

        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('非法数据', errInfo);
        MessageTool('非法数据!','error');
      }
    };
  
    // 匹配列数据
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    // 确认输入原密码
    const handleOk = ()=>{ 
      let confirmPassword = document.querySelector("#password").value
      let water_userinfo = localStorage.getItem("water_userinfo")
      water_userinfo = water_userinfo != null ? JSON.parse(water_userinfo) : null
      let lastPassword = water_userinfo != null ? water_userinfo.password: '' 
      if(confirmPassword.length && lastPassword.length && confirmPassword == lastPassword){
        MessageTool("认证成功！允许修改",'success')
        // 验证输入的原密码和保存的进行匹配，如果相同，则允许修改
        continueEdit()
        // 关闭弹层
        setIsModalVisible(false)
      }else{
        MessageTool("输入的原密码错误！",'error') 
      } 
    }
    // 取消输入原密码
    const handleCancel = ()=>{
      setIsModalVisible(false)
    }
    // 继续执行编辑
    const continueEdit = ()=>{ 
      form.setFieldsValue({
        name: '',
        age: '',
        data: '',
        ...midRecord,
      });
      setEditingKey(midRecord.key); 
    }

    return (
      <div id='platform-body'  >  
        <div className='platform-inner-body box-scroll'>  
          <div id='user-div' className='theme-box'>
                  <h1 align="center" className='user-title theme-box-txt'>用户详情</h1> 
                  <Form form={form} component={false}>
                    <Table
                        components={{
                        body: {
                            cell: EditableCell,
                        },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                  </Form> 
                  
                  <Modal centered title="提示框" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                      <Form.Item  label="原密码"  name="password" placeholder="请输入原密码"
                          rules={[{  message: '请输入原密码!' }]} >
                          <Input.Password />
                      </Form.Item> 
                    </Form>
                    <span style={{'color':'red' }}>注意：修改前必须输入原密码进行确认！如果多次出现认证异常，请尝试重新登录!</span>
                  </Modal>
          </div>
        </div>
      </div>
    )
}

export default WhouseChange;