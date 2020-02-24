/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { LOGOUT_USER } from '../../redux/actions/actionTypes';
import { logoutUser } from '../../redux/actions/logoutAction';


describe('Test logout Actions', () => {
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
					message: 'succesfully logged out',
				}
			});
		});
		const expectedActions = [
			{
				type: LOGOUT_USER,
				payload: {}
			}
		];
		const mockStore = configureStore([thunk]);
		const store = mockStore({});
		return store.dispatch(logoutUser(), () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
