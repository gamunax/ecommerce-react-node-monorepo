import React, { Component } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from './index';

interface PrivateRouteProps extends RouteProps {
  component?: any;
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated()?.user?.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default AdminRoute;
