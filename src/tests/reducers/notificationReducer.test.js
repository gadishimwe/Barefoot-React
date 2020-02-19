/* eslint-disable no-undef */
import notificationPrefsReducer from '../../redux/reducers/notificationPrefsReducer';

describe('Notification Preference test', () => {
	it('Set Notification is pending', () => {
		const action = {
			type: 'SET_NOTIFICATION_PREFERENCE_PENDING',
			payload: { isEmailNotification: 'true' }
		};
		const response = { loading: true };
		const newState = notificationPrefsReducer({}, action);
		expect(newState).toEqual(response);
	});
	it('Login a user is REJECTED', () => {
		const action = {
			type: 'SET_NOTIFICATION_PREFERENCE_REJECTED',
			payload: {
				response: {
					data: {
						status: 401,
						message: "You don't have an account. Please create an account"
					}
				}
			}
		};
		const response = {
			response: {
				data: {
					status: 401,
					message: "You don't have an account. Please create an account"
				}
			},
			loading: false,
			status: 'FAILED'
		};
		const newState = notificationPrefsReducer({}, action);

		expect(newState).toEqual(response);
	});
	it('Set Notification is FULFILLED', () => {
		const action = {
			type: 'SET_NOTIFICATION_PREFERENCE_FULFILLED',
			payload: {
				message: 'You have updated your notification Preferences'
			}
		};

		const response = {
			loading: false,
			status: 'OK'
		};
		const newState = notificationPrefsReducer({}, action);

		expect(newState).toEqual(response);
	});
});
