import React from "react";
import {TUserInfo} from '../types/interfacesAndTypes'
import {
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILED,
  USER_LOG_IN_REQUEST,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILED,
  USER_LOG_OUT_REQUEST,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILED,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_RESET_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_FORGOT_REQUEST,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_FAILED,
  GET_USER_REFRESH_REQUEST,
  GET_USER_REFRESH_SUCCESS,
  GET_USER_REFRESH_FAILED,
  USER_NEED_TO_REFRESH,
  PROFILE_IS_READY,
  USER_PROFILE_CHANGE_REQUEST,
  USER_PROFILE_CHANGE_SUCCESS,
  USER_PROFILE_CHANGE_FAILED,
  CLEAR_ERROR_PROFILE,
  CLEAR_ERROR_FORGOT,
  CLEAR_ERROR_REGISTRATION,
} from "../actions/auth";
import {TAuthActions} from '../actions/auth'

type TinitialRegistation = {
  hasError: boolean;
  error: null | string | number;
  isLoading: boolean;
  regInfo: null | object;
}

export const initialRegistation: TinitialRegistation = {
  hasError: false,
  error: null,
  isLoading: false,
  regInfo: null,
};

type TinitialUserProfile ={
  hasError: boolean;
  error: null | object;
  isLoading: boolean;
  userInfo: TUserInfo | null;
  logged: boolean;
  needToRefresh: boolean;
  refreshedTokens: null | object;
  failedToRefresh: boolean;
  profileReady: boolean;
  loadingUser: boolean;
  loadingRefresh: boolean;
  refreshed: boolean;
  changeIsLoading: boolean;
  errorMessage: null | object;
  failedToChange: boolean;
}
 export const initialUserProfile: TinitialUserProfile = {
  hasError: false,
  error: null,
  isLoading: false,
  userInfo: null,
  logged: false,
  needToRefresh: false,
  refreshedTokens: null,
  failedToRefresh: false,
  profileReady: false,
  loadingUser: false,
  loadingRefresh: false,
  refreshed: false,
  changeIsLoading: false,
  errorMessage: null,
  failedToChange: false,
};
type TinitialForgotRequest = {
  hasError: boolean;
  error: null | string | number;
  isLoading: boolean;
  sent: boolean;
  result: null | object;
  sending: boolean;
}
export const initialForgotRequest: TinitialForgotRequest = {
  hasError: false,
  error: null,
  isLoading: false,
  sent: false,
  result: null,
  sending: false,
};

export const userRegistrationInfo = (state = initialRegistation, action: TAuthActions): TinitialRegistation => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_SIGN_UP_SUCCESS: {
      return {
        ...state,
        regInfo: action.value,
        isLoading: false,
        hasError: false,
      };
    }
    case USER_SIGN_UP_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.value,
      };
    }
    case CLEAR_ERROR_REGISTRATION: {
      return {
        ...state,
        hasError: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const userInfo = (state = initialUserProfile, action: TAuthActions) => {
  switch (action.type) {
    case USER_LOG_IN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_LOG_IN_SUCCESS: {
      return {
        ...state,
        userInfo: action.value,
        hasError: false,
        logged: true,
        isLoading: false,
        profileReady: true,
        errorMessage: null,
      };
    }
    case USER_LOG_IN_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.value,
      };
    }
    case USER_LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_LOG_OUT_SUCCESS: {
      return {
        ...state,
        hasError: false,
        error: null,
        isLoading: false,
        userInfo: action.value,
        logged: false,
        needToRefresh: false,
        refreshedTokens: null,
        failedToRefresh: false,
        profileReady: false,
      };
    }
    case USER_LOG_OUT_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.value,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingUser: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        profileReady: true,
        userInfo: action.value,
        hasError: false,
        logged: true,
        isLoading: false,
        loadingUser: false,
        errorMessage: null
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        logged: false,
        isLoading: false,
        error: action.error,
        hasError: true,
        loadingUser: false,
        errorMessage: action.errorMessage,
      };
    }
    case USER_NEED_TO_REFRESH: {
      return {
        ...state,
        needToRefresh: action.value,
      };
    }

    case GET_USER_REFRESH_REQUEST: {
      return {
        ...state,
        isLoading: true,
        loadingRefresh: true,
        refreshed: false,
      };
    }
    case GET_USER_REFRESH_SUCCESS: {
      return {
        ...state,
        refreshed: true,
        refreshedTokens: action.value,
        needToRefresh: false,
        hasError: false,
        isLoading: false,
        loadingRefresh: false,
        errorMessage: null,
        error: null
      };
    }
    case GET_USER_REFRESH_FAILED: {
      return {
        ...state,
        refreshed: false,
        isLoading: false,
        failedToRefresh: true,
        loadingRefresh: false,
        needToRefresh: false,
        error: action.error,
        hasError: true,
      };
    }
    case USER_PROFILE_CHANGE_REQUEST: {
      return {
        ...state,
        changeIsLoading: true,
      };
    }
    case USER_PROFILE_CHANGE_SUCCESS: {
      return {
        ...state,
        userInfo: action.value,
        changeIsLoading: false,
        hasError: false,
        errorMessage: null,
        error: null,
        failedToChange: false,
      };
    }
    case USER_PROFILE_CHANGE_FAILED: {
      return {
        ...state,
        changeIsLoading: false,
        hasError: true,
        error: action.error,
        errorMessage: action.errorMessage,
        failedToChange: true,
      };
    }
    case PROFILE_IS_READY: {
      return {
        ...state,
        profileReady: action.value,
      };
    }
    case CLEAR_ERROR_PROFILE: {
      return {
        ...state,
        error: null,
        hasError: false,
      };
    }
    default: {
      return state;
    }
  }
};


export const forgotRequest = (state = initialForgotRequest, action: TAuthActions): TinitialForgotRequest => {
  switch (action.type) {
    case USER_FORGOT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        sending: true,
      };
    }
    case USER_FORGOT_SUCCESS: {
      return {
        ...state,
        sending: false,
        sent: true,
        isLoading: false,
        hasError: false,
        result: action.value,
      };
    }
    case USER_FORGOT_FAILED: {
      return {
        ...state,
        sent: false,
        sending: false,
        hasError: true,
        error: action.value,
        isLoading: false,
      };
    }
    case USER_RESET_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_RESET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        result: action.value,
        hasError: false,
        sent: false,
      };
    }
    case USER_RESET_FAILED: {
      return {
        ...state,
        isLoading: false,
        result: null,
        hasError: true,
        error: action.error,
      };
    }
    case CLEAR_ERROR_FORGOT: {
      return {
        ...state,
        hasError: false,
        error: null,
        sent: false,
      };
    }
    default: {
      return state;
    }
  }
};

