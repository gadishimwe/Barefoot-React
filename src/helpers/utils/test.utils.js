import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers/index';

const storeWithMiddlewares = applyMiddleware(thunk, promise)(createStore);
export const store = storeWithMiddlewares(rootReducer);
export const findTestByAttr = (wrapper, val) => {
	return wrapper.find(`[id="${val}"]`);
};
