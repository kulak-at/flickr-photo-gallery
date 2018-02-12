import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

export default store;
