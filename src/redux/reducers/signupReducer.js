import { VALIDATE_SIGNUP } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
	error: '',
	loading: false,
	authorized: false
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case rejected(VALIDATE_SIGNUP):
			return {
				...state,
				error: action.payload.response.data,
				loading: false
			};
		case fulfilled(VALIDATE_SIGNUP):
			return {
				...state,
				authorized: true,
				loading: false
			};
		case pending(VALIDATE_SIGNUP):
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default reducer;
