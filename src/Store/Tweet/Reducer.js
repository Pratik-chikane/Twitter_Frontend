import {
  BOOKMARK_TWEET_FAILURE,
  BOOKMARK_TWEET_REQUEST,
  BOOKMARK_TWEET_SUCCESS,
  CREATE_RETWEET_FAILURE,
  CREATE_RETWEET_REQUEST,
  CREATE_RETWEET_SUCCESS,
  CREATE_TWEET_FAILURE,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  DELETE_TWEET_FAILURE,
  DELETE_TWEET_REQUEST,
  DELETE_TWEET_SUCCESS,
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_REQUEST,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEET_SUCCESS,
  GET_ALL_USERS_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  REPLAY_TWEET_REQUEST,
  REPLAY_TWEET_SUCCESS,
  USERS_BOOKMARK_TWEET_FAILURE,
  USERS_BOOKMARK_TWEET_REQUEST,
  USERS_BOOKMARK_TWEET_SUCCESS,
  USERS_LIKED_TWEET_FAILURE,
  USERS_LIKED_TWEET_REQUEST,
  USERS_LIKED_TWEET_SUCCESS,
} from "./ActionType";

const initalState = {
  loading: false,
  error: null,
  data: null,
  tweets: [],
  tweet: null,
};

export const tweetReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_TWEET_REQUEST:
    case DELETE_TWEET_REQUEST:
    case LIKE_TWEET_REQUEST:
    case BOOKMARK_TWEET_REQUEST:
    case USERS_LIKED_TWEET_REQUEST:
    case CREATE_RETWEET_REQUEST:
    case FIND_TWEET_BY_ID_REQUEST:
    case USERS_BOOKMARK_TWEET_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_TWEET_FAILURE:
    case DELETE_TWEET_FAILURE:
    case LIKE_TWEET_FAILURE:
    case BOOKMARK_TWEET_FAILURE:
    case USERS_LIKED_TWEET_FAILURE:
    case CREATE_RETWEET_FAILURE:
    case FIND_TWEET_BY_ID_FAILURE:
    case USERS_BOOKMARK_TWEET_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: [action.payload, ...state.tweets],
        error: null,
      };

    case GET_ALL_TWEET_SUCCESS:
    case GET_ALL_USERS_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload,
        error: null,
      };

    case USERS_LIKED_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        likedTweets: action.payload,
        error: null,
      };
    case LIKE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        like: action.payload,
        error: null,
      };
    case USERS_BOOKMARK_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        bookmarkTweets: action.payload,
        error: null,
      };
    case BOOKMARK_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        bookmark: action.payload,
        error: null,
      };
    case CREATE_RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        retweet: action.payload,
        error: null,
      };
    case FIND_TWEET_BY_ID_SUCCESS:
    case REPLAY_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweet: action.payload,
        error: null,
      };
    case DELETE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: state.tweets.filter((tweet) => tweet.id != action.payload),
        error: null,
      };

    default:
      return state;
  }
};
