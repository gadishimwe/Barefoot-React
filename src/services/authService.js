import queryString from 'query-string';
import http from './httpService';

export const findUserService = async ({ email }) => {
	const result = await http.post('/api/auth/find-user', { email });
	return result;
};

export const resetPasswordService = async ({ newPassword, confirmPass }) => {
	const parsed = queryString.parse(window.location.search);
	await localStorage.setItem('token', parsed.token);

	const result = await http.put('/api/auth/reset-password', { newPassword, confirmPass });
	return result;
};

export const loginUserService = data => {
	const response = http.post('/api/auth/login', data);

	return response;
};

export const logoutService = () => {
	const response = http.post('api/auth/logout');
	return response;
};
