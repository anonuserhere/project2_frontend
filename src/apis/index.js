import axios from "axios";

const headersData = {};
if (window.localStorage.getItem("token")) {
  headersData["Authorization"] = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
}
if (window.localStorage.getItem("uid")) {
  headersData["uid"] = window.localStorage.getItem("uid");
}

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL,
  headers: headersData,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error status", error.response.status);
    return Promise.reject(error);
  }
);

export const setAuthHeader = (uid, token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  API.defaults.headers.common["uid"] = uid;
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("uid", uid);
};

export const clearAuthHeader = () => {
  delete API.defaults.headers.common["Authorization"];
  delete API.defaults.headers.common["uid"];
  window.localStorage.clear();
};

export default API;
