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
import multiCityReducer from './multiCityReducer';
import oneWayTripReducer from './oneWayTripReducer';
import returnTripReducer from './returnTripReducer';
import managerRequestsReducer from './requestsApprovalReducer';
import commentsReducer from './commentReducer';
import getAccommodationsReducer from './getAccommodationsReducer';
import updateReqStatusReducer from './updateRequestStatusReducer';
import bookAccommodation from './bookAccommodation';
import updateTripReducer from './editTripReducer';
import accommodationReducer from './AccommodationReducer';
import chatReducer from './chatReducer';
import searchReducer from './searchReducer';
import tripStatsReducer from './tripStatsReducer';

export default combineReducers({
	auth: loginReducer,
	signupReducer,
	resetPasswordReducer,
	profileData: profileReducer,
	logoutReducer,
	userReducer,
	setNotification: notificationPrefsReducer,
	tripRequestsReducer,
	tripLocationsReducer,
	multiCityReducer,
	oneWayTripReducer,
	returnTripReducer,
	managerRequestsReducer,
	commentsReducer,
	getAccommodationsReducer,
	updateReqStatusReducer,
	bookAccommodation,
	updateTripReducer,
	accommodationReducer,
	chatReducer,
	searchReducer,
	tripStatsReducer
});
