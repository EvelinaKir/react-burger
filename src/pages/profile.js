import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileStyles from "./profile.module.css";
import classNames from "classnames";
import { Password } from "../components/Inputs/Password";
import { NameInput } from "../components/Inputs/NameInput";
import { NavLink } from "react-router-dom";
import { LoginInput } from "../components/Inputs/LoginInput";
import { logOut, changeProfileInfo, getCookie, getUserRefresh } from "../services/actions/auth";
import { useHistory } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UnloggedProtectedRoute from "../components/ProtectedRoute/UnloggedProtectedRoute";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";
import { Switch, useRouteMatch, useParams } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

function Profile() {
  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const orderListText =
    "В этом разделе вы можете просмотреть свою историю заказов";
  const profileTab = useSelector((state) => state.profileTabChange.profileTab);
  const dispatch = useDispatch();
  const history = useHistory();

  const { path, url } = useRouteMatch();

  return (
    <Router>
      <div className={classNames(profileStyles.mainbox)}>
        <div className={classNames(profileStyles.navigation)}>
          <NavLink
            onClick={() => dispatch({ type: "PROFILE_SELECTED", value: true })}
            exact
            to={{ pathname: `/profile` }}
            className={classNames(
              profileStyles.navOption,
              "text text_type_main-medium"
            )}
            activeClassName={classNames(
              profileStyles.active,
              "text text_type_main-medium"
            )}
          >
            Профиль
          </NavLink>
          <NavLink
            onClick={() => dispatch({ type: "PROFILE_SELECTED", value: false })}
            exact
            to={{ pathname: `/profile/orders` }}
            className={classNames(
              profileStyles.navOption,
              "text text_type_main-medium"
            )}
            activeClassName={classNames(
              profileStyles.active,
              "text text_type_main-medium"
            )}
          >
            История заказов
          </NavLink>
          <button
            onClick={() => dispatch(logOut(history))}
            className={classNames(
              profileStyles.navButton,
              "text text_type_main-medium mb-20"
            )}
          >
            Выход
          </button>
          <Promt>{!profileTab ? orderListText : profileText}</Promt>
        </div>

        <div className={profileStyles.detailed}>
          <Switch>
            <UnloggedProtectedRoute exact path={`/profile`}>
              <ProfileMain />
            </UnloggedProtectedRoute>
            <UnloggedProtectedRoute path={`/profile/orders`}>
              <OrderHistory />
            </UnloggedProtectedRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function ProfileMain() {
  // const [state, setState] = useState(false);
  const all = useSelector((state) => state);
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state) => state.inputValue);
  const { error, hasError, userInfo, refreshed, failedToChange } = useSelector((state) => state.userInfo);
  console.log(userInfo);
  const changeInfo = () => {
    dispatch(changeProfileInfo(email, password, name));
  };

  useEffect(() => {
   if (error === 'invalid token'){
    dispatch(getUserRefresh(getCookie("refreshToken")))
   }
  }, [error])


  useEffect(() => {
   if (refreshed && failedToChange){
    dispatch(changeProfileInfo(email, password, name));
   }
  }, [refreshed, failedToChange])
  const dontMatch = userInfo.user.email != email || userInfo.user.name != name;


  return (
    <>
      <div className={classNames(profileStyles.input, "mb-6")}>
        <NameInput icon={"EditIcon"} />
      </div>
      <div className={classNames(profileStyles.input, "mb-6")}>
        <LoginInput icon={"EditIcon"} placeholder={"Логин"} />
      </div>
      <div className={classNames(profileStyles.input, "mb-6")}>
        <Password />
      </div>
      <div className={profileStyles.button}>
        {password.length > 0 && (
          <Button
            size={dontMatch  ? "small" : "medium"}
            onClick={() => {
              console.log(all);
              changeInfo();
              // if (!hasError) {
              //   setState(true);
              //   setTimeout(() => setState(false), 1000);
              //   dispatch({
              //     type: "INPUT_PASSWORD_VALUE",
              //     value: "",
              //   });
              // }
            }}
          >
            Сохранить
          </Button>
        )}
        {dontMatch && (
          <Button
            size={password.length > 0 ? "small" : "medium"}
            onClick={() => (
              dispatch({
                type: "INPUT_EMAIL_VALUE",
                value: userInfo.user.email,
              }),
              dispatch({
                type: "INPUT_NAME_VALUE",
                value: userInfo.user.name,
              }),
              dispatch({
                type: "INPUT_PASSWORD_VALUE",
                value: "",
              })
            )}
          >
            Отмена
          </Button>
        )}
      </div>
    
      {hasError && <ErrorPrompt error={error} />}
    </>
  );
}

function OrderHistory() {
  return (
    <div className={classNames(profileStyles.orderHistoryBox)}>
      <span>Here is your history</span>
    </div>
  );
}

function Promt({ children }) {
  return (
    <span
      className={classNames(
        profileStyles.navOption,
        "text text_type_main-default text_color_inactive mr-15"
      )}
    >
      {children}
    </span>
  );
}

Promt.propTypes = {
  children: PropTypes.string,
};

export default Profile;
