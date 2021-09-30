import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";

export const wsMiddleware = () => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, value } = action;
      const data = getState().webSocketAll;

      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(value);
      }

      if (type === "WS_CONNECTION_TO_CLOSE") {
        socket.close("1000", "User left the page that has socket");
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", value: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(event)
          console.log("message!");

          dispatch({ type: "WS_GET_MESSAGE", value: parsedData });
          dispatch({ type: "GET_INFO_ONE_ORDER_SUCCESS", value: parsedData });
        };
        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", value: event });
        };
        socket.onclose = (event) => {
          console.log("closed");
          console.log(event)
          dispatch({ type: "WS_CONNECTION_CLOSED", value: event });
        };
      }

      next(action);
    };
  };
};
