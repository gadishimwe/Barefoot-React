import { SET_NOTIFICATION_PREFERENCE } from './actionTypes';
import setNotifsPreferenceService from '../../services/notificationService';

const setNotificationPreferences = payload => {
	return {
		type: SET_NOTIFICATION_PREFERENCE,
		payload: setNotifsPreferenceService(payload)
	};
};

export default setNotificationPreferences;
