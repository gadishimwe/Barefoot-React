import http from './httpService';

export default ({ firstName, lastName, email, password }) => {
	const response = http.post('/api/auth/signup', {
		firstName,
		lastName,
		email,
		password
	});
	return response;
};
