import React from 'react'

import { Image } from 'antd'

import './index.scss'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
interface Props {
  arts: Array<any>
}

export default (props: Props) => {
  const ItemRender = (items: Array<any>) => {
    return items.map((item: any, index: number) => {
      item.updatedAt = dayjs(item.updatedAt).format('YYYY年MM月DD日')
      return (
        <div
          key={item._id}
          className={`timeline-item`}
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
        >
          <div className="line"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-date">2021</div>
          <div
            className="timeline-content"
            data-aos="fade-up"
            data-aos-duration={1150 + index * 50}
            data-aos-easing="ease-in-out-back"
          >
            <div className="cover">
              <Image
                slot="error"
                preview={false}
                loading="lazy"
                src={item.cover}
              />
            </div>
            <div className="context">
              <div className="art-info">
                {/* <span className="tag">
                  <i className="iconfont iconbookmark"></i>
                  {item.classify.label}
                </span> */}
                <Link to={`/detail/${item._id}`} className="subtitle">
                  {item.title}
                </Link>
                <span className="desc" title={item.desc}>
                  {item.desc}
                </span>
                <div className="extra">
                  <span className="date">{item.updatedAt}</span>
                  <span className="view">{item.watchNum} 阅读</span>
                  <span className="comm">0 评论</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className="timeline">{ItemRender(props.arts)}</div>
    </>
  )
}
