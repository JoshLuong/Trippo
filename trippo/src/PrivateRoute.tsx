// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { FC, useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
  component: React.ElementType;
  path?: string | string[];
  exact?: boolean;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        window.localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute