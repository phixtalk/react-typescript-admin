import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Provider } from "react-redux";

import configureStore from "./redux/configStore";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "./redux/configStore";
// import persistor from "./redux/configStore";
// import store from "./redux/configStore";

axios.defaults.baseURL = "http://localhost/laravel/laravel-admin/public/api/";
// axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
axios.defaults.withCredentials = true; //allows us to use cookies back and front, from backend to frontend

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
