import classNames from "classnames";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import forgotStyles from "./forgotPassword.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoginInput } from "../components/Inputs/LoginInput";
import { Link, useHistory } from "react-router-dom";
import {sendForgotRequest} from '../services/actions/auth'
import ErrorPrompt from '../components/ErrorPrompt/ErrorPrompt'
function ForgotPassword() {


 

  const value = useSelector((state) => state.inputValue.email);
  const stat = useSelector(state => state.forgotRequest)
  const  {hasError, error} = useSelector(state => state.forgotRequest)
  
  const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }



  const dispatch = useDispatch()
  const history = useHistory()
  const resetPassword = () => {
     if (validateEmail(value)) {
    dispatch(sendForgotRequest(value)) 
    history.replace({pathname: "/reset-password"})}
    else dispatch({
       type: 'USER_FORGOT_FAILED',
       value: '! Введен некорректный email'
     })
    
  }
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
      <div className={classNames(forgotStyles.input, "mb-6")}>
        <LoginInput placeholder={'Укажите e-mail'}/>
      </div>
      <div className={"mb-20"}>
        <Button type="primary" size="medium" onClick={() => resetPassword()}>
          Восстановить
        </Button>
        {hasError ? <ErrorPrompt error={error}/> : null} 
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
