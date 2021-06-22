import React from 'react'

import Editor from '../../component/Editor'
import Comments from '../../component/Comments'

import './comment.scss'

const Comment = () => {
  return (
    <div className="comment">
      <Editor />
      <Comments />
    </div>
  )
}

export default Comment
