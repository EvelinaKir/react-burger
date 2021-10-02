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
import { Switch, useRouteMatch, useLocation, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import SmallSpiner from "../components/Spiner/SmallSpiner";
import OrderCards from "../components/OrderCard/OrderCards";
import OrderDetails from "../components/Modal/OrderDetails";
import Modal from "../components/Modal/Modal";
import { getuserAxios, getCookie } from "../services/actions/auth";

function Profile() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { path, url } = useRouteMatch();
  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      value: `wss://norma.nomoreparties.space/orders?token=${getCookie(
        "accessToken"
      )}`,
      place: true,
    });
    return () => {
      dispatch({
        type: "WS_CONNECTION_TO_CLOSE",
      });
    };
  }, []);
  const { detailOrderInfo } = useSelector((state) => state.modalInfo);

  const currentOrderNumber = useSelector(
    (state) => state.currentOrderDetail.number
  );


  const background =
    history.action === "PUSH" && location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route path={`${path}/orders/:id`} component={OrderDetails} />
        <Route path={`${path}`} component={ProfileMain} />
      </Switch>
    </>
  );
}

function ProfileMain() {

  const isLoading = useSelector((state) => state.webSocketAll.isLoading);
  const data = useSelector((state) => state.webSocketAll.data);
  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const orderListText =
    "В этом разделе вы можете просмотреть свою историю заказов";
  const profileTab = useSelector((state) => state.profileTabChange.profileTab);
  const dispatch = useDispatch();
  const history = useHistory();
  const inf = useSelector((state) => state.webSocketAll);
  const location = useLocation();
  const { path, url } = useRouteMatch();
  return (
    <div className={classNames(profileStyles.mainbox)}>
      <div className={classNames(profileStyles.navigation)}>
        <div className={classNames(profileStyles.navDiv)}>
          <NavLink
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
          <Promt>{path === '/profile' ? profileText   : orderListText}</Promt>
        </div>
      </div>

      <div className={profileStyles.detailed}>
        <Route exact path={`/profile`} component={ProfileInfo} />
        <Route
          exact
          path={`/profile/orders`}
          component={!isLoading && data ? OrderHistory  : SmallSpiner}
        />
      </div>
    </div>
  );
}
function ProfileInfo() {
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
   const dispatch = useDispatch()

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
