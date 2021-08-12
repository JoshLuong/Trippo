// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from 'app/store';
import Placeholder from 'components/placeholder/Placeholder';

interface Props {
  component: React.ElementType;
  path?: string | string[];
  exact?: boolean;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const user = useAppSelector((state) => state.user.value);
  const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);

  if (!isAppLoaded) {
    return <Placeholder />
  }
  return (
    <Route
      {...rest}
      render={props => {
        if (user?.isLoggedIn) {
          return <Component {...props} />;
        }

        if (!isAppLoaded) {
          return <Placeholder />;
        }

        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  )
}

export default PrivateRoute