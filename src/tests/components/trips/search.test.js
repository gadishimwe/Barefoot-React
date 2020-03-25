/* eslint-disable no-undef */
import searchReducer from '../../../redux/reducers/searchReducer';

describe('Search Component', () => {
	it('Should wait the response when no search results found', done => {
		const action = {
			type: 'SEARCH_PENDING',
			payload: {
				response: {
					data: {
						message: ''
					}
				}
			}
		};
		const initialState = {
			data: '',
			error: '',
			loading: false
		};

		expect(searchReducer(undefined, action)).toEqual({
			...initialState,
			loading: true
		});
		done();
	});

	it('Should display search results when an action is fulfilled', done => {
		const action = {
			type: 'SEARCH_FULFILLED',
			payload: {
				data: {
					data: {
						rows: [
							{
								id: 11,
								requesterId: 36,
								status: 'pending',
								lineManagerId: 35,
								tripType: 'One Way',
								requesterFname: 'umuntu',
								requesterLname: 'umwe',
								requesterPicture: null,
								createdAt: '2020-03-12T17:55:26.351Z',
								updatedAt: '2020-03-12T17:55:26.351Z',
								trip: [
									{
										id: 7,
										tripType: 'one-way',
										requestId: 11,
										userId: 36,
										originId: 1,
										destinationId: 5,
										departureDate: '2020-03-13T00:00:00.000Z',
										returnDate: null,
										travelReasons: 'We are going to travel the country',
										accommodationId: null,
										createdAt: '2020-03-12T17:55:26.356Z',
										updatedAt: '2020-03-12T17:55:26.356Z'
									}
								]
							}
						]
					}
				}
			}
		};
		const initialState = {
			data: '',
			error: '',
			loading: false
		};

		expect(searchReducer(undefined, action)).toEqual({
			...initialState,
			data: action.payload.data.data.rows,
			loading: false
		});
		done();
	});

	it('Should display error when no search results found', done => {
		const action = {
			type: 'SEARCH_REJECTED',
			payload: {
				response: {
					data: {
						message: 'No results found'
					}
				}
			}
		};
		const initialState = {
			data: '',
			error: '',
			loading: false
		};

		expect(searchReducer(undefined, action)).toEqual({
			...initialState,
			error: action.payload.response.data.message,
			loading: false
		});
		done();
	});
});
