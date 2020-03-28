import { Get } from 'src/helpers/api';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';
export const SET_USERS = 'SET_USERS';
export const SET_LOADING = 'SET_LOADING';

// хранение списка постов
export function set_posts(data) {
  return dispatch => {
    dispatch({
      type: SET_POSTS,
      payload: {
        posts: data
      }
    })
  }
}

export function set_post(data) {
  return dispatch => {
    dispatch({
      type: SET_POST,
      payload: {
        post: data
      }
    })
  }
}

// хранение списка пользователей
export function set_users(data) {
  
  data.unshift({ value: null, label: 'All users'});

  return dispatch => {
    dispatch({
      type: SET_USERS,
      payload: {
        users: data
      }
    })
  }
}

export function set_loading(status) {

  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: {
        status
      }
    })
  }
}