import React, { useEffect, useState } from 'react'

import './index.scss'

import { Link } from 'react-router-dom'

// import img from './preview.jpg'

import { Avatar } from 'antd'

import Navbar from './Navbar'
import { GetRandomAvatar } from '../../api/user'

const Header = () => {
  const links = [
    {
      title: '简历',
      path: '/Cv',
    },
    {
      title: '博客',
      path: '/Blog',
    },
    {
      title: '留言',
      path: '/Comment',
    },
  ]

  const [avatar, setAvatar] = useState(
    'https://tva2.sinaimg.cn/large/9bd9b167ly1fzjwjepj2kj20b40b4aak.jpg'
  )

  useEffect(() => {
    GetRandomAvatar('female').then((ret: any) => {
      setAvatar(ret.imgurl)
    })
  }, [])

  return (
    <header className="header">
      <div className="wrapper">
        <div className="avatar">
          <Link to="/">
            <Avatar src={avatar} size={120} />
          </Link>
        </div>
        <div className="nickname">
          <Link to="/">
            <h1>Redloney</h1>
          </Link>
        </div>
        <div className="faithful">一面选择放弃,一面劝自己走到底！</div>
        <Navbar links={links} active={0} />
      </div>
    </header>
  )
}

export default Header
