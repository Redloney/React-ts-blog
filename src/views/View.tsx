import React, { Suspense } from 'react'

import { Route, Switch } from 'react-router-dom'
import Loading from '../component/Loading'

import routers from '../routers'
import './view.scss'

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
              />
            )
          })}
        </Switch>
      </Suspense>
    </div>
  )
}

export default View
