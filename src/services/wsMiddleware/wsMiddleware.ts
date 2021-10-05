import { refreshTokenAxios } from '../actions/auth'
import {  getCookie } from "../actions/auth";

interface IEvent {
  data: string,
  message: string
}
export const wsMiddleware = () => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {

      const { dispatch, getState } = store;
      const { type, value } = action;


      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(value);
      }

      if (type === "WS_CONNECTION_TO_CLOSE") {
        socket.close("1000", "User left the page that has socket");
      }
      if (socket) {
        socket.onopen = (event: IEvent): void => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", value: event });
        };
        socket.onmessage = (event: IEvent): void => {
          console.log('message=', event)
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: "WS_GET_MESSAGE", value: parsedData });

          dispatch({ type: "GET_INFO_ONE_ORDER_SUCCESS", value: parsedData });
        };
        socket.onerror = (event: IEvent): void => {

          dispatch({ type: "WS_CONNECTION_ERROR", value: event });

        };
        socket.onclose = (event: IEvent): void => {
          dispatch({ type: "WS_CONNECTION_CLOSED", value: event });
        };

        socket.send = (event: IEvent): void => {
          dispatch({ type: 'WS_SEND_MESSAGE', message: value })
        }
      }

      next(action);
    };
  };
};
