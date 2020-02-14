/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from '../../redux/actions/actionTypes';
import loginReducer from '../../redux/reducers/loginReducer';

describe('login reducer test', () => {
	it('Login a user is pending', () => {
		const action = {
			type: 'LOGIN_USER_PENDING',
			payload: { email: 'test@test.com', password: '1234' },
		};
		const response = { credentials: {}, error: {}, loading: true };
		const newState = loginReducer({}, action);
		expect(newState).toEqual(response);
	});
	it('Login a user is REJECTED', () => {
		const action = {
			type: 'LOGIN_USER_REJECTED',
			payload: {
				response: {
					data: {
						status: 401,
						message: "You don't have an account. Please create an account",
					},
				},
			},
		};
		const response = {
			credentials: {},
			isAuthenticated: false,
			user: {},
			error: {
				status: 401,
				message: "You don't have an account. Please create an account",
			},
			loading: false,
		};
		const newState = loginReducer({}, action);

		expect(newState).toEqual(response);
	});
	it('Login a user is REJECTED', () => {
		const user = {
			id: 1,
			firstName: 'sample',
			lastName: 'name',
			email: 'someemail@email.ext',
		};
		const token = jwt.sign(user, `${process.env.SECRET_KEY}`, {
			expiresIn: 24,
		});
		const action = {
			type: 'LOGIN_USER_FULFILLED',
			payload: {
				data: { data: token },
			},
		};

		const response = {
			credentials: {},
			isAuthenticated: true,
			token,
			user: {},
			loading: false,
		};
		const newState = loginReducer({}, action);

		expect(newState).toEqual(response);
	});
});
