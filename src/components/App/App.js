import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgotPassword";
import MainPage from "../../pages/mainPage";
import NotFound404 from "../../pages/notFound404";
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import ResetPassword from "../../pages/resetPassword";
import { getIngredientsApi } from "../../services/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import IngredientDetails from "../../components/Modal/IngredientDetails";
import LoggedProtectedRoute from "../ProtectedRoute/LoggedProtectedRoute";
import UnloggedProtectedRoute from "../ProtectedRoute/UnloggedProtectedRoute";
import LoggedProtectedResetRoute from "../ProtectedRoute/LoggedProtectedResetRoute";
import {
  getUserRequest,
  getCookie,
} from "../../services/actions/auth";
import Spiner from "../Spiner/Spiner";

function App() {
  const dispatch = useDispatch();
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const { hasError, error, isLoading, foodData } = useSelector(
    (state) => state.apiList
  );
  const { ingridientModal } = useSelector((state) => state.modalInfo);

  useEffect(() => {
    dispatch(getIngredientsApi(url));
    if (getCookie("accessToken")) {
      dispatch(getUserRequest());
    }
  }, []);

  return (
    <div className={appStyles.App}>
      {isLoading && <Spiner />}
      {hasError && "Ошибка" && <div>{error}</div>}
      {!isLoading && !hasError && foodData && (
        <Router>
          <AppHeader />
          <Switch>
            <Route path="/" component={MainPage} exact={!ingridientModal} />

            <LoggedProtectedRoute path="/login" exact={true}>
              <Login />
            </LoggedProtectedRoute>
            <LoggedProtectedRoute path="/register" exact={true}>
              <Register />
            </LoggedProtectedRoute>
            <LoggedProtectedRoute path="/forgot-password" exact={true}>
              <ForgotPassword />
            </LoggedProtectedRoute>
            <LoggedProtectedResetRoute path="/reset-password" exact={true}>
              <ResetPassword />
            </LoggedProtectedResetRoute>
            <UnloggedProtectedRoute path="/profile">
              <Profile />
            </UnloggedProtectedRoute>
            {!ingridientModal && (
              <Route path={`/ingredients/:id`}>
                <IngredientDetails header={"Детали ингредиента"} />
              </Route>
            )}

            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
