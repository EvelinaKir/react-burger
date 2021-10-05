import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from  '../../services/types/hooks'
import Spiner from "../Spiner/Spiner";
import React, {FunctionComponent} from "react";

const UnloggedProtectedRoute:FunctionComponent<RouteProps> = ({ children, ...rest }) => {
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
