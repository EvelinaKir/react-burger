import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux";

 function LoggedProtectedRoute({ children, ...rest }) {

   const logged = useSelector(state => state.userInfo.logged)


    return (
      <Route
      {...rest}
      render={() =>
        !logged ? (
          children
        ) : (
                   
                    <Redirect
                        to='/'
          />
                )
      }
    />
  );
} 

export default LoggedProtectedRoute;