import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileStyles from "./profile.module.css";
import classNames from "classnames";
import { Password } from "../components/Inputs/Password";
import { NameInput } from "../components/Inputs/NameInput";
import { NavLink, Link } from "react-router-dom";
import { LoginInput } from "../components/Inputs/LoginInput";
import { getCookie, logOut, changeProfileInfo } from "../services/actions/auth";
import { useHistory } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UnloggedProtectedRoute from "../components/ProtectedRoute/UnloggedProtectedRoute";
import SuccessPrompt from "../components/SuccessPromt/SuccessPrompt";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { path, url } = useRouteMatch();

  return (
    <>
      <div className={classNames(profileStyles.mainbox)}>
        <div className={classNames(profileStyles.navigation)}>
          <NavLink
            onClick={() => dispatch({ type: "PROFILE_SELECTED", value: true })}
            exact
            to={{ pathname: "/profile" }}
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
          <Promt />
        </div>
        <div className={profileStyles.detailed}>
          <Switch>
            <UnloggedProtectedRoute path={"/profile"} exact={true}>
              {<ProfileMain />}
            </UnloggedProtectedRoute>
            <UnloggedProtectedRoute path={`/profile/orders`} exact={true}>
              {<OrderHistory />}
            </UnloggedProtectedRoute>
          </Switch>
        </div>
      </div>
    </>
  );
}

function ProfileMain() {
  const [state, setstate] = useState(false);
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state) => state.inputValue);
  const { error, hasError } = useSelector((state) => state.userInfo);
  const changeInfo = () => {
    dispatch(changeProfileInfo(email, password, name));
  };
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
      {password.length > 0 && (
        <Button
          onClick={() => {
            changeInfo();
            if (!error) {
              setstate(true);
            }
          }}
        >
          Сохранить
        </Button>
      )}
      {state && <SuccessPrompt />}
    </>
  );
}

function OrderHistory() {
  const orderHistoryId = useParams();
  console.log(orderHistoryId);
  return (
    <div className={classNames(profileStyles.orderHistoryBox)}>
      <span>Here is your history</span>
    </div>
  );
}

function Promt() {
  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const orderListText =
    "В этом разделе вы можете просмотреть свою историю заказов";
  const profileTab = useSelector((state) => state.profileTabChange.profileTab);

  return (
    <span
      className={classNames(
        profileStyles.navOption,
        "text text_type_main-default text_color_inactive mr-15"
      )}
    >
      {profileTab ? profileText : orderListText}
    </span>
  );
}

export default Profile;
