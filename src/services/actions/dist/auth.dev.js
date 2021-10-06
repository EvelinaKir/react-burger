"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserRegistration = newUserRegistration;
exports.userLogin = userLogin;
exports.sendForgotRequest = sendForgotRequest;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.getUserRequest = getUserRequest;
exports.getUserRefresh = getUserRefresh;
exports.logOut = logOut;
exports.changeProfileInfo = changeProfileInfo;
exports.withTokenRef = withTokenRef;
exports.resetPassword = resetPassword;
exports.clearNoLogIn = clearNoLogIn;
exports.loggedInInput = loggedInInput;
exports.CLEAR_ERROR_REGISTRATION = exports.CLEAR_ERROR_FORGOT = exports.CLEAR_ERROR_PROFILE = exports.PROFILE_SELECTED = exports.USER_PROFILE_CHANGE_FAILED = exports.USER_PROFILE_CHANGE_SUCCESS = exports.USER_PROFILE_CHANGE_REQUEST = exports.GET_USER_REFRESH_FAILED = exports.GET_USER_REFRESH_SUCCESS = exports.GET_USER_REFRESH_REQUEST = exports.PROFILE_IS_READY = exports.USER_NEED_TO_REFRESH = exports.GET_USER_FAILED = exports.GET_USER_SUCCESS = exports.GET_USER_REQUEST = exports.INPUT_CLEAN_VALUE = exports.INPUT_LETTER_CODE_VALUE = exports.INPUT_PASSWORD_VALUE = exports.INPUT_EMAIL_VALUE = exports.INPUT_NAME_VALUE = exports.USER_RESET_FAILED = exports.USER_RESET_SUCCESS = exports.USER_RESET_REQUEST = exports.USER_FORGOT_FAILED = exports.USER_FORGOT_SUCCESS = exports.USER_FORGOT_REQUEST = exports.USER_LOG_OUT_FAILED = exports.USER_LOG_OUT_SUCCESS = exports.USER_LOG_OUT_REQUEST = exports.USER_LOG_IN_FAILED = exports.USER_LOG_IN_SUCCESS = exports.USER_LOG_IN_REQUEST = exports.USER_SIGN_UP_FAILED = exports.USER_SIGN_UP_SUCCESS = exports.USER_SIGN_UP_REQUEST = void 0;
var USER_SIGN_UP_REQUEST = "USER_SIGN_UP_REQUEST";
exports.USER_SIGN_UP_REQUEST = USER_SIGN_UP_REQUEST;
var USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
exports.USER_SIGN_UP_SUCCESS = USER_SIGN_UP_SUCCESS;
var USER_SIGN_UP_FAILED = "USER_SIGN_UP_FAILED";
exports.USER_SIGN_UP_FAILED = USER_SIGN_UP_FAILED;
var USER_LOG_IN_REQUEST = "USER_LOG_IN_REQUEST";
exports.USER_LOG_IN_REQUEST = USER_LOG_IN_REQUEST;
var USER_LOG_IN_SUCCESS = "USER_LOG_IN_SUCCESS";
exports.USER_LOG_IN_SUCCESS = USER_LOG_IN_SUCCESS;
var USER_LOG_IN_FAILED = "USER_LOG_IN_FAILED";
exports.USER_LOG_IN_FAILED = USER_LOG_IN_FAILED;
var USER_LOG_OUT_REQUEST = "USER_LOG_OUT_REQUEST";
exports.USER_LOG_OUT_REQUEST = USER_LOG_OUT_REQUEST;
var USER_LOG_OUT_SUCCESS = "USER_LOG_OUT_SUCCESS";
exports.USER_LOG_OUT_SUCCESS = USER_LOG_OUT_SUCCESS;
var USER_LOG_OUT_FAILED = "USER_LOG_OUT_FAILED";
exports.USER_LOG_OUT_FAILED = USER_LOG_OUT_FAILED;
var USER_FORGOT_REQUEST = "USER_FORGOT_REQUEST";
exports.USER_FORGOT_REQUEST = USER_FORGOT_REQUEST;
var USER_FORGOT_SUCCESS = "USER_FORGOT_SUCCESS";
exports.USER_FORGOT_SUCCESS = USER_FORGOT_SUCCESS;
var USER_FORGOT_FAILED = "USER_FORGOT_FAILED";
exports.USER_FORGOT_FAILED = USER_FORGOT_FAILED;
var USER_RESET_REQUEST = "USER_RESET_REQUEST";
exports.USER_RESET_REQUEST = USER_RESET_REQUEST;
var USER_RESET_SUCCESS = "USER_RESET_SUCCESS";
exports.USER_RESET_SUCCESS = USER_RESET_SUCCESS;
var USER_RESET_FAILED = "USER_RESET_FAILED";
exports.USER_RESET_FAILED = USER_RESET_FAILED;
var INPUT_NAME_VALUE = "INPUT_NAME_VALUE";
exports.INPUT_NAME_VALUE = INPUT_NAME_VALUE;
var INPUT_EMAIL_VALUE = "INPUT_EMAIL_VALUE";
exports.INPUT_EMAIL_VALUE = INPUT_EMAIL_VALUE;
var INPUT_PASSWORD_VALUE = "INPUT_PASSWORD_VALUE";
exports.INPUT_PASSWORD_VALUE = INPUT_PASSWORD_VALUE;
var INPUT_LETTER_CODE_VALUE = "INPUT_LETTER_CODE_VALUE";
exports.INPUT_LETTER_CODE_VALUE = INPUT_LETTER_CODE_VALUE;
var INPUT_CLEAN_VALUE = "INPUT_CLEAN_VALUE";
exports.INPUT_CLEAN_VALUE = INPUT_CLEAN_VALUE;
var GET_USER_REQUEST = "GET_USER_REQUEST";
exports.GET_USER_REQUEST = GET_USER_REQUEST;
var GET_USER_SUCCESS = "GET_USER_SUCCESS";
exports.GET_USER_SUCCESS = GET_USER_SUCCESS;
var GET_USER_FAILED = "GET_USER_FAILED";
exports.GET_USER_FAILED = GET_USER_FAILED;
var USER_NEED_TO_REFRESH = "USER_NEED_TO_REFRESH";
exports.USER_NEED_TO_REFRESH = USER_NEED_TO_REFRESH;
var PROFILE_IS_READY = "PROFILE_IS_READY";
exports.PROFILE_IS_READY = PROFILE_IS_READY;
var GET_USER_REFRESH_REQUEST = "GET_USER_REFRESH_REQUEST";
exports.GET_USER_REFRESH_REQUEST = GET_USER_REFRESH_REQUEST;
var GET_USER_REFRESH_SUCCESS = "GET_USER_REFRESH_SUCCESS";
exports.GET_USER_REFRESH_SUCCESS = GET_USER_REFRESH_SUCCESS;
var GET_USER_REFRESH_FAILED = "GET_USER_REFRESH_FAILED";
exports.GET_USER_REFRESH_FAILED = GET_USER_REFRESH_FAILED;
var USER_PROFILE_CHANGE_REQUEST = "USER_PROFILE_CHANGE_REQUEST";
exports.USER_PROFILE_CHANGE_REQUEST = USER_PROFILE_CHANGE_REQUEST;
var USER_PROFILE_CHANGE_SUCCESS = "USER_PROFILE_CHANGE_SUCCESS";
exports.USER_PROFILE_CHANGE_SUCCESS = USER_PROFILE_CHANGE_SUCCESS;
var USER_PROFILE_CHANGE_FAILED = "USER_PROFILE_CHANGE_FAILED";
exports.USER_PROFILE_CHANGE_FAILED = USER_PROFILE_CHANGE_FAILED;
var PROFILE_SELECTED = "PROFILE_SELECTED";
exports.PROFILE_SELECTED = PROFILE_SELECTED;
var CLEAR_ERROR_PROFILE = "CLEAR_ERROR_PROFILE";
exports.CLEAR_ERROR_PROFILE = CLEAR_ERROR_PROFILE;
var CLEAR_ERROR_FORGOT = "CLEAR_ERROR_FORGOT";
exports.CLEAR_ERROR_FORGOT = CLEAR_ERROR_FORGOT;
var CLEAR_ERROR_REGISTRATION = "CLEAR_ERROR_REGISTRATION";
exports.CLEAR_ERROR_REGISTRATION = CLEAR_ERROR_REGISTRATION;

