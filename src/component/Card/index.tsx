import React, { useEffect, useState } from 'react'
import { GetRandomAvatar } from '../../api/user'

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
  const { id, title, tag, createAt, author } = props

  const [imgUrl, setimgUrl] = useState('')

  useEffect(() => {
    getImgUrl()
  }, [])

  const getImgUrl = async () => {
    const { imgurl } = (await GetRandomAvatar('mail')) as any
    setimgUrl(imgurl)
  }

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
