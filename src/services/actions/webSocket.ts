import { TWebsocketData } from '../types/interfacesAndTypes'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = "WS_SEND_MESSAGE";
export const WS_CONNECTION_TO_CLOSE: 'WS_CONNECTION_TO_CLOSE' = 'WS_CONNECTION_TO_CLOSE';
export const WS_CONNECTION_LOADING: 'WS_CONNECTION_LOADING' = 'WS_CONNECTION_LOADING';

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly value: string;
    readonly place: boolean;
}

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly value: object;

}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly value: object;
}


export interface IWsConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly value: object;
}

export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly value: TWebsocketData;
}

export interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly message: string;
}

export interface IWsConnectionToCloseAction {
    readonly type: typeof WS_CONNECTION_TO_CLOSE;
}

export interface IWsConnectionLoadingAction {
    readonly type: typeof WS_CONNECTION_LOADING;
}

export type TWSActions =
    IWsConnectionStartAction |
    IWsConnectionSuccessAction |
    IWsConnectionErrorAction |
    IWsConnectionCloseAction |
    IWsGetMessageAction |
    IWsSendMessageAction |
    IWsConnectionToCloseAction |
    IWsConnectionLoadingAction;


