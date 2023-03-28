import React,{useEffect,useState,useRef,useCallback} from 'react' ;
import { DatePicker, Button,Popconfirm ,Table } from 'antd';
import moment from 'moment' 
import { getUserMsg,delUserMsg } from 'Services/User';
import { MessageTool } from 'Components/MessageTool';   
 
import './index.less'; 
  

function DayWaterForm(){    
    // 默认后缀
    const afterFix =  ':00:00'
    // 初始化日期
    const [searchTxtObj,setSearchTxtObj] = useState({
        time:moment().format("YYYY-MM-DD HH") + afterFix
    })  
    // 用户列表 
    const [userlist,setUserlist] = useState([])

    // 加载中
    const [isLoading,setIsLoading] = useState(false)
    // 表格表头，和行列数据。
    const [columns,setColumns] = useState([])  
    const [dataSource,setDataSource] = useState([])  
    // 行列表格
    const [tNickname,setTNickname] = useState(null)
    const [tRecord,settRecord] = useState(null) 

 
    // 初始化加载
    useEffect(()=>{
        try{  
            // 先获取数据
            onSearchData(); 
            // 再渲染页面
             // 遍历列表头数据  
            setColumns([
                {
                    title:'序号',
                    dataIndex:'order',
                    key:'order',
                    width:100
                },
                {
                    title:'用户昵称',
                    dataIndex:'nickname',
                    key:'nickname',
                    width:180
                },
                {
                    title:'用户邮箱',
                    dataIndex:'email',
                    key:'email',
                    width:180
                },
                {
                    title:'用户职位',
                    dataIndex:'pos',
                    key:'pos',
                    width:180
                }, 
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width:180,
                    align:'center',
                    render: (_, record) =>  (
                        <Popconfirm title="确认是否删除该用户?" onConfirm={()=>handleDelete(record.nickname,record)}>
                        <Button type="primary" danger>删除</Button>
                        {/* <a >删除</a> */}
                        </Popconfirm>)
                },
            ]) 
        }catch(err){
            console.log("出现异常",err)
            MessageTool('系统出现异常！请刷新重试','error')
        } 
    },[])

    // 监听数据加载完成后再初始化(table可操作表格的限制)
    useEffect(()=>{ 
        let nickname = tNickname
        let record = tRecord

        let isOk = false; 
        let pre_dataSource = userlist
        const t_dataSource = []
        console.log("数据是",pre_dataSource)
        pre_dataSource.forEach((item) => {
           if(item.nickname == nickname){
                if(item.pos == '管理员'){ 
                    MessageTool("不能删除管理员",'error')
                    return
                }else{ 
                    const params = {
                        nickname:nickname
                    } 
                    isOk = true;
                    console.log("即将删除数据")
                    delUserMsg(params).then(res=>{ 
                        if(res && res.code == 1 || res.msg == '删除成功'){ 
                            MessageTool('删除用户成功!','success');
                        }else{  
                            MessageTool('删除新用户失败!','success'); 
                        }
                    }).catch(err=>{  
                        console.log('删除用户出现异常:', err);
                        MessageTool('删除用户出现异常!','error'); 
                    })
                }
           }else{
              t_dataSource.push(item);
           }
        });  
        if(isOk){ 
            setDataSource(t_dataSource)  
            
            setUserlist(t_dataSource)
        }
    },[tRecord,tNickname])

    // 删除用户 
    const handleDelete = (nickname,record) => {  
        console.log("当前是",record)
        // 验证当前删除的用户是否是本身，或者最后一个管理员
         if(verifyLastAdmin(record)){
             MessageTool("不能删除当前账号管理员",'error')
             return
         } 
         // 在 回调里面，不能获取数据，只有写入数据。
         // 有点像redux
         setTNickname(nickname)
         settRecord(record)
    };

    // 验证当前删除的用户是否是本身，或者最后一个管理员
    const verifyLastAdmin = (record)=>{ 
        if(record.pos != '管理员') return false;
        // 用户信息(当前用户就是管理员)
        const userinfo = JSON.parse(localStorage.getItem("water_userinfo")) 
        if(record.email == userinfo.data.email && record.nickname == userinfo.data.nickname 
            && (userinfo.data.pid == '0' || userinfo.data.pid == 0)){
                return true;
            }
    } 

    // 获取远程数据
    const onSearchData = ()=>{
        getUserMsg().then(res=>{  
            // console.log("getUserMsg返回的数据是",res,res.data)
            setIsLoading(false)

            if(!res || !res.data){
                MessageTool("请求数据失败！请重试")
                return
            }

            let userList = res.data && typeof(res.data) == 'object' ? res.data : [] 
            let t_dataSource = []
            userList.forEach((item,index)=>{
                t_dataSource.push({  
                    order:index + 1, 
                    nickname:item.nickname ? item.nickname : '-', 
                    email:item.email ? item.email : '-', 
                    pos:item.pid == '0' || item.pid == 0 ? '管理员' : '普通用户',
                    // phone:item.phone ? item.phone : '-',  
                })
            }) 
            setDataSource(t_dataSource) 
            setUserlist(t_dataSource)
        }).catch(err=>{ 
            setIsLoading(false)
            console.log("请求超时！请重试",err)
            MessageTool('请求超时！请重试','error')
        }) 
    }
 

    return (
        <div id='platform-body'  >  
           <div className='platform-inner-body box-scroll'>  
                <div id='list-div' className='theme-box' > 
                    <h1 align="center" className='user-title theme-box-txt'>用户详情</h1>
                    <Table dataSource={dataSource} columns={ columns} loading={isLoading}   />  
                </div>
            </div>
        </div>
    )
}

export default DayWaterForm;