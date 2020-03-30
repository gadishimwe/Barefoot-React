/* eslint-disable no-undef */
import { reducer } from '../../redux/reducers/getAccommodationsReducer';

describe('Test user get accommodation', () => {
	it('should return data', () => {
		expect(
			reducer(undefined, {
				type: 'GET_ACCOMMODATIONS_FULFILLED',
				payload: { data: { data: ['data'] } }
			})
		).toEqual({
			loading: false,
			accommodations: ['data'],
			messages: ''
		});
	});
	it('should return data', () => {
		expect(
			reducer(undefined, {
				type: 'GET_ACCOMMODATIONS_REJECTED'
			})
		).toEqual({
			loading: false,
			accommodations: []
		});
	});
});
