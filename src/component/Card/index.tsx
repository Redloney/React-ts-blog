import React from 'react'

interface IProps {
  id: string
  imgUrl: string
  title: string
  tag: string
  createAt: string
  author: string
}

import './Card.scss'

export const Card = (props: IProps) => {
  const { id, imgUrl, title, tag, createAt, author } = props

  return (
    <div className="card">
      <a className="link" href={'/' + id}>
        <img src={imgUrl} className="picture" />
      </a>
      <div className="discription">
        <h2 className="tag">{tag}</h2>
        <h3 className="title">{title}</h3>
        <p className="extra">
          {createAt} / {author}
        </p>
      </div>
    </div>
  )
}
