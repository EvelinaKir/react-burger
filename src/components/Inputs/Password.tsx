import { useDispatch, useSelector } from '../../services/types/hooks'
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export function Password() {
  const value = useSelector((state) => state.inputValue.password);
  const dispatch = useDispatch();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "INPUT_PASSWORD_VALUE",
      value: e.target.value,
    });
  };

  return <PasswordInput onChange={onChange} value={value} name={"password"} />;
}
