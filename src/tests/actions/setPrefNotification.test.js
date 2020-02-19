/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { SET_NOTIFICATION_PREFERENCE } from '../../redux/actions/actionTypes';
import setNotificationPreferences from '../../redux/actions/notificationPreferenceAction';

const inputData = {
	isEmailNotification: true
};

describe('Set preferred mode of notification Actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	test('Should Return Expected Action ', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'Successfully updated you preferences'
				}
			});
		});
		const expectedActions = [
			{
				type: SET_NOTIFICATION_PREFERENCE,
				payload: {
					...inputData
				}
			}
		];
		const mockStore = configureStore([thunk]);
		const store = mockStore({});
		return store.dispatch(setNotificationPreferences('true'), () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
