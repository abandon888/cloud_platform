// 相关的路由文件 
import {lazy} from 'react'; 
import {cloudPlatformName} from 'Config'
 
// 从Config/index.js中引入常量
const projectName = cloudPlatformName;
  

const Home = lazy(()=>import("../Pages/Home"))
const Login = lazy(()=>import("../Pages/Login"))

// 云平台主页
const BriefIndex = lazy(()=>import("../Pages/Main/BriefIndex"))  
// 智慧系统    
const TowerVideo = lazy(()=>import("../Pages/Main/CategoryPage/TowerVideoSystem"))  
const WaterRain = lazy(()=>import("../Pages/Main/CategoryPage/WaterRainSystem"))  
const DamSecure = lazy(()=>import("../Pages/Main/CategoryPage/DamSecureSystem"))  
const DamWeather = lazy(()=>import("../Pages/Main/CategoryPage/DamWeatherSystem"))  
const WaterQuality = lazy(()=>import("../Pages/Main/CategoryPage/WaterQualitySystem"))  
const WaterSuply = lazy(()=>import("../Pages/Main/CategoryPage/WaterSuplySystem"))  
const MachineWork = lazy(()=>import("../Pages/Main/CategoryPage/MachineWorkSystem"))  
const PatrolBoat = lazy(()=>import("../Pages/Main/CategoryPage/PatrolBoatSystem"))   
// 系统页面(iframe)
const TowerVideoSystem = lazy(()=>import("../Pages/System/TowerVideoSystem"))  
const WaterRainSystem = lazy(()=>import("../Pages/System/WaterRainSystem"))  
const DamSecureSystem = lazy(()=>import("../Pages/System/DamSecureSystem"))  
const DamWeatherSystem = lazy(()=>import("../Pages/System/DamWeatherSystem"))  
const WaterQualitySystem = lazy(()=>import("../Pages/System/WaterQualitySystem"))  
const WaterSuplySystem = lazy(()=>import("../Pages/System/WaterSuplySystem"))  
const MachineWorkSystem = lazy(()=>import("../Pages/System/MachineWorkSystem"))  
const PatrolBoatSystem = lazy(()=>import("../Pages/System/PatrolBoatSystem"))  
// 用户管理
const AddUser = lazy(()=>import("../Pages/Main/ManagePage/AddUser"))  
const UserList = lazy(()=>import("../Pages/Main/ManagePage/UserList"))  
// 用户详情
const UserDetail = lazy(()=>import("../Pages/Main/PersonPage/UserDetail")) 
// 使用说明 
const UseHelp = lazy(()=>import("../Pages/Main/StatementPage/UseHelp")) 
const UseVersion = lazy(()=>import("../Pages/Main/StatementPage/UseVersion"))     

// 系统页面
export const systemMap = [ 
    // 系统页面
    {path:"/towervideosystem",component:TowerVideoSystem,exact:true,title:'B视联库面视频监控系统',icon:'/icon/favicon1.ico'}, 
    {path:"/waterrainsystem",component:WaterRainSystem,exact:true,title:'水雨情自动测报系统',icon:'/icon/favicon2.ico'}, 
    {path:"/damsecuresystem",component:DamSecureSystem,exact:true,title:'大坝安全监测系统',icon:'/icon/favicon2.ico'}, 
    {path:"/damweathersystem",component:DamWeatherSystem,exact:true,title:'水库坝顶气象监测系统',icon:'/icon/favicon2.ico'}, 
    {path:"/waterqualitysystem",component:WaterQualitySystem,exact:true,title:'水质自动监测系统',icon:'/icon/favicon2.ico'}, 
    {path:"/watersuplysystem",component:WaterSuplySystem,exact:true,title:'水库供水状况监测系统',icon:'/icon/favicon2.ico'}, 
    {path:"/machineworksystem",component:MachineWorkSystem,exact:true,title:'水库机电设备工作监测系统',icon:'/icon/favicon2.ico'}, 
    {path:"/patrolboatsystem",component:PatrolBoatSystem,exact:true,title:'水库无人智能巡逻艇系统',icon:'/icon/favicon2.ico'}, 

]

// 主路由规则
export const routerMap = [
    {path:"/",component:Login,exact:true,title:projectName+'用户登录'}, 
    {path:"/login",component:Login,exact:false,title:projectName+'用户登录'}, 
    {path:"/home",component:Home,exact:false,title:projectName+'管理面板'},  

    ...systemMap
]



// 子路由规则
export const subRouterMap = [ 
    // 1.云平台简介
    {path:"/home/index",component:BriefIndex,exact:true,title:projectName+'管理面板'}, 
 
    // 2.智慧系统
    {path:"/home/category/towervideo",component:TowerVideo,exact:true,title:projectName+'B视联库面视频监控系统__智能系统简介'}, 
    {path:"/home/category/waterrain",component:WaterRain,exact:true,title:projectName+'水雨情自动测报系统__智能系统简介'}, 
    {path:"/home/category/damsecure",component:DamSecure,exact:true,title:projectName+'大坝安全监测系统__智能系统简介'}, 
    {path:"/home/category/damweather",component:DamWeather,exact:true,title:projectName+'水库坝顶气象监测系统__智能系统简介'}, 
    {path:"/home/category/waterquality",component:WaterQuality,exact:true,title:projectName+'水质自动监测系统__智能系统简介'}, 
    {path:"/home/category/watersuply",component:WaterSuply,exact:true,title:projectName+'水库供水状况监测系统__智能系统简介'}, 
    {path:"/home/category/machinework",component:MachineWork,exact:true,title:projectName+'水库机电设备工作监测系统__智能系统简介'}, 
    {path:"/home/category/patrolboat",component:PatrolBoat,exact:true,title:projectName+'水库无人智能巡逻艇系统__智能系统简介'}, 

    // 3.个人信息
    {path:"/home/person/userdetail",component:UserDetail,exact:false,title:projectName+'用户个人详情'}, 

    // 4.用户管理 
    {path:"/home/manage/userlist",component:UserList,exact:false,title:projectName+'查看用户列表'}, 
    {path:"/home/manage/adduser",component:AddUser,exact:false,title:projectName+'添加新用户'}, 
 
    // 5.说明信息 
    {path:"/home/statement/usehelp",component:UseHelp,exact:false,title:projectName+'使用说明'}, 
    {path:"/home/statement/useversion",component:UseVersion,exact:false,title:projectName+'版本更新'}, 

]