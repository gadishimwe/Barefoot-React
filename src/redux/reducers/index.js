import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import resetPasswordReducer from './resetPasswordReducer';

export default combineReducers({
	signupReducer,
	auth: resetPasswordReducer,
});