function newUserRegistration(info, history) {
  var name = info.name,
      email = info.email,
      password = info.password;
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    };
    var url = "https://norma.nomoreparties.space/api/auth/register";

    (function _callee() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              dispatch({
                type: USER_SIGN_UP_REQUEST
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context.sent;

              if (!res.ok) {
                _context.next = 14;
                break;
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(res.json());

            case 8:
              result = _context.sent;
              _context.next = 11;
              return regeneratorRuntime.awrap(result);

            case 11:
              last = _context.sent;
              dispatch({
                type: USER_SIGN_UP_SUCCESS,
                value: last
              });
              history.replace({
                pathname: "/login"
              });

            case 14:
              if (res.ok) {
                _context.next = 16;
                break;
              }

              throw new Error(res.status);

            case 16:
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              dispatch({
                type: USER_SIGN_UP_FAILED,
                value: _context.t0.status
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 18]]);
    })();
  };
}

function userLogin(info) {
  var email = info.email,
      password = info.password;
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    var url = "https://norma.nomoreparties.space/api/auth/login";

    (function _callee2() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              dispatch({
                type: USER_LOG_IN_REQUEST
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context2.sent;

              if (!res.ok) {
                _context2.next = 16;
                break;
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(res.json());

            case 8:
              result = _context2.sent;
              _context2.next = 11;
              return regeneratorRuntime.awrap(result);

            case 11:
              last = _context2.sent;
              setCookie("accessToken", last.accessToken.split("Bearer ")[1]);
              document.cookie = "refreshToken=".concat(last.refreshToken);
              dispatch({
                type: USER_LOG_IN_SUCCESS,
                value: last
              });
              dispatch({
                type: INPUT_NAME_VALUE,
                value: last.user.name
              });

            case 16:
              if (!res.ok) {
                dispatch({
                  type: USER_LOG_IN_FAILED,
                  value: res.status
                });
              }

              _context2.next = 22;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              dispatch({
                type: USER_LOG_IN_FAILED,
                value: _context2.t0
              });

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 19]]);
    })();
  };
}

