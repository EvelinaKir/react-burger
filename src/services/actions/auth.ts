import { instance } from "./axios";
import { Dispatch } from 'redux'
import { History } from 'history';
import { TUserInfo, Ires, IInfo } from '../types/interfacesAndTypes'




export const USER_SIGN_UP_REQUEST: 'USER_SIGN_UP_REQUEST' = "USER_SIGN_UP_REQUEST";
export const USER_SIGN_UP_SUCCESS: 'USER_SIGN_UP_SUCCESS' = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_FAILED: 'USER_SIGN_UP_FAILED' = "USER_SIGN_UP_FAILED";

export const USER_LOG_IN_REQUEST: 'USER_LOG_IN_REQUEST' = "USER_LOG_IN_REQUEST";
export const USER_LOG_IN_SUCCESS: 'USER_LOG_IN_SUCCESS' = "USER_LOG_IN_SUCCESS";
export const USER_LOG_IN_FAILED: 'USER_LOG_IN_FAILED' = "USER_LOG_IN_FAILED";

export const USER_LOG_OUT_REQUEST: 'USER_LOG_OUT_REQUEST' = "USER_LOG_OUT_REQUEST";
export const USER_LOG_OUT_SUCCESS: 'USER_LOG_OUT_SUCCESS' = "USER_LOG_OUT_SUCCESS";
export const USER_LOG_OUT_FAILED: 'USER_LOG_OUT_FAILED' = "USER_LOG_OUT_FAILED";

export const USER_FORGOT_REQUEST: 'USER_FORGOT_REQUEST' = "USER_FORGOT_REQUEST";
export const USER_FORGOT_SUCCESS: 'USER_FORGOT_SUCCESS' = "USER_FORGOT_SUCCESS";
export const USER_FORGOT_FAILED: 'USER_FORGOT_FAILED' = "USER_FORGOT_FAILED";

export const USER_RESET_REQUEST: 'USER_RESET_REQUEST' = "USER_RESET_REQUEST";
export const USER_RESET_SUCCESS: 'USER_RESET_SUCCESS' = "USER_RESET_SUCCESS";
export const USER_RESET_FAILED: 'USER_RESET_FAILED' = "USER_RESET_FAILED";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = "GET_USER_SUCCESS";
export const GET_USER_FAILED: 'GET_USER_FAILED' = "GET_USER_FAILED";

export const USER_NEED_TO_REFRESH: 'USER_NEED_TO_REFRESH' = "USER_NEED_TO_REFRESH";

export const PROFILE_IS_READY: 'PROFILE_IS_READY' = "PROFILE_IS_READY";

export const GET_USER_REFRESH_REQUEST: 'GET_USER_REFRESH_REQUEST' = "GET_USER_REFRESH_REQUEST";
export const GET_USER_REFRESH_SUCCESS: 'GET_USER_REFRESH_SUCCESS' = "GET_USER_REFRESH_SUCCESS";
export const GET_USER_REFRESH_FAILED: 'GET_USER_REFRESH_FAILED' = "GET_USER_REFRESH_FAILED";

export const USER_PROFILE_CHANGE_REQUEST: 'USER_PROFILE_CHANGE_REQUEST' = "USER_PROFILE_CHANGE_REQUEST";
export const USER_PROFILE_CHANGE_SUCCESS: 'USER_PROFILE_CHANGE_SUCCESS' = "USER_PROFILE_CHANGE_SUCCESS";
export const USER_PROFILE_CHANGE_FAILED: 'USER_PROFILE_CHANGE_FAILED' = "USER_PROFILE_CHANGE_FAILED";

export const CLEAR_ERROR_PROFILE: 'CLEAR_ERROR_PROFILE' = "CLEAR_ERROR_PROFILE";
export const CLEAR_ERROR_FORGOT: 'CLEAR_ERROR_FORGOT' = "CLEAR_ERROR_FORGOT";

export const CLEAR_ERROR_REGISTRATION: 'CLEAR_ERROR_REGISTRATION' = "CLEAR_ERROR_REGISTRATION";

export interface IUserSignUpRequest {
  readonly type: typeof USER_SIGN_UP_REQUEST;
}

export interface IUserSignUpSuccess {
  readonly type: typeof USER_SIGN_UP_SUCCESS;
  readonly value: object;
}

export interface IUserSignUpFailed {
  readonly type: typeof USER_SIGN_UP_FAILED;
  readonly value: string | number;
}

