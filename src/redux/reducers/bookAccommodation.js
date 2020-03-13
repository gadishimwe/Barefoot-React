import {
	GET_ACCOMMODATIONS,
	SELECT_ACCOMMODATION,
	BOOK_ACCOMMODATION,
	CLOSE_BOOKING,
	SET_DESTINATION
} from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
	selected: undefined,
	accommodations: [],
	locations: [],
	loading: false,
	message: '',
	destination: undefined
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case fulfilled(GET_ACCOMMODATIONS):
			return {
				...state,
				accommodations: [...action.payload.data.data],
				selected: action.payload.data.data.find(
					acc =>
						acc.locationId === state.locations.find(loc => loc.country === state.destination).id
				),
				messages: ''
			};
		case pending(GET_ACCOMMODATIONS):
			return {
				...state
			};
		case rejected(GET_ACCOMMODATIONS):
			return {
				...state
			};
		case SELECT_ACCOMMODATION:
			return {
				...state,
				selected: action.payload
			};
		case fulfilled(BOOK_ACCOMMODATION):
			return {
				...state,
				loading: false,
				message: action.payload.data.message
			};
		case pending(BOOK_ACCOMMODATION):
			return {
				...state,
				loading: true
			};
		case rejected(BOOK_ACCOMMODATION):
			return {
				...state,
				loading: false,
				message: action.payload.response.data.message
			};
		case CLOSE_BOOKING:
			return {
				...state,
				message: ''
			};
		case SET_DESTINATION:
			return {
				...state,
				destination: action.payload.destination,
				locations: [...action.payload.locations]
			};
		default:
			return state;
	}
};

export default reducer;