function sendForgotRequest(info, history) {
  var email = info.email;
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    };
    var url = "https://norma.nomoreparties.space/api/password-reset";

    (function _callee3() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              dispatch({
                type: USER_FORGOT_REQUEST
              });
              _context3.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context3.sent;

              if (!res.ok) {
                _context3.next = 13;
                break;
              }

              _context3.next = 8;
              return regeneratorRuntime.awrap(res.json());

            case 8:
              result = _context3.sent;
              _context3.next = 11;
              return regeneratorRuntime.awrap(result);

            case 11:
              last = _context3.sent;
              dispatch({
                type: USER_FORGOT_SUCCESS,
                value: last
              });

            case 13:
              if (!res.ok) {
                dispatch({
                  type: USER_FORGOT_FAILED,
                  value: res.status
                });
              }

              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              dispatch({
                type: USER_FORGOT_FAILED,
                value: _context3.t0
              });

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 16]]);
    })();
  };
}

function setCookie(name, value, props) {
  props = props || {};
  var exp = props.expires;

  if (typeof exp == "number" && exp) {
    var d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;

  for (var propName in props) {
    updatedCookie += "; " + propName;
    var propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getUserRequest() {
  var url = "https://norma.nomoreparties.space/api/auth/user";
  return function (dispatch) {
    var request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken")
      }
    };

    (function _callee4() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              dispatch({
                type: GET_USER_REQUEST
              });
              _context4.next = 4;
              return regeneratorRuntime.awrap(fetch(url, request));

            case 4:
              res = _context4.sent;
              _context4.next = 7;
              return regeneratorRuntime.awrap(res.json());

            case 7:
              result = _context4.sent;
              _context4.next = 10;
              return regeneratorRuntime.awrap(result);

            case 10:
              last = _context4.sent;

              if (res.ok) {
                dispatch({
                  type: GET_USER_SUCCESS,
                  value: last
                });
                dispatch({
                  type: USER_NEED_TO_REFRESH,
                  value: false
                });
                dispatch({
                  type: PROFILE_IS_READY,
                  value: true
                });
              }

              if (res.ok) {
                _context4.next = 14;
                break;
              }

              throw new Error(last.message);

            case 14:
              _context4.next = 21;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              dispatch({
                type: USER_NEED_TO_REFRESH,
                value: true
              });
              dispatch({
                type: PROFILE_IS_READY,
                value: false
              });
              dispatch({
                type: GET_USER_FAILED,
                errorMessage: _context4.t0.message
              });

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 16]]);
    })();
  };
}

function getUserRefresh(token) {
  var url = "https://norma.nomoreparties.space/api/auth/token";
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token
      })
    };

    (function _callee5() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              dispatch({
                type: GET_USER_REFRESH_REQUEST
              });
              _context5.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context5.sent;
              _context5.next = 7;
              return regeneratorRuntime.awrap(res.json());

            case 7:
              result = _context5.sent;
              _context5.next = 10;
              return regeneratorRuntime.awrap(result);

            case 10:
              last = _context5.sent;

              if (res.ok) {
                dispatch({
                  type: GET_USER_REFRESH_SUCCESS,
                  value: last
                });
                document.cookie = "accessToken=".concat(last.accessToken.split("Bearer ")[1], "; path=/");
                document.cookie = "refreshToken=".concat(last.refreshToken, "; path=/");
                dispatch({
                  type: PROFILE_IS_READY,
                  value: true
                });
              }

              if (res.ok) {
                _context5.next = 14;
                break;
              }

              throw new Error(last.message);

            case 14:
              _context5.next = 20;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](0);
              dispatch({
                type: GET_USER_REFRESH_FAILED,
                errorMessage: _context5.t0.message
              });
              dispatch({
                type: PROFILE_IS_READY,
                value: false
              });

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 16]]);
    })();
  };
}

