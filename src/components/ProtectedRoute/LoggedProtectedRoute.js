import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function LoggedProtectedRoute({ children, ...rest }) {
  const logged = useSelector((state) => state.userInfo.logged);
  const {state} = useLocation();
 
  return (
    <Route
      {...rest}
      render={() => (!logged ? children : <Redirect to={state ? state.from : '/'}/>)}
    />
  );
}

export default LoggedProtectedRoute;
