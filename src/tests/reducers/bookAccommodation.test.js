/* eslint-disable no-undef */
import { initialState, reducer } from '../../redux/reducers/bookAccommodation';

describe('Test the reducers and actions', () => {
	it('should load accommodations', () => {
		expect(
			reducer(
				{ locations: [{ country: 'nn', id: 2 }], destination: 'nn' },
				{
					type: 'GET_ACCOMMODATIONS_FULFILLED',
					payload: { data: { data: [{ locationId: 1 }, { locationId: 2 }] } }
				}
			)
		).toEqual({
			locations: [{ country: 'nn', id: 2 }],
			destination: 'nn',
			selected: { locationId: 2 },
			messages: '',
			accommodations: [{ locationId: 1 }, { locationId: 2 }]
		});
	});
	it('should do nothing on rejection', () => {
		expect(
			reducer(undefined, {
				type: 'GET_ACCOMMODATIONS_REJECTED'
			})
		).toEqual({
			...initialState
		});
	});
	it('should select accommodation', () => {
		expect(
			reducer(undefined, {
				type: 'SELECT_ACCOMMODATION',
				payload: undefined
			})
		).toEqual({
			...initialState
		});
	});
	it('should book accommodation', () => {
		expect(
			reducer(undefined, {
				type: 'BOOK_ACCOMMODATION_FULFILLED',
				payload: { data: { message: 'message' } }
			})
		).toEqual({
			...initialState,
			message: 'message'
		});
	});
	it('should book accommodation', () => {
		expect(
			reducer(undefined, {
				type: 'BOOK_ACCOMMODATION_PENDING'
			})
		).toEqual({
			...initialState,
			loading: true
		});
	});
	it('should book accommodation', () => {
		expect(
			reducer(undefined, {
				type: 'BOOK_ACCOMMODATION_REJECTED',
				payload: { response: { data: { message: 'message' } } }
			})
		).toEqual({
			...initialState,
			message: 'message'
		});
	});
	it('should close booking modal', () => {
		expect(
			reducer(undefined, {
				type: 'CLOSE_BOOKING'
			})
		).toEqual({
			...initialState
		});
	});
	it('should set destination', () => {
		expect(
			reducer(undefined, {
				type: 'SET_DESTINATION',
				payload: { destination: 'des', locations: [1, 2] }
			})
		).toEqual({
			...initialState,
			destination: 'des',
			locations: [1, 2]
		});
	});
});
