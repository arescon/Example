import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import reducers from './reducers';

export const history = createBrowserHistory();

function configureStore() {
  return createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        routerMiddleware(history)
      )
    )
  );
}

export const store = configureStore();