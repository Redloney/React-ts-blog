import React from 'react'
import './blog.scss'

import { Card } from '../../component/Card'

// import { Home } from './Home'

import img from '../../assets/image/4.png'

const Blog = () => {
  const obj = {
    id: 'a2',
    imgUrl: img,
    title: '如何提升技术等级',
    tag: 'IT技术',
    createAt: '2021.6.23',
    author: 'redlonely',
  }

  return (
    <div className="blog">
      {/* <ul className="tags">
        <li className="tag">主页</li>
        <li className="tag">标签</li>
        <li className="tag">归档</li>
        <li className="tag">生活</li>
        <li className="tag">关于</li>
      </ul>
      <Home /> */}
      <Card {...obj} />
      <Card {...obj} />
      <Card {...obj} />
      <Card {...obj} />
      <Card {...obj} />
      <Card {...obj} />
    </div>
  )
}

export default Blog
