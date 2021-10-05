import { useDispatch, useSelector } from '../../services/types/hooks';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/index";

export const NameInput:FunctionComponent<{icon?: keyof TICons}> = ({ icon }) => {
  const value = useSelector((state) => state.inputValue.name);

  const dispatch = useDispatch();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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

