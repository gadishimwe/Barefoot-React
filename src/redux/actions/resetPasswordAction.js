import { FIND_USER, RESET_PASSWORD } from './actionTypes';
import { findUserService, resetPasswordService } from '../../services/authService';

export const findUser = email => {
	return {
		type: FIND_USER,
		payload: findUserService(email),
	};
};

export const resetPassword = (newPassword, confirmPass) => {
	return {
		type: RESET_PASSWORD,
		payload: resetPasswordService(newPassword, confirmPass),
	};
};
