import {
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "./ActionType";

const initalState = {
  user: null,
  loading: null,
  error: null,
  jwt: null,
  updateUser: false,
  searchResult: [],
};

export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case SEARCH_USER_REQUEST:
      return { ...state, searchResult: [], loading: true, error: null };

    // case UPDATE_PROFILE_SUCCESS:
    //   return { ...state, loading: false, error: null, user: action.payload,updateUser:true };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: action.payload,
        error: null,
      };

    case FIND_USER_BY_ID_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };
    case LOGOUT:
      return initalState;

    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
