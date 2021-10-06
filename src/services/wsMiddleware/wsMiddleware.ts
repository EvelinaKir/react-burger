import {Dispatch, Action  } from 'redux'
import {WS_CONNECTION_SUCCESS,
WS_CONNECTION_ERROR,
WS_CONNECTION_CLOSED,
WS_GET_MESSAGE,
WS_SEND_MESSAGE,
WS_CONNECTION_START,
WS_CONNECTION_TO_CLOSE} from '../actions/webSocket'
import {GET_INFO_ONE_ORDER_SUCCESS} from '../actions/index'

interface IEvent {
  data: string,
  message: string
}
 interface A<T = any> {
  value: T
}

export const wsMiddleware = () => {
  return (store: {dispatch: Dispatch}) => {
    let socket: any = null;

    return (next: Dispatch) => (action: A & Action ) => {
      const { dispatch } = store;
      const { type, value } = action;


      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(value);
      }

      if (type === WS_CONNECTION_TO_CLOSE) {
        socket.close("1000", "User left the page that has socket");
      }
      if (socket) {
        socket.onopen = (event: IEvent): void => {
          dispatch({ type: WS_CONNECTION_SUCCESS, value: event });
        };
        socket.onmessage = (event: IEvent): void => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: WS_GET_MESSAGE, value: parsedData });

          dispatch({ type: GET_INFO_ONE_ORDER_SUCCESS, value: parsedData });
        };
        socket.onerror = (event: IEvent): void => {

          dispatch({ type: WS_CONNECTION_ERROR, value: event });

        };
        socket.onclose = (event: IEvent): void => {
          dispatch({ type: WS_CONNECTION_CLOSED, value: event });
        };

        socket.send = (event: IEvent): void => {
          dispatch({ type: WS_SEND_MESSAGE, message: value })
        }
      }

      next(action);
    };
  };
};
