import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import home from './home';

const appReducer = combineReducers({
  router: routerReducer,
  home,
  form: formReducer
})

export default (state, action) => {
  return appReducer(state, action);
}