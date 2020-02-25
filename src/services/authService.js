import http from './httpService';
import fetchData from '../helpers/fetchData';

export const findUserService = async ({ email }) => {
	const result = await http.post('/api/auth/find-user', { email });
	return result;
};

export const resetPasswordService = async ({ newPassword, confirmPass }) => {
	const result = await fetchData.put('/api/auth/reset-password', { newPassword, confirmPass });
	return result;
};

export const loginUserService = data => {
	const response = http.post('/api/auth/login', data);

	return response;
};

export const logoutService = () => {
	const response = http.post('/api/auth/logout');
	return response;
};
