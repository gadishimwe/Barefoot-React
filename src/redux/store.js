/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const configureStore = () => {
	return createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk, promise)));
};

export default configureStore;
