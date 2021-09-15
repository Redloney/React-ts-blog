import React, { ReactNode } from 'react'

import { Image, Tooltip } from 'antd'

// src="https://p4.qhimg.com/bdr/__100/t0169401bba7e837b9c.jpg"

import './index.scss'
import { Link } from 'react-router-dom'

export default () => {
  const ItemRender = (items: Array<any>) => {
    return items.map((item: any, index: number) => {
      return (
        <div key={item._id} className={`timeline-item`}>
          <div className="line"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-date">2021</div>
          <div
            className="timeline-content"
            data-aos="fade-up"
            data-aos-duration={850 + index * 30}
            data-aos-easing="ease-in-out-back"
          >
            <div className="cover">
              <Image
                preview={false}
                loading="lazy"
                src={item.cover}
                alt="cover"
              />
            </div>
            <div className="context">
              <div className="art-info">
                <span className="tag">{item.tag}</span>
                <span className="author">{item.author}</span>
              </div>
              <Link to={`/detail/${item._id}`} className="subtitle">
                {item.title}
              </Link>
              <Tooltip
                color="#2db7f590"
                arrowPointAtCenter={true}
                overlay={item.desc}
              >
                <a
                  className="desc"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.desc}
                </a>
              </Tooltip>
            </div>
            <span className="date">{item.updatedAt}</span>
            <span className="more">查看更多</span>
          </div>
        </div>
      )
    })
  }

  const obj = [
    {
      _id: '654a6asfas654f6a',
      tag: '随笔',
      author: '季筱筱',
      cover:
        'https://pica.zhimg.com/80/v2-5f28f704757a7b2fbc5b9700209a593e_720w.jpg?source=1940ef5c',
      title: '一篇日记（一）',
      desc: '很久没写日记了，平时也没什么时间整理一下自己的思绪，趁着放假写一篇日记，记录一下自己的趣事~',
      updatedAt: '2021.9.15',
      createdAt: '2021.9.15',
    },
  ]

  return (
    <>
      <div className="timeline">{ItemRender(obj)}</div>
    </>
  )
}
