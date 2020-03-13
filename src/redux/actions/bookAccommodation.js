import {
	GET_ACCOMMODATIONS,
	SELECT_ACCOMMODATION,
	BOOK_ACCOMMODATION,
	SET_DESTINATION
} from './actionTypes';
import httpService from '../../services/httpService';
import { formatDate } from './trips';

export const getAccommodations = token => {
	return {
		type: GET_ACCOMMODATIONS,
		payload: httpService.get('/api/accommodations', { authorization: token })
	};
};

export const selectAccommodation = accommodation => {
	window.scrollTo(0, 0);
	return {
		type: SELECT_ACCOMMODATION,
		payload: accommodation
	};
};
export const bookAccommodation = (values, { accommodationId, id }) => {
	const body = { from: formatDate(values.checkIn), to: formatDate(values.checkOut) };
	const response = httpService.post(
		`/api/accommodations/${accommodationId}/rooms/${id}/book`,
		body
	);
	return {
		type: BOOK_ACCOMMODATION,
		payload: response
	};
};
export const setDestination = (destination, locations) => {
	return {
		type: SET_DESTINATION,
		payload: { destination, locations }
	};
};
