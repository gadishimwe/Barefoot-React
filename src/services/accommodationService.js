import http from './httpService';

export default formData => {
	const response = http.post('/api/accommodations', formData);
	return response;
};
