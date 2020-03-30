/* eslint-disable no-undef */
import { getAccommodations, setDestination } from '../../redux/actions/bookAccommodation';

describe('Test book accommodation actions', () => {
	it('should return accommodations', () => {
		expect(getAccommodations('token')).toEqual({
			type: 'GET_ACCOMMODATIONS',
			payload: new Promise(() => 'hello')
		});
	});
	it('should return selected accommodation', () => {
		expect(setDestination('destination', 'locations')).toEqual({
			type: 'SET_DESTINATION',
			payload: {
				destination: 'destination',
				locations: 'locations'
			}
		});
	});
});
