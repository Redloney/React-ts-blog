import React from 'react'
import { Row, Col } from 'antd'

import './nomatch.scss'

import svg from './none.svg'

const NoMatch = () => {
  return (
    <Row gutter={16} className="rowStyle">
      <Col span={14}>
        <img width="100%" src={svg} alt="none" />
      </Col>
      <Col span={10}>
        <div className="statusStyle">404</div>
        <div className="smallStyle">抱歉，你访问的页面不存在</div>
      </Col>
    </Row>
  )
}

export default NoMatch
