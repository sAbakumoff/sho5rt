import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

var theReducer = combineReducers(reducers);
export default (initialState)=>createStore(theReducer, initialState, applyMiddleware(thunkMiddleware, logger));
