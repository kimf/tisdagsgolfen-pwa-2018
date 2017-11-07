import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import thunk from 'redux-thunk';

import app from './reducers/app';

const config = {
  key: 'root',
  debug: true,
  storage,
};

const reducer = persistCombineReducers(config, { app });

const configureStore = () => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [thunk];
  /*  if (__DEV__) {
    middleware.push(freeze)
  } */

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
