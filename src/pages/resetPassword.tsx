import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from '../services/types/hooks'
import resetStyles from "./resetPassword.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import {  resetPasswordAxios } from "../services/actions/auth";
import { LetterCode } from "../components/Inputs/LetterCode";
import { Password } from "../components/Inputs/Password";
import ErrorPrompt from "../components/ErrorPrompt/ErrorPrompt";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hasError, error } = useSelector((state) => state.forgotRequest);
  const all = useSelector((state) => state.forgotRequest);
  const { password, code } = useSelector((state) => state.inputValue);
  const reset = () => {
    // dispatch(resetPassword(password, code, history));
    dispatch(resetPasswordAxios(password, code, history))
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
      <div className={classNames(resetStyles.input, "mb-6")}>
        <Password />
      </div>
      <div className={classNames(resetStyles.input, "mb-6")}>
        <LetterCode />
      </div>
      <div className={"mb-20"}>
        <Button type="primary" size="medium" onClick={() => reset()}>
          Сохранить
        </Button>
        {hasError && <ErrorPrompt error={error} />}
      </div>
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
