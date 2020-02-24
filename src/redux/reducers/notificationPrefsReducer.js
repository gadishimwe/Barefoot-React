import { SET_NOTIFICATION_PREFERENCE } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
	isEmailNotification: false,
	isInAppNotification: true,
	loading: false,
	status: ''
};

const notificationPrefsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SET_NOTIFICATION_PREFERENCE):
			return {
				...state,
				loading: true
			};
		case fulfilled(SET_NOTIFICATION_PREFERENCE):
			return {
				loading: false,
				status: 'OK'
			};
		case rejected(SET_NOTIFICATION_PREFERENCE):
			return {
				...action.payload,
				loading: false,
				status: 'FAILED'
			};
		default:
			return state;
	}
};

export default notificationPrefsReducer;
