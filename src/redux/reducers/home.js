import {
  SET_POSTS,
  SET_POST,
  SET_USERS,
  SET_LOADING
} from '../actions/home';

const initStore = {
  posts: [],
  users: [],
  loading: false,
  post: {}
};

const handlers = (state = initStore, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload.posts,
      }
    }
    case SET_POST: {
      return {
        ...state,
        post: action.payload.post,
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload.status,
      }
    }
    default:
      return state;
  }
};

export default handlers;