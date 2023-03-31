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
  },
  {
    title: '藻密度(cells/L)',
    dataIndex: 'algae_density',
  },
  {
    title: '氨氮(mg/L)',
    dataIndex: 'ammonia_nitrogen',
  },
  {
    title: '流域',
    dataIndex: 'basin',
  },
  {
    title: '叶绿素α(mg/L)',
    dataIndex: 'chlorophyll_alpha',
  },
  {
    title: '所在地市',
    dataIndex: 'city',
  },
  {
    title: '电导率(μS/cm)',
    dataIndex: 'conductivity',
  },
  {
    title: '溶解氧(mg/L)',
    dataIndex: 'dissolved_oxygen',
  },
  {
    title: 'pH(无量纲)',
    dataIndex: 'pH',
  },
  {
    title: '高锰酸盐指数(mg/L)',
    dataIndex: 'permanganate_index',
  },
  {
    title: '所属河流',
    dataIndex: 'river',
  },
  {
    title: '断面名称',
    dataIndex: 'section',
  },
  {
    title: '站点情况',
    dataIndex: 'station_status',
  },
  {
    title: '监测时间',
    dataIndex: 'time',
  },
  {
    title: '总氮(mg/L)',
    dataIndex: 'total_nitrogen',
  },
  {
    title: '总磷(mg/L)',
    dataIndex: 'total_phosphorus',
  },
  {
    title: '浊度(NTU)',
    dataIndex: 'turbidity',
  },
  {
    title: '水质类别',
    dataIndex: 'water_quality',
  },
  {
    title: '水温(℃)',
    dataIndex: 'water_temperature',
  },
]

function BriefIndex() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  function onChange(value) {
    //console.log(Number(value[1]))
    setLoading(true)
    getWaterQualityData(Number(value[1])).then((res) => {
      setData(res.tbody)
      setLoading(false)
    })
  }

  function onSearch(val) {
    setLoading(true)
    getWaterQualityData(val).then((res) => {
      setData(res.tbody)
      setLoading(false)
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
            scroll={{
              x: 900,
              y: 600,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BriefIndex
