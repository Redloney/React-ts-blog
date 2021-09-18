import React from 'react'

import { Spin, SpinProps } from 'antd'

import './Loading.scss'

const Loading = () => {
  const SpinProps: SpinProps = {
    className: 'spin-loading',
    tip: '加载中...',
    size: 'large',
  }

  return <Spin {...SpinProps}></Spin>
}

export default Loading
