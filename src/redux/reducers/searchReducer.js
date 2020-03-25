import { SEARCH } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

const initialState = {
	data: '',
	error: '',
	loading: false
};

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SEARCH):
			return {
				...state,
				loading: true
			};
		case fulfilled(SEARCH):
			return {
				...state,
				data: action.payload.data.data.rows,
				loading: false
			};
		case rejected(SEARCH):
			return {
				...state,
				error: action.payload.response.data.message,
				loading: false
			};
		default:
			return state;
	}
};

export default searchReducer;
