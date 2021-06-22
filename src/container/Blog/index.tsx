import React from 'react'
import './blog.scss'

import { Home } from './Home'

const Blog = () => {
  return (
    <div className="blog">
      <ul className="tags">
        <li className="tag">主页</li>
        <li className="tag">标签</li>
        <li className="tag">归档</li>
        <li className="tag">生活</li>
        <li className="tag">关于</li>
      </ul>
      <Home />
    </div>
  )
}

export default Blog
