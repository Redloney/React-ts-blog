import { RouteConfig } from 'react-router-config'

import Home from '../container/Home/Home'

import Cv from '../container/Cv'
import Blog from '../container/Blog'
import Comment from '../container/Comment'
import Detail from '../container/Blog/Detail'
import NoMatch from '../container/NoMatch'

const routers: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/Cv',
    exact: false,
    component: Cv,
  },
  {
    path: '/Blog',
    exact: false,
    component: Blog,
  },
  {
    path: '/Comment',
    exact: false,
    component: Comment,
  },
  {
    path: '/Detail',
    exact: false,
    component: Detail,
  },
  {
    path: '',
    exact: false,
    component: NoMatch
  }
]

// map routers
export const mapRouters = () => {
  routers.map((route) => {
    console.log(route)
  })
}

export default routers


