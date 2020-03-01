import httpService from '../../services/httpService';
import { CREATE_TRIP } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const createMultiCityTrip = values => {
	const formatDate = dt => {
		const month = `0${dt.getMonth() + 1}`.slice(-2);
		const date = `0${dt.getDate()}`.slice(-2);
		const formattedDate = `${dt.getFullYear()}-${month}-${date}`;
		return formattedDate;
	};
	const tripRequest = values.trips.map(trip => {
		const request = {
			originId: trip.origin.id,
			destinationId: trip.destination.id,
			departureDate: formatDate(trip.departureDate),
			travelReasons: trip.travelReasons
		};
		if (trip.accommodation !== '') {
			return {
				...request,
				accommodationId: trip.accommodation.id
			};
		}
		return request;
	});
	return {
		type: CREATE_TRIP,
		payload: httpService.post('/api/trips/multi-city', tripRequest)
	};
};
