

export const USER_SIGN_UP_REQUEST = "USER_SIGN_UP_REQUEST";
export const USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_FAILED = "USER_SIGN_UP_FAILED";

export const USER_LOG_IN_REQUEST = "USER_LOG_IN_REQUEST";
export const USER_LOG_IN_SUCCESS = "USER_LOG_IN_SUCCESS";
export const USER_LOG_IN_FAILED = "USER_LOG_IN_FAILED";

export const USER_LOG_OUT_REQUEST = "USER_LOG_OUT_REQUEST";
export const USER_LOG_OUT_SUCCESS = "USER_LOG_OUT_SUCCESS";
export const USER_LOG_OUT_FAILED = "USER_LOG_OUT_FAILED";

export const USER_FORGOT_REQUEST = "USER_FORGOT_REQUEST";
export const USER_FORGOT_SUCCESS = "USER_FORGOT_SUCCESS";
export const USER_FORGOT_FAILED = "USER_FORGOT_FAILED";

export const USER_RESET_REQUEST = "USER_RESET_REQUEST";
export const USER_RESET_SUCCESS = "USER_RESET_SUCCESS";
export const USER_RESET_FAILED = "USER_RESET_FAILED";

export const INPUT_NAME_VALUE = "INPUT_NAME_VALUE";
export const INPUT_EMAIL_VALUE = "INPUT_EMAIL_VALUE";
export const INPUT_PASSWORD_VALUE = "INPUT_PASSWORD_VALUE";
export const INPUT_LETTER_CODE_VALUE = "INPUT_LETTER_CODE_VALUE";
export const INPUT_CLEAN_VALUE = "INPUT_CLEAN_VALUE";

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' 
export const GET_USER_FAILED = 'GET_USER_FAILED'

export const USER_NEED_TO_REFRESH = 'USER_NEED_TO_REFRESH'

export const PROFILE_IS_READY = 'PROFILE_IS_READY'

export const GET_USER_REFRESH_REQUEST = 'GET_USER_REFRESH_REQUEST'
export const GET_USER_REFRESH_SUCCESS = 'GET_USER_REFRESH_SUCCESS'
export const GET_USER_REFRESH_FAILED = 'GET_USER_REFRESH_FAILED'

export const USER_PROFILE_CHANGE_REQUEST = 'USER_PROFILE_CHANGE_REQUEST'
export const USER_PROFILE_CHANGE_SUCCESS = 'USER_PROFILE_CHANGE_SUCCESS'
export const USER_PROFILE_CHANGE_FAILED = 'USER_PROFILE_CHANGE_FAILED'


export const PROFILE_SELECTED = 'PROFILE_SELECTED'

export const CLEAR_ERROR_PROFILE = 'CLEAR_ERROR_PROFILE'
export const CLEAR_ERROR_FOGOT = 'CLEAR_ERROR_FOGOT'

export const CLEAR_ERROR_REGISTRATION = 'CLEAR_ERROR_REGISTRATION'

export function newUserRegistration(info) {
  const { name, email, password } = info;
  return function (dispatch) {

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    };
    const url = "https://norma.nomoreparties.space/api/auth/register";
    (async () => {
      try {
        dispatch({
          type: USER_SIGN_UP_REQUEST,
        });
        const res = await fetch(url, requestOption);
        if (res.ok) {
          const result = await res.json();
          const last = await result
          dispatch({
            type: USER_SIGN_UP_SUCCESS,
            value: last,
          });
        }
        else {
          dispatch({
            type: USER_SIGN_UP_FAILED,
            value: res.status,
          });
        }
      } catch (error) {
        dispatch({
          type: USER_SIGN_UP_FAILED,
          value: error,
        });
      }
    })();
  };
}

export function userLogin(info) {
  const { email, password } = info;

  return function (dispatch) {

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const url = "https://norma.nomoreparties.space/api/auth/login";
    // (async () => {
    //   try {
    //     dispatch({
    //       type: USER_LOG_IN_REQUEST,
    //     });
    //     const res = await fetch(url, requestOption);
      

    //     if (res.ok) {
          
    //       const result = await res.json();
    //       const last = await result
    //       setCookie('accessToken', last.accessToken.split('Bearer ')[1])
    //       document.cookie = `refreshToken=${last.refreshToken}`
    //       dispatch({
    //         type: USER_LOG_IN_SUCCESS,
    //         value: last,
    //       });
    //       dispatch({
    //         type: INPUT_NAME_VALUE,
    //         value: last.user.name
    //       })
    //     }
    //     else {
    //       dispatch({
    //         type: USER_LOG_IN_FAILED,
    //         value: res.status,
    //       });
    //     }
    //   } catch (error) {
    //     dispatch({
    //       type: USER_LOG_IN_FAILED,
    //       value: error,
    //     });
    //   }
    // })();
  };
}


export function sendForgotRequest(info) {
  const { email }= info;
  return function (dispatch) {

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      }),
    };

    const url = "https://norma.nomoreparties.space/api/password-reset";
    (async () => {
      try {
        dispatch({
          type: USER_FORGOT_REQUEST,
        });
        const res = await fetch(url, requestOption);
        if (res.ok) {
          const result = await res.json();
          const last = await result
          dispatch({
            type: USER_FORGOT_SUCCESS,
            value: last
          });
          // dispatch({
          //   type: CLEAR_ERROR_FOGOT
          // })
          // history.replace({pathname: "/reset-password"})
        }
        else {
          dispatch({
            type: USER_FORGOT_FAILED,
            value: res.status
          });
        }
      } catch (error) {
        dispatch({
          type: USER_FORGOT_FAILED,
          value: error
        });
      }
    })();
  };
}


export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
} 

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 



