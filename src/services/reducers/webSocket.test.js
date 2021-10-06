import * as types from "../actions/webSocket";
import { webSocketAll, initialState } from "./webSocket";

describe(` websocket reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialState).toEqual({
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
    });
  });

  it(`should handle WS_CONNECTION_START`, () => {
    const action = {
      type: types.WS_CONNECTION_START,
      value: "wss//someUrl",
      place: "false or true",
    };
    expect(webSocketAll(initialState, action)).toEqual({
      ...initialState,
      url: action.value,
      inProfile: action.place,
      isLoading: true,
    });
  });

  it(`should handle WS_CONNECTION_SUCCESS`, () => {
    const action = {
      type: types.WS_CONNECTION_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      url: "some url",
      inProfile: "true, or not",
      isLoading: true,
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      connected: true,
      info: action.value,
      isLoading: false,
      error: null,
    });
  });

  it(`should handle WS_CONNECTION_ERROR`, () => {
    const action = {
      type: types.WS_CONNECTION_ERROR,
      value: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      url: "some url",
      inProfile: "true, or not",
      isLoading: true,
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      connected: false,
      error: action.value,
      isLoading: false,
    });
  });

  it(`should handle WS_CONNECTION_CLOSED`, () => {
    const action = {
      type: types.WS_CONNECTION_CLOSED,
      value: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      url: "some url",
      inProfile: "true, or not",
      closing: true,
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      connected: false,
      info: action.value,
      closing: false,
    });
  });

  it(`should handle WS_CONNECTION_TO_CLOSE`, () => {
    const action = {
      type: types.WS_CONNECTION_TO_CLOSE,
      value: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      url: "some url",
      inProfile: "true, or not",
      connected: true,
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      closing: true,
    });
  });

  it(`should handle WS_GET_MESSAGE`, () => {
    const action = {
      type: types.WS_GET_MESSAGE,
      value: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      connected: true,
      url: "some url",
      inProfile: "true, or not",
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      data: action.value,
    });
  });

  it(`should handle  WS_SEND_MESSAGE`, () => {
    const action = {
      type: types.WS_SEND_MESSAGE,
      message: [1, 2, 3, 4, 5],
    };
    const stateBase = {
      ...initialState,
      connected: true,
      url: "some url",
      inProfile: "true, or not",
    };
    expect(webSocketAll(stateBase, action)).toEqual({
      ...stateBase,
      message: action.message,
    });
  });
});
