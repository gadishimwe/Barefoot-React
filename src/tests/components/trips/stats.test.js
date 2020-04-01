/* eslint-disable no-undef */

import tripStatsReducer from '../../../redux/reducers/tripStatsReducer';

describe('Stats Component', () => {
	it('Should wait the response when action is pending', done => {
		const action = {
			type: 'TRIP_STATS_PENDING',
			payload: {
				response: {
					data: {
						message: ''
					}
				}
			}
		};
		const initialState = {
			data: ''
		};

		expect(tripStatsReducer(undefined, action)).toEqual({
			...initialState
		});
		done();
	});

	it('Should show the stats response when action is fulfilled', done => {
		const action = {
			type: 'TRIP_STATS_FULFILLED',
			payload: {
				data: {
					data: [
						{
							tripType: 'one-way',
							count: 1
						},
						{
							tripType: 'retun-trip',
							count: 1
						},
						{
							tripType: 'multi-city',
							count: 1
						}
					]
				}
			}
		};
		const initialState = {
			data: action.payload.data.data
		};

		expect(tripStatsReducer(undefined, action)).toEqual({
			...initialState
		});
		done();
	});
});
