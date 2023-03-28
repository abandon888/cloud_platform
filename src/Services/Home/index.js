import { request } from "Services/request";
import {cloudPlatformDomain} from 'Config'
import qs from 'querystring'; 

// 处理params函数
const operateParams = (params)=>{
    const paramsList = Object.keys(params);
    if(paramsList && paramsList.length){
         return '?'+qs.stringify(params)
    }
    return ''
} 

// 水库官方网站域名
export const officialDomain = 'http://sky.pingxiang.gov.cn'
// 水库官方网站静态数据1(如果访问失败，则使用下面静态数据)
export const officialDataList1 = [
    '<a href="http://sky.pingxiang.gov.cn/art/2022/7/4/art_435_1129424.html" target="_blank" title="庆祝“七一”活动 ，汲取奋进力量——市山口岩水利枢纽管理中心开展“我们的节日•建党节”系列活动">庆祝“七一”活动，汲取奋进力量——市山口岩水...</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/7/1/art_435_1129242.html" target="_blank" title="精心组织铸就生 产安全——市山口岩水利枢纽管理中心“安全生产月”活动纪实">精心组织铸就生产安全——市山口岩水利枢纽管理...</a>',        
    '<a href="http://sky.pingxiang.gov.cn/art/2022/7/1/art_435_1129192.html" target="_blank" title="中国科学院水生 生物研究所到山口岩水库调研">中国科学院水生生物研究所到山口岩水库调研</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/30/art_435_1128423.html" target="_blank" title="萍乡市山口岩水利枢纽管理中心统筹高位推进，强化信息报送">萍乡市山口岩水利枢纽管理中心统筹高位推进，强...</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/21/art_435_1126731.html" target="_blank" title="供水管线标志桩更换">供水管线标志桩更换</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/15/art_435_1125203.html" target="_blank" title="排隐患、保安全">排隐患、保安全</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/8/art_435_1124180.html" target="_blank" title="能源调度科加强 供水管道巡查应对供水突发事件">能源调度科加强供水管道巡查应对供水突发事件</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/2/art_435_1123456.html" target="_blank" title="关爱留守儿童 浓情温暖民心">关爱留守儿童 浓情温暖民心</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/6/15/art_444_1125206.html" target="_blank" title="排隐患、保安全">排隐患、保安全</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/5/11/art_444_1118573.html" target="_blank" title="市纪委市监委驻市水利局纪检组到中心检查疫情防控及防汛工作">市纪委市监委驻市水利局纪检组到中心检查疫情防...</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2022/2/24/art_444_1100393.html" target="_blank" title="山口岩水库组织开展2022年汛前防洪安全大检查">山口岩水库组织开展2022年汛前防洪安全大检...</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2021/3/11/art_444_874527.html" target="_blank" title="崔传鹏副市长到 山口岩水库督导防汛安全准备工作">崔传鹏副市长到山口岩水库督导防汛安全准备工作</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2020/8/20/art_444_598599.html" target="_blank" title="省防指应急综合 保障组召开工作小结会">省防指应急综合保障组召开工作小结会</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2020/5/7/art_444_598598.html" target="_blank" title="山口岩水库2020年防汛工作情况">山口岩水库2020年防汛工作情况</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2019/7/16/art_444_598597.html" target="_blank" title="山口岩水库2019 年7月7-9日汛情简报">山口岩水库2019年7月7-9日汛情简报</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2019/6/25/art_444_598596.html" target="_blank" title="李江河：高度警 惕 科学应对 确保群众生命财产安全">李江河：高度警惕 科学应对 确保群众生命财产...</a>'
  ]
// 水库官方网站静态数据2
export const officialDataList2 =  [
    '<a href="http://sky.pingxiang.gov.cn/art/2022/5/26/art_416_1121707.html" target="_blank" title="黎春源调研湘赣边协同立法及山口岩水库饮用水水源保护立法工作">黎春源调研湘赣边协同立法及山口岩水库饮用水水源保护立法工作</a>',   
    '<a href="http://sky.pingxiang.gov.cn/art/2022/4/24/art_416_1115487.html" target="_blank" title="芦溪县、山口岩水利枢纽管理中心组建联合执法队伍开展水库禁钓禁捕禁泳专项整治">芦溪县、山口岩水利枢纽管理中心组建联合执法队伍开展 水库禁钓禁捕禁泳...</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2021/2/7/art_416_868178.html" target="_blank" title="江西省萍乡市山口岩水利枢纽工程突发环境事件应急预案公示">江西省萍乡市山口岩水利枢纽工程突发环境事件应急预案公示</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2020/11/20/art_416_752945.html" target="_blank" title="开展主题党日活动，共促支部“三化”建设">开展主题党日活动，共促支部“三化”建设</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2019/8/26/art_416_598540.html" target="_blank" title="山口岩水库积极 组织人员打捞垃圾">山口岩水库积极组织人员打捞垃圾</a>',
    '<a href="http://sky.pingxiang.gov.cn/art/2019/8/26/art_416_598539.html" target="_blank" title="萍乡市河湖水库 生态环境保护专业委员会第一次会议召开">萍乡市河湖水库生态环境保护专业委员会第一次会议召开</a>'
  ] 



// 获取网页数据（需要nginx反向代理,指向当前站点的 /official路径下）
export const getOfficialData = ( )=>{
    return request({
        url:'/official',
        method:"get", 
    },cloudPlatformDomain) 
} 
