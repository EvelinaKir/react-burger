import { Route, Redirect, RouteProps } from "react-router-dom";
import React, {FunctionComponent} from "react";
import { useSelector } from '../../services/types/hooks'
import Spiner from "../Spiner/Spiner";

const LoggedProtectedResetRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
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
