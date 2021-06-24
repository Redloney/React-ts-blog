import React from 'react'

import './index.scss'

import { Link } from 'react-router-dom'

import img from './preview.jpg'

import { Avatar } from 'antd'

import Navbar from './Navbar'

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

  return (
    <header className="header">
      <div className="wrapper">
        <div className="avatar">
          <Link to="/">
            <Avatar src={img} size={120} />
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
