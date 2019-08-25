import {applyMiddleware, createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['setDateRange', 'changeResultType', 'getRecent']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
}
