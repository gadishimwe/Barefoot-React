/* eslint-disable no-undef */
import logoutReducer from '../../redux/reducers/logoutReducer';

describe('Test logout reducer', () => {
	it('should logout', () => {
		expect(logoutReducer(undefined, { type: 'LOGOUT_USER_PENDING' })).toEqual({
			error: {},
			isAuthenticated: true,
			loading: true,
			token: undefined,
			user: undefined
		});
	});
	it('should logout', () => {
		expect(logoutReducer(undefined, { type: 'LOGOUT_USER_FULFILLED' })).toEqual({
			error: {},
			isAuthenticated: false,
			loading: false,
			token: '',
			user: {}
		});
	});
	it('should logout', () => {
		expect(
			logoutReducer(undefined, {
				type: 'LOGOUT_USER_REJECTED',
				payload: { response: { data: 'data' } }
			})
		).toEqual({
			error: 'data',
			isAuthenticated: false,
			loading: false,
			token: undefined,
			user: {}
		});
	});
});
