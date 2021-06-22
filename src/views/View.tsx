import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routers from '../routers'
import './view.scss'

const View = () => {
  return (
    <div className="view">
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
    </div>
  );
}

export default View;
