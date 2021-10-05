import * as types from "../actions/auth";
import { userRegistrationInfo, initialRegistation } from "./auth";
import { userInfo, initialUserProfile } from "./auth";
import { inputValue, initialValueInput } from "./auth";
import { forgotRequest, initialForgotRequest } from "./auth";

describe(`registration of a new user reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialRegistation).toEqual({
      hasError: false,
      error: null,
      isLoading: false,
      regInfo: null,
    });
  });

  it(`should handle USER_SIGN_UP_REQUEST`, () => {
    const action = {
      type: types.USER_SIGN_UP_REQUEST,
    };
    expect(userRegistrationInfo(initialRegistation, action)).toEqual({
      ...initialRegistation,
      isLoading: true,
    });
  });

  it(`should handle USER_SIGN_UP_SUCCESS`, () => {
    const action = {
      type: types.USER_SIGN_UP_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };
    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      regInfo: null,
    };
    expect(userRegistrationInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      regInfo: action.value,
      isLoading: false,
      hasError: false,
    });
  });

  it(`should handle USER_SIGN_UP_FAILED`, () => {
    const action = {
      type: types.USER_SIGN_UP_FAILED,
      value: 1234,
    };

    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      regInfo: null,
    };
    expect(userRegistrationInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      hasError: true,
      error: action.value,
    });
  });

  it(`should handle CLEAR_ERROR_REGISTRATION`, () => {
    const action = {
      type: types.CLEAR_ERROR_REGISTRATION,
    };

    const stateBefore = {
      hasError: true,
      error: 1234,
      isLoading: false,
      regInfo: null,
    };
    expect(userRegistrationInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      hasError: false,
      error: null,
    });
  });
});

describe(`information about current user reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialUserProfile).toEqual({
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
    });
  });

  it(`should handle USER_LOG_IN_REQUEST`, () => {
    const action = {
      type: types.USER_LOG_IN_REQUEST,
    };
    expect(userInfo(initialUserProfile, action)).toEqual({
      ...initialUserProfile,
      isLoading: true,
    });
  });

  it(`should handle USER_LOG_IN_SUCCESS`, () => {
    const action = {
      type: types.USER_LOG_IN_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };
    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      userInfo: action.value,
      hasError: false,
      logged: true,
      isLoading: false,
      profileReady: true,
      errorMessage: null,
    });
  });

  it(`should handle USER_LOG_IN_FAILED`, () => {
    const action = {
      type: types.USER_LOG_IN_FAILED,
      value: [1, 2, 3, 4, 5],
    };
    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      hasError: true,
      error: action.value,
    });
  });

  it(`should handle USER_LOG_OUT_REQUEST`, () => {
    const action = {
      type: types.USER_LOG_OUT_REQUEST,
    };
    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3, 4],
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: true,
    });
  });

  it(`should handle USER_LOG_OUT_SUCCESS`, () => {
    const action = {
      type: types.USER_LOG_OUT_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };
    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3, 4],
      isLoading: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      hasError: false,
      error: null,
      isLoading: false,
      userInfo: action.value,
      logged: false,
      needToRefresh: false,
      refreshedTokens: null,
      failedToRefresh: false,
      profileReady: false,
    });
  });

  it(`should handle USER_LOG_OUT_FAILED`, () => {
    const action = {
      type: types.USER_LOG_OUT_FAILED,
      value: [1, 2, 3, 4, 5],
    };
    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3, 4],
      isLoading: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      error: action.value,
    });
  });

  it(`should handle GET_USER_REQUEST`, () => {
    const action = {
      type: types.GET_USER_REQUEST,
    };

    expect(userInfo(initialUserProfile, action)).toEqual({
      ...initialUserProfile,
      isLoading: true,
      loadingUser: true,
    });
  });

  it(`should handle GET_USER_SUCCESS`, () => {
    const action = {
      type: types.GET_USER_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };

    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
      loadingUser: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      profileReady: true,
      userInfo: action.value,
      hasError: false,
      logged: true,
      isLoading: false,
      loadingUser: false,
      errorMessage: null,
    });
  });

  it(`should handle GET_USER_FAILED`, () => {
    const action = {
      type: types.GET_USER_FAILED,
      error: 1223,
      errorMessage: 1223,
    };

    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
      loadingUser: true,
    };
    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      logged: false,
      isLoading: false,
      error: action.error,
      hasError: true,
      loadingUser: false,
      errorMessage: action.errorMessage,
    });
  });

  it(`should handle USER_NEED_TO_REFRESH`, () => {
    const action = {
      type: types.USER_NEED_TO_REFRESH,
      value: "some value",
    };

    expect(userInfo(initialUserProfile, action)).toEqual({
      ...initialUserProfile,
      needToRefresh: action.value,
    });
  });

  it(`should handle GET_USER_REFRESH_REQUEST`, () => {
    const action = {
      type: types.GET_USER_REFRESH_REQUEST,
    };
    const stateBefore = {
      ...initialUserProfile,
      needToRefresh: true,
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: true,
      loadingRefresh: true,
      refreshed: false,
    });
  });

  it(`should handle GET_USER_REFRESH_SUCCESS`, () => {
    const action = {
      type: types.GET_USER_REFRESH_SUCCESS,
      value: [1, 2, 3],
    };
    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
      loadingRefresh: true,
      refreshed: false,
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      refreshed: true,
      refreshedTokens: action.value,
      needToRefresh: false,
      hasError: false,
      isLoading: false,
      loadingRefresh: false,
      errorMessage: null,
      error: null,
    });
  });

  it(`should handle GET_USER_REFRESH_FAILED`, () => {
    const action = {
      type: types.GET_USER_REFRESH_FAILED,
      error: [1, 2, 3],
    };
    const stateBefore = {
      ...initialUserProfile,
      isLoading: true,
      loadingRefresh: true,
      refreshed: false,
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      refreshed: false,
      isLoading: false,
      failedToRefresh: true,
      loadingRefresh: false,
      needToRefresh: false,
      error: action.error,
      hasError: true,
    });
  });

  it(`should handle USER_PROFILE_CHANGE_REQUEST`, () => {
    const action = {
      type: types.USER_PROFILE_CHANGE_REQUEST,
    };

    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3],
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      changeIsLoading: true,
    });
  });

  it(`should handle USER_PROFILE_CHANGE_SUCCESS`, () => {
    const action = {
      type: types.USER_PROFILE_CHANGE_SUCCESS,
      value: [1, 2, 3, 4, 5],
    };

    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3],
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      userInfo: action.value,
      changeIsLoading: false,
      hasError: false,
      errorMessage: null,
      error: null,
      failedToChange: false,
    });
  });

  it(`should handle USER_PROFILE_CHANGE_FAILED`, () => {
    const action = {
      type: types.USER_PROFILE_CHANGE_FAILED,
      error: 123,
      errorMessage: 123,
    };

    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      userInfo: [1, 2, 3],
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      changeIsLoading: false,
      hasError: true,
      error: action.error,
      errorMessage: action.errorMessage,
      failedToChange: true,
    });
  });

  it(`should handle PROFILE_IS_READY`, () => {
    const action = {
      type: types.PROFILE_IS_READY,
      value: [1, 2, 3, 4],
    };

    expect(userInfo(initialUserProfile, action)).toEqual({
      ...initialUserProfile,
      profileReady: action.value,
    });
  });

  it(`should handle CLEAR_ERROR_PROFILE`, () => {
    const action = {
      type: types.CLEAR_ERROR_PROFILE,
    };
    const stateBefore = {
      ...initialUserProfile,
      logged: true,
      hasError: true,
      failedToChange: true,
    };

    expect(userInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      error: null,
      hasError: false,
    });
  });
});

