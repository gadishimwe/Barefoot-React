/* eslint-disable no-undef */
import { combineReducers } from 'redux';
import { initialState, reducer } from '../../redux/reducers/signupReducer';

describe('Test the reducers and actions', () => {
	it('should return the initial state', () => {
		expect(initialState).toEqual({ authorized: false, error: '', loading: false });
	});
	it("should change error from '' to some errors", () => {
		expect(
			reducer(undefined, {
				type: 'VALIDATE_SIGNUP_REJECTED',
				payload: { response: { data: 'some data' } },
			}),
		).toEqual({ authorized: false, error: 'some data', loading: false });
	});
	it('should change authorized from fasle to true', () => {
		expect(reducer(undefined, { type: 'VALIDATE_SIGNUP_FULFILLED' })).toEqual({
			authorized: true,
			error: '',
			loading: false,
		});
	});
	it('should change loading from fasle to true', () => {
		expect(reducer(undefined, { type: 'VALIDATE_SIGNUP_PENDING' })).toEqual({
			authorized: false,
			error: '',
			loading: true,
		});
	});
	it('should return the state', () => {
		expect(reducer(undefined, { type: '' })).toEqual({
			authorized: false,
			error: '',
			loading: false,
		});
	});
	it('should return the state', () => {
		expect(combineReducers);
	});
});
