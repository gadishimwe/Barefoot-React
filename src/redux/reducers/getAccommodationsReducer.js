import { GET_ACCOMMODATIONS } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
	loading: false,
	accommodations: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case fulfilled(GET_ACCOMMODATIONS):
			return {
				...state,
				accommodations: [...action.payload.data.data],
				messages: ''
			};
		case pending(GET_ACCOMMODATIONS):
			return {
				...state,
				loading: true
			};
		case rejected(GET_ACCOMMODATIONS):
			return {
				...state
			};
		default:
			return state;
	}
};

export default reducer;
