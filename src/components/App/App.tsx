import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgotPassword";
import MainPage from "../../pages/mainPage";
import Feed from "../../pages/feed";
import NotFound404 from "../../pages/notFound404";
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import ResetPassword from "../../pages/resetPassword";
import { getIngredientsApiAxios } from "../../services/actions/index";
import { useDispatch, useSelector } from '../../services/types/hooks'
import { Location } from 'history/index'
import {
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import IngredientDetails from "../../components/Modal/IngredientDetails";
import LoggedProtectedRoute from "../ProtectedRoute/LoggedProtectedRoute";
import OrderDetails from "../Modal/OrderDetails";
import UnloggedProtectedRoute from "../ProtectedRoute/UnloggedProtectedRoute";
import LoggedProtectedResetRoute from "../ProtectedRoute/LoggedProtectedResetRoute";
import { getUserAxios, getCookie } from "../../services/actions/auth";
import Spiner from "../Spiner/Spiner";
import Modal from "../Modal/Modal";


type TPath = {
  pathname: string
} & Location

function App() {
  const history = useHistory();
  const location = useLocation<{ background: TPath }>();

  const dispatch = useDispatch();
  const { hasError, error, isLoading, foodData } = useSelector(
    (state) => state.apiList
  );

  useEffect(() => {
    dispatch(getIngredientsApiAxios());

    if (getCookie("accessToken")) {
      dispatch(getUserAxios());
    }
  }, []);
  const currentOrderNumber = useSelector(
    (state) => state.currentOrderDetail.number
  );
  const background =
    history.action === "PUSH" && location.state && location.state.background;

  return (
    <div className={appStyles.App}>
      {isLoading && <Spiner />}
      {hasError && "Ошибка" && <div>{error}</div>}
      {!isLoading && !hasError && foodData && (
        <>
          <AppHeader />
          <Switch location={background || location}>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/feed" component={Feed} />
            <LoggedProtectedRoute exact path="/login">
              <Login />
            </LoggedProtectedRoute>
            <LoggedProtectedRoute exact path="/register">
              <Register />
            </LoggedProtectedRoute>
            <LoggedProtectedRoute exact path="/forgot-password">
              <ForgotPassword />
            </LoggedProtectedRoute>
            <LoggedProtectedResetRoute exact path="/reset-password">
              <ResetPassword />
            </LoggedProtectedResetRoute>
            <UnloggedProtectedRoute path={`/profile`}>
              <Profile />
            </UnloggedProtectedRoute>
            <Route
              exact
              path={`/ingredients/:id`}
              component={IngredientDetails}
            />
            <Route exact path={`/feed/:id`} component={OrderDetails} />
            <Route>
              <NotFound404 />
            </Route>
          </Switch>

          {background && (
            <Route
              path={`/ingredients/:id`}
              children={
                <Modal
                  children={<IngredientDetails />}
                  header={
                    <span className={"text text_type_main-large ml-10 mt-10"}>
                      {"Детали ингредиента"}
                    </span>
                  }
                />
              }
            ></Route>
          )}
          {background && (
            <Route
              path={`${background.pathname}/:id`}
              children={
                <Modal
                  header={
                    <span
                      className={
                        "text text_type_digits-default  ml-10 mt-10 mb-10"
                      }
                    >
                      {`#${currentOrderNumber}`}
                    </span>
                  }
                  children={<OrderDetails />}
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
