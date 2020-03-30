/* eslint-disable no-undef */
import accommodationReducer from '../../../../redux/reducers/AccommodationReducer';

describe('Create accommodation reducer test', () => {
	it('Get Locations is fulfilled', () => {
		const action = {
			type: 'GET_LOCATIONS_FULFILLED',
			payload: {
				data: {
					data: [{ name: 'Rwanda', id: '1' }]
				}
			}
		};
		const response = {
			locations: [{ name: 'Rwanda', id: '1' }]
		};
		const newState = accommodationReducer({}, action);
		expect(newState).toEqual(response);
	});
	it('Get locations is REJECTED', () => {
		const action = {
			type: 'GET_LOCATIONS_REJECTED',
			payload: {
				response: {
					data: {
						status: 401,
						message: 'Accommodation Exist'
					}
				}
			}
		};
		const response = {};
		const newState = accommodationReducer({}, action);

		expect(newState).toEqual(response);
	});
	it('Create accommodation is pending', () => {
		const action = {
			type: 'ADD_ACCOMMODATION_PENDING',
			payload: { name: 'TEstHotel', loactionId: '1' }
		};
		const response = { loading: true };
		const newState = accommodationReducer({}, action);
		expect(newState).toEqual(response);
	});
	it('Create accommodation is REJECTED', () => {
		const action = {
			type: 'ADD_ACCOMMODATION_REJECTED',
			payload: {
				response: {
					data: {
						status: 401,
						message: 'Accommodation Exist'
					}
				}
			}
		};
		const response = {
			loading: false,
			response: {
				status: 401,
				message: 'Accommodation Exist'
			}
		};
		const newState = accommodationReducer({}, action);

		expect(newState).toEqual(response);
	});
	it('Create accommodation is FULFILLED', () => {
		const action = {
			type: 'ADD_ACCOMMODATION_FULFILLED',
			payload: {
				data: {
					status: 200,
					message: 'Accommodation Creation succesful'
				}
			}
		};

		const response = {
			loading: false,
			response: {
				status: 200,
				message: 'Accommodation Creation succesful'
			}
		};
		const newState = accommodationReducer({}, action);

		expect(newState).toEqual(response);
	});
});
