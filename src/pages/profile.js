import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileStyles from "./profile.module.css";
import classNames from "classnames";
import { Password } from "../components/Inputs/Password";
import { NameInput } from "../components/Inputs/NameInput";
import { NavLink } from "react-router-dom";
import { LoginInput } from "../components/Inputs/LoginInput";
import {
  logOut,
  changeProfileInfo,
  profileChangeAxios,
  logOutAxios,
} from "../services/actions/auth";
import { useHistory } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UnloggedProtectedRoute from "../components/ProtectedRoute/UnloggedProtectedRoute";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";
import { Switch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SmallSpiner from "../components/Spiner/SmallSpiner";
import OrderCards from "../components/OrderCard/OrderCards";
import { getCookie } from "../services/actions/auth";

function Profile() {
  const location = useLocation();

  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const orderListText =
    "В этом разделе вы можете просмотреть свою историю заказов";

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      value: `wss://norma.nomoreparties.space/orders?token=${getCookie(
        "accessToken"
      )}`,
      place: true,
    });
  }, []);

  const isLoading = useSelector((state) => state.webSocketAll.isLoading);
  const data = useSelector((state) => state.webSocketAll.data);
  return (
    <>
      <div className={classNames(profileStyles.mainbox)}>
        <div className={classNames(profileStyles.navigation)}>
          <div className={classNames(profileStyles.navDiv)}>
            <NavLink
              onClick={() =>
                dispatch({ type: "PROFILE_SELECTED", value: true })
              }
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
              onClick={() =>
                dispatch({ type: "PROFILE_SELECTED", value: false })
              }
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
              onClick={() => dispatch(logOutAxios(history))}
              className={classNames(
                profileStyles.navButton,
                "text text_type_main-medium mb-20"
              )}
            >
              Выход
            </button>
            <Promt>
              {location.pathname === "/profile" ? profileText : orderListText}
            </Promt>
          </div>
        </div>

        <div className={profileStyles.detailed}>
          <Switch>
            <UnloggedProtectedRoute
              exact
              path={`/profile`}
              component={ProfileMain}
            />
            <UnloggedProtectedRoute path={`/profile/orders`}>
              {isLoading && !data && (
                <div className={profileStyles.spiner}>
                  <SmallSpiner />
                </div>
              )}
              {!isLoading && data && <OrderHistory />}
            </UnloggedProtectedRoute>
          </Switch>
        </div>
      </div>
    </>
  );
}

function ProfileMain() {
  const all = useSelector((state) => state);
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state) => state.inputValue);
  const { error, hasError, userInfo, changeIsLoading } = useSelector(
    (state) => state.userInfo
  );
  const changeInfo = () => {
    dispatch(profileChangeAxios(email, password, name));
  };

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
            size={dontMatch ? "small" : "medium"}
            onClick={() => {
              changeInfo();
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
      {changeIsLoading && <SmallSpiner />}

      {hasError && <ErrorPrompt error={error} />}
    </>
  );
}

function OrderHistory() {
  return (
    <div className={classNames(profileStyles.orderHistoryBox)}>
      <OrderCards />
    </div>
  );
}

function Promt({ children }) {
  return (
    <span
      className={classNames(
        profileStyles.navOptionPromt,
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
