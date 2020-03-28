import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { store } from './redux/configStore';

import HomePage from './pages/home';
import PostPage from './pages/post';

import Preloader from './components/preloader';

import 'src/styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Preloader />
    <BrowserRouter>
      <Switch>
        <Route path='/post/:id' component={PostPage}/>
        <Route path='/' component={HomePage}/>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('container')
);