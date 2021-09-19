import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import loginStyles from "./login.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Password } from "../components/Inputs/Password";
import { LoginInput } from "../components/Inputs/LoginInput";
import { userLogin } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";

function Login() {
  const { error, hasError } = useSelector((state) => state.userInfo);
  console.log(error);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.inputValue);
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
      <div className={classNames(loginStyles.input, "mb-6")}>
        <LoginInput placeholder={"E-mail"} />
      </div>
      <div className={classNames(loginStyles.input, "mb-6")}>
        <Password />
      </div>
      <div className={classNames(loginStyles.button, "mb-20")}>
        <Button
          type="primary"
          size="medium"
          onClick={() => dispatch(userLogin(value))}
        >
          Войти
        </Button>
        {hasError && <ErrorPrompt error={error} />}
      </div>
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
