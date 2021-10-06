import React, { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from '../services/types/hooks'
import profileStyles from "./profile.module.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import {
  profileChangeAxios,
  logOutAxios,
  refreshTokenAxios,
} from "../services/actions/auth";
import { useHistory } from "react-router-dom";
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";
import { Switch, useRouteMatch, useLocation, Route } from "react-router-dom";
import SmallSpiner from "../components/Spiner/SmallSpiner";
import OrderCards from "../components/OrderCard/OrderCards";
import OrderDetails from "../components/Modal/OrderDetails";
import { getCookie } from "../services/actions/auth";
import ErrorModal from '../components/Modal/ErrorModal'
import { IUserInfo } from '../services/types/interfacesAndTypes'
import { WS_CONNECTION_START, WS_CONNECTION_TO_CLOSE } from '../services/actions/webSocket'
import { Location } from 'history/index'

type TPath = {
  pathname: string
} & Location

function Profile() {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ background: TPath }>();
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      value: `wss://norma.nomoreparties.space/orders?token=${getCookie(
        "accessToken"
      )}`,
      place: true,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_TO_CLOSE,
      });
    };
  }, []);





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
  const location = useLocation<{ background: TPath }>();
  const isLoading = useSelector((state) => state.webSocketAll.isLoading);
  const data = useSelector((state) => state.webSocketAll.data);
  const profileText =
    "В этом разделе вы можете изменить свои персональные данные";
  const orderListText =
    "В этом разделе вы можете просмотреть свою историю заказов";

  const dispatch = useDispatch();
  const history = useHistory();

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
          <Promt>{location.pathname === '/profile' ? profileText : orderListText}</Promt>
        </div>
      </div>

      <div className={profileStyles.detailed}>
        <Route exact path={`/profile`} component={ProfileInfo} />
        <Route
          exact
          path={`/profile/orders`}
          component={!isLoading && data ? OrderHistory : SmallSpiner}
        />
      </div>
    </div>
  );
}
function ProfileInfo() {
  const dispatch = useDispatch();
  const { error, hasError, changeIsLoading } = useSelector(
    (state) => state.userInfo
  );
  const { userInfo }: IUserInfo = useSelector(
    (state) => state.userInfo
  );


  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>(userInfo.user.email)
  const [nameValue, setNameValue] = useState<string>(userInfo.user.name)

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const changeInfo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(profileChangeAxios(emailValue, passwordValue, nameValue));
  };

  const dontMatch = userInfo.user.email != emailValue || userInfo.user.name != nameValue;

  return (
    <>

      <form onSubmit={changeInfo}>
        <div className={classNames(profileStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            icon={'EditIcon'}
            value={nameValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'} />
        </div>
        <div className={classNames(profileStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'Логин'}
            onChange={e => setEmailValue(e.target.value)}
            icon={'EditIcon'}
            value={emailValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
        </div>
        <div className={classNames(profileStyles.input, "mb-6")}>
          <PasswordInput onChange={passwordOnChange} value={passwordValue} name={'password'} />
        </div>
        <div className={profileStyles.button}>
          {passwordValue.length > 0 && (

            <Button size={dontMatch ? "small" : "medium"}>
              Сохранить
            </Button>

          )}
        </div>
      </form>
      {dontMatch && (
        <div className={'mt-3'}>
          <Button
            size={passwordValue.length > 0 ? "small" : "medium"}
            onClick={() => {
              setPasswordValue('')
              setEmailValue(userInfo.user.email)
              setNameValue(userInfo.user.name)
            }}
          >
            Отмена
          </Button>
        </div>

      )}

      {changeIsLoading && <SmallSpiner />}

      {hasError && <ErrorPrompt error={error} />}
    </>
  );
}

function OrderHistory() {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.webSocketAll);
  const token = getCookie("accessToken")

  useEffect(() => {
    if (data)
      if (data.message) {
        if (data.message === 'Invalid or missing token') {
          refreshTokenAxios()
        }
      }
  }, [data, dispatch, token])

  useEffect(() => {
    if (data)
      if (data.message === 'Invalid or missing token')
        dispatch({
          type: "WS_CONNECTION_START",
          value: `wss://norma.nomoreparties.space/orders?token=${getCookie(
            "accessToken"
          )}`,
          place: true,
        });
  }, [token])
  if (data)
    return (
      <div className={classNames(profileStyles.orderHistoryBox)}>
        {data.orders && !data.message && (<OrderCards />)}
        {data.message === 'Invalid or missing token' && (<SmallSpiner />)}
        {!data.orders && data.message !== 'Invalid or missing token' && (<div><ErrorModal typeErrorText={'Ошибка соединения!'} helpText={'Проверьте соединение и перезагрузите страницу'} /></div>)}
      </div>
    );
  else return null
}

const Promt: FunctionComponent<{ children: string }> = ({ children }) => {
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

export default Profile;
