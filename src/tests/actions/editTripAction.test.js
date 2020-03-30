/* eslint-disable no-undef */
import { formatDate, editTripRequest } from '../../redux/actions/editTripAction';

describe('Test edit trip action', () => {
	it('should return formatted date', () => {
		expect(formatDate(new Date('2020-03-26'))).toEqual('2020-03-26');
	});
	it('should return updated trip', () => {
		expect(
			editTripRequest(1, {
				origin: { id: 1 },
				destination: { id: 2 },
				returnDate: new Date('2020-03-26'),
				departureDate: new Date('2020-03-26'),
				travelReasons: 'visiting'
			})
		).toEqual({
			type: 'UPDATE_TRIP',
			payload: new Promise(() => 'hello')
		});
	});
	it('should return updated trip', () => {
		expect(
			editTripRequest(1, {
				origin: { id: 1 },
				destination: { id: 2 },
				departureDate: new Date('2020-03-26'),
				travelReasons: 'visiting'
			})
		).toEqual({
			type: 'UPDATE_TRIP',
			payload: new Promise(() => 'hello')
		});
	});
});