describe(`inputs value control reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialValueInput).toEqual({
      name: "",
      password: "",
      email: "",
      code: "",
    });
  });

  it(`should handle INPUT_NAME_VALUE`, () => {
    const action = {
      type: types.INPUT_NAME_VALUE,
      value: "some name",
    };

    expect(inputValue(initialValueInput, action)).toEqual({
      ...initialValueInput,
      name: action.value,
    });
  });
  it(`should handle INPUT_EMAIL_VALUE`, () => {
    const action = {
      type: types.INPUT_EMAIL_VALUE,
      value: "some email",
    };

    expect(inputValue(initialValueInput, action)).toEqual({
      ...initialValueInput,
      email: action.value,
    });
  });
  it(`should handle INPUT_PASSWORD_VALUE`, () => {
    const action = {
      type: types.INPUT_PASSWORD_VALUE,
      value: "some password",
    };

    expect(inputValue(initialValueInput, action)).toEqual({
      ...initialValueInput,
      password: action.value,
    });
  });

  it(`should handle INPUT_LETTER_CODE_VALUE`, () => {
    const action = {
      type: types.INPUT_LETTER_CODE_VALUE,
      value: "some code",
    };

    expect(inputValue(initialValueInput, action)).toEqual({
      ...initialValueInput,
      code: action.value,
    });
  });

  it(`should handle INPUT_CLEAN_VALUE`, () => {
    const action = {
      type: types.INPUT_CLEAN_VALUE,
    };

    expect(inputValue(initialValueInput, action)).toEqual({
      ...initialValueInput,
      name: "",
      password: "",
      email: "",
      code: "",
    });
  });
});

describe(`forgot password reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialForgotRequest).toEqual({
      hasError: false,
      error: null,
      isLoading: false,
      sent: false,
      result: null,
      sending: false,
    });
  });

  it(`should handle USER_FORGOT_REQUEST`, () => {
    const action = {
      type: types.USER_FORGOT_REQUEST,
    };

    expect(forgotRequest(initialForgotRequest, action)).toEqual({
      ...initialForgotRequest,
      isLoading: true,
      sending: true,
    });
  });

  it(`should handle USER_FORGOT_SUCCESS`, () => {
    const action = {
      type: types.USER_FORGOT_SUCCESS,
      value: "some info about changing",
    };

    const stateBefore = {
      ...initialForgotRequest,
      isLoading: true,
      sending: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      sending: false,
      sent: true,
      isLoading: false,
      hasError: false,
      result: action.value,
    });
  });

  it(`should handle USER_FORGOT_FAILED`, () => {
    const action = {
      type: types.USER_FORGOT_FAILED,
      value: "some error",
    };

    const stateBefore = {
      ...initialForgotRequest,
      isLoading: true,
      sending: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      sent: false,
      sending: false,
      hasError: true,
      error: action.value,
      isLoading: false,
    });
  });

  it(`should handle USER_RESET_REQUEST`, () => {
    const action = {
      type: types.USER_RESET_REQUEST,
      value: "some info",
    };

    const stateBefore = {
      ...initialForgotRequest,
      sent: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: true,
    });
  });

  it(`should handle USER_RESET_SUCCESS`, () => {
    const action = {
      type: types.USER_RESET_SUCCESS,
      value: "some info",
    };

    const stateBefore = {
      ...initialForgotRequest,
      sent: true,
      isLoading: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      result: action.value,
      hasError: false,
      sent: false,
    });
  });

  it(`should handle USER_RESET_FAILED`, () => {
    const action = {
      type: types.USER_RESET_FAILED,
      error: "some error",
    };

    const stateBefore = {
      ...initialForgotRequest,
      sent: true,
      isLoading: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      result: null,
      hasError: true,
      error: action.error,
    });
  });

  it(`should handle CLEAR_ERROR_FORGOT`, () => {
    const action = {
      type: types.CLEAR_ERROR_FORGOT,
    };

    const stateBefore = {
      ...initialForgotRequest,
      error: "some error",
      hasError: true,
    };
    expect(forgotRequest(stateBefore, action)).toEqual({
      ...stateBefore,
      hasError: false,
      error: null,
      sent: false,
    });
  });

  
});