export interface IUserLogInRequest {
  readonly type: typeof USER_LOG_IN_REQUEST;
}

export interface IUserLogInSuccess {
  readonly type: typeof USER_LOG_IN_SUCCESS;
  readonly value: TUserInfo;
}

export interface IUserLogInFailed {
  readonly type: typeof USER_LOG_IN_FAILED;
  readonly value: string | number;
}

export interface IUserLogOutRequest {
  readonly type: typeof USER_LOG_OUT_REQUEST;
}

export interface IUserLogOutSuccess {
  readonly type: typeof USER_LOG_OUT_SUCCESS;
  readonly value: TUserInfo;
}

export interface IUserLogOutFailed {
  readonly type: typeof USER_LOG_OUT_FAILED;
  readonly value: string | number;
}

export interface IUserForgotRequest {
  readonly type: typeof USER_FORGOT_REQUEST;
}

export interface IUserForgotSuccess {
  readonly type: typeof USER_FORGOT_SUCCESS;
  readonly value: object;
}

export interface IUserForgotFailed {
  readonly type: typeof USER_FORGOT_FAILED;
  readonly value: string | number | null;
}

export interface IUserResetRequest {
  readonly type: typeof USER_RESET_REQUEST;
}

export interface IUserResetSuccess {
  readonly type: typeof USER_RESET_SUCCESS;
  readonly value: object;
}

export interface IUserResetFailed {
  readonly type: typeof USER_RESET_FAILED;
  readonly error: string | number;
}

export interface IUserGetRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IUserGetSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly value: TUserInfo;
}

export interface IUserGetFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly error: object;
  readonly errorMessage: object;

}

export interface IUserNeedToRefresh {
  readonly type: typeof USER_NEED_TO_REFRESH;
  readonly value: boolean;
}
export interface IUserPtofileIsReady {
  readonly type: typeof PROFILE_IS_READY;
  readonly value: boolean;
}

export interface IUserRefreshRequest {
  readonly type: typeof GET_USER_REFRESH_REQUEST;
}

export interface IUserRefreshSuccess {
  readonly type: typeof GET_USER_REFRESH_SUCCESS;
  readonly value: object;
}

export interface IUserRefreshFailed {
  readonly type: typeof GET_USER_REFRESH_FAILED;
  readonly error: object;
}

export interface IUserProfileChangeRequest {
  readonly type: typeof USER_PROFILE_CHANGE_REQUEST;
}

export interface IUserProfileChangeSuccess {
  readonly type: typeof USER_PROFILE_CHANGE_SUCCESS;
  readonly value: TUserInfo;
}

export interface IUserProfileChangeFailed {
  readonly type: typeof USER_PROFILE_CHANGE_FAILED;
  readonly error: string | number;
  readonly errorMessage: string | number;
}

export interface IClearErrorProfile {
  readonly type: typeof CLEAR_ERROR_PROFILE;
}

export interface IClearErrorForgot {
  readonly type: typeof CLEAR_ERROR_FORGOT;
}

export interface IClearErrorRegistration {
  readonly type: typeof CLEAR_ERROR_REGISTRATION;
}

export type TAuthActions =
  | IClearErrorRegistration
  | IClearErrorForgot
  | IClearErrorProfile
  | IUserProfileChangeFailed
  | IUserProfileChangeSuccess
  | IUserProfileChangeRequest
  | IUserRefreshFailed
  | IUserRefreshSuccess
  | IUserRefreshRequest
  | IUserPtofileIsReady
  | IUserNeedToRefresh
  | IUserGetFailed
  | IUserGetSuccess
  | IUserGetRequest
  | IUserResetFailed
  | IUserResetSuccess
  | IUserResetRequest
  | IUserForgotFailed
  | IUserForgotSuccess
  | IUserForgotRequest
  | IUserLogOutFailed
  | IUserLogOutSuccess
  | IUserLogOutRequest
  | IUserLogInFailed
  | IUserLogInSuccess
  | IUserLogInRequest
  | IUserSignUpFailed
  | IUserSignUpSuccess
  | IUserSignUpRequest;


export function setCookie(name: string, value: string, props: any): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function clearNoLogIn() {
  return function (dispatch: Dispatch<TAuthActions>): void {
    dispatch({
      type: CLEAR_ERROR_PROFILE,
    });
    dispatch({
      type: CLEAR_ERROR_FORGOT,
    });
    dispatch({
      type: CLEAR_ERROR_REGISTRATION,
    });
  };
}



