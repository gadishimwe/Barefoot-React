/* eslint-disable no-undef */
import userReducer from '../../redux/reducers/userReducer';

describe('Test user reducer', () => {
	it('should return data', () => {
		expect(
			userReducer(undefined, {
				type: 'USER_ROLE_FULFILLED',
				payload: { data: { data: { rows: 'rows' } } }
			})
		).toEqual({
			data: 'rows',
			managerData: '',
			message: '',
			error: '',
			loading: false
		});
	});
	it('should return error', () => {
		expect(
			userReducer(undefined, {
				type: 'USER_ROLE_REJECTED'
			})
		).toEqual({
			data: '',
			managerData: '',
			message: '',
			error: '',
			loading: false
		});
	});
	it('should return loading to true', () => {
		expect(
			userReducer(undefined, {
				type: 'UPDATE_USER_ROLE_PENDING'
			})
		).toEqual({
			data: '',
			managerData: '',
			message: '',
			error: '',
			loading: true
		});
	});
	it('should return updated user', () => {
		expect(
			userReducer(undefined, {
				type: 'UPDATE_USER_ROLE_FULFILLED',
				payload: { data: { message: 'message' } }
			})
		).toEqual({
			data: '',
			managerData: '',
			message: 'message',
			error: '',
			loading: false
		});
	});
	it('should return updated user', () => {
		expect(
			userReducer(undefined, {
				type: 'UPDATE_USER_ROLE_REJECTED',
				payload: { response: { data: { message: 'error' } } }
			})
		).toEqual({
			data: '',
			managerData: '',
			message: '',
			error: 'error',
			loading: false
		});
	});
	it('should return managers', () => {
		expect(
			userReducer(undefined, {
				type: 'GET_MANAGERS_FULFILLED',
				payload: { data: { data: { rows: 'rows' } } }
			})
		).toEqual({
			data: '',
			managerData: 'rows',
			message: '',
			error: '',
			loading: false
		});
	});
	it('should return rejected', () => {
		expect(
			userReducer(undefined, {
				type: 'GET_MANAGERS_REJECTED'
			})
		).toEqual({
			data: '',
			managerData: '',
			message: '',
			error: '',
			loading: false
		});
	});
	it('should return rejected', () => {
		expect(
			userReducer(undefined, {
				type: 'ASSIGN_MANAGER_REJECTED',
				payload: { response: { data: { message: ['error'] } } }
			})
		).toEqual({
			data: '',
			managerData: '',
			message: '',
			error: 'error',
			loading: false
		});
	});
});
