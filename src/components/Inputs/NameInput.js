import { useDispatch, useSelector } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

export function NameInput({ icon }) {
  const value = useSelector((state) => state.inputValue.name);

  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch({
      type: "INPUT_NAME_VALUE",
      value: e.target.value,
    });
  };
  return (
    <Input
      icon={icon}
      type={"text"}
      placeholder={"Имя"}
      onChange={onChange}
      value={value}
      name={"name"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    />
  );
}

NameInput.propTypes = {
  icon: PropTypes.string,
};