//AXIOS API REQUESTS



export async function refreshTokenAxios() {
  return instance
    .post("auth/token", {
      token: getCookie("refreshToken"),
    })
    .then((res: Ires) => {

      if (res.status === 200) {
        const { data } = res;
        document.cookie = `accessToken=${data.accessToken.split("Bearer ")[1]
          }; path=/`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/`
      } else {
        return res.data;
      }
    });
}





export function logInAxios(email: string, password: string) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      dispatch({
        type: USER_LOG_IN_REQUEST,
      });
      const res = await instance.post("auth/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        const { data } = res;
        setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
          path: "/",
        });
        document.cookie = `refreshToken=${data.refreshToken};  path=/`;
        dispatch({
          type: USER_LOG_IN_SUCCESS,
          value: data,
        });
      }
      if (res.status !== 200) {
        dispatch({
          type: USER_LOG_IN_FAILED,
          value: res.status,
          errorMessage: res.data.message,
        });
      }
    } catch (error: any) {

      dispatch({
        type: USER_LOG_IN_FAILED,
        value: error.status,
      });
    }
  };
}
type TprofileChange = {
  status: number;
  data: object;
}
export function profileChangeAxios(email: string, password: string, name: string) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      dispatch({
        type: USER_PROFILE_CHANGE_REQUEST,
      });
      const res: any = await instance.patch("auth/user", {
        email: email,
        password: password,
        name: name,
      })
      dispatch({
        type: USER_PROFILE_CHANGE_REQUEST,
      });
      if (res.status === 200) {
        dispatch({
          type: USER_PROFILE_CHANGE_SUCCESS,
          value: res.data,
        });
      }
      if (res.status !== 200) {
        dispatch({
          type: USER_PROFILE_CHANGE_FAILED,
          error: res.status,
          errorMessage: res.status
        });
      }
    } catch (error: any) {
      dispatch({
        type: USER_PROFILE_CHANGE_FAILED,
        error: error,
        errorMessage: error,
      });
    }
  };
}

export function resetPasswordAxios(password: string, token: string, history: History) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      dispatch({
        type: USER_RESET_REQUEST,
      });
      const res = await instance.post("password-reset/reset", {
        password: password,
        token: token,
      });
      if (res.status === 200) {
        const { data } = res;
        dispatch({
          type: USER_RESET_SUCCESS,
          value: data,
        });
        history.replace({ pathname: "/" });
      }
      if (res.status !== 200) {
        dispatch({
          type: USER_RESET_FAILED,
          error: res.status,
        });
      }
    } catch (error: any) {
      dispatch({
        type: USER_RESET_FAILED,
        error: error.status,
      });
    }
  };
}

export function forgotrequestAxios(info: string) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      dispatch({
        type: USER_FORGOT_REQUEST,
      });
      const res = await instance.post("password-reset", {
        email: info,
      });
      if (res.status === 200) {
        const { data } = res;
        dispatch({
          type: USER_FORGOT_SUCCESS,
          value: data,
        });
      }
      if (res.status !== 200) {
        dispatch({
          type: USER_FORGOT_FAILED,
          value: res.status,
        });
      }
    } catch (error: any) {
      dispatch({
        type: USER_FORGOT_FAILED,
        value: error,
      });
    }
  };
}

export function logOutAxios(history: History) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      const res = await instance.post("auth/logout", {
        token: getCookie("refreshToken"),
      });
      dispatch({
        type: USER_LOG_OUT_REQUEST,
      });
      if (res.status === 200) {
        const { data } = res;
        document.cookie =
          `accessToken=${getCookie("accessToken")}; path=/; expires=` +
          new Date(-1).toUTCString();
        document.cookie =
          `refreshToken=${getCookie("refreshToken")}; path=/; expires=` +
          new Date(-1).toUTCString();
        dispatch({
          type: USER_LOG_OUT_SUCCESS,
          value: data,
        });
        history.replace({ pathname: "/login" });
      }
      if (res.status !== 200) {
        throw new Error(res.status);
      }
    } catch (error: any) {
      dispatch({
        type: USER_LOG_OUT_FAILED,
        value: error,
      });
    }
  };
}
export function getUserAxios() {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      dispatch({
        type: GET_USER_REQUEST,
      });
      const res = await instance.get("auth/user");
      if (res.status === 200) {
        const { data } = res;
        dispatch({
          type: GET_USER_SUCCESS,
          value: data,
        });
        dispatch({
          type: PROFILE_IS_READY,
          value: true,
        });
      }
      if (res.status !== 200) {
        throw new Error(res.status);
      }
    } catch (error: any) {
      dispatch({
        type: PROFILE_IS_READY,
        value: false,
      });
      dispatch({
        type: GET_USER_FAILED,
        errorMessage: error,
        error: error,
      });
    }
  };
}

interface IInfoReg extends IInfo { name: string }

export function registerUserAxios(email: string, name: string, password: string, history: History) {
  return async function (dispatch: Dispatch<TAuthActions>) {
    try {
      const res = await instance.post("auth/register", {
        email: email,
        password: password,
        name: name,
      });
      dispatch({
        type: USER_SIGN_UP_REQUEST,
      });
      if (res.status === 200) {
        const { data } = res;
        dispatch({
          type: USER_SIGN_UP_SUCCESS,
          value: data,
        });
        history.replace({ pathname: "/login" });
      }
      if (!res.ok) {
        throw new Error(res.status);
      }
    } catch (error: any) {
      dispatch({
        type: USER_SIGN_UP_FAILED,
        value: error,
      });
    }
  };
}

//// !!!!!!!!!!!! Next code contains fetch request (as an example)

// export function getUserRequest() {
//   const url = "https://norma.nomoreparties.space/api/auth/user";
//   return async function (dispatch) {
//     const request = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + getCookie("accessToken"),
//       },
//     };

//     (async () => {
//       try {
//         dispatch({
//           type: GET_USER_REQUEST,
//         });

//         const res = await fetch(url, request);
//         const result = await res.json();
//         const last = await result;
//         if (res.ok) {
//           dispatch({
//             type: GET_USER_SUCCESS,
//             value: last,
//           });
//           dispatch({
//             type: USER_NEED_TO_REFRESH,
//             value: false,
//           });
//           dispatch({
//             type: PROFILE_IS_READY,
//             value: true,
//           });
//         }
//         if (!res.ok) {
//           if (last.message === "jwt expired") {
//             dispatch(
//               getUserRefresh(getCookie("refreshToken"), getUserRequest())
//             );
//           }
//           throw new Error(last.message);
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_NEED_TO_REFRESH,
//           value: true,
//         });
//         dispatch({
//           type: PROFILE_IS_READY,
//           value: false,
//         });
//         dispatch({
//           type: GET_USER_FAILED,
//           errorMessage: error.message,
//         });
//       }
//     })();
//   };
// }

// export function getUserRefresh(token, sendDataAgain) {
//   const url = "https://norma.nomoreparties.space/api/auth/token";
//   return async function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         token: token,
//       }),
//     };
//     (async () => {
//       try {
//         dispatch({
//           type: GET_USER_REFRESH_REQUEST,
//         });
//         const res = await fetch(url, requestOption);
//         const result = await res.json();
//         const last = await result;
//         if (res.ok) {
//           dispatch({
//             type: GET_USER_REFRESH_SUCCESS,
//             value: last,
//           });
//           document.cookie = `accessToken=${
//             last.accessToken.split("Bearer ")[1]
//           }; path=/`;
//           document.cookie = `refreshToken=${last.refreshToken}; path=/`;
//           dispatch({
//             type: PROFILE_IS_READY,
//             value: true,
//           });
//           if (sendDataAgain) dispatch(sendDataAgain);
//         }
//         if (!res.ok) {
//           throw new Error(last.message);
//         }
//       } catch (error) {
//         dispatch({
//           type: GET_USER_REFRESH_FAILED,
//           errorMessage: error.message,
//         });
//         dispatch({
//           type: PROFILE_IS_READY,
//           value: false,
//         });
//       }
//     })();
//   };
// }

// export function logOut(history) {
//   const url = "https://norma.nomoreparties.space/api/auth/logout";
//   return function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         token: getCookie("refreshToken"),
//       }),
//     };

//     (async () => {
//       try {
//         dispatch({
//           type: USER_LOG_OUT_REQUEST,
//         });
//         const res = await fetch(url, requestOption);

//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           document.cookie =
//             `accessToken=${getCookie("accessToken")}; path=/; expires=` +
//             new Date(-1).toUTCString();
//           document.cookie =
//             `refreshToken=${getCookie("refreshToken")}; path=/; expires=` +
//             new Date(-1).toUTCString();
//           dispatch({
//             type: USER_LOG_OUT_SUCCESS,
//             value: last,
//           });

//           dispatch({
//             type: INPUT_CLEAN_VALUE,
//           });
//           history.replace({ pathname: "/login" });
//         }
//         if (!res.ok) {
//           throw new Error(res.status);
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_LOG_OUT_FAILED,
//           error: error.message,
//         });
//       }
//     })();
//   };
// }

// export function changeProfileInfo(email, password, name) {
//   const url = "https://norma.nomoreparties.space/api/auth/user";
//   return async function (dispatch) {
//     const requestOption = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + getCookie("accessToken"),
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//         name: name,
//       }),
//     };
//     try {
//       dispatch({
//         type: USER_PROFILE_CHANGE_REQUEST,
//       });
//       const res = await fetch(url, requestOption);
//       const result = await res.json();
//       const last = await result;
//       if (res.ok) {
//         dispatch({
//           type: USER_PROFILE_CHANGE_SUCCESS,
//           value: last,
//         });
//       }
//       if (!res.ok) {
//         if (last.message === "jwt expired") {
//           dispatch(
//             getUserRefresh(
//               getCookie("refreshToken"),
//               changeProfileInfo(email, password, name)
//             )
//           );
//         }
//         throw new Error(last.message);
//       }
//       return last;
//     } catch (error) {
//       dispatch({
//         type: USER_PROFILE_CHANGE_FAILED,
//         value: error.message,
//         error: error.message,
//       });
//       return error;
//     }
//   };
// }

// export function resetPassword(password, token, history) {
//   const url = " https://norma.nomoreparties.space/api/password-reset/reset";
//   return function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         password: password,
//         token: token,
//       }),
//     };
//     (async () => {
//       try {
//         dispatch({
//           type: USER_RESET_REQUEST,
//         });
//         const res = await fetch(url, requestOption);
//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           dispatch({
//             type: USER_RESET_SUCCESS,
//             value: last,
//           });
//           history.replace({ pathname: "/" });
//         }
//         if (!res.ok) {
//           throw new Error(res.status);
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_RESET_FAILED,
//           value: error.status,
//         });
//       }
//     })();
//   };
// }

// export function newUserRegistration(info, history) {
//   const { name, email, password } = info;
//   return function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//         name: name,
//       }),
//     };
//     const url = "https://norma.nomoreparties.space/api/auth/register";
//     (async () => {
//       try {
//         dispatch({
//           type: USER_SIGN_UP_REQUEST,
//         });
//         const res = await fetch(url, requestOption);
//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           dispatch({
//             type: USER_SIGN_UP_SUCCESS,
//             value: last,
//           });
//           history.replace({ pathname: "/login" });
//         }
//         if (!res.ok) {
//           throw new Error(res.status);
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_SIGN_UP_FAILED,
//           value: error.status,
//         });
//       }
//     })();
//   };
// }

// export function userLogin(info) {
//   const { email, password } = info;

//   return function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     };

//     const url = "https://norma.nomoreparties.space/api/auth/login";
//     (async () => {
//       try {
//         dispatch({
//           type: USER_LOG_IN_REQUEST,
//         });
//         const res = await fetch(url, requestOption);

//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           setCookie("accessToken", last.accessToken.split("Bearer ")[1]);
//           document.cookie = `refreshToken=${last.refreshToken}`;
//           dispatch({
//             type: USER_LOG_IN_SUCCESS,
//             value: last,
//           });
//           dispatch({
//             type: INPUT_NAME_VALUE,
//             value: last.user.name,
//           });
//         }
//         if (!res.ok) {
//           dispatch({
//             type: USER_LOG_IN_FAILED,
//             value: res.status,
//           });
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_LOG_IN_FAILED,
//           value: error,
//         });
//       }
//     })();
//   };
// }

// export function sendForgotRequest(info, history) {
//   return function (dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: info,
//       }),
//     };

//     const url = "https://norma.nomoreparties.space/api/password-reset";
//     (async () => {
//       try {
//         dispatch({
//           type: USER_FORGOT_REQUEST,
//         });
//         const res = await fetch(url, requestOption);
//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           dispatch({
//             type: USER_FORGOT_SUCCESS,
//             value: last,
//           });
//         }
//         if (!res.ok) {
//           dispatch({
//             type: USER_FORGOT_FAILED,
//             value: res.status,
//           });
//         }
//       } catch (error) {
//         dispatch({
//           type: USER_FORGOT_FAILED,
//           value: error,
//         });
//       }
//     })();
//   };
// }
