import http from './httpService';

const setNotifsPreferenceService = data => {
	const response = http.put('/api/notifications', data);

	return response;
};

export default setNotifsPreferenceService;
