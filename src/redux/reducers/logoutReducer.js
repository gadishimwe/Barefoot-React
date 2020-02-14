import { LOGOUT_USER } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
	isAuthenticated: true,
	user: localStorage.user,
	token: localStorage.token,
	error: {},
	loading: false,
};

const logoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(LOGOUT_USER):
			return {
				...state,
				loading: true,
			};
		case fulfilled(LOGOUT_USER):
			return {
				...state,
				isAuthenticated: false,
				user: {},
				token: '',
				loading: false,
			};
		case rejected(LOGOUT_USER):
			return {
				...state,
				isAuthenticated: false,
				user: {},
				error: action.payload.response.data,
				loading: false,
			};

		default:
			return state;
	}
};

export default logoutReducer;
