import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers/index';

const middleware = [thunk, createLogger()];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

export default store;