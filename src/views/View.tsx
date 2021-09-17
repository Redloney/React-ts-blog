import React, { Suspense } from 'react'

import { Route, Switch } from 'react-router-dom'
import Loading from '../component/Loading'

import routers from '../routers'
import './view.scss'

import MusicPlayer from '../component/music/music'

const View = () => {
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
    </div>
  )
}

export default View
