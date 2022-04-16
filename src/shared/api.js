import axios from "axios";
import React from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  // headers: {
  //   "content-type": "application/json;charset=UTF-8",
  //   accept: "application/json,",
  // },
});

// api.interceptors.request.use(function (config) {
//   const accessToken = localStorage.getItem("token");
//   // console.log(accessToken);
//   // const refreshToken = document.token.split("=")[2];
//   config.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   // config.headers.common["refreshToken"] = `Bearer ${refreshToken}`;
//   // console.log(config);
//   return config;
// });

export default api;
