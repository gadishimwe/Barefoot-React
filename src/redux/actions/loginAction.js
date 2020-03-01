import { LOGIN_USER, SET_CURRENT_USER } from './actionTypes';
import { loginUserService } from '../../services/authService';

export const setCurrentUser = user => {
	return {
		type: SET_CURRENT_USER,
		payload: user
	};
};

export const loginUser = ({ email, password }) => {
	return {
		type: LOGIN_USER,
		payload: loginUserService({ email, password })
	};
};
