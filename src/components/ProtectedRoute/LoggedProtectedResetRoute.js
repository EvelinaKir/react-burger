import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Spiner from "../Spiner/Spiner";

function LoggedProtectedResetRoute({ children, ...rest }) {
  const logged = useSelector((state) => state.userInfo.logged);
  const { isLoading, sent } = useSelector((state) => state.forgotRequest);

  return (
    <>
      {isLoading && <Spiner />}
      {!isLoading && (
        <Route
          {...rest}
          render={() => (!logged && sent ? children : <Redirect to="/" />)}
        />
      )}
    </>
  );
}

export default LoggedProtectedResetRoute;
