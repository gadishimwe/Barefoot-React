/* eslint-disable no-undef */
import resetPasswordReducer from '../../redux/reducers/resetPasswordReducer';

describe('ResetPassword Component', () => {
	it('Should wait for an action', done => {
		const action = {
			type: 'RESET_PASSWORD_PENDING',
			payload: {
				data: {
					data: 200,
					message: 'Password reset success',
				},
			},
		};
		const response = { error: '', message: '', loading: true };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});

	it('Should reset password', done => {
		const action = {
			type: 'RESET_PASSWORD_FULFILLED',
			payload: {
				data: {
					message: 'Password reset success',
				},
			},
		};
		const response = { message: 'Password reset success', loading: false };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});

	it('Should not access the page when no token has been provided', done => {
		const action = {
			type: 'RESET_PASSWORD_REJECTED',
			payload: {
				response: {
					data: {
						message: 'Forbidden',
					},
				},
			},
		};
		const response = { error: 'Forbidden', loading: false };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});
});
