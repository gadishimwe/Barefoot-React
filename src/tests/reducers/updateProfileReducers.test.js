/* eslint-disable no-undef */
import profileReducer from '../../redux/reducers/updateProfile';
import { UPDATE_PROFILE } from '../../redux/actions/actionTypes';
import { pending, fulfilled } from '../../helpers/utils/action.utils';

describe('Update Profile Reducer Test ', () => {
	test('Should Return Not Updated Initial State: No data sent', () => {
		const action = { type: 'UPDATE_PROFILE' };
		const initialState = {
			userData: {
				gender: 'M',
				residence: 'Rwanda',
				preferredLanguage: 'english',
				preferredCurrency: 'Dollar',
				birthDate: '1990-01-01',
				profilePicture: 'dnjsfhbnjdsfhbfdjnskdjshj'
			},
			error: {},
			loading: false,
			message: ''
		};

		expect(profileReducer(undefined, action)).toEqual(initialState);
	});
	const inputData = {
		userData: {
			gender: 'F',
			residence: 'Kenya',
			preferredLanguage: 'french',
			preferredCurrency: 'Pound',
			birthDate: '1992-10-30',
			profilePicture: 'profilepictureurl'
		},
		error: {},
		loading: true,
		message: 'Profile Updated successfully'
	};
	test('Should Test a pending request', () => {
		const action = { type: pending(UPDATE_PROFILE) };
		expect(
			profileReducer(
				{
					...inputData
				},
				action
			)
		).toEqual({
			...inputData
		});
	});

	test('Should Test a fulfilled request', () => {
		const action = { type: fulfilled(UPDATE_PROFILE) };
		expect(
			profileReducer(
				{
					...inputData,
					loading: false
				},
				action
			)
		).toEqual({
			...inputData,
			loading: true
		});
	});
	it('should return updated profile', () => {
		expect(
			profileReducer(undefined, {
				type: 'UPDATE_PROFILE_REJECTED',
				payload: { response: { message: 'error' } }
			})
		).toEqual({
			userData: {
				gender: 'M',
				residence: 'Rwanda',
				preferredLanguage: 'english',
				preferredCurrency: 'Dollar',
				birthDate: '1990-01-01',
				profilePicture: 'dnjsfhbnjdsfhbfdjnskdjshj'
			},
			error: 'error',
			loading: false,
			message: ''
		});
	});
	it('should return updated profile', () => {
		expect(
			profileReducer(undefined, {
				type: 'UPDATE_PROFILE_FULFILLED',
				payload: { data: { data: { data: 'data' }, message: 'message' } }
			})
		).toEqual({
			userData: { data: 'data' },
			error: {},
			loading: false,
			message: 'message'
		});
	});
});
