// export const socketMiddleware = (url, token) => {
//   return (store) => {
//     let socket = null;
//     return (next) => (action) => {
//       const { dispatch } = store;
//       const { type, value } = action;

//       if (type === "WS_CONNECTION_START") {
//           token ? socket = new WebSocket(`${url}?token=${token}`) : socket = new WebSocket(url);
//       }
//       if (socket) {
//         socket.onopen = (event) => {
//           dispatch({ type: "WS_CONNECTION_SUCCESS", value: event });
//         };
//         socket.onerror = (event) => {
//           dispatch({ type: "WS_CONNECTION_ERROR", value: event });
//         };
//         socket.onmessage = (event) => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           dispatch({ type: "WS_GET_MESSAGE", value: parsedData });
//         };
//         socket.onclose = (event) => {
//           dispatch({ type: "WS_CONNECTION_CLOSED", value: event });
//         };
//         // if (type === "WS_SEND_MESSAGE") {
//         //   const message = value;
//         //     token ? message.token = token : null
//         //   socket.send(JSON.stringify(message));
//         // };
//       }
//       next(action);
//     };
//   };
// };
