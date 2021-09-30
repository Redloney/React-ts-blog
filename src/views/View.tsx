import React, { Suspense, useEffect } from 'react'

import { Route, Switch } from 'react-router-dom'
import Loading from '../component/Loading'
import { notification } from 'antd'
import routers from '../routers'
import './view.scss'

import MusicPlayer from '../component/music/music'
import GoTop from '../component/GoTop'

const View = () => {
  useEffect(() => {
    notification.open({
      type: 'info',
      message: '你好啊 陌生人！ ',
      placement: 'topLeft',
      description: '博客还处于测试阶段，欢迎给我提交 issue',
    })
  }, [])

  return (
    <div className="view">
      <Suspense fallback={<Loading />}>
        <Switch>
          {routers.map(({ path, exact, component }, index) => {
            return (
              <Route
                key={index}
                path={path}
                exact={exact}
                component={component}
              ></Route>
            )
          })}
        </Switch>
      </Suspense>
      <MusicPlayer />
      <GoTop />
    </div>
  )
}

export default View
