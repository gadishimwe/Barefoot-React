import http from './httpService';

const searchService = (location, name, status, departureDate) => {
	const result = http.get(
		`/api/search?location=${location}&name=${name}&status=${status}&departureDate=${departureDate}`
	);
	return result;
};

export default searchService;
