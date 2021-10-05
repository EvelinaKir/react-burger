import { useDispatch, useSelector } from '../../services/types/hooks'
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from 'react'
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/index";

export const LoginInput: FunctionComponent<{icon?: keyof TICons, placeholder: string}> = ({ icon, placeholder }) => {
  const value = useSelector((state) => state.inputValue.email);
  const all = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    dispatch({
      type: "INPUT_EMAIL_VALUE",
      value: e.target.value,
    });
  };
  return (
    <Input
      type={"email"}
      icon={icon}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={"name"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    />
  );
}


