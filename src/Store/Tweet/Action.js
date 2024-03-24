import { api } from "../../Config/Api";
import {
    BOOKMARK_TWEET_FAILURE,
    BOOKMARK_TWEET_SUCCESS,
  CREATE_RETWEET_FAILURE,
  CREATE_RETWEET_SUCCESS,
  CREATE_TWEET_FAILURE,
  CREATE_TWEET_SUCCESS,
  DELETE_TWEET_FAILURE,
  DELETE_TWEET_SUCCESS,
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEET_FAILURE,
  GET_ALL_TWEET_SUCCESS,
  GET_ALL_USERS_TWEET_FAILURE,
  GET_ALL_USERS_TWEET_REQUEST,
  GET_ALL_USERS_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_SUCCESS,
  REPLAY_TWEET_FAILURE,
  REPLAY_TWEET_SUCCESS,
  USERS_BOOKMARK_TWEET_FAILURE,
  USERS_BOOKMARK_TWEET_SUCCESS,
  USERS_LIKED_TWEET_FAILURE,
  USERS_LIKED_TWEET_SUCCESS,
} from "./ActionType";

export const getAllTweets = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/tweets/");
    console.log("GET ALL TWEETS", data);

    dispatch({ type: GET_ALL_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("GET ALL TWEETS ERROR", error.message);
    dispatch({ type: GET_ALL_TWEET_FAILURE, payload: error.message });
  }
};

export const getUsersAllTweets = (userId) => async (dispatch) => {
  dispatch({type:GET_ALL_USERS_TWEET_REQUEST});
  try {
    const { data } = await api.get(`/api/tweets/user/${userId}`);
    console.log("GET ALL USEr TWEETS", data);

    dispatch({ type: GET_ALL_USERS_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("GET ALL TWEETS USER ERROR", error.message);
    dispatch({ type: GET_ALL_USERS_TWEET_FAILURE, payload: error.message });
  }
};
export const getAllUsersLikedTweets = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweets/user/${userId}/likes`);
    console.log("GET ALL USEr Liked TWEETS", data);

    dispatch({ type: USERS_LIKED_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("GET ALL Like ERROR", error.message);
    dispatch({ type: USERS_LIKED_TWEET_FAILURE, payload: error.message });
  }
};
export const findTweetById = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweets/${tweetId}`);
    console.log(" TWEET By id", data);

    dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("TWEET By id", error.message);
    dispatch({ type: FIND_TWEET_BY_ID_FAILURE, payload: error.message });
  }
};
export const getAllUsersBookmarkTweets = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweets/user/${userId}/bookmarks`);
    console.log("GET ALL USEr bookmark TWEETS", data);

    dispatch({ type: USERS_BOOKMARK_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("GET ALL bookmark ERROR", error.message);
    dispatch({ type: USERS_BOOKMARK_TWEET_FAILURE, payload: error.message });
  }
};
export const createTweet = (tweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/tweets/create`, tweetData);
    console.log("create TWEET ", data);

    dispatch({ type: CREATE_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log(" create TWEET ", error.message);
    dispatch({ type: CREATE_TWEET_FAILURE, payload: error.message });
  }
};
export const createTweetReplay = (tweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/tweets/replay`, tweetData);
    console.log("create TWEET Replay", data);

    dispatch({ type: REPLAY_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log(" create TWEET Replay", error.message);
    dispatch({ type: REPLAY_TWEET_FAILURE, payload: error.message });
  }
};
export const createRetweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/tweets/${tweetId}/retweet`);
    console.log("RE TWEET ", data);

    dispatch({ type: CREATE_RETWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("RE TWEET ", error.message);
    dispatch({ type: CREATE_RETWEET_FAILURE, payload: error.message });
  }
};
export const deleteTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/tweets/${tweetId}`);
    console.log("DELETE TWEET ", data);

    dispatch({ type: DELETE_TWEET_SUCCESS, payload: tweetId });
  } catch (error) {
    console.log("RE TWEET ", error.message);
    dispatch({ type: DELETE_TWEET_FAILURE, payload: error.message });
  }
};
export const likeUnlikeTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${tweetId}/like`);
    console.log("like TWEET ", data);

    dispatch({ type: LIKE_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("like TWEET ", error.message);
    dispatch({ type: LIKE_TWEET_FAILURE, payload: error.message });
  }
};
export const BookmarkUnbookmarkTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${tweetId}/bookmark`);
    console.log("bookmark TWEET ", data);

    dispatch({ type: BOOKMARK_TWEET_SUCCESS, payload: data });
  } catch (error) {
    console.log("bookmark TWEET ", error.message);
    dispatch({ type: BOOKMARK_TWEET_FAILURE, payload: error.message });
  }
};
