import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_START,
    WS_CONNECTION_TO_CLOSE
} from '../actions/webSocket'
import { TWSActions } from '../actions/webSocket'
import { TWebsocketData } from '../types/interfacesAndTypes'

type TinitialState = {
    url: null | string;
    connected: boolean;
    data: TWebsocketData | null;
    close: null | boolean;
    error: null | object;
    info: null | object;
    isLoading: boolean;
    inProfile: boolean;
    closing: boolean;
    message: null | string;
}

export const initialState: TinitialState = {
    url: null,
    connected: false,
    data: null,
    close: null,
    error: null,
    info: null,
    isLoading: false,
    inProfile: false,
    closing: false,
    message: null,
}



export const webSocketAll = (state = initialState, action: TWSActions): TinitialState => {
    switch (action.type) {
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
        case WS_SEND_MESSAGE: {
            return {
                ...state,
                message: action.message
            };
        }
        default: {
            return state;
        }
    }
}

