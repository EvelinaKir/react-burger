import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from '../services/types/hooks'
import loginStyles from "./login.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { logInAxios } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";


function Login() {
  const { error, hasError, logged } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logInAxios(emailValue, passwordValue))
  }
  return (
    <div className={classNames(loginStyles.mainbox)}>
      <span
        className={classNames(
          loginStyles.header,
          loginStyles.text,
          "text text_type_main-medium mb-6"
        )}
      >
        Вход
      </span>

      <form onSubmit={submit}>
        <div className={classNames(loginStyles.input, "mb-6")}>

          <Input type={'text'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} placeholder={"E-mail"} />
        </div>
        <div className={classNames(loginStyles.input, "mb-6")}>
          <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
        <div className={classNames(loginStyles.button, "mb-20")}>
          <Button
            type="primary"
            size="medium"
          >
            Войти
          </Button>


        </div>

      </form>

      {hasError && <ErrorPrompt error={error} />}
      <div className={classNames(loginStyles.text)}>
        <span className={"text text_type_main-default text_color_inactive"}>
          Вы — новый пользователь?{" "}
        </span>
        <Link
          to={{ pathname: "/register" }}
          className={classNames(
            loginStyles.link,
            "text text_type_main-default"
          )}
        >
          {" "}
          Зарегистрироваться
        </Link>
      </div>
      <div className={classNames(loginStyles.text)}>
        <span className={"text text_type_main-default text_color_inactive"}>
          Забыли пароль?{" "}
        </span>
        <Link
          to={{ pathname: "/forgot-password" }}
          className={classNames(
            loginStyles.link,
            "text text_type_main-default"
          )}
        >
          {" "}
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}

export default Login;
