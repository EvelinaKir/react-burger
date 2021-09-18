import { useDispatch, useSelector } from "react-redux";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useRef, useState } from "react";

export function Password() {
  const value = useSelector((state) => state.inputValue.password);
  const inputState = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch({
      type: "INPUT_PASSWORD_VALUE",
      value: e.target.value,
    });
  };

  return <PasswordInput onChange={onChange} value={value} name={"password"} />;
}
