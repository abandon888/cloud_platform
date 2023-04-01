import React, { useEffect, useState, useRef, Fragment } from 'react'
import { MessageTool } from 'Components/MessageTool'
import { waterQualitySystemDomain } from 'Config'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Cascader,
  Table,
  Divider,
} from 'antd'
//引入service中的axios模块
import { getWaterQualityData } from '../../../../Services/waterQuality'

// 引入时间模块
import moment from 'moment'

import './index.css'
import options from './options/options'

const { Search } = Input
const columns = [
  {
    title: '省份',
    dataIndex: 'province',
    width: 100,
    fixed: 'left',
  },
  {
    title: '藻密度(cells/L)',
    dataIndex: 'algae_density',
    width: 150,
  },
  {
    title: '氨氮(mg/L)',
    dataIndex: 'ammonia_nitrogen',
    width: 150,
  },
  {
    title: '流域',
    dataIndex: 'basin',
    width: 150,
    //fixed: 'left',
  },
  {
    title: '叶绿素α(mg/L)',
    dataIndex: 'chlorophyll_alpha',
    with: 150,
  },
  {
    title: '所在地市',
    dataIndex: 'city',
    width: 150,
  },
  {
    title: '电导率(μS/cm)',
    dataIndex: 'conductivity',
    width: 150,
  },
  {
    title: '溶解氧(mg/L)',
    dataIndex: 'dissolved_oxygen',
    width: 150,
  },
  {
    title: 'pH(无量纲)',
    dataIndex: 'pH',
    width: 150,
  },
  {
    title: '高锰酸盐指数(mg/L)',
    dataIndex: 'permanganate_index',
    width: 150,
  },
  {
    title: '所属河流',
    dataIndex: 'river',
    width: 150,
  },
  {
    title: '断面名称',
    dataIndex: 'section',
    width: 150,
  },
  {
    title: '站点情况',
    dataIndex: 'station_status',
    width: 150,
  },
  {
    title: '监测时间',
    dataIndex: 'time',
    width: 150,
  },
  {
    title: '总氮(mg/L)',
    dataIndex: 'total_nitrogen',
    width: 150,
  },
  {
    title:'总磷(mg/L)',
    dataIndex: 'total_phosphorus',
    width: 150,
  },
  {
    title: '浊度(NTU)',
    dataIndex: 'turbidity',
    width: 150,
  },
  {
    title: '水质类别',
    dataIndex: 'water_quality',
    width: 150,
  },
  {
    title: '水温(℃)',
    dataIndex: 'water_temperature',
    width: 150,
  },
];

function BriefIndex() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

function onChange(value) {
  console.log(value)
  if (!value) {
    return
  }
  setLoading(true)
  getWaterQualityData(Number(value[1]))
    .then((res) => {
      setData(res.tbody)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error)
      setLoading(false)
      setData([])
      MessageTool('数据获取失败', 'error')
    })
}

function onSearch(val) {
  setLoading(true)
  getWaterQualityData(val)
    .then((res) => {
      setData(res.tbody)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error)
      setLoading(false)
      setData([])
      MessageTool('数据获取失败', 'error')
    })
}

  useEffect(() => {
    if (loading) {
      MessageTool('加载中', 'loading')
    }
  }, [loading])

  return (
    <div id="platform-body">
      <div className="body">
        <div className="top">
          <div style={{ width: '80%', height: '80%' }} className="topLeft">
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
          <div className="topRight"></div>
        </div>

        <div className="content theme-box">
          <Cascader
            options={options}
            onChange={onChange}
            size="large"
            className="antdCas"
            placement="bottomLeft"
            style={{ width: '8vw' }}></Cascader>
          <Search
            placeholder="请输入断面名称"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{ width: '30vw' }}
            className="antdSearch"
          />
        </div>
        <div>
          <Divider />

          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            style={{width: '1000px'}}
            scroll={{
              x: 400,
              y: 400,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BriefIndex