export function getUserRequest() {
  const url = 'https://norma.nomoreparties.space/api/auth/user'
  return function (dispatch) {
    
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
    };

    (async () => {
      try{
        dispatch({
          type: GET_USER_REQUEST,
        });
        console.log(request)
      const res = await fetch(url, request);
      console.log(request)
      if (res.ok) {
        const result = await res.json();
        const last = await result
        dispatch({
          type: GET_USER_SUCCESS,
          value: last,
        });
        dispatch({
          type: USER_NEED_TO_REFRESH,
          value: false
        });
        dispatch({
          type: PROFILE_IS_READY,
          value: true
        })
      } 
      if (res.status === 403) { 
        dispatch({
          type: USER_NEED_TO_REFRESH,
          value: true
        });
        dispatch({
          type: PROFILE_IS_READY,
          value: false
        })
        dispatch({
          type: GET_USER_FAILED,
          error: res.status,
        });
      }

    } catch(error) {
   
        dispatch({
          type: GET_USER_FAILED,
          error: `Ошибка! ${error.message}`,
        });
      }
    })();
  };
}

// export function getUserRefresh(){
//   const url = 'https://norma.nomoreparties.space/api/auth/token'
//   return function(dispatch) {
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json"},
//       body: JSON.stringify({
//         token: getCookie('refreshToken')
//       }),
//     };
//     (async () => {
//       try {
//         dispatch({
//           type: GET_USER_REFRESH_REQUEST,
//         });
//         const res = await fetch(url, requestOption);
//         if (res.ok) {
//           const result = await res.json();
//           const last = await result
//           console.log(last)
//           dispatch({
//             type: GET_USER_REFRESH_SUCCESS,
//             value: last
//           });
//           setCookie('accessToken', last.accessToken.split('Bearer ')[1])
//           document.cookie = `refreshToken=${last.refreshToken}`
//           dispatch({
//             type: PROFILE_IS_READY,
//             value: true
//           })
//         }
//         else {
//           dispatch({
//             type: GET_USER_REFRESH_FAILED,
//             error: res.status,
//           });
//           dispatch({
//             type: PROFILE_IS_READY,
//             value: false
//           })
          
//         } 
//       } catch (error) {
//         dispatch({
//           type: GET_USER_REFRESH_FAILED,
//           error: `Ошибка! ${error.message}`,
//         });
//       }
//     })();
//   }
// }




export function logOut(history){
  const url = 'https://norma.nomoreparties.space/api/auth/logout'
  return function(dispatch){
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "token": getCookie('refreshToken')
      }),
    };
    
    // (async () => {
    //   try{
    //     dispatch({
    //       type: USER_LOG_OUT_REQUEST
    //     })
    //   const res = await fetch(url, requestOption);

    //   if (res.ok) {
        
    //     const result = await res.json();
    //     const last = await result
    //     dispatch({
    //       type: USER_LOG_OUT_SUCCESS,
    //       value: last,
    //     });
    //     setCookie('accessToken', null, { expires: -1 });
    //     setCookie('refreshToken', null, { expires: -1 });
    //     dispatch({
    //       type: INPUT_CLEAN_VALUE,
    //     });
    //     history.replace({pathname: '/login'})
    //   } 
    //   else{
    //     dispatch({
    //       type: USER_LOG_OUT_FAILED,
    //       error: res.status,
    //     });
    //   }

    // } catch(error) {
  
    //     dispatch({
    //       type: USER_LOG_OUT_FAILED,
    //       error: `Ошибка! ${error.message}`,
    //     });
    //   }
    // })();
  }
}


export function fillInfo(userInfo){
  return function(dispatch){
  dispatch({
  type: INPUT_NAME_VALUE,
  value: userInfo.user.name
})
dispatch({
  type: INPUT_EMAIL_VALUE,
  value: userInfo.user.email
})
dispatch({
  type: INPUT_PASSWORD_VALUE,
  value: ''
})
  }
}

export function changeProfileInfo({email, password, name}){
  const url = 'https://norma.nomoreparties.space/api/auth/user'
return function(dispatch){
  const requestOption = {
    method: "PATCH",
    headers: { "Content-Type": "application/json",
    authorization: 'Bearer ' + getCookie('accessToken')},
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  };
  // (async () => {
  //   try {
  //     dispatch({
  //       type: USER_PROFILE_CHANGE_REQUEST,
  //     });
  //     const res = await fetch(url, requestOption);
  //     if (res.ok) {
  //       const result = await res.json();
  //       const last = await result
  //       dispatch({
  //         type: USER_PROFILE_CHANGE_SUCCESS,
  //         value: last,
  //       });
  //     }
  //     else {
  //       dispatch({
  //         type: USER_PROFILE_CHANGE_FAILED,
  //         value: res.status
  //       });
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: USER_PROFILE_CHANGE_FAILED,
  //       value: error,
  //     });
  //   }
  // })();
}
}

export function resetPassword({password, token, history}){
  const url = ' https://norma.nomoreparties.space/api/password-reset/reset'
  return function(dispatch){
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      authorization: 'Bearer ' + getCookie('accessToken')},
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }; 
    // (async () => {
    //   try {
    //     dispatch({
    //       type: USER_RESET_REQUEST,
    //     });
    //     const res = await fetch(url, requestOption);
    //     if (res.ok) {
    //       const result = await res.json();
    //       const last = await result
    //       dispatch({
    //         type: USER_RESET_SUCCESS,
    //         value: last,
    //       });
    //       history.replace({ pathname: '/'})
    //     }
    //     else {
    //       dispatch({
    //         type: USER_RESET_FAILED,
    //         error: res.status
    //       });
    //     }
    //   } catch (error) {
    //     dispatch({
    //       type: USER_RESET_FAILED,
    //       value: error,
    //     });
    //   }
    // })();
  }

}