function logOut(history) {
  var url = "https://norma.nomoreparties.space/api/auth/logout";
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: getCookie("refreshToken")
      })
    };

    (function _callee6() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              dispatch({
                type: USER_LOG_OUT_REQUEST
              });
              _context6.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context6.sent;

              if (!res.ok) {
                _context6.next = 17;
                break;
              }

              _context6.next = 8;
              return regeneratorRuntime.awrap(res.json());

            case 8:
              result = _context6.sent;
              _context6.next = 11;
              return regeneratorRuntime.awrap(result);

            case 11:
              last = _context6.sent;
              dispatch({
                type: USER_LOG_OUT_SUCCESS,
                value: last
              });
              setCookie("accessToken", null, {
                expires: -1
              });
              setCookie("refreshToken", null, {
                expires: -1
              });
              dispatch({
                type: INPUT_CLEAN_VALUE
              });
              history.replace({
                pathname: "/login"
              });

            case 17:
              if (res.ok) {
                _context6.next = 19;
                break;
              }

              throw new Error(res.status);

            case 19:
              _context6.next = 24;
              break;

            case 21:
              _context6.prev = 21;
              _context6.t0 = _context6["catch"](0);
              dispatch({
                type: USER_LOG_OUT_FAILED,
                error: _context6.t0.message
              });

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 21]]);
    })();
  };
}

function changeProfileInfo(_ref) {
  var email = _ref.email,
      password = _ref.password,
      name = _ref.name;
  var url = "https://norma.nomoreparties.space/api/auth/user";
  return function (dispatch) {
    var requestOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getCookie("accessToken")
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    };

    (function _callee7() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              dispatch({
                type: USER_PROFILE_CHANGE_REQUEST
              });
              _context7.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context7.sent;
              _context7.next = 7;
              return regeneratorRuntime.awrap(res.json());

            case 7:
              result = _context7.sent;
              _context7.next = 10;
              return regeneratorRuntime.awrap(result);

            case 10:
              last = _context7.sent;

              if (res.ok) {
                dispatch({
                  type: USER_PROFILE_CHANGE_SUCCESS,
                  value: last
                });
              }

              if (res.ok) {
                _context7.next = 14;
                break;
              }

              throw new Error(last.message);

            case 14:
              _context7.next = 19;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](0);
              dispatch({
                type: USER_PROFILE_CHANGE_FAILED,
                value: _context7.t0.message,
                error: _context7.t0.message
              });

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 16]]);
    })();
  };
}

function withTokenRef(url, options, error, requestFunction) {
  return function (dispatch) {
    dispatch(requestFunction);

    if (error) {
      dispatch(getUserRefresh(getCookie("refreshToken")));
    }
  };
}

function resetPassword(_ref2) {
  var password = _ref2.password,
      token = _ref2.token,
      history = _ref2.history;
  var url = " https://norma.nomoreparties.space/api/password-reset/reset";
  return function (dispatch) {
    var requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getCookie("accessToken")
      },
      body: JSON.stringify({
        password: password,
        token: token
      })
    };

    (function _callee8() {
      var res, result, last;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              dispatch({
                type: USER_RESET_REQUEST
              });
              _context8.next = 4;
              return regeneratorRuntime.awrap(fetch(url, requestOption));

            case 4:
              res = _context8.sent;

              if (!res.ok) {
                _context8.next = 14;
                break;
              }

              _context8.next = 8;
              return regeneratorRuntime.awrap(res.json());

            case 8:
              result = _context8.sent;
              _context8.next = 11;
              return regeneratorRuntime.awrap(result);

            case 11:
              last = _context8.sent;
              dispatch({
                type: USER_RESET_SUCCESS,
                value: last
              });
              history.replace({
                pathname: "/"
              });

            case 14:
              if (res.ok) {
                _context8.next = 16;
                break;
              }

              throw new Error(res.status);

            case 16:
              _context8.next = 21;
              break;

            case 18:
              _context8.prev = 18;
              _context8.t0 = _context8["catch"](0);
              dispatch({
                type: USER_RESET_FAILED,
                value: _context8.t0.status
              });

            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[0, 18]]);
    })();
  };
}

function clearNoLogIn() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ERROR_PROFILE
    });
    dispatch({
      type: CLEAR_ERROR_FORGOT
    });
    dispatch({
      type: CLEAR_ERROR_REGISTRATION
    });
    dispatch({
      type: INPUT_PASSWORD_VALUE,
      value: ""
    });
    dispatch({
      type: INPUT_NAME_VALUE,
      value: ""
    });
    dispatch({
      type: INPUT_EMAIL_VALUE,
      value: ""
    });
  };
}
