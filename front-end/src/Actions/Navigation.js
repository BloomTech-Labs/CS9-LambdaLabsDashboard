import Axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

export const toggleMenu = () => {
  return { type: "TOGGLE_MENU" };
};

export const auth = (id, token) => {
  localStorage.setItem("token", token);
  return { type: "AUTH", id, token };
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: "LOG_OUT" };
};

export const storeUserId = id => {
  return { type: "STORE_USER_ID", id };
};

const checkValidity = token => {
  return dispatch => {
    Axios.post(`${baseURL}/token`, { token })
      .then(res => {
        console.log(res);
        const { auth, _id } = res.data;
        if (auth && _id) dispatch({ type: "AUTH_ON_LOAD", auth, _id });
        else dispatch({ type: "AUTH_ON_LOAD", auth });
      })
      .catch(err => ({ type: "AUTH_ON_LOAD", auth: false }));
  };
};

export const validateToken = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) dispatch(checkValidity(token));
    else dispatch({ type: "AUTH_ON_LOAD", auth: false });
  };
};
