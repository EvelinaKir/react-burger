import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from '../services/types/hooks'
import resetStyles from "./resetPassword.module.css";
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPasswordAxios } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hasError, error } = useSelector((state) => state.forgotRequest);
  const [passwordValue, setPasswordValue] = useState<string>('')

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }
  const [codeValue, setCodeValue] = useState<string>('')
  const reset = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // dispatch(resetPassword(password, code, history));
    dispatch(resetPasswordAxios(passwordValue, codeValue, history))
  };

  return (
    <div className={classNames(resetStyles.mainbox)}>
      <span
        className={classNames(
          resetStyles.header,
          "text text_type_main-medium mb-6"
        )}
      >
        Восстановление пароля
      </span>
      <form onSubmit={reset}>
        <div className={classNames(resetStyles.input, "mb-6")}>
          <PasswordInput onChange={passwordOnChange} value={passwordValue} name={'password'} />
        </div>
        <div className={classNames(resetStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setCodeValue(e.target.value)}
            value={codeValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
        </div>
        <div className={"mb-20"}>

          <Button type="primary" size="medium">
            Сохранить
          </Button>



        </div>
      </form>
      {hasError && <ErrorPrompt error={error} />}
      <div>
        <span
          className={classNames(
            "text text_type_main-default text_color_inactive"
          )}
        >
          Вспомнили пароль?
        </span>
        <Link
          className={classNames(
            resetStyles.link,
            "text text_type_main-default"
          )}
          to={{ pathname: "/login" }}
        >
          {" "}
          Войти
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
