import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/types/hooks";
import feedStyles from "./feedStyles.module.css";
import classNames from "classnames";
import OrderCards from "../components/OrderCard/OrderCards";
import OrderNumbers from "../components/OrderNumbers/OrderNumbers";
import SmallSpiner from "../components/Spiner/SmallSpiner";
import ErrorModal from "../components/Modal/ErrorModal";
import { WS_CONNECTION_START, WS_CONNECTION_TO_CLOSE } from '../services/actions/webSocket'
function Feed() {
  const isLoading = useSelector((state) => state.webSocketAll.isLoading);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.webSocketAll.data);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      value: "wss://norma.nomoreparties.space/orders/all",
      place: false,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_TO_CLOSE,
      });
    };
  }, []);
  if (!isLoading && data) {
    return (
      <div className={classNames(feedStyles.main)}>
        {data.orders && (<div className={classNames(feedStyles.mainBox, "mr-15")}>

          <div className={feedStyles.feedList}>
            <span
              className={classNames(
                "text text_type_main-large mt-10 mb-5",
                feedStyles.headerText
              )}
            >
              Лента заказов
            </span>
            <div className={classNames(feedStyles.feed)}>
              <OrderCards />
            </div>
          </div>
          <div
            className={classNames(feedStyles.ordersNumbers, "mt-25 ml-15")}
          >
            <OrderNumbers />
          </div>



        </div>)}
        {!data.orders && !data.message && (<div className={'mt-30'}><SmallSpiner /></div>)}
        {!data.orders && data.message !== 'Invalid or missing token' && (<div><ErrorModal typeErrorText={'Ошибка соединения!'} helpText={'Проверьте соединение и перезагрузите страницу'} /></div>)}
      </div>
    );
  }
  else { return (<div className={'mt-30'}><SmallSpiner /></div>) }
}

export default Feed;
