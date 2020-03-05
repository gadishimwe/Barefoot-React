/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { UPDATE_PROFILE } from '../../redux/actions/actionTypes';
import { updateProfile } from '../../redux/actions/updateProfileActions';

const inputData = {
	id: 44,
	firstName: 'gustave',
	lastName: 'harintwari',
	email: 'higustave@gmail.com',
	gender: 'M',
	birthDate: '1997-01-01T00:00:00.000Z',
	preferredLanguage: 'french',
	preferredCurrency: 'Euro',
	residence: 'Antigua and Barbuda',
	department: null,
	lineManagerId: null,
	role: 'requester',
	profilePicture: 'none'
};

describe('Test updateProfile Actions', () => {
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
					message: 'Profile Updated successfully',
					data: {
						...inputData
					}
				}
			});
		});
		const expectedActions = [
			{
				type: UPDATE_PROFILE,
				payload: {
					...inputData
				}
			}
		];
		const mockStore = configureStore([thunk]);
		const store = mockStore({});
		return store.dispatch(
			updateProfile('M', '1997-01-01', 'french', 'Euro', 'Burundi', 'profilepictureurl'),
			() => {
				expect(store.getActions()).toEqual(expectedActions);
			}
		);
	});
});
