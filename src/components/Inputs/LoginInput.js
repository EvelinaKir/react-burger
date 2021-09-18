import { useDispatch, useSelector} from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export function LoginInput({icon, placeholder}){
    const value = useSelector((state) => state.inputValue.email);
    const {logged, userInfo} = useSelector(state => state.userInfo)
    const all  = useSelector(state => state.userInfo)
    
  const dispatch = useDispatch();
  const onChange = (e) => {
    console.log(all)
    dispatch({
      type: "INPUT_EMAIL_VALUE",
      value: e.target.value,
    });
    
  };
      return (
        <Input
        type={"email" }
        icon={icon}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      )
  }