import { Route, Redirect, RouteProps } from "react-router-dom";
import React, { FunctionComponent } from "react";
import { useSelector } from '../../services/types/hooks'
import { useLocation } from "react-router-dom";


const LoggedProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {

  const { logged } = useSelector((state) => state.userInfo);
  const { state } = useLocation<{ from: { pathname: string } }>();

  return (
    <Route
      {...rest}
      render={() => (!logged ? children : <Redirect to={state ? state.from : '/'} />)}
    />
  );
}

export default LoggedProtectedRoute;
