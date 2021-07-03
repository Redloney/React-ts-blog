import React from 'react'

import { Spin, SpinProps } from 'antd'

import './Loading.scss'

const Loading = () => {
  const SpinProps: SpinProps = {
    className: 'spin-loading',
    tip: '加载中...',
    size: 'large',
  }

  return (
    // <div
    //   style={{ backgroundColor: '#eee', textAlign: 'center', padding: '100px' }}
    // >
    //   loading
    // </div>
    <Spin {...SpinProps}></Spin>
  )
}

export default Loading
