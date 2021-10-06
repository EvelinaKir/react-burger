import React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from '../services/types/hooks'
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import registerStyles from "./register.module.css";
import { registerUserAxios } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";

function Register() {
  const { hasError, error } = useSelector(
    (state) => state.registration
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [nameValue, setnNameValue] = useState<string>('')
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const registration = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // dispatch(newUserRegistration(value, history));
    dispatch(registerUserAxios(emailValue, nameValue, passwordValue, history))
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
      <form onSubmit={registration}>
        <div className={classNames(registerStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'Имя'}
            onChange={e => setnNameValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
        </div>
        <div className={classNames(registerStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'E-mail'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
        </div>
        <div className={classNames(registerStyles.input, "mb-6")}>
          <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
        </div>
        <div className={classNames(registerStyles.button, "mb-20")}>

          <Button
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>

          {hasError && <ErrorPrompt error={error} />}
        </div>
      </form>

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
