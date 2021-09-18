import React from "react";
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
  INPUT_NAME_VALUE,
  INPUT_EMAIL_VALUE,
  INPUT_PASSWORD_VALUE,
  INPUT_LETTER_CODE_VALUE,
  INPUT_CLEAN_VALUE,
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
  PROFILE_SELECTED,
  CLEAR_ERROR_PROFILE,
  CLEAR_ERROR_FOGOT,
  CLEAR_ERROR_REGISTRATION,
} from "../actions/auth";

const initialRegistation = {
  hasError: false,
  error: null,
  isLoading: false,
  regInfo: null,
};

const initialValueInput = {
  name: "",
  password: "",
  email: "",
  code: "",
};

const initialUserProfile = {
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
};

const initialForgotRequest = {
  hasError: false,
  error: null,
  isLoading: false,
  sent: false,
  result: null,
};

const initialProfile = {
  profileTab: false,
};

export const userRegistrationInfo = (state = initialRegistation, action) => {
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
      return{
        ...state,
        hasError: false,
        error: null
      }
    }
    default: {
      return state;
    }
  }
};

export const userInfo = (state = initialUserProfile, action) => {
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
        userInfo: action.value,
        hasError: false,
        logged: true,
        isLoading: false,
        loadingUser: false,
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
      };
    }
    case GET_USER_REFRESH_SUCCESS: {
      return {
        ...state,
        refreshedTokens: action.value,
        needToRefresh: false,
        hasError: false,
        isLoading: false,
        loadingRefresh: false,
      };
    }
    case GET_USER_REFRESH_FAILED: {
      return {
        ...state,
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
        isLoading: true,
      };
    }
    case USER_PROFILE_CHANGE_SUCCESS: {
      return {
        ...state,
        userInfo: action.value,
        isLoading: false,
        hasError: false,
      };
    }
    case USER_PROFILE_CHANGE_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error,
      };
    }
    case PROFILE_IS_READY: {
      return {
        ...state,
        profileReady: action.value,
      };
    }
    case CLEAR_ERROR_PROFILE: {
      return{
        ...state,
        error: null,
        hasError: false
      }
    }
    default: {
      return state;
    }
  }
};

export const inputValue = (state = initialValueInput, action) => {
  switch (action.type) {
    case INPUT_NAME_VALUE: {
      return {
        ...state,
        name: action.value,
      };
    }
    case INPUT_EMAIL_VALUE: {
      return {
        ...state,
        email: action.value,
      };
    }
    case INPUT_PASSWORD_VALUE: {
      return {
        ...state,
        password: action.value,
      };
    }
    case INPUT_LETTER_CODE_VALUE: {
      return {
        ...state,
        code: action.value,
      };
    }
    case INPUT_CLEAN_VALUE: {
      return {
        ...state,
        name: "",
        password: "",
        email: "",
        code: "",
      };
    }
    default: {
      return state;
    }
  }
};

export const forgotRequest = (state = initialForgotRequest, action) => {
  switch (action.type) {
    case USER_FORGOT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_FORGOT_SUCCESS: {
      return {
        ...state,
        sent: true,
        hasError: false,
        isLoading: false,
        result: action.value,
      };
    }
    case USER_FORGOT_FAILED: {
      return {
        ...state,
        sent: false,
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
    case CLEAR_ERROR_FOGOT: {
      return{
        ...state,
        hasError: false,
        error: null,
        sent: false
      }
    }
    default: {
      return state;
    }
  }
};

export const profileChange = (state = initialProfile, action) => {
  switch (action.type) {
    case PROFILE_SELECTED: {
      return {
        ...state,
        profileTab: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
