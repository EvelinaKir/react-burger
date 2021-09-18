import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import {getCookie, fillInfo} from '../../services/actions/auth'
import Spiner from "../Spiner/Spiner";


function UnloggedProtectedRoute({ children, ...rest }) {
 
  const { logged, isLoading, userInfo, loadingUser, loadingRefresh} = useSelector(
    (state) => state.userInfo
  );
 
    

  return (
    <>
     {isLoading  && (<Spiner/>)} 
     {!isLoading && !loadingUser && !loadingRefresh  && (<Route
      {...rest}
      render={() => (
         children 
         
        
        )}
    />)}
    </>
  );
}

export default UnloggedProtectedRoute;

