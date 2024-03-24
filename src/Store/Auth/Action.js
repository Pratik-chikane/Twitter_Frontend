import axios from "axios";
import { API_BASE_URL, api } from "../../Config/Api";
import {
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    console.log("OLOGIN DATEA", loginData);
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("LOGIN", data.jwt);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("LOGIN ERROR", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};
export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    console.log("REGISTER", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("REGISTER ERROR", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};
export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("PROFILE", data);

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("GET PROFILE ERROR", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    console.log("user id ", data);

    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("luser id", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`,userData);
    console.log("user update profile ", data);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("user update profile ", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
  }
};

export const followUnfollowUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("user followed ", data);

    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("user followed", error.message);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};
export const searchUser = (query) => async (dispatch) => {
  dispatch({type:SEARCH_USER_REQUEST})
  try {
    const response = await api.get(`/api/users/search?query=${query}`);
    const users = response.data;
    console.log("search result -: ", users);

    dispatch({ type: SEARCH_USER_SUCCESS, payload: users });
  } catch (error) {
    console.log("user followed", error.message);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};





export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};


export const loginWithGoogleAction = (data) => async (dispatch) => {
  dispatch({type:GOOGLE_LOGIN_REQUEST});
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin/google`, data);
    const user = response.data;
    console.log("login with google user -: ", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch({type:GOOGLE_LOGIN_SUCCESS,payload:user.jwt});
  } catch (error) {
    dispatch({type:GOOGLE_LOGIN_FAILURE, payload: error.message || "An error occurred during login."});
  }
};