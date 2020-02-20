import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import resetPasswordReducer from './resetPasswordReducer';
import profileReducer from './updateProfile';
import logoutReducer from './logoutReducer';
import userReducer from './userReducer';
import notificationPrefsReducer from './notificationPrefsReducer';
import tripRequestsReducer from './tripRequestsReducer';
import tripLocationsReducer from './tripLocationsReducer';

export default combineReducers({
	auth: loginReducer,
	signupReducer,
	resetPasswordReducer,
	profileData: profileReducer,
	logoutReducer,
	userReducer,
	setNotification: notificationPrefsReducer,
	tripRequestsReducer,
	tripLocationsReducer
});
