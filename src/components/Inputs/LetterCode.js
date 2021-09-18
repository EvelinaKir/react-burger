import { useDispatch, useSelector } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export function LetterCode() {
    const value = useSelector((state) => state.inputValue.code);
    const dispatch = useDispatch();
    const onChange = (e) => {
      dispatch({
        type: "INPUT_LETTER_CODE_VALUE",
        value: e.target.value,
      });
    };
    return (
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={value}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    );
  }