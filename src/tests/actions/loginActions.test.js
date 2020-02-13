/* eslint-disable no-undef */
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { SET_CURRENT_USER } from '../../redux/actions/actionTypes';

import { setCurrentUser } from '../../redux/actions/loginAction';

const mockStore = configureStore([thunk, promise]);
const store = mockStore({});

describe('login actions', () => {
	beforeEach(() => {
		store.clearActions();
	});
	it('should have current user payload and SET_CURRENT_USER type', () => {
		expect(setCurrentUser({ id: '1', name: 'user' })).toEqual(
			expect.objectContaining({
				type: SET_CURRENT_USER,
				payload: { id: '1', name: 'user' },
			}),
		);
	});
});
