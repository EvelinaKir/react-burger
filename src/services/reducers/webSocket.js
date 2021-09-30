import {  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_LOADING,
  WS_CONNECTION_TO_CLOSE
} from '../actions/webSocket'

const initialState = {
    url: null,
    connected: false,
    data: null,
    error: null,
    info: null,
    isLoading: false,
    inProfile: false,
    closing: false,
}

export const webSocketAll = (state = initialState, action) => {
    switch(action.type){
        case WS_CONNECTION_START: 
        return {
            ...state,
            url: action.value,
            inProfile: action.place,
            isLoading: true,
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                connected: true,
                info: action.value,
                isLoading: false,
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                connected: false,
                error: action.value,
                isLoading: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                connected: false,
                info: action.value,
                closing: false
            }
        }
        case WS_CONNECTION_TO_CLOSE: {
            return {
                ...state,
                closing: true
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                data: action.value
            };
        }
        default: {
            return state;
        }
    }
}


// ...state,
// data: state.data.orders.length
// ? [...state.data, { ...action.value, timestamp: new Date().getTime() / 1000 }]
// : [{ ...action.value, timestamp: new Date().getTime() / 1000 }]