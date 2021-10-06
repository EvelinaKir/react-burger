import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "../services/types/hooks";
import forgotStyles from "./forgotPassword.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { forgotrequestAxios } from "../services/actions/auth";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";
import { USER_FORGOT_FAILED } from '../services/actions/auth'

function ForgotPassword() {

  const { hasError, error } = useSelector((state) => state.forgotRequest);
  const [emailValue, setEmailValue] = useState<string>('')

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const resetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateEmail(emailValue)) {
      // dispatch(sendForgotRequest(value));
      dispatch(forgotrequestAxios(emailValue));
      history.replace({ pathname: "/reset-password" });
    } else
      dispatch({
        type: USER_FORGOT_FAILED,
        value: "! Введен некорректный email",
      });
  };

  return (
    <div className={classNames(forgotStyles.mainbox)}>
      <span
        className={classNames(
          forgotStyles.header,
          "text text_type_main-medium mb-6"
        )}
      >
        Восстановление пароля
      </span>
      <form onSubmit={resetPassword}>
        <div className={classNames(forgotStyles.input, "mb-6")}>
          <Input type={'text'}
            placeholder={'E-mail'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
        </div>
        <div className={"mb-20"}>

          <Button type="primary" size="medium">
            Восстановить
          </Button>



        </div>
      </form>
      {hasError ? <ErrorPrompt error={error} /> : null}
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
            forgotStyles.link,
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

export default ForgotPassword;
