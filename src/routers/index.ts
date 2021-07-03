import { lazy, LazyExoticComponent } from 'react'
import { RouteConfig } from 'react-router-config'

import Home from '../container/Home/Home'

// export interface RouteType extends RouteConfig {
//   pathname: string;
//   component: LazyExoticComponent<any>;
//   exact: boolean;
//   title?: string;
//   icon?: string;
//   children?: RouteType[];
// }

const Cv = lazy(() => import('../container/Cv'))
// const Blog  = lazy(() => import( '../container/Blog'))
const Comment = lazy(() => import('../container/Comment'))
const Detail = lazy(() => import('../container/Blog/Detail'))
const NoMatch = lazy(() => import('../container/NoMatch'))

const routers = [
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
  // {
  //   path: '/Blog',
  //   exact: false,
  //   component: Blog,
  // },
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


