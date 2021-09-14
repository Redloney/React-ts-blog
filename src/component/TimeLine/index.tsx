import React from 'react'

import { Image, Tooltip } from 'antd'

import './index.scss'

export default () => {
  return (
    <>
      <div className="timeline">
        <div className="timeline-item">
          <div className="line"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-date">2001</div>
          <div className="timeline-content">
            <div className="cover">
              <Image
                preview={false}
                loading="lazy"
                src="https://p4.qhimg.com/bdr/__100/t0169401bba7e837b9c.jpg"
                alt="cover"
              />
            </div>
            <div className="context">
              <span className="tag">随笔</span>
              <span className="date">2021.9.14</span>
              <span className="author">季筱筱</span>
              <h2 className="subtitle">我的第一篇日记</h2>
              <Tooltip
                arrowPointAtCenter={true}
                color="#2db7f5"
                overlay="很久没写日记了，平时也没什么时间整理一下自己的思绪，趁着放假写一篇日记，记录一下自己的趣事~"
              >
                <a
                  className="desc"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  很久没写日记了，平时也没什么时间整理一下自己的思绪，趁着放假写一篇日记，记录一下自己的趣事~
                </a>
              </Tooltip>
            </div>
            <span className="more">查看更多</span>
          </div>
        </div>
      </div>
    </>
  )
}
