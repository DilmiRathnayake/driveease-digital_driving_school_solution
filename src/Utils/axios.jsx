import axios from "axios";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./localStorage";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
    config.headers.Accept = `application/json`;
    config.headers.ContentType = `application/json`;
  }

  

  return config;
});

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      removeUserFromLocalStorage();
      window.location = "/";
    }

    if (error?.response?.status === 403) {
      removeUserFromLocalStorage();
      window.location = "/";
    }

    // if (error?.code === "ERR_NETWORK") {
    //   removeUserFromLocalStorage();
    //   window.location = "/";
    // }

    return error;
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
