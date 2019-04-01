import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import './index.css';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import ReduxPromise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import {
  USERS, PROFILE, STOCK, NOTIFCATIONS
} from './routes';
import watcherSaga from './sagas';
import reducers from './reducers';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, logger, ReduxPromise),
  ),
);
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter
      initialEntries={[USERS, STOCK, PROFILE, NOTIFCATIONS]}
      initialIndex={0}
    >
      <App />
    </MemoryRouter>
  </Provider>,
  document.getElementById('root'),
);
