/* eslint-disable import/prefer-default-export */
import { LOGOUT_USER } from './actionTypes';
import { logoutService } from '../../services/authService';

export const logoutUser = () => {
	return {
		type: LOGOUT_USER,
		payload: logoutService(),
	};
};
