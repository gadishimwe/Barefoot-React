/* eslint-disable no-undef */
import { combineReducers } from 'redux';
import { initialState, reducer } from '../../redux/reducers/multiCityReducer';

describe('Test the reducers and actions', () => {
	it('should add another city', () => {
		expect(reducer(undefined, { type: 'ADD_ANOTHER_CITY' })).toEqual({
			...initialState,
			trips: [...initialState.trips, { ...initialState.trips[0] }]
		});
	});
	it('should load the locations', () => {
		expect(
			reducer(undefined, {
				type: 'GET_LOCATIONS_FULFILLED',
				payload: { data: { data: ['data', 1, 2] } }
			})
		).toEqual({
			...initialState,
			locations: ['data', 1, 2]
		});
	});
	it('should return initial state', () => {
		expect(
			reducer(undefined, {
				type: 'GET_LOCATIONS_REJECTED'
			})
		).toEqual({
			...initialState
		});
	});
	it('should display errors from backend', () => {
		expect(
			reducer(undefined, {
				type: 'CREATE_TRIP_REJECTED',
				payload: { response: { data: { message: 'error' } } }
			})
		).toEqual({
			...initialState,
			messages: 'error'
		});
	});
	it('should display errors from backend', () => {
		expect(
			reducer(undefined, {
				type: 'CREATE_TRIP_FULFILLED',
				payload: { data: { message: 'trip created' } }
			})
		).toEqual({
			...initialState,
			messages: 'trip created'
		});
	});
});
