import React from 'react';

import { Link } from 'react-router-dom'

import './index.scss'

interface Props {
  active: number,
  links: Array<linkTypes>
}

interface linkTypes {
  title: string,
  path: string
}

const Navbar = (Props: Props) => {
  const { links } = Props
  return (
    <nav className='nav'>
      {
        links.map(({ title, path }, index) => {
          return <Link key={index} className='nav-link' to={path}>{title}</Link>
        })
      }
    </nav>
  )
}

export default Navbar;
