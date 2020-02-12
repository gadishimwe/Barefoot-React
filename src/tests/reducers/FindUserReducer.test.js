/* eslint-disable no-undef */
import resetPasswordReducer from '../../redux/reducers/resetPasswordReducer';

describe('FindUser Component', () => {
	it('Should wait for an action', done => {
		const action = {
			type: 'FIND_USER_PENDING',
			payload: {
				data: {
					data: 200,
					message: 'Check your email',
				},
			},
		};
		const response = { error: '', message: '', loading: true };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});

	it('Should send an email when an account has been found', done => {
		const action = {
			type: 'FIND_USER_FULFILLED',
			payload: {
				data: {
					message: 'Check your email',
				},
			},
		};
		const response = { message: 'Check your email', loading: false };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});

	it('Should not send email when acount has not been found', done => {
		const action = {
			type: 'FIND_USER_REJECTED',
			payload: {
				response: {
					data: {
						message: 'No results found',
					},
				},
			},
		};
		const response = { error: 'No results found', loading: false };
		const newState = resetPasswordReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});
});
