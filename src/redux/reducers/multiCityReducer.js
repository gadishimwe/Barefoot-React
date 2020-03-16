import { CREATE_TRIP, ADD_ANOTHER_CITY, GET_LOCATIONS } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
	loading: false,
	messages: '',
	trips: [
		{
			origin: '',
			destination: '',
			travelReasons: '',
			departureDate: new Date()
		},
		{
			origin: '',
			destination: '',
			travelReasons: '',
			departureDate: new Date()
		}
	],
	locations: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ANOTHER_CITY:
			return {
				...state,
				trips: [...state.trips, { ...state.trips[0] }]
			};
		case fulfilled(GET_LOCATIONS):
			return {
				...state,
				locations: [...action.payload.data.data],
				messages: ''
			};
		case pending(GET_LOCATIONS):
			return {
				...state
			};
		case rejected(GET_LOCATIONS):
			return {
				...state
			};

		case rejected(CREATE_TRIP):
			return {
				...state,
				messages: action.payload.response.data.message,
				loading: false
			};
		case fulfilled(CREATE_TRIP):
			return {
				...state,
				messages: action.payload.data.message,
				loading: false
			};
		case pending(CREATE_TRIP):
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default reducer;
