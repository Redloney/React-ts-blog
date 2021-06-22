import { RouteConfig } from 'react-router-config'

import Home from '../container/Home/Home'

import Cv from '../container/Cv'
import Blog from '../container/Blog'
import Comment from '../container/Comment'
import Detail from '../container/Blog/Detail'

const routers: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/Cv',
    component: Cv,
  },
  {
    path: '/Blog',
    component: Blog,
  },
  {
    path: '/Comment',
    component: Comment,
  },
  {
    path: '/Detail',
    component: Detail,
  },
]

// map routers
export const mapRouters = () => {
  routers.map((route) => {
    console.log(route)
  })
}

export default routers


