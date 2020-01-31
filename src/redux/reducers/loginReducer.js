import jwtDecode from 'jwt-decode';
import { LOGIN_USER, SET_CURRENT_USER } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
	credentials: {
		email: '',
		password: '',
	},
	isAuthenticated: false,
	user: {},
	token: '',
	error: {},
	loading: false,
};

let User;
const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(LOGIN_USER):
			return {
				...state,
				credentials: {
					...state.credentials,
				},
				error: {},
				loading: true,
			};
		case fulfilled(LOGIN_USER):
			User = jwtDecode(action.payload.data.data);
			return {
				...state,
				credentials: {
					...state.credentials,
				},
				isAuthenticated: true,
				user: { ...User },
				token: action.payload.data.data,
				loading: false,
			};
		case rejected(LOGIN_USER):
			return {
				...state,
				credentials: {
					...state.credentials,
				},
				isAuthenticated: false,
				user: {},
				error: action.payload.response.data,
				loading: false,
			};
		case SET_CURRENT_USER:
			return {
				...state,
				credentials: {
					...state.credentials,
				},
				isAuthenticated: true,
				user: { ...action.payload },
			};
		default:
			return state;
	}
};

export default loginReducer;
