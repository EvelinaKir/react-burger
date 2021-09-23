import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Spiner from "../Spiner/Spiner";

function UnloggedProtectedRoute({ children, ...rest }) {
  const { logged, isLoading, loadingUser, loadingRefresh, needToRefresh } =
    useSelector((state) => state.userInfo);

  return (
    <>
      {isLoading && <Spiner />}
      {needToRefresh && <Spiner />}
      {!isLoading && !loadingUser && !loadingRefresh && (
        <Route
          {...rest}
          render={({location}) => (logged ? children : <Redirect to={{pathname: '/login', state: {from: location}}} />)}
        />
      )}
    </>
  );
}

export default UnloggedProtectedRoute;
