import React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import registerStyles from "./register.module.css";
import { Password } from "../components/Inputs/Password";
import { NameInput } from "../components/Inputs/NameInput";
import { LoginInput } from "../components/Inputs/LoginInput";
import { newUserRegistration } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";

function Register() {
  const { hasError, error, regInfo } = useSelector(
    (state) => state.registration
  );
  console.log(regInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.inputValue);
  const registration = () => {
    dispatch(newUserRegistration(value, history));
  };
  return (
    <div className={classNames(registerStyles.mainbox)}>
      <span
        className={classNames(
          registerStyles.header,
          "text text_type_main-medium mb-6"
        )}
      >
        Регистрация
      </span>
      <div className={classNames(registerStyles.input, "mb-6")}>
        <NameInput />
      </div>
      <div className={classNames(registerStyles.input, "mb-6")}>
        <LoginInput placeholder={"E-mail"} />
      </div>
      <div className={classNames(registerStyles.input, "mb-6")}>
        <Password />
      </div>
      <div className={classNames(registerStyles.button, "mb-20")}>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            registration();
          }}
        >
          Зарегистрироваться
        </Button>
        {hasError && <ErrorPrompt error={error} />}
      </div>
      <div className={classNames(registerStyles.text)}>
        <span className={"text text_type_main-default text_color_inactive"}>
          Уже зарегистрированы?{" "}
        </span>
        <Link
          to={{ pathname: "/login" }}
          className={classNames(
            registerStyles.link,
            "text text_type_main-default"
          )}
        >
          {" "}
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
