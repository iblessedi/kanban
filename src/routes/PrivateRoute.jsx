import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import config from "../auth/auth_config.json";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  if (!isLoading) {
    getAccessTokenSilently({
      audience: config.audience,
    }).then((result => {
      localStorage.setItem('token', result);
    }));
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoading ? (<>Loading...</>) :
          (isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
          ))
      }
    />
  )
}

export default PrivateRoute